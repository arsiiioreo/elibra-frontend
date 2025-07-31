// services/ConfirmService.js
import { createApp, h } from "vue";
import YesNoModal from "@/components/Modals/YesNoModal.vue";

export function confirm({ title, message }) {
    return new Promise((resolve) => {
        const container = document.createElement("div");
        document.body.appendChild(container);

        const app = createApp({
            data: () => ({
                show: true,
            }),
            render() {
                return h(YesNoModal, {
                    show: this.show,
                    title,
                    message,
                    status: "warning",
                    onAnswer: (answer) => {
                        resolve(answer);
                        this.show = false;
                        app.unmount();
                        container.remove();
                        // setTimeout(() => {
                        // }, 300);
                    },
                });
            },
        });

        app.mount(container);
    });
}

