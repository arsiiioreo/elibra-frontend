<template>
    <button class="btn btn-secondary" @click="promptLogout">Logout</button>
    <h1>Student: {{ my.name }}</h1>

    <LoadingModal :show="isLoading" :message="loadingModal.message" />
    <YesNoModal :show="isYesNoModal" :status="yesNoModal.status" :title="yesNoModal.title" :message="yesNoModal.message" @answer="handleYesNo" />
</template>

<script>
import LoadingModal from "@/components/Modals/LoadingModal.vue";
import YesNoModal from "@/components/Modals/YesNoModal.vue";
import { thisIsMe } from "@/stores/auth";

export default {
    async created() {
        this.my = await thisIsMe();
    },
    data() {
        return {
            my: [],

            loadingModal: {
                message: "",
            },
            yesNoModal: {
                status: "",
                title: "",
                message: "",
                answer: null,
            },
            isLoading: false,
            isYesNoModal: false,
        };
    },
    components: {
        LoadingModal,
        YesNoModal,
    },
    methods: {
        async promptLogout() {
            this.yesNoModal.status = "warning";
            this.yesNoModal.title = "Logout Confirmation";
            this.yesNoModal.message = "Are you sure you want to logout?";
            this.isYesNoModal = true;
        },

        handleYesNo(choice) {
            this.isYesNoModal = false;
            if (choice) {
                this.loadingModal.message = "Logging out, please wait...";
                this.isLoading = true;
                setTimeout(() => {
                    this.logout();
                }, 2000);
                return;
            }
            this.yesNoModal.answer = choice;
        },

        logout() {
            localStorage.clear();
            this.isLoading = false;
            this.$router.push({ name: "login" });
        },
    },
    mounted() {
        this.user = JSON.parse(localStorage.getItem("user"));
    },
};
</script>

