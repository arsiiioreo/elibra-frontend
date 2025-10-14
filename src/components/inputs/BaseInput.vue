<template>
    <div class="mb-3">
        <label v-if="label" class="form-label" :for="id">
            {{ label }}
            <span v-if="touched && error" class="text-danger"> {{ error }}</span>
        </label>

        <input
            :id="id"
            :type="type"
            :required="r"
            :min="min"
            :max="max"
            :minlength="minlength"
            :maxlength="maxlength"
            :disabled="disabled"
            :readonly="readonly"
            class="form-control"
            :class="{
                'is-invalid': touched && error,
                'is-valid': touched && !error,
            }"
            :placeholder="placeholder"
            v-model="inputValue"
            @blur="touched = true" />
    </div>
</template>

<script>
const validators = {
    required: (value) => (!value ? `is required.` : ""),
    email: (value) => {
        if (!value) return "Email is required.";
        const re = /\S+@\S+\.\S+/;
        return !re.test(value) ? "Invalid email address." : "";
    },
    password: (value) => {
        if (!value) return "Password is required.";
        const re = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}$/;
        return !re.test(value) ? "Minimum eight characters, at least one letter and one number." : "";
    },
};

export default {
    name: "BaseInput",
    props: {
        modelValue: String,
        label: String,
        placeholder: String,
        r: Boolean,
        disabled: Boolean,
        readonly: Boolean,
        min: Number,
        max: Number,
        minlength: Number,
        maxlength: Number,
        type: { type: String, default: "text" },
        rules: { type: Array, default: () => [] },
        form: { type: Object, default: null },
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
                // ✅ Standard validators
                if (validators[rule]) {
                    const err = validators[rule](this.inputValue);
                    if (err) return `${err}`;
                }

                // ✅ Dynamic min validator: "min:6"
                if (rule.startsWith("min:")) {
                    const min = parseInt(rule.split(":")[1]);
                    if (!this.inputValue || this.inputValue.length < min) {
                        return `must be at least ${min} characters`;
                    }
                }

                // ✅ Match validator: "match:password"
                if (rule.startsWith("match:")) {
                    const field = rule.split(":")[1];
                    if (this.form && this.inputValue !== this.form[field]) {
                        return `does not match ${field}`;
                    }
                }
            }
            return "";
        },
    },
};
</script>

