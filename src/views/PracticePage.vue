<template>
    <div>
        <input type="file" @change="onFileChange" />
        <button @click="uploadPhoto" :disabled="!photo">Upload</button>

        <div v-if="preview">
            <img :src="preview" width="200" />
        </div>

        <div v-if="uploadedUrl">
            <p>Uploaded Successfully:</p>
            <img :src="uploadedUrl" width="200" />
        </div>
    </div>

    <div class="data">
        {{ user }}
    </div>
</template>

<script setup>
import { ref } from "vue";
import axios from "axios";

const photo = ref(null);
const preview = ref(null);
const uploadedUrl = ref(null);
const user = ref(null);

const thisUser = async () => {
    try {
        const res = await axios.get("http://localhost:8000/api/user", {
            headers: {
                Authorization: "Bearer " + localStorage.getItem("token"),
            },
        });

        user.value = res.data;
    } catch (error) {
        console.log("Error", error);
    }
};

thisUser();

const onFileChange = (e) => {
    photo.value = e.target.files[0];
    preview.value = URL.createObjectURL(photo.value);
};

const uploadPhoto = async () => {
    const formData = new FormData();
    formData.append("photo", photo.value);

    try {
        const response = await axios.post("http://localhost:8000/api/upload-photo", formData, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });

        uploadedUrl.value = response.data.url;
    } catch (error) {
        console.error("Upload error:", error);
    }
};
</script>

