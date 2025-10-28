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
import { postRequest } from "@/stores/requestService";

const photo = ref(null);
const preview = ref(null);
const uploadedUrl = ref(null);
const user = ref(null);

const onFileChange = (e) => {
  photo.value = e.target.files[0];
  preview.value = URL.createObjectURL(photo.value);
};

const uploadPhoto = async () => {
  const formData = new FormData();
  formData.append("photo", photo.value);

  try {
    const response = await postRequest("http://localhost:8000/api/upload-pfp", formData, {
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

<!-- <template>
    <button @click="show = !show">Toggle</button>
    <Transition>
        <p v-if="show">hello</p>
    </Transition>
</template>

<script>
export default {
    data() {
        return {
            show: false,
        };
    },
};
</script>

<style>
/* we will explain what these classes do next! */
.v-enter-active,
.v-leave-active {
    transition: opacity 0.5s ease;
}

.v-enter-from,
.v-leave-to {
    opacity: 0;
}
</style>
 -->
