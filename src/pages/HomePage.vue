<template>
  <div id="homeMainContainer">
    <div class="button-container">
      <IngredientsDropdown @optionSelected="handleIngredientsQuery" />
      <AllergensDropdown @optionSelected="handleAllergensQuery" />
      <TimePrepDropdown  @optionSelected="handleTimeQuery" />
      <TypesDropdown @optionSelected="handleTypesQuery" />
      <ServingsDropdown @optionSelected="handleServingsQuery" />
      <div class="search-container">
        <input v-model="searchText" :class="{ 'btn': true, 'btn-primary': selectedOption === 'Opción 7', 'btn-secondary': selectedOption !== 'Opción 7' }" class="centered-input" placeholder="Recipe Name">
        <button class="search-button" @click="searchRecipe">
          🔍
        </button>
      </div>
    </div>
    <div v-if="recipesQuery.length > 0">
        <h2 class="section-title">Results of your search</h2>
         <div class="card-container">
          <div
            v-for="(recipe, index) in displayedRecipesQuery"
            :key="index"
            class="card"
            @click="handleCardClick(recipe)"
          >
            <img
              :src="recipe.recipe_image ? recipe.recipe_image : require('@/assets/images/default-image.png')"
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
        <div class="button-view-more-container">
          <button @click="toggleRecipesQueryView" v-if="recipesQuery.length > 6" class="view-more-button">
            {{ showAllRecipesQuery ? "View Less" : "View More" }}
          </button>
        </div>
    </div>

    <h2 class="section-title">Most Recent Recipes</h2>
    <div class="card-container">
      <div
        v-for="(recipe, index) in displayedRecipesDate"
        :key="index"
        class="card"
        @click="handleCardClick(recipe)"
      >
       <img
          :src="recipe.recipe_image ? recipe.recipe_image : require('@/assets/images/default-image.png')"
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
    <div class="button-view-more-container">
      <button @click="toggleRecipesDateView" v-if="recipesByDate.length > 6" class="view-more-button">
        {{ showAllRecipesDate ? "View Less" : "View More" }}
      </button>
    </div>
        <h2 class="section-title">Best Rated Recipes</h2>
    <div class="card-container">
      <div
        v-for="(recipe, index) in displayedRecipesRate"
        :key="index"
        class="card"
        @click="handleCardClick(recipe)"
      >
        <img
          :src="recipe.recipe_image ? recipe.recipe_image : require('@/assets/images/default-image.png')"
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
    <div class="button-view-more-container">
      <button id="viewmore" @click="toggleRecipesRateView" v-if="recipesByDate.length > 6" class="view-more-button">
        {{ showAllRecipesRate ? "View Less" : "View More" }}
      </button>
    </div>
    <div v-if="logged" class="homeFloatingButton" @click="redirectToRecipePage">
        <i class="fas fa-plus"></i>
        <span class="text">Upload new recipe</span>
    </div>
  </div>
</template>

<script>
import axios from 'axios';
import IngredientsDropdown from "@/components/AppDropdownIngredients.vue";
import AllergensDropdown from "@/components/AppDropdownAllergens.vue";
import TimePrepDropdown from "@/components/AppDropdowntime.vue";
import TypesDropdown from "@/components/AppDropdownTypes.vue";
import ServingsDropdown from "@/components/AppDropdownServings.vue";
export const URL_BACKEND = process.env.VUE_APP_URL_BACKEND




