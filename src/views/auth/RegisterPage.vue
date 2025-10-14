<template>
    <div id="loginPage" class="min-vh-100 vw-100 d-flex flex-column justify-content-center p-md-0 p-4" style="background-color: #e5e5e5">
        <div class="container mb-5 shadow-lg rounded-3 p-0 overflow-hidden h-auto" style="background-color: white; max-width: 900px; max-height: 800px">
            <div class="row m-0 h-100">
                <!-- Left Box -->
                <div class="col-md-6 d-none d-md-flex flex-column align-items-center justify-content-center bg-success text-white p-4">
                    <div class="d-flex flex-column justify-content-center align-items-center my-5">
                        <img src="@/assets/book.png" alt="E-Libra Logo" class="mb-3" style="width: 100px" />
                        <h1 class="fw-bold mb-0">E-Libra</h1>
                        <p class="mt-3 mb-4 text-center small">“Enhanced Library Integrated Book and Resources Automation System”</p>
                        <div class="fs-3 mb-4">● ● ● ● ●</div>
                    </div>
                    <div class="text-center small">
                        Developed By<br />
                        <span class="fw-bold">FSJinx</span>
                    </div>
                </div>

                <!-- Right Box -->
                <div class="col-md-6 p-4 d-flex flex-column align-items-center overflow-hidden h-100">
                    <!-- Header -->
                    <div class="d-flex align-items-center justify-content-evenly my-2 my-md-1 w-100 p-3">
                        <img src="@/assets/isu.png" alt="ISU Logo" style="width: 55px; height: auto; object-fit: contain" />
                        <div class="text-center">
                            <h2 class="fs-4 fs-md-2 fw-bold text-center mb-0">REGISTER</h2>
                            <p class="text-muted small m-0">Patron Registration Form</p>
                        </div>
                        <img src="@/assets/library.png" alt="ISU Logo" style="width: 55px; height: auto; object-fit: contain" />
                    </div>

                    <!-- Animated Body -->
                    <div class="w-100 h-100 overflow-hidden">
                        <Transition mode="out-in" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
                            <!-- Page container -->
                            <div :key="page" class="p-4">
                                <!-- Page 0 -->
                                <div v-if="page === 0" class="vstack gap-4 justify-content-center align-items-center">
                                    <h4 class="fw-bold text-prime">Create an account as</h4>
                                    <img class="my-4" src="spinner.gif" alt="Loading..." width="75" height="75" v-if="!types" />
                                    <div class="hstack justify-content-center gap-4 my-4" v-else>
                                        <button
                                            class="btn btn-outline-success shadow-sm p-4 flex-shrink-0"
                                            v-for="type in types"
                                            :key="type.id"
                                            @click="
                                                page = 1;
                                                selectedType = type;
                                            ">
                                            {{ type?.name }}
                                        </button>
                                    </div>
                                </div>

                                <!-- Page 1 & 2 -->
                                <div v-else class="d-flex flex-column mt-2 overflow-hidden">
                                    <div class="header mb-3">
                                        <p class="text-muted fs-5 fw-bold mb-0">
                                            {{ page === 1 ? "Setup Personal Information" : page === 2 ? "Setup Account Information" : "Verify OTP" }}
                                        </p>
                                        <small class="text-muted">
                                            {{ "Step " + (page + 1) + " of 4 - " + selectedType.name.charAt(0).toUpperCase() + selectedType.name.slice(1) }}
                                        </small>
                                    </div>
                                    <div class="body overflow-auto mb-auto">
                                        <Transition mode="out-in" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
                                            <!-- Page 1 -->
                                            <div v-if="page === 1" key="page1" class="m-1">
                                                <form @submit.prevent="changePage('+')">
                                                    <BaseInput v-model="form.last_name" label="Last Name" placeholder="Enter last name" :rules="['required', 'min:2']" :r="true" :minlength="2" />
                                                    <BaseInput v-model="form.first_name" label="First Name" placeholder="Enter first name" :rules="['required', 'min:2']" :r="true" :minlength="2" />
                                                    <BaseInput v-model="form.middle_initial" label="Middle Name" placeholder="Enter middle initial" :maxlength="1" />
                                                    <BaseSelect
                                                        v-model="form.sex"
                                                        label="Gender"
                                                        :options="[
                                                            { value: 'male', label: 'Male' },
                                                            { value: 'female', label: 'Female' },
                                                            { value: 'other', label: 'Other' },
                                                        ]"
                                                        placeholder="Select gender"
                                                        :rules="['required']"
                                                        :r="true" />
                                                    <BaseInput v-model="form.id_number" label="ID Number" placeholder="Enter ID Number" :rules="['required', 'min:2']" :r="true" :minlength="2" />
                                                    <BaseInput v-if="selectedType.name === 'Guest'" v-model="form.campus" label="Campus" placeholder="Enter campus" :rules="['required', 'min2']" :r="true" :minlength="2" />
                                                    <BaseSelect v-else v-model="form.campus" label="Campus" :options="campuses.map((c) => ({ value: c.id, label: c.name }))" placeholder="Select Campus" :rules="['required']" :r="true" />

                                                    <div class="footer w-100 pt-2" style="max-height: fit-content !important">
                                                        <div class="hstack gap-2 justify-content-center text-center">
                                                            <button class="w-50 btn btn-outline-primary rounded-1" type="button" @click="changePage('-')"><i class="bi bi-arrow-left me-2"></i>Previous</button>
                                                            <button class="w-50 btn btn-outline-success rounded-1" type="submit">Next<i class="bi bi-arrow-right ms-2"></i></button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                            <!-- Page 2 -->
                                            <div v-else-if="page === 2" key="page2" class="m-1">
                                                <form @submit.prevent="submitForm">
                                                    <BaseInput v-model="form.email" label="Email" placeholder="Enter your email" :rules="['required', 'email']" :r="true" />
                                                    <BaseInput v-model="form.password" label="Password" type="password" placeholder="Enter your password" :rules="['required', 'min6']" :r="true" :minlength="8" :form="form" />
                                                    <BaseInput v-model="form.password_confirmation" label="Confirm Password" type="password" placeholder="Confirm your password" :rules="['required', 'match:password']" :form="form" :r="true" />

                                                    <div class="footer w-100 pt-2" style="max-height: fit-content !important">
                                                        <div class="hstack gap-2 justify-content-center text-center">
                                                            <button class="w-50 btn btn-outline-primary rounded-1" type="button" @click="changePage('-')"><i class="bi bi-arrow-left me-2"></i>Previous</button>
                                                            <button class="w-50 btn btn-outline-success rounded-1" type="submit">Submit<i class="bi bi-arrow-right ms-2"></i></button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                            <div v-else-if="page === 3" class="m-1">
                                                <form @submit.prevent="verifyEmailNow">
                                                    <div class="vstack gap-2" v-if="!verifyEmail">
                                                        <p class="text-center">
                                                            Please verify you email <i class="text-prime fw-bold">"{{ form.email }}"</i>, this will increase the speed of your account's approval.
                                                        </p>
                                                        <div class="hstack gap-2 justify-content-center" v-if="!verifyEmail">
                                                            <button type="button" class="btn btn-outline-secondary">Skip Verification</button>
                                                            <button
                                                                type="button"
                                                                @click="
                                                                    verifyEmail = true;
                                                                    sendOtp();
                                                                "
                                                                class="btn btn-primary">
                                                                Verify Now!
                                                            </button>
                                                        </div>
                                                    </div>
                                                    <div class="vstack gap-2" v-else>
                                                        <p class="text-center">
                                                            Nice! We've sent an email to your email <i class="text-prime fw-bold">{{ form.email }}</i
                                                            >. Please check it.
                                                        </p>
                                                        <BaseInput label="OTP" placeholder="Enter the 6 number OTP code sent to your email" />
                                                        <div class="footer w-100 pt-2" style="max-height: fit-conten !important">
                                                            <div class="hstack gap-2 justify-content-center text-center">
                                                                <button class="w-50 btn btn-outline-primary rounded-1" :disabled="ctdwn.remaining > 0" @click.prevent="resendOtp">
                                                                    <span v-if="ctdwn.remaining > 0">Re-send OTP in {{ ctdwn.remaining }}s</span>
                                                                    <span v-else>Re-send OTP</span>
                                                                </button>
                                                                <button class="w-50 btn btn-outline-success rounded-1" type="submit">Submit<i class="bi bi-arrow-right ms-2"></i></button>
                                                            </div>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>
                                        </Transition>
                                    </div>
                                    <!-- Footer -->
                                </div>
                            </div>
                        </Transition>
                    </div>

                    <p class="mt-4 mb-0">
                        Already have an account?
                        <router-link class="text-decoration-none text-prime fw-bold" to="login">Login</router-link>
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import BaseInput from "@/components/inputs/BaseInput.vue";
import BaseSelect from "@/components/inputs/BaseSelect.vue";
import api from "@/plugins/axios";
import { hideLoading, showLoading } from "@/services/LoadingService";
import { token } from "@/stores/auth";

