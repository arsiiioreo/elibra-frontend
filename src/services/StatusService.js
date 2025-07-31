import { createApp, h } from "vue";
import StatusPopup from "@/components/Modals/StatusPopup.vue";

export function showStatus({ status, title, message }) {
    return new Promise(() => {
        const container = document.createElement("div");
        document.body.appendChild(container);

        const app = createApp({
            data() {
                return {
                    show: true,
                };
            },
            render() {
                return h(StatusPopup, {
                    show: this.show,
                    status,
                    title,
                    message,
                    hideStatus: () => {
                        setTimeout(() => {
                            this.show = false;
                            app.unmount();
                            container.remove();
                        }, 2500);
                    },
                });
            },
        });

        app.mount(container);
    });
}

