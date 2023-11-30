<template>
    <div class="mainContainer" v-if="recipe">
        <div class="recipe-header">
            <div class="recipe-card-title">
                <h2>{{ "Title: " + this.recipe.title }}</h2>
                <p><strong>Creation Date:</strong> {{ this.recipe.creation_date }}</p>
                <button @click="addToFavorites" :class="{ 'favorited': isFavorited }" v-if="this.username !== this.recipe.username_id" >
                        {{ isFavorited ? 'Favorited' : 'Add to Favorites' }}
                </button>
            </div>
            <div class="recipe-card-rating">
                <div class="recipe-card-rating-title">
                    <h3>Current Rating</h3>
                    <p>{{ this.recipe.rating_average + " from " + this.recipe.rating_amount + " ratings" }}</p>
                    
                </div>
                <div class="rating-stars">
                    <span v-if="this.username !== this.recipe.username_id"   >
                        <h3>Add your rating:</h3>
                    </span>
                    <span
                                v-for="star in [1, 2, 3, 4, 5]"
                                :key="star"
                                @click="setRating(star)"
                                @mouseover="hoverStars(star)"
                                @mouseout="resetStars"
                                :class="{ 'filled': star <= rating, 'hovered': star <= hoveredStar, 'hidden-stars': username === this.recipe.username_id }"
                    >
                        ★
                    </span>
                </div>
            </div>
        </div>
        <div class="section">
            <div class="recipe-card-section">
                <h3>Ingredients</h3>
                <ul>
                    <li v-for="(step, index) in this.parseText(this.recipe.ingredients)" :key="index">
                        {{ step }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="section">
            <div class="recipe-card-section">
                <h3>Instructions</h3>
                <ol>
                    <li v-for="(step, index) in this.recipe.instructions.split('\n')" :key="index">
                        {{ step }}
                    </li>
                </ol>
            </div>
        </div>
        <div class="section">
            <div class="recipe-card-section">
                <h3>Allergens</h3>
                <ul>
                    <li v-for="(step, index) in this.parseText(this.recipe.allergens)" :key="index">
                        {{ step }}
                    </li>
                </ul>
            </div>
        </div>
        <div class="section">
            <div class="recipe-card-section">
                <h3>Type</h3> {{ this.recipe.recipe_type }}
            </div>
        </div>
        <div class="section">
            <div class="recipe-card-section">
                <h3>Preparation time</h3> {{ this.recipe.preparation_time }}
            </div>
        </div>
        <div class="section">
            <div class="recipe-card-section">
                <h3>Servings</h3> {{ this.recipe.servings }}
            </div>
        </div>
        <div class="section">
            <AppComments :username="this.username" :recipe_id="this.recipe_id" :comments="this.recipe.comments_list">
            </AppComments>
            

        </div>

        <button class="submit-button" @click="closeRecipe">Close</button>
    </div>
</template>

<script>

import axios from 'axios';
import '../assets/styles/appStyles.css'
import AppComments from '@/components/AppComments.vue';

export default {
    data() {
        return {
            showPopup: false,
            rating: 0, // Valoración inicial
            NumRatings: 0,
            CurrRating: 0,
            recipe_id: 0,
            hoveredStar: 0,
            username: null,
            recipe: null,
            profileInfo:null,
            isFavorited: false,
            
        };
    },
    components: {AppComments},
    methods: {
        closeRecipe() {
            this.$router.push('/');
        },
        goToLogin() {
            alert('Log in to see the recipe!');
            this.$router.push('/login');
        },
        parseText(listString) {
            const sinCorchetes = listString.replace(/\[|\]/g, '');
            const sinComillasSimples = sinCorchetes.replace(/'/g, '');
            const arrayIngredientes = sinComillasSimples.split(',');
            return arrayIngredientes;
        },
        setRating(rating) {
            this.rating = rating;
            this.addRating();
            this.getRating();
        },
        hoverStars(star) {
            this.hoveredStar = star;
        },
        resetStars() {
            this.hoveredStar = 0;
        },
        getRating() {
            // Axios para recibir los ratings
            axios.get(`recipes/getratings/${this.recipe_id}/`)
                .then((response) => {
                    if (response.status === 200) {
                        const ratings = response.data;
                        this.NumRatings = ratings.rating_amount;
                        this.CurrRating = ratings.rating_average;
                        console.log(response.data.recipes)
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener los ratings:", error);
                });
        },
        addRating() {
            //axios para postear el rating de una receta
            axios
                .post("recipesPostRatings/", {
                    user_id: this.username, 
                    recipe_id: this.recipe.id,
                    rating: this.rating,
                    review_type: "rate"
                })
                .then((response) => {
                    if (response.status === 200) {
                        console.log("Rating added");
                        alert("Rating added.");
                        this.getRecipeInformation();
                    }
                })
                .catch((error) => {
                    alert(error.response);
                });
        },
        getRecipeInformation() {
            // Axios para recibir las recetas
            axios
                .get(`recipe/${this.recipe_id}/`)
                .then((response) => {
                    if (response.status === 200) {
                        const info = response.data.recipe;
                        this.recipe = info;
                        console.log(this.recipe)
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener la información de la receta:", error);
                });
        },
        addToFavorites() {
            // Lógica para agregar o quitar de favoritos
            this.isFavorited = !this.isFavorited;
            axios
                .post("recipesAddFavorites/", {
                    user_id: this.username,
                    recipe_id: this.recipe.id,
                })
                .then((response) => {
                    if (response.status === 200) {
                        console.log("Recipe updated");
                        this.isFavorited = this.recipe_id in this.profileInfo.list_favorite_recipes
                        this.getRecipeInformation();
                        this.getUserInformation();
                        alert("List of favorites updated")
                    }
                })
                .catch((error) => {
                    alert(error.response);
                });
        },
        getUserInformation() {
            // Axios para recibir lla información del usuario
            axios
                .get(`user/${this.username}/`)
                .then((response) => {
                    if (response.status === 200) {
                        const info = response.data.user;
                        this.profileInfo = info;
                        console.log(response.data.user)
                        this.checkFavorite()
                    }
                })
                .catch((error) => {
                    console.error("Error al obtener las información del usuario:", error);
                });
        },

        checkFavorite(){
            this.isFavorited = this.recipe_id in this.profileInfo.list_favorite_recipes
        }
        
    },
    created(){
        const query = this.$route.query;
        this.recipe_id = query.recipe_id;
        this.username = query.username;
        this.getRecipeInformation();
        this.getUserInformation();
        console.log(query)
    }
};

</script>

<style scoped>

.scrollable-content {
    max-height: 400px; /* Ajusta la altura máxima según tus necesidades */
    overflow-y: auto; /* Agrega una barra de desplazamiento vertical si es necesario */
    padding: 10px; /* Añade un relleno interno para separar el contenido del borde */
    border: 2px solid #d44d31; /* Agrega un borde alrededor del contenido */
    border-radius: 10px; /* Ajusta la curvatura de las esquinas */
    background-color: #fff; /* Cambia el color de fondo según tus preferencias */
}

.recipe-title:hover {
    background-color: #ff5733;
}

.section h2 {
    font-size: 1.5rem;
}

.section h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: #d44d31; /* Color personalizado para los títulos de sección */
}

.section {
    color: black;
    width: 75%;
}

.rating-stars span {
    font-size: 1.5rem;
    cursor: pointer;
    color: #ccc;
    margin-left: 5px;
}

.rating-stars span.filled {
    color: #ffcc00;
}

.rating-stars span.hovered {
    color: #ffcc00;
}

.hidden-stars {
    display: none;
}

.recipe-header {
    background-color: #FF5733;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px; /* Añadido margen inferior */
     width: 75%;
}

.recipe-card-title {
    border-radius: 5px;
    width: 60%;
    padding: 10px;
    border: 2px solid #d44d31;
    margin: 5px;
     width: 100%;
    
}

.recipe-card-section {
    border-radius: 5px;
    padding: 10px;
    border: 2px solid #d44d31;
    margin: 5px;
     width: 100%;
}

.recipe-card-rating {
    border: 2px solid #d44d31;
    border-radius: 5px;
    padding: 10px;
    width: 100%;
}

h3 {
    display: block;
    font-size: 20px;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0px;
    margin-inline-end: 0px;
    font-weight: bold;
    color: white;
}

.favorited {
    background-color: #ffcc00; /* Cambia el color de fondo cuando está marcado como favorito */
    color: #333; /* Cambia el color del texto cuando está marcado como favorito */
}

</style>
