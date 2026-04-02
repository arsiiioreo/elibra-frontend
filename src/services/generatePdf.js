import { postRequest } from "@/stores/requestService";
import { hideLoading, showLoading } from "./LoadingService";

export const generatePdf = async ({ params = null, payload = {} }) => {
	showLoading({ message: "Generating report..." });
	const res = await postRequest(params, payload, {
		responseType: "blob",
	});

	const pdfBlob = new Blob([res.data], { type: "application/pdf" });
	const url = URL.createObjectURL(pdfBlob);
	window.open(url, "_blank");
	hideLoading();
};
