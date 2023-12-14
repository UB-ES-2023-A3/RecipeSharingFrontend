<template>
  <div class="dropdown" @mouseenter="openDropdown" @mouseleave="closeDropdown">
    <button class="dropdown-button" @click="toggleDropdown">
      <span class="button-text">Preparation Time</span>
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
      <div class="option" @click="selectOption1">15 min</div>
      <div class="option" @click="selectOption2">30 min </div>
      <div class="option" @click="selectOption3">45 min</div>
      <div class="option" @click="selectOption4">60 min</div>
      <div class="option" @click="selectOption5">90 min</div>
      <div class="option" @click="selectOption6">120 min</div>
      <div class="option" @click="selectOption7">180 min</div>
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
    toggleDropdown() {
      this.isOpen = !this.isOpen;
    },
    openDropdown() {
      this.isOpen = true;
    },
    closeDropdown() {
      this.isOpen = false;
    },
    selectOption1() {
      this.$emit('optionSelected', 15);
    },
    selectOption2() {
      this.$emit('optionSelected', 30);
    },
    selectOption3() {
      this.$emit('optionSelected', 45);
    },
    selectOption4() {
       this.$emit('optionSelected', 60);
    },
    selectOption5() {
       this.$emit('optionSelected', 90);
    },
    selectOption6() {
       this.$emit('optionSelected', 120);
    },
    selectOption7() {
       this.$emit('optionSelected', 180);
    },
  },
};
</script>

<style scoped>
.dropdown {
  position: relative;
  display: inline-block;
  width: 100%;
  z-index: 1;
}
.option {
  height: 100%;
  width: 100%;
  border: none;
  cursor: pointer;
  transition: background-color 0s; /* Cambiado a 0s para hacer el hover instantáneo */
  background-color: white;
  margin-bottom:0;
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
  height: 100%;
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
