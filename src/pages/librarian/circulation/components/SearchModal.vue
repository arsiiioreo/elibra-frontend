<template>
    <div class="modal fade" tabindex="-1" ref="modal">
        <div class="modal-dialog modal-lg">
            <div class="modal-content" style="max-height: 500px">
                <div class="modal-header">
                    <h5 class="modal-title">{{ title }}</h5>
                    <button type="button" class="btn-close" @click="close"></button>
                </div>
                <div class="modal-body">
                    <input type="text" class="form-control mb-3" v-model="query" placeholder="Type to search..." />
                    <ul class="list-group">
                        <li v-for="item in filteredData" :key="item.id" class="list-group-item list-group-item-action" :class="{ active: selected && selected.id === item.id }" @click="selectItem(item)">
                            {{ formatItem(item) }}
                        </li>
                    </ul>
                </div>
                <div class="modal-footer">
                    <button class="btn btn-primary" :disabled="!selected" @click="confirmSelection">Add</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { Modal } from "bootstrap";

export default {
    props: {
        title: String,
        data: Array,
        formatItem: {
            type: Function,
            default: (item) => item.code || item.ebc || "Unknown",
        },
    },
    data() {
        return {
            modal: null,
            query: "",
            selected: null,
        };
    },
    computed: {
        filteredData() {
            if (!this.query) return this.data;
            return this.data.filter((d) => this.formatItem(d).toLowerCase().includes(this.query.toLowerCase()));
        },
    },
    methods: {
        open() {
            this.query = "";
            this.selected = null;
            this.modal = new Modal(this.$refs.modal);
            this.modal.show();
        },
        close() {
            this.modal.hide();
        },
        selectItem(item) {
            this.selected = item;
        },
        confirmSelection() {
            this.$emit("selected", this.selected);
            this.close();
        },
    },
};
</script>