export default {
  components: {
    IngredientsDropdown, AllergensDropdown,TimePrepDropdown, TypesDropdown, ServingsDropdown
  },
  props: {
        logged: Boolean,
        username: String,
        email: String,
        password: String,
    },
  data() {
    return {
      dropdownOptions: ['Opción 1', 'Opción 2', 'Opción 3', 'Opción 4', 'Opción 5'],
      selectedOption: null,
      searchText: "",
      recipesByDate: [],
      recipesByRate: [],
      recipesQuery:[],
      showAllRecipesDate: false,
      showAllRecipesRate: false,
      showAllRecipesQuery: false,


    };
  },
  computed: {
    // Filtrar las recetas que se mostrarán en base al estado showAllRecipes
    displayedRecipesDate() {
      return this.showAllRecipesDate
        ? this.recipesByDate
        : this.recipesByDate.slice(0, 6); // Muestra solo las dos primeras filas
    },
    displayedRecipesRate() {
      return this.showAllRecipesRate
        ? this.recipesByRate
        : this.recipesByRate.slice(0, 6); // Muestra solo las dos primeras filas
    },
    displayedRecipesQuery() {
      return this.showAllRecipesQuery
        ? this.recipesQuery
        : this.recipesQuery.slice(0, 6); // Muestra solo las dos primeras filas
    },
  },
  methods: {
    async searchRecipe() {
      try {
            let endpoint = URL_BACKEND + '/recipes/filters/';
            endpoint += `title=${this.searchText}`
            const response = await axios.get(endpoint);
            console.log(response)
            if (response.status === 200) {
                const recipes = response.data.recipes;
                this.recipesQuery = recipes
                if(recipes.length == 0){
                    alert('No matching recipes were found')
                    this.refreshPage();
                }
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
    async getRecipesByRate() {
        try {
            const response = await axios.get(URL_BACKEND + "/recipes/filters/rate/");
            if (response.status === 200) {
                const recipes = response.data;
                // Puedes manejar las recetas de 'rate' de manera específica aquí
                this.recipesByRate = recipes;
                console.log(response.data);
            }
        } catch (error) {
            console.error("Error fetching recipes by rate:", error);
        }
    },
      async getRecipesByRecent() {
        try {
            const response = await axios.get(URL_BACKEND + "/recipes/filters/recent/");
            if (response.status === 200) {
                const recipes = response.data;
                // Puedes manejar las recetas de 'recent' de manera específica aquí
                this.recipesByDate = recipes;
                console.log(response.data);
            }
        } catch (error) {
            console.error("Error fetching recent recipes:", error);
        }
    },
    toggleRecipesDateView() {
      this.showAllRecipesDate = !this.showAllRecipesDate;
    },
    toggleRecipesRateView() {
      this.showAllRecipesRate = !this.showAllRecipesRate;
    },
    toggleRecipesQueryView() {
      this.showAllRecipesQuery = !this.showAllRecipesQuery;
    },
    redirectToRecipePage() {
            this.$router.push('/addRecipe');
    },
    async handleIngredientsQuery(optionSelected) {
       try {
            let endpoint = URL_BACKEND + '/recipes/filters/';
            endpoint += `ingredients=${optionSelected}`
            const response = await axios.get(endpoint);
            console.log(response)
            if (response.status === 200) {
                const recipes = response.data.recipes;
                this.recipesQuery = recipes
                if(recipes.length == 0){
                    alert('No matching recipes were found')
                    this.refreshPage();
                }
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
    async handleTypesQuery(optionSelected) {
       try {
            let endpoint = URL_BACKEND + '/recipes/filters/';
            endpoint += `recipe_type=${optionSelected}`
            const response = await axios.get(endpoint);
            console.log(response)
            if (response.status === 200) {
                const recipes = response.data.recipes;
                this.recipesQuery = recipes
                if(recipes.length == 0){
                    alert('No matching recipes were found')
                    this.refreshPage();
                }
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
    async handleAllergensQuery(optionSelected) {
       try {
            let endpoint = URL_BACKEND + '/recipes/filters/';
            endpoint += `allergens=${optionSelected}`
            const response = await axios.get(endpoint);
            console.log(response)
            if (response.status === 200) {
                const recipes = response.data.recipes;
                this.recipesQuery = recipes
                if(recipes.length == 0){
                    alert('No matching recipes were found')
                    this.refreshPage();
                }
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
    async handleTimeQuery(optionSelected) {
       try {
            let endpoint = URL_BACKEND + '/recipes/filters/';
            endpoint += `preparation_time=${optionSelected}`
            const response = await axios.get(endpoint);
            console.log(response)
            if (response.status === 200) {
                const recipes = response.data.recipes;
                this.recipesQuery = recipes
                if(recipes.length == 0){
                    alert('No matching recipes were found')
                    this.refreshPage();
                }
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
    async handleServingsQuery(optionSelected) {
       try {
            let endpoint = URL_BACKEND + '/recipes/filters/';
            endpoint += `servings=${optionSelected}`
            const response = await axios.get(endpoint);
            console.log(response)
            if (response.status === 200) {
                const recipes = response.data.recipes;
                this.recipesQuery = recipes
                if(recipes.length == 0){
                    alert('No matching recipes were found')
                    this.refreshPage();
                }
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
    handleCardClick(recipe) {
      if(this.logged){
          this.$router.push(`/recipes/${recipe.id}/`);
      }
      else{
          alert("Log in to see the recipes")
          this.$router.push('/loginRegister');
      }

    },
  },
  created(){
      this.getRecipesByRate();
      this.getRecipesByRecent();
  }
};
</script>

<style scoped>
#homeMainContainer {
  width: 100%;
  height: 100vh;
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  flex-direction: column; /* Alineación vertical */
}

.button-container {
  display: flex;
  justify-content: space-around;
  align-items: flex-start;
  height: 100%;
  max-height: 40px;
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
  height: 100%;
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

.section-title {
    font-size: 24px;
    color: #333;
    margin-bottom: 25px;
    text-align: center;
    margin-top: 42px;
    position: relative;
    background-color:  #83d3fc;
    margin-left: 20px;
    margin-right: 20px;
}


.card-container {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  margin-left: 20px;
  margin-right: 20px;

}

.card {
  width: calc(33.33% - 16px);
  margin-bottom: 10px;
  box-sizing: border-box;
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

.view-more-button {
  background-color: #83d3fc;
  color: black;
  border: none;
  padding: 5px;
  cursor: pointer;
  font-size: 12px ;
  transition: background-color 0.3s ease;
  height: 100%;
  margin-bottom: 20px;

}

.view-more-button:hover {
  background-color: #6db8f8;
}

.button-view-more-container {
  display: flex;
  justify-content: center;
  height: 30px;
  align-items: center;
  margin-top:0;
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

.homeFloatingButton {
    position: fixed;
    bottom: 5%;
    right: 5%;
    background-color: #83d3fc;
    color: white;
    border: none;
    border-radius: 50%;
    width: 50px;
    height: 50px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
    transition: all 0.3s;
}

.homeFloatingButton i {
    font-size: 24px;
}

.homeFloatingButton .text {
    display: none;
    opacity: 0;
    font-size: 14px;
    transition: opacity 0.3s, font-size 0.3s;
}

.homeFloatingButton:hover {
    width: 10%;
    border-radius: 5px; /* Cambiar el borde para que sea más rectangular */
}

.homeFloatingButton:hover i {
    display: none;
    font-size: 0;
}

.homeFloatingButton:hover .text {
    display: inline;
    opacity: 1;
    font-size: 14px;
    transition: opacity 0.3s, font-size 0.3s;
}

hr {
    border-top: 1px solid #83d3fc;
    border-bottom: 1px solid #83d3fc;
    margin-left: 2%;
    margin-right: 2%;
    margin-bottom: 2.5%;
}


</style>