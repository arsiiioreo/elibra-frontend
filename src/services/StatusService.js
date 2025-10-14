// import { createApp, h } from "vue";
// import StatusPopup from "@/components/modals/StatusPopup.vue";

// export function showStatus({ status, title, message }) {
//     return new Promise(() => {
//         const container = document.createElement("div");
//         document.body.appendChild(container);

//         const app = createApp({
//             data() {
//                 return {
//                     show: true,
//                 };
//             },
//             render() {
//                 return h(StatusPopup, {
//                     show: this.show,
//                     status,
//                     title,
//                     message,
//                 });
//             },
//             mounted() {
//                 setTimeout(() => {
//                     this.show = false;
//                     app.unmount();
//                     container.remove();
//                 }, 3000);
//             },
//         });

//         app.mount(container);
//     });
// }

import swal from "sweetalert2";

export const showStatus = ({ status = "info", title = "Info", message = "Loading, please wait..." }) => {
    swal.fire({
        title: title,
        text: message,
        icon: status,
        showConfirmButton: true,
    });
};
