<template>
    <div class="row">
        <div class="col-md-3 mb-4" v-for="(card, index) in cards" :key="index">
            <div class="card shadow-sm border h-100">
                <div class="card-body d-flex align-items-center">
                    <!-- <div class="me-3" :class="card.iconColor">
                        <i :class="card.iconClass"></i>
                    </div> -->
                    <div class="w-100">
                        <h6 class="text-capitalize mb-3">{{ card.title }}</h6>
                        <h4 class="fs-2 fw-bold mb-0 text-end">{{ card.value }}</h4>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: "OverviewComponent",
    props: {
        data: {
            type: Object,
            required: false,
            default: () => ({}),
        },
    },
    computed: {
        cards() {
            return [
                { title: "Users", value: this.data.users || "0", iconClass: "bi bi-people-fill fs-1", iconColor: "text-primary" },
                { title: "Orders", value: this.data.orders || "0", iconClass: "bi bi-cart-fill fs-1", iconColor: "text-success" },
                { title: "Revenue", value: this.data.revenue || "0", iconClass: "bi bi-currency-dollar fs-1", iconColor: "text-warning" },
                { title: "Feedback", value: this.data.feedback || "0", iconClass: "bi bi-chat-dots-fill fs-1", iconColor: "text-info" },
            ];
        },
    },
};
</script>
