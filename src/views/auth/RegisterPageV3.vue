<template>
    <div id="loginPage" class="min-vh-100 vw-100 d-flex flex-column align-items-center justify-content-center p-md-0 p-4" style="background-color: #e5e5e5;">
        <div class="container mb-5">
            <div class="row justify-content-center">
                <div class="col-lg-10 col-xl-9">
                    <div class="row g-0 shadow rounded-4 overflow-hidden bg-white">
                        <!-- Left Side -->
                        <div class="col-md-6 d-none d-md-flex flex-column align-items-center justify-content-center bg-success text-white p-4">
                            <div class="d-flex flex-column justify-content-center align-items-center my-5">
                                <img src="@/assets/book.png" alt="E-Libra Logo" class="mb-3" style="width:80px;" />
                                <h1 class="fw-bold mb-0">E-Libra</h1>
                                <p class="mt-3 mb-4 text-center small">“Enhanced Library Integrated Book and Resources Automation”</p>
                                <div class="fs-3 mb-4">● ● ● ● ●</div>
                            </div>
                            <div class="text-center small">
                                Developed By<br />
                                <span class="fw-bold">FSJinx</span>
                            </div>
                        </div>
                        <!-- Right Side -->
                        <div class="col-md-6 p-lg-5 p-3 d-flex flex-column align-items-center">
                            <div class="d-flex align-items-center justify-content-evenly my-2 w-100">
                                <img src="@/assets/isu.png" alt="ISU Logo" style="width:55px; height:auto; object-fit:contain;" />
                                <div class="text-center">
                                    <h2 class="fs-4 fs-md-2 fw-bold text-center mb-0">REGISTER</h2>
                                    <p class="text-muted small m-0">Student Registration Form</p>
                                </div>
                                <img src="@/assets/library.png" alt="ISU Logo" style="width:55px; height:auto; object-fit:contain;" />
                            </div>
                            <form class="d-flex flex-column gap-2 mt-md-4 w-100" @submit.prevent>
                                <div class="col-12">
                                    <div class="row">
                                        <div class="col-12 p-md-1 p-3 pb-0">
                                            <p class="small text-muted mb-1">Progress Bar - {{ progressLabel[step-1] }}</p>
                                            <div class="progress" role="progressbar" aria-label="Basic example" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100">
                                                <div
                                                    class="progress-bar"
                                                    :class="{
                                                        'bg-danger': formProgress < 40,
                                                        'bg-warning': formProgress >= 40 && formProgress < 80,
                                                        'bg-success': formProgress >= 80
                                                    }"
                                                    :style="{ width: formProgress + '%' }"
                                                ></div>
                                            </div>
                                            <div class="w-100 text-end">
                                                <small>{{ formProgress }}%</small>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="step-1" v-if="step === 1">
                                        <div class="row">
                                            <div class="col-12 p-md-1 px-3 mb-2">
                                                <label class="mb-1">Last Name<small class="text-danger">*</small></label>
                                                <input type="text" class="form-control" v-model="form.lastName" placeholder="Enter your last name"/>
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-12 p-md-1 px-3 mb-2">
                                                <label class="mb-1">First Name<small class="text-danger">*</small></label>
                                                <input type="text" class="form-control" v-model="form.firstName" placeholder="Enter your first name" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-7 p-md-1 px-3 mb-2">
                                                <label class="mb-1">Middle Initial<small class="text-danger">*</small></label>
                                                <input type="text" class="form-control" v-model="form.middleInitial" placeholder="e.g. for Dela Cruz use D." />
                                            </div>
                                            <div class="col-md-5 p-md-1 px-3 mb-2">
                                                <label class="mb-1 fs-6">Suffix (Optional)</label>
                                                <input type="text" class="form-control" v-model="form.suffix" placeholder="e.g. Jr., Sr., III" />
                                            </div>
                                        </div>
                                        <div class="row">
                                            <div class="col-md-6 col-12 px-3 p-md-1 mb-2">
                                                <label for="sex" class="mb-1">Sex<small class="text-danger">*</small></label>
                                                <select name="sex" id="sex" class="form-select" v-model="form.sex">
                                                    <option value="" disabled selected>Select your sex</option>
                                                    <option value="1">Male</option>
                                                    <option value="0">Female</option>
                                                </select>
                                            </div>
                                            <div class="col-md-6 col-12 px-3 p-md-1 mb-2"> 
                                                <label for="role" class="mb-1">Role<small class="text-danger">*</small></label>
                                                <select name="role" id="role" class="form-select" v-model="form.role">
                                                    <option value="" disabled selected>Select your role</option>
                                                    <option value="1">Admin</option>
                                                    <option value="2">Student</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="row text-end">
                                            <div class="col-12 p-md-1 mt-2 px-3 mb-2">
                                                <button type="button" class="btn btn-success" @click="step++" :disabled="formProgress < 60">Next</button>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="step-2" v-if="step === 2">
                                        <div class="row">
                                            <div class="col-12 px-3 p-md-1 mb-2"> 
                                                <label class="mb-1">Email<small class="text-danger">*</small></label>
                                                <input type="text" class="form-control" v-model="form.email" placeholder="Enter your email" />
                                            </div>
                                            <div class="col-12 px-3 p-md-1 mb-2"> 
                                                <label class="mb-1">Password<small class="text-danger">*</small></label>
                                                <input :type="showPassword ? 'text' : 'password'" class="form-control" v-model="form.password" placeholder="Enter your password" />
                                            </div>
                                            <div class="col-12 px-3 p-md-1 mb-2"> 
                                                <label class="mb-1">Confirm Password<small class="text-danger">*</small></label>
                                                <input :type="showPassword ? 'text' : 'password'" class="form-control" v-model="form.password_confirmation" placeholder="Confirm your password" />
                                            </div>
                                            <div class="col-12 px-3 p-md-1 mb-2"> 
                                                <div class="d-flex align-items-center justify-content-between mb-2">
                                                    <label class="form-check-label d-flex align-items-center gap-2 m-0">
                                                        <input type="checkbox" class="form-check-input m-0" v-model="showPassword" />
                                                        Show Password
                                                    </label>
                                                </div>
                                            </div>
                                            <div class="col-12 px-3 p-md-1 mb-2 text-end"> 
                                                <button type="button" class="btn btn-secondary me-2" @click="step--">Previous</button>
                                                <button type="submit" class="btn btn-success" @click="step++" :disabled="formProgress < 100">Register</button>                                    
                                            </div>
                                        </div>
                                    </div>
                                    <div class="step-3 text-center d-flex justify-content-center" v-if="step === 3">
                                        <div class="row">
                                            <div class="col-12 p-md-1 px-3 mb-2">
                                                <div class="spinner-grow text-success" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                                <div class="spinner-grow text-success mx-2" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                                <div class="spinner-grow text-success" role="status">
                                                    <span class="visually-hidden">Loading...</span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </form>
                            <div class="text-center mt-3 text-muted small" v-if="step === 1 || step === 2">
                                Already have an account? <a href="/login" class="fw-bold text-decoration-none text-success">Login</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="container">
            <div class="row justify-content-center">
                <div class="col-auto">
                    <span class="small text-muted">
                        <i class="bi bi-info-circle me-1"></i>
                        This is a property of the Isabela State University – Main Campus. This is a centralized Integrated Library Management System.
                    </span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            form: {
                lastName: '',
                firstName: '',
                middleInitial: '',
                suffix: '',
                sex: '',
                role: '',

                email: '',
                password: '',
                password_confirmation: '',
            },
            showPassword: false,
            progress: 0,
            step: 1,
            progressLabel: ['Personal Information', 'Account Details', 'Validation']
        }
    },
    computed: {
        formProgress() {
            const requiredFields = {
                firstName: this.form.firstName,
                lastName: this.form.lastName,
                middleInitial: this.form.middleInitial,
                sex: this.form.sex,
                role: this.form.role,
                email: this.form.email,
                password: this.form.password,
                password_confirmation: this.form.password_confirmation,
            }

            const total = Object.keys(requiredFields).length
            const filled = Object.values(requiredFields).filter(val => val.trim() !== '').length
            return Math.round((filled / total) * 100)
        }
    }
}
</script>


