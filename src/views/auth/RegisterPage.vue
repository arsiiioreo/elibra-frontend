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
                                    <div class="hstack gap-4 mb-5">
                                        <button
                                            class="vstack text-center btn btn-outline-success shadow-sm p-4"
                                            @click="
                                                page = 1;
                                                type = 'student';
                                            ">
                                            <i class="bi bi-mortarboard fs-2"></i>Student
                                        </button>
                                        <button
                                            class="vstack text-center btn btn-outline-success shadow-sm p-4"
                                            @click="
                                                page = 1;
                                                type = 'faculty';
                                            ">
                                            <i class="bi bi-briefcase fs-2"></i>Faculty
                                        </button>
                                        <button
                                            class="vstack text-center btn btn-outline-success shadow-sm p-4"
                                            @click="
                                                page = 1;
                                                type = 'guest';
                                            ">
                                            <i class="bi bi-person-lines-fill fs-2"></i>Guest
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
                                            {{ "Step " + (page + 1) + " of 4 - " + type.charAt(0).toUpperCase() + type.slice(1) }}
                                        </small>
                                    </div>
                                    <div class="body overflow-auto mb-auto">
                                        <Transition mode="out-in" @before-enter="beforeEnter" @enter="enter" @after-enter="afterEnter" @before-leave="beforeLeave" @leave="leave" @after-leave="afterLeave">
                                            <!-- Page 1 -->
                                            <div v-if="page === 1" key="page1" class="m-1">
                                                <form @submit.prevent="changePage('+')">
                                                    <BaseInput v-model="form.lastName" label="Last Name" placeholder="Enter last name" :rules="['required', 'min:2']" :r="true" :minlength="2" />
                                                    <BaseInput v-model="form.firstName" label="First Name" placeholder="Enter first name" :rules="['required', 'min:2']" :r="true" :minlength="2" />
                                                    <BaseInput v-model="form.middleInitial" label="Middle Name" placeholder="Enter middle initial" :maxlength="1" />
                                                    <BaseSelect
                                                        v-model="form.sex"
                                                        label="Gender"
                                                        :options="[
                                                            { value: 'male', label: 'Male' },
                                                            { value: 'female', label: 'Female' },
                                                        ]"
                                                        placeholder="Select Gender"
                                                        :rules="['required']"
                                                        :r="true" />
                                                    <BaseInput v-model="form.idNumber" label="ID Number" placeholder="Enter ID Number" :rules="['required', 'min:2']" :r="true" :minlength="2" />
                                                    <BaseInput v-if="type === 'guest'" v-model="form.campus" label="Campus" placeholder="Enter campus" :rules="['required', 'min2']" :r="true" :minlength="2" />
                                                    <BaseSelect v-else v-model="form.campus" label="Campus" :options="campuses.map((c) => ({ value: c.id, label: c.name }))" placeholder="Select Campus" :rules="['required']" :r="true" />

                                                    <div class="footer w-100 pt-2" style="max-height: fit-content !important">
                                                        <div class="hstack gap-2 justify-content-center text-center">
                                                            <button class="w-50 btn btn-outline-primary rounded-1" @click="changePage('-')"><i class="bi bi-arrow-left me-2"></i>Previous</button>
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
                                                    <BaseInput v-model="form.confirmPassword" label="Confirm Password" type="password" placeholder="Confirm your password" :rules="['required', 'match:password']" :form="form" :r="true" />

                                                    <div class="footer w-100 pt-2" style="max-height: fit-content !important">
                                                        <div class="hstack gap-2 justify-content-center text-center">
                                                            <button class="w-50 btn btn-outline-primary rounded-1" @click="changePage('-')"><i class="bi bi-arrow-left me-2"></i>Previous</button>
                                                            <button class="w-50 btn btn-outline-success rounded-1" type="submit">Submit<i class="bi bi-arrow-right ms-2"></i></button>
                                                        </div>
                                                    </div>
                                                </form>
                                            </div>

                                            <div v-else-if="page === 3" class="m-1">
                                                <form action="">
                                                    <BaseInput label="OTP" placeholder="Enter the 6 number OTP code sent to your email" />
                                                    <p class="text-center">
                                                        We've sent an email to your email <i class="text-prime fw-bold">{{ form.email }}</i
                                                        >. Please check it.
                                                    </p>
                                                    <div class="footer w-100 pt-2" style="max-height: fit-content !important">
                                                        <div class="hstack gap-2 justify-content-center text-center">
                                                            <button class="w-50 btn btn-outline-primary rounded-1" :disabled="ctdwn.remaining > 0" @click.prevent="resendOtp">
                                                                <span v-if="ctdwn.remaining > 0">Re-send OTP in {{ ctdwn.remaining }}s</span>
                                                                <span v-else>Re-send OTP</span>
                                                            </button>
                                                            <button class="w-50 btn btn-outline-success rounded-1" type="submit">Submit<i class="bi bi-arrow-right ms-2"></i></button>
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

export default {
    name: "RegisterPage",
    components: { BaseInput, BaseSelect },
    data() {
        return {
            page: 0,
            type: "",
            form: {
                lastName: "",
                firstName: "",
                middleInitial: "",
                sex: "",
                idNumber: "",
                campus: "",
                email: "",
                password: "",
                confirmPassword: "",
            },
            campuses: [],
            ctdwn: {
                duration: 60, // countdown seconds
                remaining: 0,
                timer: null,
            },
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

        // Call this when user submits OTP or requests resend
        resendOtp() {
            console.log("Resending OTP to", this.form.email);
            this.startCountdown();
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

        submitForm() {
            if (this.form.password !== this.form.confirmPassword) {
                return;
            }
            const formData = { ...this.form, type: this.type };
            console.log("Form submitted:", formData);
            this.changePage("+");
        },
    },
    watch: {
        async type(newType) {
            if (newType && newType !== "guest") {
                showLoading({ message: "Fetching campuses..." });
                if (this.campuses && this.campuses.length > 0) hideLoading();
                else {
                    const res = await api.get("/all-c", {
                        params: { sort: "name", order: "asc" },
                    });
                    if (res.status === 200) {
                        this.campuses = res.data.data;
                    } else {
                        console.error("Failed to fetch campuses:", res);
                    }
                }
                hideLoading();
            }
        },
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

