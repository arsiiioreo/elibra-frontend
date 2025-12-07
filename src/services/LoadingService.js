import swal from "sweetalert2";

export const showLoading = ({ message = "Loading, please wait..." }) => {
	swal.fire({
		html: `
            <img src="/spinner.gif" alt="loading" width="75" />
            <h2 class="swal2-title" id="swal2-title" style="display: block; padding-top: 0px;">${message}</h2>
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
