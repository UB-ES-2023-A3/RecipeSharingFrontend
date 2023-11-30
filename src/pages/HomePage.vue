<template>
    <div id="homeMainContainer">
        <div id="homeTitleSearcherContainer">
            <div class="searchContainer">
                <input class="homeTitleSearcher" type="text" v-model="selectedTitle"
                       placeholder="Search a recipe by its title"
                       @keyup.enter="applyFilters"/>
            </div>
        </div>

        <div id="homeFilterContainer">
            <HomeFilterDropdown
                    class="homeFilterDropdown"
                    :options="ingredientsOptions"
                    v-model="selectedIngredients"
                    label="Ingredients Filter"
                    groupTitle="Selected Ingredients"
                    @update:selectedValue="handleIngredientsUpdate"
                    :choose="true"
                    :reset="showRecipesFilterIngredients"
            />
            <HomeFilterDropdown
                    class="homeFilterDropdown"
                    :options="typesOptions"
                    v-model="selectedTypes"
                    label="Type Filter"
                    groupTitle="Selected Types"
                    @update:selectedValue="handleTypeUpdate"
                    :choose="true"
                    :reset="showRecipesFilterTypes"
            />
            <HomeFilterDropdown
                    class="homeFilterDropdown"
                    :options="allergensOptions"
                    v-model="selectedAllergens"
                    label="Allergens Filter"
                    groupTitle="Selected Allergens"
                    @update:selectedValue="handleAllergensUpdate"
                    :choose="true"
                    :reset="showRecipesFilterAllergens"
            />
            <HomeFilterDropdown
                    class="homeFilterDropdown"
                    :options="preparationTimeOptions"
                    v-model="selectedPreparationTime"
                    label="Preparation Time Filter"
                    groupTitle="Selected Preparation Time"
                    @update:selectedValue="handlePrepTimeUpdate"
                    :choose="true"
                    :reset="showRecipesFilterPrepTime"
            />
            <HomeFilterDropdown
                    class="homeFilterDropdown"
                    :options="[{ 'groupName': 'Servings', 'options': [1,2,3,4,5,6,7,8,9,10] }]"
                    v-model="selectedServings"
                    label="Servings Filter"
                    groupTitle="Selected Serving"
                    @update:selectedValue="handleServingUpdate"
                    :choose="true"
                    :reset="showRecipesFilterServings"
            />
        </div>

        <div id="homeFilterButtonsContainer">
            <button type="submit" @click="resetFlags">Reset filters</button>
            <button type="submit" @click="applyFilters">Apply filters</button>
        </div>

        <div v-if="showRecipesFilter">
            <div id="homeSectionTitleContainer">
                <h1> Searched Recipes </h1>
            </div>
            <AppCardCarousel :recipes="recipesByFilter" :visibleRecipes="8"
                             :logged="logged" :username="username"
                             v-if="recipesByFilter.length > 0"></AppCardCarousel>
            <div id="homeSectionFilterError">
                <p v-if="recipesByFilter.length === 0" class="homeSectionFilterError">No recipes found by those filters.</p>
            </div>
        </div>

        <div id="homeSectionContainer">
            <div id="homeSectionTitleContainer">
                <h1> Most Recent Recipes </h1>
            </div>
            <div id="homeSectionCarrouselContainer">
                <AppCardCarousel :type="recent" :recipes="recipesByDate" :visibleRecipes="8" :logged="logged"
                                 :username="username" v-if="recipesByDate.length > 0"></AppCardCarousel>
            </div>
            <div id="homeSectionSeparatorContainer">
                <hr>
            </div>
        </div>

        <div id="homeSectionContainer">
            <div id="homeSectionTitleContainer">
                <h1> Most Liked Recipes </h1>
            </div>
            <div id="homeSectionCarrouselContainer">
                <AppCardCarousel :type="rate" :recipes="recipesByRate" :visibleRecipes="8" :logged="logged"
                                 :username="username" v-if="recipesByRate.length > 0"></AppCardCarousel>
            </div>
            <div id="homeSectionSeparatorContainer">
                <hr>
            </div>
        </div>

        <div v-if="logged" class="homeFloatingButton" @click="redirectToRecipePage">
            <i class="fas fa-plus"></i>
            <span class="text">Upload new recipe</span>
        </div>

    </div>