export default {
    name: "RegisterPage",
    components: { BaseInput, BaseSelect },
    data() {
        return {
            verifyEmail: false,
            page: 0,
            types: null,
            selectedType: null,
            form: {
                last_name: "",
                first_name: "",
                middle_initial: "" || null,
                sex: "",
                id_number: "",
                campus: "",
                email: "",
                password: "",
                password_confirmation: "",
                role: 2,
            },
            campuses: [],
            ctdwn: {
                duration: 60, // countdown seconds
                remaining: 0,
                timer: null,
            },
            tok: null,
        };
    },
    methods: {
        // Smooth height transition hooks
        beforeEnter(el) {
            el.style.height = "0";
            el.style.opacity = "0";
        },
        enter(el) {
            el.style.transition = "all 0.2s ease";
            el.style.height = el.scrollHeight + "px";
            el.style.opacity = "1";
        },
        afterEnter(el) {
            el.style.height = "auto";
        },
        beforeLeave(el) {
            el.style.height = el.scrollHeight + "px";
            el.style.opacity = "1";
        },
        leave(el) {
            el.style.transition = "all 0.2s ease";
            el.style.height = "0";
            el.style.opacity = "0";
        },
        afterLeave(el) {
            el.style.height = "auto";
        },

        startCountdown() {
            this.ctdwn.remaining = this.ctdwn.duration;

            if (this.ctdwn.timer) clearInterval(this.ctdwn.timer);

            this.ctdwn.timer = setInterval(() => {
                if (this.ctdwn.remaining > 0) {
                    this.ctdwn.remaining--;
                } else {
                    clearInterval(this.ctdwn.timer);
                    this.ctdwn.timer = null;
                }
            }, 1000);
        },

        async verifyEmailNow() {
            //
        },

        async verifyOtp() {
            //
        },

        // Call this when user submits OTP or requests resend
        async sendOtp() {
            try {
                const res = await api.get("/api/auth/send-otp");
                this.tok = res.data.token;
            } catch (e) {
                this.verifyEmail = false;
                console.log(e);
            } finally {
                this.startCountdown();
            }
        },

        changePage(direction) {
            switch (direction) {
                case "+":
                    this.page += 1;
                    break;
                case "-":
                    this.page -= 1;
                    break;
                default:
                    break;
            }
        },

        async submitForm() {
            // if (this.form.password !== this.form.confirmPassword) {
            //     return;
            // }

            try {
                showLoading({ message: "Registering account..." });
                const formData = { ...this.form, patron_type: this.selectedType.id };
                const res = await api.post("/api/auth/register", formData);
                token.value = res.data.access_token;
                localStorage.setItem("token", token.value);

                console.log(res.data);
            } catch (e) {
                console.log(e);
                this.changePage("-");
            } finally {
                hideLoading();
                this.changePage("+");
            }
        },
    },
    watch: {
        async "selectedType.name"(newType) {
            if (newType && newType !== "Guest") {
                showLoading({ message: "Fetching campuses..." });
                if (this.campuses && this.campuses.length > 0) hideLoading();
                else {
                    try {
                        const res = await api.get("/api/all-c", {
                            params: { sort: "name", order: "asc" },
                        });
                        this.campuses = res.data.data;
                    } catch (e) {
                        console.log(e);
                        this.changePage("-");
                        this.selectedType = "";
                    }
                }
                hideLoading();
            }
        },
    },
    async mounted() {
        try {
            const res = await api.get("/api/patron-types");
            this.types = res.data;
        } catch (e) {
            console.log(e);
        }
    },
};
</script>

<style scoped>
/* Keep overflow hidden only while animating */
.v-enter-active,
.v-leave-active {
    overflow: hidden;
}
</style>

