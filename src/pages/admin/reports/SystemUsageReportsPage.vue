<template>
    <div class="d-flex align-items-start justify-content-center vh-100 bg-light text-dark">
        <div class="text-center p-5 border rounded shadow-lg bg-white mt-5">
            <div class="mb-4">
                <i class="bi bi-book display-1 text-primary"></i>
            </div>
            <h1 class="display-4 fw-bold">📚 Page Under Construction 📚</h1>
            <p class="lead text-muted mb-4">We're adding new chapters to this page. Please visit again to explore more!</p>
            <router-link :to="{ name: 'LibrarianDashboard' }" class="btn btn-primary btn-lg fw-bold"> <i class="bi bi-arrow-left-circle me-2"></i> Back to Dashboard </router-link>
        </div>
    </div>
</template>

