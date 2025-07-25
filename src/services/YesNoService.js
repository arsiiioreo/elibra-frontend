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
                        this.show = false;
                        resolve(answer);
                        setTimeout(() => {
                            app.unmount();
                            container.remove();
                        }, 300);
                    },
                });
            },
        });

        app.mount(container);
    });
}

