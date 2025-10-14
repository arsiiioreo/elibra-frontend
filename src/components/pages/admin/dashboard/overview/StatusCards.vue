<template>
    <div class="row">
        <div class="col-md-3 mb-4" v-for="(card, index) in cards" :key="index">
            <div class="card shadow-sm border h-100">
                <div class="card-body d-flex flex-column justify-content-between">
                    <h6 class="text-capitalize mb-3">{{ card.title }}</h6>
                    <div class="hstack w-100 gap-3 justify-content-between">
                        <div class="me-3" :style="{ color: card.iconColor || '#0eb55c' }">
                            <i :class="card.iconClass"></i>
                        </div>
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
                { title: "Users", value: this.data.users, iconClass: "bi bi-people-fill fs-1", iconColor: "blue" },
                { title: "Orders", value: this.data.orders, iconClass: "bi bi-cart-fill fs-1", iconColor: "green" },
                { title: "Revenue", value: this.data.revenue, iconClass: "bi bi-currency-dollar fs-1", iconColor: "" },
                { title: "Feedback", value: this.data.feedback, iconClass: "bi bi-chat-dots-fill fs-1", iconColor: "lightblue" },
            ];
        },
    },
};
</script>
