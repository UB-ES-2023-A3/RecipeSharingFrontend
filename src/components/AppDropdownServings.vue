<template>
  <div class="servings-dropdown">
    <button class="servings-dropdown-button" @mouseenter="openServingsDropdown" @mouseleave="closeServingsDropdown">
        <span class="servings-button-text">Servings</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="servings-dropdown-icon"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
    </button>
    <div v-if="isOpen" class="servings-options-container" @mouseenter="openServingsDropdown" @mouseleave="closeServingsDropdown">
      <div class="servings-option" @click="selectServingsOption1">Meat</div>
      <div class="servings-option" @click="selectServingsOption2">Pasta</div>
      <div class="servings-option" @click="selectServingsOption3">More Options</div>
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
    openServingsDropdown() {
      this.isOpen = true;
    },
    closeServingsDropdown() {
      this.isOpen = false;
    },
    selectServingsOption1() {
      this.selectedOption = 'Opción 1';
      this.isOpen = false;
      this.$emit('select', 'Opción 1');
    },
    selectServingsOption2() {
      this.selectedOption = 'Opción 2';
      this.isOpen = false;
      this.$emit('select', 'Opción 2');
    },
    selectServingsOption3() {
      this.selectedOption = 'Opción 3';
      this.isOpen = false;
      this.$emit('select', 'Opción 3');
    },
    // Agrega más métodos según sea necesario para otras opciones
  },
};
</script>

<style scoped>
.servings-dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
}
.servings-option {
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

.servings-option:hover {
  background-color: #83d3fc;
}

.servings-dropdown-button {
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
}

.servings-dropdown-button:hover {
  background-color: #2980b9;
}

.servings-button-text {
  margin-right: 5px; /* Espacio entre el texto y el ícono */
}

.servings-dropdown-icon {
  width: 1em; /* Ajusta el tamaño del ícono */
  height: 1em;
  vertical-align: middle; /* Alinea verticalmente con el texto del botón */
  margin-left: 5px; /* Ajusta el margen izquierdo según sea necesario */
  color: #333; /* Cambia el color según tus preferencias */
}
</style>
