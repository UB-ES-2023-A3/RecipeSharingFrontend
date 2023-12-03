<template>
  <div class="prepTime-dropdown">
    <button class="prepTime-dropdown-button" @mouseenter="openPrepTimeDropdown" @mouseleave="closePrepTimeDropdown">
        <span class="prepTime-button-text">Preparation Time</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="prepTime-dropdown-icon"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
    </button>
    <div v-if="isOpen" class="prepTime-options-container" @mouseenter="openPrepTimeDropdown" @mouseleave="closePrepTimeDropdown">
      <div class="prepTime-option" @click="selectPrepTimeOption1">5-30 min</div>
      <div class="prepTime-option" @click="selectPrepTimeOption2">30-1:30 min</div>
      <div class="prepTime-option" @click="selectPrepTimeOption3">+ 1:30 min</div>
      <!-- Agrega más opciones según sea necesario -->
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isOpen: false,
    };
  },
  methods: {
    openPrepTimeDropdown() {
      this.isOpen = true;
    },
    closePrepTimeDropdown() {
      this.isOpen = false;
    },
    selectPrepTimeOption1() {
      this.selectedOption = 'PrepTime Option 1';
      this.isOpen = false;
      this.$emit('select', 'PrepTime Option 1');
    },
    selectPrepTimeOption2() {
      this.selectedOption = 'PrepTime Option 2';
      this.isOpen = false;
      this.$emit('select', 'PrepTime Option 2');
    },
    selectPrepTimeOption3() {
      this.selectedOption = 'PrepTime Option 3';
      this.isOpen = false;
      this.$emit('select', 'PrepTime Option 3');
    },
    // Agrega más métodos según sea necesario para otras opciones
  },
};
</script>

<style scoped>
.prepTime-dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
}
.prepTime-option {
  height: 10%;
  width: 100%;
  border: none;
  cursor: pointer;
  transition: background-color 0s; /* Cambiado a 0s para hacer el hover instantáneo */
  background-color: white;
  margin-bottom: 1px;
  display: flex; /* Hacer que el contenedor sea flexible */
  align-items: center; /* Centrar verticalmente el contenido */
  justify-content: center;
  text-align: center; /* Alineación horizontal del texto */
  font-size: 14px; /* Tamaño de la letra */
}

.prepTime-option:hover {
  background-color: #83d3fc;
}

.prepTime-dropdown-button {
  height: 10%;
  width: 100%;
  border: none;
  cursor: pointer;
  transition: background-color 0.3s ease;
  background-color: #83d3fc;
  border-right: 3px solid white;
  margin-bottom: 0;
  outline: none; /* Evitar el contorno al hacer clic */
  text-align: center; /* Alineación horizontal del texto */
  font-size: 14px; /* Tamaño de la letra */
  white-space: nowrap; /* Evita el salto de línea */

}

.prepTime-dropdown-button:hover {
  background-color: #2980b9;
}

.prepTime-button-text {
  margin-right: 5px; /* Espacio entre el texto y el ícono */
}

.prepTime-dropdown-icon {
  width: 1em; /* Ajusta el tamaño del ícono */
  height: 1em;
  vertical-align: middle; /* Alinea verticalmente con el texto del botón */
  margin-left: 5px; /* Ajusta el margen izquierdo según sea necesario */
  color: #333; /* Cambia el color según tus preferencias */
}
</style>
