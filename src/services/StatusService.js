import swal from "sweetalert2";

export const showStatus = ({ status = "info", title = "Info", message = "Loading, please wait..." }) => {
	return swal.fire({
		title: title,
		text: message,
		icon: status,
		showConfirmButton: true,
	});
};
