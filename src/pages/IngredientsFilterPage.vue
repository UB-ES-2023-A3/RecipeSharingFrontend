<template>
  <div>
    <!-- Verifica si recipesToShow está vacío -->
    <div v-if="recipesToShow.length === 0">
      <div class="mainContainerIngredients">
        <h1 class="title-heading">Ingredients List A-Z</h1>
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
          <p>There is no available ingredients.</p>
        </div>
      </div>
    </div>
    <!-- Si recipesToShow no está vacío, muestra otro contenedor -->
    <div v-else>
        <div class="mainContainerIngredients">
          <div class="nav-container">
            <router-link to="/" class="nav-link">Homepage</router-link>
            <span style="margin-top: 10px"> >> </span>
            <router-link to="/recipe/filters/ingredients" class="nav-link" @click="refreshPage">Ingredients Filter</router-link>
            <span style="margin-top: 10px"> >> </span>
            <router-link to="/recipe/filters/ingredients" class="nav-link">Search Results</router-link>
          </div>
          <h2 class="section-title">{{ selectedIngredients.join(', ') }}</h2>
          <div class="card-container">
            <div
              v-for="(recipe, index) in recipesToShow"
              :key="index"
              class="card"
              @click="handleCardClick(recipe)"
            >
              <img :src="recipe.recipe_image"
                alt="Recipe Image"
                class="card-image"
              />
              <div class="rating-container">
                <span class="date-label">{{recipe.creation_date }}</span>
                <span
                  v-for="star in [1, 2, 3, 4, 5]"
                  :key="star"
                  :class="{ 'filled': star <= recipe.rating_average ,'star' : star > recipe.rating_average }"
                >
                  ★
                </span>
                <span class="rating-label">({{ recipe.rating_amount }})</span>
              </div>
              <h3 class="card-title">{{ recipe.title }}</h3>
            </div>
          </div>
      </div>
    </div>
  </div>
</template>


<script>
import ingredientsData from "@/assets/lists/IngredientsFilter.json";
import axios from "axios";
export const URL_BACKEND = process.env.VUE_APP_URL_BACKEND

export default {
  data() {
    return {
      ingredientsData: ingredientsData,
      letras: "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split(''),
      letraSeleccionada: null,
      selectedIngredients: [], // New array to store selected ingredients
      recipesToShow: [],
    };
  },
  computed: {
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
      this.applyFilters();
    },
    removeIngredient(ingredient) {
      const index = this.selectedIngredients.indexOf(ingredient);
      if (index !== -1) {
        this.selectedIngredients.splice(index, 1);
      }
    },
    async applyFilters() {
        try {
            let endpoint = URL_BACKEND + '/recipes/filters/';
                    if (this.selectedIngredients.length > 1) {
                        for (let i = 0; i < this.selectedIngredients.length; i++) {
                            if (i == 0) {
                                endpoint += `ingredients=${this.selectedIngredients[i]}+`
                            } else if (i == this.selectedIngredients.length - 1) {
                                endpoint += `${this.selectedIngredients[i]}`
                            } else {
                                endpoint += `${this.selectedIngredients[i]}+`
                            }
                        }
                    } else {
                        endpoint += `ingredients=${this.selectedIngredients[0]}`
                    }
            const response = await axios.get(endpoint);
            console.log(response)
            if (response.status === 200) {
                const recipes = response.data.recipes;
                if(recipes.length == 0){
                    alert('No matching recipes were found')
                    this.refreshPage();
                }
                this.recipesToShow = recipes
            }
        } catch (error) {
            if (error.response) {
                // Handle login failure (e.g., display an error message).
                if (error.response.status === 400) {
                    console.error(error.response.data.error);
                } else if (error.response.status === 500) {
                    console.error("An error occurred while registering.");
                } else {
                    // Handle other status codes
                    console.error("Unexpected error");
                }
            } else {
                // Handle other errors.
                console.error("An error occurred while logging in.");
            }
        }
    },
    refreshPage() {
    this.$router.go(0);
    },
    handleCardClick(recipe) {
      this.$router.push(`/recipes/${recipe.id}`);
    },
  },
};
</script>

<style scoped>
.mainContainerIngredients {
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: center;
  color: black;
  margin-top: 0px;
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
.title-heading {
  margin-top: 30px;
  text-align: center;
  margin-bottom: 40px;

}
.section-title {
    font-size: 24px;
    color: #333;
    margin-bottom: 25px;
    text-align: center;
    margin-top: 15px;
    position: relative;
    background-color:  #83d3fc;
    margin-left: 20px;
    margin-right: 20px;
    width: 97%

}


.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;

}

.card {
  min-width: 300px; /* Ancho mínimo de la tarjeta */
  min-height: 250px; /* Ancho mínimo de la tarjeta */
  width: calc(33.33% - 16px);
  margin-bottom: 10px;
  box-sizing: border-box
}

.card-image {
  width: 100%;
  height: auto;
}

.card-title {
  font-size: 18px;
  color: #333;
  padding: 8px;
  text-align: center;
  margin-top: 0;
  border-bottom: solid #83d3fc  2px ;
}

.rating-container {
  display: flex;
  justify-content: flex-end;
  margin-top: 5px;
}

.rating-container span {
  display: inline-block;
}

.rating-label {
  margin-left: 5px; /* Espacio entre las estrellas y la etiqueta */
  margin-top: 5px;
}

.date-label {
  margin-right: auto;
  align-self: flex-start;

}

.star {
  font-size: 18px;
  color: #a19999; /* Color de estrella no rellena */
  margin: 0 2px;
}

.filled {
  color: #f0c30f; /* Color de estrella rellena */
}

.card:hover {
  transform: scale(1.05); /* Escala la tarjeta al 105% en hover */
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.1); /* Sombra en hover */
  transition: transform 0.3s ease, box-shadow 0.3s ease; /* Transición suave */
  background-color: #83d3fc ;
}

.nav-container {
  display: flex;
  justify-content: space-around;
  background-color: #fff; /* Puedes cambiar el color de fondo según tus preferencias */
  padding: 15px;
  margin-top: 20px;

}

.nav-link {
  text-decoration: none;
  padding: 10px;
  background-color: white;
  color: black;
  border-radius: 5px;
  transition: background-color 0.3s ease;
}

.nav-link:hover {
  background-color: #83d3fc ;
}





</style>
