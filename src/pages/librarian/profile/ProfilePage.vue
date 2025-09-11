<template>
    <div class="d-flex h-100 overflow-hidden gap-3">
        <!-- ID Card -->
        <div class="rounded shadow-sm bg-light d-flex align-items-start h-100 overflow-hidden w-50" style="max-height: 100%; min-width: 400px">
            <div class="position-relative p-3 w-100" style="height: 30%">
                <!-- ID Overlay -->
                <div class="position-absolute w-100 h-50 start-0 top-0 bg-prime" style="z-index: 0; aspect-ratio: 1/1"></div>
                <!-- Profile Picture -->
                <div class="position-relative m-auto mt-2 mb-4 border border-5 bg-prime rounded-pill overflow-hidden p-1 w-75" style="max-width: 180px; border-color: #0eb55c !important" @mouseenter="hovered = true" @mouseleave="hovered = false">
                    <img class="rounded-pill" :src="preview" style="width: 100%" />

                    <!-- Hidden file input -->
                    <input ref="fileInput" type="file" @change="onfileChange" style="display: none" />

                    <!-- Overlay prompt -->
                    <div :style="hovered ? 'opacity: 1' : 'opacity: 0'" @click="triggerFileInput" class="position-absolute w-100 h-100 d-flex justify-content-center align-items-end top-0 start-0 text-white p-3" style="z-index: 1; background: linear-gradient(to bottom, #00000026, black); cursor: pointer; transition: 0.3s ease">
                        <span class="mb-2" style="font-size: 0.75rem">
                            {{ user?.profile_picture ? "Change Profile" : "Upload Photo" }}
                        </span>
                    </div>
                </div>

                <h4 class="fw-bold mb-1">{{ user.name }}</h4>
                <span class="small text-prime">{{ roleMap(user.role) }}</span>

                <hr />
            </div>
        </div>

        <div class="w-75 bg-light rounded p-3 overflow-auto" style="scrollbar-width: thin">
            <div class="h-auto w-100 d-flex flex-column"></div>
        </div>
    </div>
</template>

<script>
import default_profile from "@/assets/profile_default.png";
import { user } from "@/stores/auth";

export default {
    data() {
        return {
            preview: null,
            photo: null,
            uploadedUrl: null,
            user: user || null,
            hovered: false,

            roleMap: (role) => {
                switch (role) {
                    case "0":
                        return "Super Admin";
                    case "1":
                        return "Admin";
                    case "2":
                        return "Student";

                    default:
                        return "You shouldn't be here!";
                }
            },
        };
    },
    methods: {
        triggerFileInput() {
            this.$refs.fileInput?.click();
        },
        onfileChange(e) {
            const file = e.target.files[0];
            if (!file) return;

            if (this.preview && this.preview.startsWith("blob:")) {
                URL.revokeObjectURL(this.preview);
            }

            this.photo = file;
            this.preview = URL.createObjectURL(file);

            this.upload();
        },

        async upload() {
            if (!this.photo) return;

            const formData = new FormData();
            formData.append("photo", this.photo);
            formData.append("user_id", this.user.id);
            formData.append("role", this.user.role);

            try {
                const res = await this.$api.post("/upload-pfp", formData, {
                    headers: {
                        "Content-Type": "multipart/form-data",
                    },
                });

                this.uploadedUrl = res.data.url;
                this.user.profile_picture = this.uploadedUrl;
                console.log("Upload success:", this.uploadedUrl);
            } catch (err) {
                console.error("Upload failed:", err);
            }
        },
    },
    mounted() {
        if (this.user?.profile_picture) {
            this.preview = this.user.profile_picture;
        } else {
            this.preview = default_profile;
        }
    },
    beforeUnmount() {
        if (this.preview && this.preview.startsWith("blob:")) {
            URL.revokeObjectURL(this.preview);
        }
    },
};
</script>

