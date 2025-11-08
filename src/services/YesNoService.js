//YesNoService.js
import Swal from "sweetalert2";
export const confirm = async ({ title, message }) => {
  return Swal.fire({ title: title, text: message, icon: "warning", showCancelButton: true, confirmButtonText: "Yes", cancelButtonText: "No" }).then((result) => {
    return result.isConfirmed;
  });
};
