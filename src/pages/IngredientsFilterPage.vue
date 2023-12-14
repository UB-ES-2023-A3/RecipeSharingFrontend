<template>
  <div class="mainContainer">
    <h1>Ingredients List A-Z</h1>

    <!-- Botones de letras -->
    <div class="letrasButtons">
      <a
        v-for="letra in letras"
        :key="letra"
        :href="letra"
        @click.prevent="scrollToSection(letra)"
        :class="{ 'letraNoDisponible': !letraDisponible(letra), 'letraSeleccionada': letra === letraSeleccionada }"
      >
        {{ letra }}
      </a>
    </div>

    <div v-if="Object.keys(ingredientsData).length">
      <div v-for="(ingredientes, letra) in ingredientsData" :key="letra">
        <div class="IngredientsSection" :id="letra" :class="{ 'resaltado': letra === letraSeleccionada }">
          <div class="tituloSeccion centrado">{{ letra }}</div>
          <div class="ingredientesList">
            <button
              v-for="ingrediente in ingredientes"
              :key="ingrediente"
              @click="handleButtonClick(ingrediente)"
              :class="{ 'botonIngrediente': true, 'seleccionado': selectedIngredients.includes(ingrediente) }"
            >
              {{ ingrediente }}
            </button>
          </div>
        </div>
      </div>
      <div class="floatingContainer" v-if="selectedIngredients.length > 0">
        <h2>Selected Ingredients</h2>
        <div class="selected-ingredients-list">
          <div v-for="selectedIngrediente in selectedIngredients" :key="selectedIngrediente">
            <span class="selected-item">
              <span class="ingredient-text">{{ selectedIngrediente }}</span>
              <span @click="removeIngredient(selectedIngrediente)" class="remove-icon">❌</span>
            </span>
          </div>
        </div>
        <div class="submit-button" @click="submitSelection">Search</div>
      </div>
    </div>
    <div v-else>
      <p>No hay ingredientes disponibles.</p>
    </div>
  </div>
</template>

<script>
import ingredientsData from "@/assets/lists/Ingredients.json";

export default {
  data() {
    return {
      ingredientsData: ingredientsData,
      letras: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
      letraSeleccionada: null,
      selectedIngredients: [], // New array to store selected ingredients
    };
  },
  methods: {
    handleButtonClick(ingrediente) {
      // Toggle the selection state of the clicked ingredient
      const index = this.selectedIngredients.indexOf(ingrediente);
      if (index === -1) {
        // Ingredient not selected, add it to the list
        this.selectedIngredients.push(ingrediente);
      } else {
        // Ingredient selected, remove it from the list
        this.selectedIngredients.splice(index, 1);
      }
    },
    scrollToSection(letra) {
      this.letraSeleccionada = letra;
      const elemento = document.getElementById(letra);
      if (elemento) {
        const offset = 120; // Separación del margen superior
        const posicion = elemento.offsetTop - offset;
        window.scrollTo({ top: posicion, behavior: 'smooth' });
      }
    },
    letraDisponible(letra) {
      return Object.keys(this.ingredientsData).includes(letra);
    },
    submitSelection() {
      // Handle the submission of selected ingredients
      alert('Submitted Ingredients: ' + this.selectedIngredients.join(', '));
    },
    removeIngredient(ingredient) {
      const index = this.selectedIngredients.indexOf(ingredient);
      if (index !== -1) {
        this.selectedIngredients.splice(index, 1);
      }
    },
  },
};
</script>

<style scoped>
body, html {
  margin: 0;
  padding: 0;
}

.mainContainer {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  padding-top: 120px;
  color: black;
  background: white;
}

h1 {
  text-align: center;
  margin-bottom: 20px;
}

.letrasButtons a {
  text-decoration: none;
  color: black;
  background-color: #83d3fc;
  padding: 5px 10px;
  border-radius: 2px;
  cursor: pointer;
  margin: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;
}

.letrasButtons a:hover {
  background-color: #055480;
}

.submit-button {
  text-decoration: none;
  margin: auto;
  color: black;
  background-color: #83d3fc;
  padding: 5px 10px;
  border-radius: 2px;
  cursor: pointer;
  margin: 5px;
  transition: background-color 0.3s ease;
  margin-top: 30px;
  text-align: center;
  margin-bottom: 10px;
}

.submit-button:hover {
  background-color: #055480;
}

.letrasButtons a.letraNoDisponible {
  color: #666;
  cursor: not-allowed;
}

.letrasButtons a.letraSeleccionada {
  background-color: #ff5733;
}

.IngredientsSection {
  transition: background-color 0.3s ease;
  margin-top: 40px;
  justify-content: center;
  margin-right: 200px;
  margin-left: 200px;

}

.IngredientsSection.resaltado {
  background-color: #ffffff;
  margin-right: 20px;
  margin-left: 20px;
  padding: 10px;
  border: 2px solid #83d3fc;
}

.tituloSeccion {
  text-align: center;
  font-size: larger;
  background-color: #83d3fc;
  width: 25%;
  margin: 0 auto; /* Añadido para centrar horizontalmente */
  padding: 5px;
  margin-top: 20px;
}

.ingredientesList {
  display: flex;
  flex-wrap: wrap;
  justify-content: flex-start;
  margin-top: 20px;
  margin-right: 20px;
  margin-left: 20px;
}

.botonIngrediente {
  margin: 5px;
  padding: 10px;
  cursor: pointer;
  background-color: white;
  color: black;
  border-top: 1px solid black;
  border: none;
  border-radius: 0;
  transition: background-color 0.3s ease;
  flex: 0 0 calc(33.33% - 10px);
}

.botonIngrediente:hover {
  background-color: #83d3fc;
}

.botonIngrediente.seleccionado {
  background-color: #ff5733;
  color: white;
}

.floatingContainer {
  position: fixed;
  top: 50%;
  right: 20px;
  transform: translateY(-50%);
  background-color: #fff;
  padding: 20px;
  border: 1px solid #ccc;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  overflow-y: auto;
  max-height: 90%; /* Establecer un máximo del 90% del tamaño de la ventana */
  width: 15%; /* Ancho fijo o puedes usar % para que también sea relativo al tamaño de la ventana */
  transition: max-height 0.3s ease; /* Agregar una transición para una apariencia suave al cambiar el tamaño */
}

.selected-ingredients-list {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.selected-item {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 5px;
}

.ingredient-text {
  flex-grow: 1; /* Para expandirse y ocupar el espacio restante */
  margin-right: 10px; /* Espacio entre el texto y la cruz */
}

.remove-icon {
  cursor: pointer;
  color: #ff5733; /* Color para el icono de cruz */
}


</style>
