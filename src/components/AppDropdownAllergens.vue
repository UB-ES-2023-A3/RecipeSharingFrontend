<template>
  <div class="allergens-dropdown">
    <button class="allergens-dropdown-button" @mouseenter="openAllergensDropdown" @mouseleave="closeAllergensDropdown">
        <span class="allergens-button-text">Allergens</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="allergens-dropdown-icon"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
    </button>
    <div v-if="isOpen" class="allergens-options-container" @mouseenter="openAllergensDropdown" @mouseleave="closeAllergensDropdown">
      <div class="allergens-option" @click="selectAllergensOption1">Meat</div>
      <div class="allergens-option" @click="selectAllergensOption2">Pasta</div>
      <div class="allergens-option" @click="selectAllergensOption3">More Options</div>
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
    openAllergensDropdown() {
      this.isOpen = true;
    },
    closeAllergensDropdown() {
      this.isOpen = false;
    },
    selectAllergensOption1() {
      this.selectedOption = 'Allergens Option 1';
      this.isOpen = false;
      this.$emit('select', 'Allergens Option 1');
    },
    selectAllergensOption2() {
      this.selectedOption = 'Allergens Option 2';
      this.isOpen = false;
      this.$emit('select', 'Allergens Option 2');
    },
    selectAllergensOption3() {
      this.selectedOption = 'Allergens Option 3';
      this.isOpen = false;
      this.$emit('select', 'Allergens Option 3');
    },
    // Agrega más métodos según sea necesario para otras opciones
  },
};
</script>

<style scoped>
.allergens-dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
}
.allergens-option {
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

.allergens-option:hover {
  background-color: #83d3fc;
}

.allergens-dropdown-button {
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

.allergens-dropdown-button:hover {
  background-color: #2980b9;
}

.allergens-button-text {
  margin-right: 5px; /* Espacio entre el texto y el ícono */
}

.allergens-dropdown-icon {
  width: 1em; /* Ajusta el tamaño del ícono */
  height: 1em;
  vertical-align: middle; /* Alinea verticalmente con el texto del botón */
  margin-left: 5px; /* Ajusta el margen izquierdo según sea necesario */
  color: #333; /* Cambia el color según tus preferencias */
}
</style>
