<template>
  <div :class="['filterContainer', { 'filterContainerDark': hasSelectedOptions }]">
    <div class="titleFilterContainer">
      <h2>{{ label }}</h2>
    </div>
    <div class="dropdownContainer">
      <select @change="addSelectedOption" class="full-width-dropdown" v-model="localSelectedValue">
        <optgroup v-for="group in options" :label="group.groupName" :key="group.groupName">
          <option v-for="option in group.options" :value="option" :key="option">{{ option }}</option>
        </optgroup>
      </select>
    </div>
    <div class="selected-values">
      <h2 class="selected-ingredients-title">{{ groupTitle }}</h2>
      <button class="selected-value" v-for="(selected, index) in selectedOptions" :key="index"
              @click="removeSelectedOption(index)">
        {{ selected }} <span class="remove-button">✖</span>
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    options: Array,
    selectedValue: Array,
    label: String,
    groupTitle: String,
    choose: Boolean,
    reset: Boolean,
  },
  data() {
    return {
      localSelectedValue: this.selectedValue,
      selectedOptions: [],
    };
  },
  computed: {
    hasSelectedOptions() {
      return this.selectedOptions && this.selectedOptions.length > 0;
    },
  },
  methods: {
    addSelectedOption() {
      if (this.choose == false) {
        this.selectedOptions = [];
      }
      if (!this.selectedOptions.includes(this.localSelectedValue)) {
        this.selectedOptions.push(this.localSelectedValue);
        this.$emit('update:selectedValue', this.selectedOptions);
      }
    },
    removeSelectedOption(index) {
      this.selectedOptions.splice(index, 1);
      this.localSelectedValue = '';
      this.$emit('update:selectedValue', this.selectedOptions);
    },
  },
  watch: {
    reset(newVal) {
      if (newVal == false) {
        this.localSelectedValue = '';
        this.selectedOptions = [];
        this.$emit('update:selectedValue', this.selectedOptions);
      }
    },
  },
};
</script>

<style scoped>
.filterContainer {
  width: 10%;
  height: 10%;
  margin-top: 1%;
  margin-bottom: 1%;
  text-align: center;
  background-color: #ffa500;
  border: 1px solid #b69b70;
  border-radius: 10px;
  padding: 1%;
}

.filterContainerDark {
  background-color: #ec8c2c;
}

.remove-button {
  cursor: pointer;
}

.selected-ingredients-title {
  font-size: 16px;
  margin-bottom: 2px;
}

.full-width-dropdown {
  margin-top: 10px;
  width: 100%;
  resize: vertical;
}
</style>
