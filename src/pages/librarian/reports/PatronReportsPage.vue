<!-- <template>
  <UnderConstructionPage />
</template>

<script>
import UnderConstructionPage from "@/components/error/UnderConstructionPage.vue";
import patron_logs from "./patron_logs_september_2025.json";

export default {
  name: "LibraryInformationPage",
  components: { UnderConstructionPage },
  setup() {
    return {
      patron_logs,
    };
  },
};
</script> -->

<template>
  <div class="card w-100 h-100 overflow-hidden">
    <div class="card-header hstack justify-content-between">
      <span>Patron Attendance Logs </span>
      <div><input type="search" name="search" id="search" class="form-control" v-model="params.name" /></div>
    </div>
    <div class="card-body overflow-auto p-0">
      <table class="table table-hoverable table-bordered table-striped">
        <thead>
          <tr>
            <td>No.</td>
            <td>Name</td>
            <td>ID Number</td>
            <td>Description</td>
            <td>Group</td>
            <td>Gender</td>
            <td>Location</td>
            <td>Date Added</td>
          </tr>
        </thead>
        <tbody>
          <tr v-if="fetching">
            <td class="text-center" colspan="8"><img src="@/assets/spinner.gif" alt="" width="75" /></td>
          </tr>
          <tr v-else-if="!users">
            <td class="text-center" colspan="8">No data found.</td>
          </tr>
          <tr v-else v-for="(u, i) in users" :key="i">
            <td>{{ i + 1 }}</td>
            <td>{{ u.name }}</td>
            <td>{{ u.id_number }}</td>
            <td>{{ u.description }}</td>
            <td>{{ u.group }}</td>
            <td>{{ u.gender }}</td>
            <td>{{ u.location }}</td>
            <td>{{ u.date_entered }}</td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import api from "@/plugins/axios";

export default {
  created() {
    this.fetchLogs();
  },
  data() {
    return {
      users: null,
      timer: null,
      fetching: false,
      params: {
        name: "",
      },
    };
  },
  watch: {
    "params.name"() {
      clearTimeout(this.timer);

      this.timer = setTimeout(() => {
        this.fetchLogs();
      }, 100);
    },
  },
  methods: {
    async fetchLogs() {
      this.fetching = true;
      this.users = null;
      try {
        const res = await api.get("api/patron/logs", { params: this.name });
        this.users = res.data;
      } finally {
        this.fetching = false;
      }
    },
  },
};
</script>
