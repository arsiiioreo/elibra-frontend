<template>
    <div style="height: 100vh">
        <nav class="d-flex align-items-center justify-content-between w-100 p-5" style="height: 10%">
            <div class="d-flex gap-4 align-items-center">
                <img src="@/assets/LOGO.png" alt="" style="height: 50px; width: auto" />
                <h4 class="text-prime fw-bolder m-0">e-Libra OPAC</h4>
            </div>
            <div v-if="!user.id" class="d-flex gap-3 align-items-center">
                <button type="button" class="btn rounded-pill px-4 text-prime fw-semibold">Login</button>
                <button type="button" class="btn rounded-pill px-4 text-white fw-semibold bg-prime">Register</button>
            </div>
            <div v-if="user.id">
                <router-link to="/" class="d-flex gap-1 align-items-center rounded-5 border p-1 px-2 text-decoration-none text-prime">
                    <img class="logo" src="https://static.vecteezy.com/system/resources/previews/002/002/403/non_2x/man-with-beard-avatar-character-isolated-icon-free-vector.jpg" alt="" style="height: 35px; width: auto" />
                    <small class="me-2">{{ user.name }}</small>
                </router-link>
            </div>
        </nav>

        <main style="height: 90%">
            <div class="row d-flex justify-content-center align-items-center h-75">
                <div class="col-4 d-flex justify-content-center">
                    <img src="https://cdn-icons-png.flaticon.com/512/29/29302.png" alt="Bookshelf" class="mb-4" style="width: 50%; opacity: 0.7" />
                </div>
                <div class="col-4">
                    <h1 class="display-1 fw-bold text-prime">404</h1>
                    <p class="fs-3"><span class="text-prime">Oops!</span> You got lost in the stacks.</p>
                    <p class="lead">
                        The book you're looking for isn't on this shelf.<br />
                        Maybe it was misplaced... or never written.
                    </p>

                    <router-link to="/" class="btn bg-prime px-4 py-2 mt-3 text-white"> 📚 Back to Home </router-link>
                </div>
            </div>
        </main>
    </div>
</template>

<script>
export default {
    data() {
        return {
            user: {},
        };
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem("user")) || {};
    },
};
</script>

