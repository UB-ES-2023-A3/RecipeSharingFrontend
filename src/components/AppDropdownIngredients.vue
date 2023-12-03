<template>
  <div class="dropdown">
    <button class="dropdown-button" @mouseenter="openDropdown" @mouseleave="closeDropdown">
        <span class="button-text">Ingredients</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          stroke="currentColor"
          stroke-linecap="round"
          stroke-linejoin="round"
          stroke-width="2"
          viewBox="0 0 24 24"
          class="dropdown-icon"
        >
          <path d="M19 9l-7 7-7-7"></path>
        </svg>
    </button>
    <div v-if="isOpen" class="options-container" @mouseenter="openDropdown" @mouseleave="closeDropdown">
      <div class="option" @click="selectOption1">Meat</div>
      <div class="option" @click="selectOption2">Pasta</div>
      <div class="option" @click="selectOption3">More Options</div>
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
    openDropdown() {
      this.isOpen = true;
    },
    closeDropdown() {
      this.isOpen = false;
    },
    selectOption1() {
      this.selectedOption = 'Opción 1';
      this.isOpen = false;
      this.$emit('select', 'Opción 1');
    },
    selectOption2() {
      this.selectedOption = 'Opción 2';
      this.isOpen = false;
      this.$emit('select', 'Opción 2');
    },
    selectOption3() {
      this.selectedOption = 'Opción 3';
      this.isOpen = false;
      this.$emit('select', 'Opción 3');
    },
    // Agrega más métodos según sea necesario para otras opciones
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
}
.option {
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


.option:hover {
  background-color: #83d3fc;
}

.dropdown-button {
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

.dropdown-button:hover {
  background-color: #2980b9;
}

.button-text {
  margin-right: 5px; /* Espacio entre el texto y el ícono */
}

.dropdown-icon {
  width: 1em; /* Ajusta el tamaño del ícono */
  height: 1em;
  vertical-align: middle; /* Alinea verticalmente con el texto del botón */
  margin-left: 5px; /* Ajusta el margen izquierdo según sea necesario */
  color: #333; /* Cambia el color según tus preferencias */
}
</style>
