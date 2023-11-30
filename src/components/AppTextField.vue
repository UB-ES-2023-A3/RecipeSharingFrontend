<template>
    <div>
        <input
                v-model="message"
                @blur="saveMessage"
                @keyup.enter="saveMessage"
                @focus="clearDefaultMessage"
                ref="messageInput"
                :style="inputStyle"
                @input="updateTextFieldValue"
        >
    </div>
</template>

<script>

export default {
    name: "AppTextField.vue",
    props: {
        defaultMessage: String,
    },
    data() {
        return {
            message: this.defaultMessage,
            isSaved: false,
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
                marginBottom: "10px"
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
                this.message = "";
                this.clearedOnce = true;
            }
        },
        updateTextFieldValue() {
            this.$emit('update:textValue', this.message);
        },
    },
};

</script>