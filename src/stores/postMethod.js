import api from "@/plugins/axios";
import { hideLoading, showLoading } from "@/services/LoadingService";
import { showStatus } from "@/services/StatusService";

export const modifyCampus = async (formData, action) => {
    showLoading({ message: action === "edit" ? "Updating campus information, please wait..." : "Adding campus to database..." });
    try {
        let res;

        switch (action) {
            case "add":
                res = await api.post("/addCampus", formData);
                break;
            case "edit":
                res = await api.post("updateCampus", formData);
                break;
            default:
                break;
        }

        if (res) {
            showStatus({ status: res.data.status, title: res.data.status.charAt(0).toUpperCase() + res.data.status.slice(1), message: res.data.message });
        }
    } catch (error) {
        showStatus({ status: "error", title: "Error", message: error });
    } finally {
        hideLoading();
    }
};