</template>

<script>
import axios from 'axios';
import AppCardCarousel from '@/components/AppCardCarousel.vue';
import prepTimeData from "@/assets/lists/prepTime.json";
import typesData from "@/assets/lists/Types.json";
import allergensOptions from "@/assets/lists/Allergens.json";
import ingredientsData from "@/assets/lists/Ingredients.json";
import HomeFilterDropdown from "@/components/HomeFilterDropdown.vue";

export default {
    name: "HomePage",
    components: {AppCardCarousel, HomeFilterDropdown},
    props: {
        logged: Boolean,
        username: String,
        email: String,
        password: String,
    },
    data() {
        return {
            recipesByDate: [],
            recipesByRate: [],
            recipesByFilter: [],

            rate: "rate",
            recent: "recent",

            selectedTitle: "",

            selectedPreparationTime: [],
            preparationTimeOptions: prepTimeData,

            selectedServings: [],

            selectedTypes: [],
            typesOptions: typesData,

            selectedAllergens: [],
            allergensOptions: allergensOptions,

            selectedIngredients: [],
            ingredientsOptions: ingredientsData,

            showRecipesFilter: false,
            showRecipesFilterTitle: false,
            showRecipesFilterPrepTime: false,
            showRecipesFilterServings: false,
            showRecipesFilterTypes: false,
            showRecipesFilterAllergens: false,
            showRecipesFilterIngredients: false,

            error: "",
        };
    },
    methods: {
        redirectToRecipePage() {
            this.$router.push('/addRecipe');
        },
        handlePrepTimeUpdate(value) {
            this.selectedPreparationTime = value;
            if (this.selectedPreparationTime.length !== 0) {
                this.showRecipesFilterPrepTime = true;
            } else {
                this.showRecipesFilterPrepTime = false;
                this.hideSearchRecipes()
            }
            this.applyFilters()
        },
        handleServingUpdate(value) {
            this.selectedServings = value;
            if (this.selectedServings.length !== 0) {
                this.showRecipesFilterServings = true;
            } else {
                this.showRecipesFilterServings = false;
                this.hideSearchRecipes()
            }
            this.applyFilters()
        },
        handleTypeUpdate(value) {
            this.selectedTypes = value;
            if (this.selectedTypes.length !== 0) {
                this.showRecipesFilterTypes = true;
            } else {
                this.showRecipesFilterTypes = false;
                this.hideSearchRecipes()
            }
            this.applyFilters()
        },
        handleAllergensUpdate(value) {
            this.selectedAllergens = value;
            if (this.selectedAllergens.length !== 0) {
                this.showRecipesFilterAllergens = true;
            } else {
                this.showRecipesFilterAllergens = false;
                this.hideSearchRecipes()
            }
            this.applyFilters()
        },
        handleIngredientsUpdate(value) {
            this.selectedIngredients = value;
            if (this.selectedIngredients.length !== 0) {
                this.showRecipesFilterIngredients = true;
            } else {
                this.showRecipesFilterIngredients = false;
                this.hideSearchRecipes()
            }
            this.applyFilters()
        },
        hideSearchRecipes() {
            if (this.showRecipesFilterTitle || this.showRecipesFilterIngredients || this.showRecipesFilterAllergens || this.showRecipesFilterTypes || this.showRecipesFilterServings || this.showRecipesFilterPrepTime) {
                this.showRecipesFilter = true;
            } else {
                this.showRecipesFilter = false;
            }
        },
        async resetFlags() {
            this.showRecipesFilterTitle = false;
            this.showRecipesFilterPrepTime = false;
            this.showRecipesFilterServings = false;
            this.showRecipesFilterTypes = false;
            this.showRecipesFilterAllergens = false;
            this.showRecipesFilterIngredients = false;
            this.showRecipesFilter = false;
            this.selectedTitle = "";
        },
        async applyFilters() {
            await this.fetchData();
            try {
                let prev = false;
                let endpoint = 'recipes/filters/';
                if (this.selectedTitle != "") {
                    endpoint += `title=${this.selectedTitle}`;
                    prev = true;
                }
                if (this.showRecipesFilterPrepTime) {
                    if (prev) {
                        if (this.selectedPreparationTime.length > 1) {
                            for (let i = 0; i < this.selectedPreparationTime.length; i++) {
                                if (i == 0) {
                                    endpoint += `%A2preparation_time=${this.selectedPreparationTime[i]}+`
                                } else if (i == this.selectedPreparationTime.length - 1) {
                                    endpoint += `${this.selectedPreparationTime[i]}`
                                } else {
                                    endpoint += `${this.selectedPreparationTime[i]}+`
                                }
                            }
                        } else {
                            endpoint += `%A2preparation_time=${this.selectedPreparationTime[0]}`
                        }
                    } else {
                        if (this.selectedPreparationTime.length > 1) {
                            for (let i = 0; i < this.selectedPreparationTime.length; i++) {
                                if (i == 0) {
                                    endpoint += `preparation_time=${this.selectedPreparationTime[i]}+`
                                } else if (i == this.selectedPreparationTime.length - 1) {
                                    endpoint += `${this.selectedPreparationTime[i]}`
                                } else {
                                    endpoint += `${this.selectedPreparationTime[i]}+`
                                }
                            }
                        } else {
                            endpoint += `preparation_time=${this.selectedPreparationTime[0]}`
                        }
                        prev = true;
                    }
                }
                if (this.showRecipesFilterServings) {
                    if (prev) {
                        if (this.selectedServings.length > 1) {
                            for (let i = 0; i < this.selectedServings.length; i++) {
                                if (i == 0) {
                                    endpoint += `%A2servings=${this.selectedServings[i]}+`
                                } else if (i == this.selectedServings.length - 1) {
                                    endpoint += `${this.selectedServings[i]}`
                                } else {
                                    endpoint += `${this.selectedServings[i]}+`
                                }
                            }
                        } else {
                            endpoint += `%A2servings=${this.selectedServings[0]}`
                        }
                    } else {
                        if (this.selectedServings.length > 1) {
                            for (let i = 0; i < this.selectedServings.length; i++) {
                                if (i == 0) {
                                    endpoint += `servings=${this.selectedServings[i]}+`
                                } else if (i == this.selectedServings.length - 1) {
                                    endpoint += `${this.selectedServings[i]}`
                                } else {
                                    endpoint += `${this.selectedServings[i]}+`
                                }
                            }
                        } else {
                            endpoint += `servings=${this.selectedServings[0]}`
                        }
                        prev = true;
                    }
                }
                if (this.showRecipesFilterTypes) {
                    if (prev) {
                        if (this.selectedTypes.length > 1) {
                            for (let i = 0; i < this.selectedTypes.length; i++) {
                                if (i == 0) {
                                    endpoint += `%A2recipe_type=${this.selectedTypes[i]}+`
                                } else if (i == this.selectedTypes.length - 1) {
                                    endpoint += `${this.selectedTypes[i]}`
                                } else {
                                    endpoint += `${this.selectedTypes[i]}+`
                                }
                            }
                        } else {
                            endpoint += `%A2recipe_type=${this.selectedTypes[0]}`
                        }
                    } else {
                        if (this.selectedTypes.length > 1) {
                            for (let i = 0; i < this.selectedTypes.length; i++) {
                                if (i == 0) {
                                    endpoint += `recipe_type=${this.selectedTypes[i]}+`
                                } else if (i == this.selectedTypes.length - 1) {
                                    endpoint += `${this.selectedTypes[i]}`
                                } else {
                                    endpoint += `${this.selectedTypes[i]}+`
                                }
                            }
                        } else {
                            endpoint += `recipe_type=${this.selectedTypes[0]}`
                        }
                        prev = true;
                    }
                }
                if (this.showRecipesFilterAllergens) {
                    if (prev) {
                        if (this.selectedAllergens.length > 1) {
                            for (let i = 0; i < this.selectedAllergens.length; i++) {
                                if (i == 0) {
                                    endpoint += `%A2allergens=${this.selectedAllergens[i]}+`
                                } else if (i == this.selectedAllergens.length - 1) {
                                    endpoint += `${this.selectedAllergens[i]}`
                                } else {
                                    endpoint += `${this.selectedAllergens[i]}+`
                                }
                            }
                        } else {
                            endpoint += `%A2allergens=${this.selectedAllergens[0]}`
                        }
                    } else {
                        if (this.selectedAllergens.length > 1) {
                            for (let i = 0; i < this.selectedAllergens.length; i++) {
                                if (i == 0) {
                                    endpoint += `allergens=${this.selectedAllergens[i]}+`
                                } else if (i == this.selectedAllergens.length - 1) {
                                    endpoint += `${this.selectedAllergens[i]}`
                                } else {
                                    endpoint += `${this.selectedAllergens[i]}+`
                                }
                            }
                        } else {
                            endpoint += `allergens=${this.selectedAllergens[0]}`
                        }
                        prev = true;
                    }
                }
                if (this.showRecipesFilterIngredients) {
                    if (prev) {
                        if (this.selectedIngredients.length > 1) {
                            for (let i = 0; i < this.selectedIngredients.length; i++) {
                                if (i == 0) {
                                    endpoint += `%A2ingredients=${this.selectedIngredients[i]}+`
                                } else if (i == this.selectedIngredients.length - 1) {
                                    endpoint += `${this.selectedIngredients[i]}`
                                } else {
                                    endpoint += `${this.selectedIngredients[i]}+`
                                }
                            }
                        } else {
                            endpoint += `%A2ingredients=${this.selectedIngredients[0]}`
                        }
                    } else {
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
                        prev = true;
                    }
                }
                const response = await axios.get(endpoint);
                if (response.status === 200) {
                    const recipes = response.data.recipes;
                    this.recipesByFilter = recipes;
                    this.showRecipesFilter = true;
                    console.log(response.data.recipes);
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
        async fetchData() {
            try {
                await axios.get("/");
                // Puedes realizar alguna lógica con los datos si es necesario
            } catch (error) {
                console.error("Error fetching data:", error);
            }
        },
        async getRecipesByRate() {
            await this.fetchData();
            try {
                const response = await axios.get("recipes/filters/rate/");
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
            await this.fetchData();
            try {
                const response = await axios.get("recipes/filters/recent/");
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
    },
    created() {
        this.getRecipesByRate();
        this.getRecipesByRecent();
    }
};

</script>

<style scoped>

#homeSectionTitleContainer {
    background-color: #ff5733;
    border: 1px solid #b69b70;
    border-radius: 10px;
    margin-left: 2%;
    margin-right: 2%;
    padding-left: 1%;
    display: flex;
    align-items: center;
    color: white;
    font-size: 12px; /* Ajusta el tamaño del texto */
    font-weight: bold; /* Texto en negrita */
}

#homeTitleSearcherContainer {
    text-align: center;
    margin-top: 5%;
}

/* Estilos para el campo de búsqueda */
.homeTitleSearcher {
    padding: 8px 12px;
    border-radius: 10px;
    border: 1px solid #ccc;
    font-size: 16px;
    width: 50%;
    margin: 2% auto;
    position: relative;
}

.homeFloatingButton {
    position: fixed;
    bottom: 5%;
    right: 5%;
    background-color: #fd9846;
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
    border-top: 1px solid #df8500;
    border-bottom: 1px solid #ffbf00;
    margin-left: 2%;
    margin-right: 2%;
    margin-bottom: 2.5%;
}

#homeSectionFilterError {
    text-align: center;
}

#homeSectionFilterError {
    color: red;
    margin-top: 5px;
    font-size: 20px;
}

#homeFilterContainer {
    display: flex;
    justify-content: center; /* Centrado horizontal */
    align-items: center; /* Centrado vertical */
    margin: 0 0 2%;
}

.homeFilterDropdown {
    width: 100%;
    max-width: calc(16.7% - 1.7%);
    margin-right: 2%;
}

#homeFilterButtonsContainer {
    display: flex;
    justify-content: center;
    align-items: center;
    margin: 0 0 2%;
}

button {
    margin-top: 1%;
    margin-bottom: 1%;
    text-align: center;
    background-color: #ffa500;
    border: 1px solid #b69b70;
    border-radius: 10px;
    padding: 1%;
    margin-right: 2%;
}

button:hover {
    background-color: #f5680a;
}

</style>