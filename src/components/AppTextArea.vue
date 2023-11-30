<!-- TextArea.vue -->
<template>
  <div>
    <textarea
      v-model="message"
      @blur="saveMessage"
      @keyup.enter="saveMessage"
      @focus="clearDefaultMessage"
      ref="messageInput"
      :style="inputStyle"
      @input="adjustTextAreaHeight"
    ></textarea>
  </div>
</template>

<script>

export default {
  props: {
    defaultMessage: String,
  },
  data() {
    return {
      message: this.defaultMessage,
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
        backgroundColor: "#FCE4A4",
      };
    },
  },
  methods: {
    saveMessage() {
      this.$emit('update:textValue', this.message);
    },
    clearDefaultMessage() {
      this.message = "";
    },
    adjustTextAreaHeight() {
      const textarea = this.$refs.messageInput;
      textarea.style.height = "auto";
      textarea.style.height = textarea.scrollHeight + "px";
    },
  },
};

</script>