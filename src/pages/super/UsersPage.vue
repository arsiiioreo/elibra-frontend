<template>
  <button class="btn btn-primary" @click="fetchUsers">Refresh</button>
  <button class="btn btn-secondary" @click="promptLogout">Logout</button>
  <table class="table table-striped">
    <thead class="table-dark">
      <tr>
        <th>Name</th>
        <th>Sex</th>
        <th>Role</th>
        <th>Campus</th>
      </tr>
    </thead>
    <tbody>
      <tr v-for="user in users" :key="user.id">
        <td>{{ user.name }}</td>
        <td>{{ user.sex === "1" ? "Male" : "Female" }}</td>
        <td>
          {{
            user.role === "0"
              ? "Super Admin"
              : user.role === "1"
              ? "Admin"
              : "Student"
          }}
        </td>
        <td>{{ user.campus_id }}</td>
      </tr>
    </tbody>
  </table>

  <LoadingModal :show="isLoading" :message="loadingModal.message" />
  <YesNoModal
    :show="isYesNoModal"
    :status="yesNoModal.status"
    :title="yesNoModal.title"
    :message="yesNoModal.message"
    @answer="handleYesNo"
  />
</template>

<script>
import LoadingModal from "@/components/Modals/LoadingModal.vue";
import YesNoModal from "@/components/Modals/YesNoModal.vue";

export default {
  data() {
    return {
      users: [],
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
    async fetchUsers() {
      this.isLoading = true;
      this.loadingModal.message = "Generating users' data, please wait...";
      try {
        const response = await this.$api.get("/all-users");
        this.users = response.data;
      } catch (error) {
        console.error("Error fetching users:", error);
      } finally {
        this.isLoading = false;
      }
    },

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
    this.fetchUsers();
  },
};
</script>
