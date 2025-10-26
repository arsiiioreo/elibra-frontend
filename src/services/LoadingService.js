// import { createApp, h, ref } from "vue";
// import LoadingModal from "@/components/Modals/LoadingModal.vue";

// let app = null;
// let container = null;
// let visible = ref(false);
// let messageRef = ref("Loading, please wait...");

// export function showLoading({ message = "Loading, please wait..." } = {}) {
//     if (app) return; // Prevent double mount

//     container = document.createElement("div");
//     document.body.appendChild(container);

//     visible.value = true;
//     messageRef.value = message;

//     app = createApp({
//         setup() {
//             return () =>
//                 h(LoadingModal, {
//                     show: visible.value,
//                     message: messageRef.value,
//                 });
//         },
//     });

//     app.mount(container);
// }

// export function hideLoading() {
//     if (!app) return;

//     visible.value = false;

//     app.unmount();
//     container.remove();
//     app = null;
//     container = null;
//     // setTimeout(() => {
//     //     if (app) {
//     //     }
//     // }, 300); // Allow transition time
// }
import swal from "sweetalert2";

export const showLoading = ({ message = "Loading, please wait..." }) => {
    swal.fire({
        html: `
            <img src="/spinner.gif" alt="loading" width="100" />
            <h2 class="swal2-title" id="swal2-title" style="display: block;">${message}</h2>
            <div class="swal2-html-container" id="swal2-html-container" style="display: block;">Please don't close or refresh the page.</div>
        `,
        width: 500,
        showConfirmButton: false,
        allowOutsideClick: false,
        allowEscapeKey: false,
        backdrop: true,
    });
};

export const hideLoading = () => {
    swal.close();
};
