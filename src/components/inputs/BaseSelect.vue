<template>
    <div class="mb-3">
        <label v-if="label" class="form-label" :for="id">
            {{ label }}
            <span v-if="touched && error" class="text-danger"> {{ error }}</span>
        </label>

        <select
            :id="id"
            class="form-select"
            :required="r"
            :class="{
                'is-invalid': touched && error,
                'is-valid': touched && !error,
            }"
            v-model="inputValue"
            @blur="touched = true">
            <option v-if="placeholder" disabled value="">{{ placeholder }}</option>
            <option v-for="option in options" :key="option.value" :value="option.value">
                {{ option.label }}
            </option>
        </select>
    </div>
</template>

<script>
const validators = {
    required: (value) => (!value ? `is required.` : ""),
};

export default {
    name: "BaseSelect",
    props: {
        modelValue: [String, Number],
        label: String,
        placeholder: String,
        r: Boolean,
        options: {
            type: Array,
            required: true,
            default: () => [], // [{ value: '1', label: 'Option 1' }]
        },
        rules: { type: Array, default: () => [] }, // ['required']
    },
    data() {
        return { touched: false };
    },
    computed: {
        id() {
            return this.label ? this.label.toLowerCase().replace(/\s+/g, "-") : "";
        },
        inputValue: {
            get() {
                return this.modelValue;
            },
            set(val) {
                this.$emit("update:modelValue", val);
            },
        },
        error() {
            for (let rule of this.rules) {
                const err = validators[rule]?.(this.inputValue);
                if (err) return err;
            }
            return "";
        },
    },
};
</script>

