<template>
    <div class="container">
        <!-- Dropdown select to choose options -->
        <select @change="addSelectedOption" class="full-width-dropdown" v-model="localSelectedValue">
            <option value="" disabled>Select {{ label }}</option>
            <optgroup v-for="group in options" :label="group.groupName" :key="group.groupName">
                <option v-for="option in group.options" :value="option" :key="option">{{ option }}</option>
            </optgroup>
        </select>

        <!-- Display selected values and allow removal -->
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
        options: Array, // List of options grouped by category
        selectedValue: Array, // Change the prop type to Array for multiple selections
        label: String, // Label for the select dropdown
        groupTitle: String, // Title for the selected group
        choose: Boolean
    },
    data() {
        return {
            localSelectedValue: this.selectedValue, // Use a local value to bind to the select
            selectedOptions: [], // List to store selected items
        };
    },
    methods: {
        addSelectedOption() {
            const selectedValue = this.localSelectedValue;
            // Check if the selected value is valid and not already selected
            if (this.choose == false) {
                this.selectedOptions = [];
            }
            if (selectedValue && !this.selectedOptions.includes(selectedValue)) {
                this.selectedOptions.push(selectedValue);
                this.$emit('update:selectedValue', this.selectedOptions);
            }
        },
        removeSelectedOption(index) {
            this.selectedOptions.splice(index, 1);
        },
    },
};

</script>

<style scoped>

.container {
    background-color: #FCE4A4;
    margin: 2px 5px;
    padding: 10px;
    border-radius: 10px;
}

.remove-button {
    cursor: pointer;
    margin-left: 10px;
}

.selected-ingredients-title {
    font-size: 16px;
    margin-bottom: 2px;
}

</style>