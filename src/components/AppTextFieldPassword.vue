<template>
    <div>
        <div class="text-field-container">
            <input
                    v-model="message"
                    @blur="saveMessage"
                    @focus="clearDefaultMessage"
                    ref="messageInput"
                    @input="updateTextFieldValue"
                    :style="inputStyle"
                    :type="isPasswordVisible ? 'text' : 'password'"
                    @keydown="handleEnterKey"
            >
        </div>
        <button @click.prevent="togglePasswordVisibility"
                :class="{ 'password-toggle-button-visible': isPasswordVisible, 'password-toggle-button-hidden': !isPasswordVisible }">
            <i :class="isPasswordVisible ? 'far fa-eye' : 'far fa-eye-slash'"></i>
        </button>
    </div>
</template>

<script>

export default {
    name: "AppTextFieldPassword.vue",
    props: {
        defaultMessage: String,
    },
    data() {
        return {
            message: this.defaultMessage,
            isSaved: false,
            isPasswordVisible: false,
            clearedOnce: false,
        };
    },
    computed: {
        inputStyle() {
            return {
                backgroundColor: this.isSaved ? "#eea94d" : "#FCE4A4",
                color: this.isSaved ? "white" : "black",
                padding: "10px",
                border: "1px solid #ccc",
                borderRadius: "5px",
                width: "100%",
                minWidth: "300px",
                display: "block",
            };
        },
    },
    methods: {
        saveMessage() {
            this.isSaved = true;
            this.$refs.messageInput.blur();
        },
        clearDefaultMessage() {
            if (!this.clearedOnce) {
                this.clearedOnce = true;
                this.message = '';
            }
        },
        togglePasswordVisibility() {
            this.isPasswordVisible = !this.isPasswordVisible;
        },
        updateTextFieldValue() {
            this.$emit('update:textValue', this.message);
        },
        handleEnterKey(event) {
            if (event.key === 'Enter') {
                event.preventDefault(); // Evita el comportamiento predeterminado (envío del formulario) al presionar Enter
            }
        },
    },
};
</script>

<style>

.text-field-container {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 5px;
}

.password-toggle-button-visible {
  background-color: #eea94d; /* Cambio de color cuando la contraseña es visible */
}
.password-toggle-button-hidden {
  background-color: #FCE4A4; /* Cambio de color cuando la contraseña está oculta */
}

button {
    margin-bottom: 5px;
}
</style>