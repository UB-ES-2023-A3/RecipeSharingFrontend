<!-- TextArea.vue -->
<template>
    <div>
<textarea
        v-model="message"
        @blur="saveMessage"
        @focus="clearDefaultMessage"
        @input="adjustTextAreaHeight"
        :style="inputStyle"
        ref="messageInput"
></textarea>
    </div>
</template>

<script>

export default {
    name: "AppTextArea.vue",
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
                color: "black",
                padding: "10px",
                border: "1px solid #ccc",
                width: "100%",
                minWidth: "300px",
                display: "block",
                margin: "0 auto",
                marginTop: "10px",
                backgroundColor: this.isSaved ? "#2980b9" : "#83d3fc",
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
        adjustTextAreaHeight() {
            const textarea = this.$refs.messageInput;
            textarea.style.height = "auto";
            textarea.style.height = textarea.scrollHeight + "px";
            this.$emit('update:textValue', this.message);
        },
        preventEnter(event) {
            if (event.key === 'Enter') {
                event.preventDefault();

                const textarea = this.$refs.messageInput;
                const cursorPosition = textarea.selectionStart;
                const valueBeforeCursor = this.message.substring(0, cursorPosition);
                const valueAfterCursor = this.message.substring(cursorPosition);

                this.message = `${valueBeforeCursor}\n${valueAfterCursor}`;

                // Ajustar la altura del textarea
                this.adjustTextAreaHeight();

                this.$nextTick(() => {
                    textarea.setSelectionRange(cursorPosition + 1, cursorPosition + 1);
                });
            }
        },
    },
};

</script>