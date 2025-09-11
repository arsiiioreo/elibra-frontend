<template>
  <div class="d-flex align-items-center justify-content-center vh-100 bg-light text-dark">
    <div class="text-center p-5 border rounded shadow-lg bg-white">
      <div class="mb-4">
        <i class="bi bi-bar-chart-line display-1 text-primary"></i>
      </div>
      <h1 class="display-5 fw-bold">📊 Circulation Report Generator</h1>
      <p class="lead text-muted mb-4">Generate detailed circulation reports by selecting a date range.</p>
      <form @submit.prevent="generateReport">
        <div class="row g-3">
          <div class="col-md-6">
            <label for="startDate" class="form-label">Start Date</label>
            <input type="date" id="startDate" v-model="startDate" class="form-control" required />
          </div>
          <div class="col-md-6">
            <label for="endDate" class="form-label">End Date</label>
            <input type="date" id="endDate" v-model="endDate" class="form-control" required />
          </div>
        </div>
        <div class="mt-4">
          <button type="submit" class="btn btn-primary btn-lg fw-bold">
            <i class="bi bi-file-earmark-bar-graph me-2"></i> Generate Report
          </button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import * as XLSX from "xlsx";

export default {
  data() {
    return {
      startDate: "",
      endDate: "",
    };
  },
  methods: {
    generateReport() {
      if (new Date(this.startDate) > new Date(this.endDate)) {
        alert("Start date cannot be later than end date.");
        return;
      }

      // Example data for the report
      const reportData = [
        ["Date", "Book Title", "Borrower", "Status"],
        ["2023-01-01", "Book A", "John Doe", "Returned"],
        ["2023-01-02", "Book B", "Jane Smith", "Borrowed"],
      ];

      // Create a new workbook and worksheet
      const workbook = XLSX.utils.book_new();
      const worksheet = XLSX.utils.aoa_to_sheet(reportData);

      // Append the worksheet to the workbook
      XLSX.utils.book_append_sheet(workbook, worksheet, "Circulation Report");

      // Generate Excel file and trigger download
      const fileName = `Circulation_Report_${this.startDate}_to_${this.endDate}.xlsx`;
      XLSX.writeFile(workbook, fileName);

      alert(`Report generated successfully: ${fileName}`);
    },
  },
};
</script>

<style scoped>
/* Add any custom styles here */
form {
  max-width: 600px;
  margin: auto;
}
</style>
