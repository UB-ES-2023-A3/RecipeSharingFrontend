<template>
  <div id="homeMainContainer">
    <div class="button-container">
      <IngredientsDropdown></IngredientsDropdown>
      <AllergensDropdown></AllergensDropdown>
      <TimePrepDropdown></TimePrepDropdown>
      <TypesDropdown></TypesDropdown>
      <ServingsDropdown></ServingsDropdown>
      <div class="search-container">
        <input v-model="searchText" :class="{ 'btn': true, 'btn-primary': selectedOption === 'Opción 7', 'btn-secondary': selectedOption !== 'Opción 7' }" class="centered-input" placeholder="Recipe Name">
        <button class="search-button" @click="searchRecipe">
          🔍
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import IngredientsDropdown from "@/components/AppDropdownIngredients.vue";
import AllergensDropdown from "@/components/AppDropdownAllergens.vue";
import TimePrepDropdown from "@/components/AppDropdowntime.vue";
import TypesDropdown from "@/components/AppDropdownTypes.vue";
import ServingsDropdown from "@/components/AppDropdownServings.vue";




export default {
  components: {
    IngredientsDropdown, AllergensDropdown,TimePrepDropdown, TypesDropdown, ServingsDropdown
  },
  data() {
    return {
      dropdownOptions: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5'],
      selectedOption: null,
      searchText: "",
    };
  },
  methods: {
    selectOption(option) {
      this.selectedOption = option;
      alert("Prueba seleccionada: " + option);
    },
    searchRecipe() {
      alert("Buscar receta con texto: " + this.searchText);
    },
  },
};
</script>

<style scoped>
#homeMainContainer {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

.button-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  height: 100%;
  max-height: 400px;
  margin-top: 50px;
  background-color: white;
  margin-left: 20px;
  margin-right: 20px;
}

button {
  height: 10%;
  width: 10%;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #83d3fc;
  border-right: 3px solid white;
  margin-bottom: 0;
}

button:hover {
  background-color: #f6f5f7;
}

.search-container {
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: #83d3fc;
  height: 10%;
  width: 250%;
}

input {
  height: 50%;
  width: 80%;
  border: none;
  padding: 0 10px;
  box-sizing: border-box;
  vertical-align: middle;
  margin-bottom: 0;
  margin-left: 10px;
  outline: none; /* Evitar el contorno al hacer clic */

}

.centered-input {
  text-align: left;
}

.search-button {
  height: 50%;
  border: 1px solid white;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #83d3fc;
  margin-right: 10px;
}

.search-button:hover {
  background-color: #f6f5f7;
}
</style>