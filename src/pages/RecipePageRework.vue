<template>
    <div class="recipeMainContainer" v-if="this.recipe">
        <div class="recipeContainer" v-if="this.profileInfo">
            <div class="recipeTitleImageRatingFavContainer">
                <div class="recipeImageContainer">
                    <img src="../assets/images/loginRegisterBG.jpg" alt="Recipe Image">
                </div>
                <div class="recipeRatingTitleFavContainer">
                    <div class="recipeRatingFavContainer">
                        <div class="recipeRatingContainer">
                            <div class="recipeRatingStars">
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
                                <p>{{ this.recipe.rating_average + "(" + this.recipe.rating_amount + ")" }}</p>
                            </div>
                        </div>
                        <div class="recipeFavContainer">
                            <button @click="addToFavorites" :class="{ 'active': isFavorited }" class="heart-btn">
                                <i class="far fa-heart heart-icon" v-if="!isFavorited"></i>
                                <i class="fas fa-heart heart-icon active-heart" v-if="isFavorited"></i>
                            </button>
                        </div>
                    </div>
                    <div class="recipeTitleContainer">
                        <p>{{ this.recipe.title }}</p>
                    </div>
                </div>
            </div>
            <div class="recipeInfoContainer">
                <div class="recipeInfoLeftContainer">
                    <div class="recipeIngredientsContainer">
                        <h3>INGREDIENTS</h3>
                        <ul>
                            <li v-for="(step, index) in this.parseText(this.recipe.ingredients)" :key="index">
                                {{ step }}
                            </li>
                        </ul>
                    </div>
                    <div class="recipeAllergensContainer">
                        <h3>ALLERGENS</h3>
                        <ul>
                            <li v-for="(step, index) in this.parseText(this.recipe.allergens)" :key="index">
                                {{ step }}
                            </li>
                        </ul>
                    </div>
                    <div class="recipeTypesContainer">
                        <h3>TYPES</h3>
                        <ul>
                            <li v-for="(step, index) in this.parseText(this.recipe.recipe_type)" :key="index">
                                {{ step }}
                            </li>
                        </ul>
                    </div>
                    <div class="recipePrepTimeContainer">
                        <h3>PREPARATION TIME</h3> {{ this.recipe.preparation_time }}
                    </div>
                    <div class="recipeServingsContainer">
                        <h3>SERVINGS</h3> {{ this.recipe.servings }}
                    </div>
                </div>
                <div class="recipeInfoRightContainer">
                    <div class="recipeInstructionsContainer">
                        <h3>INSTRUCTIONS</h3>
                        <ol>
                            <li v-for="(step, index) in this.recipe.instructions.split('\n')" :key="index">
                                {{ step }}
                            </li>
                        </ol>
                    </div>
                </div>
            </div>
            <div class="recipeCommentsSectionContainer">
                <div class="recipeCommentsContainer">
                    <div class="recipeCommentTitleContainer">
                        <h3>COMMENTS</h3>
                    </div>
                    <div class="recipeCommentList scrollable-content">
                        <div v-for="(comment, index) in this.recipe.comments_list" :key="index"
                             class="recipeCommentContainer">
                            <div class="recipeCommentInfoContainer">
                                <div class="recipeCommentInfoUsernameContainer">
                                    <p><strong>Username:</strong> {{ comment.username }}</p>
                                </div>
                                <div class="recipeCommentInfoDateContainer">
                                    <p><strong>Date:</strong> {{ comment.date }}</p>
                                </div>
                            </div>
                            <div class="recipeCommentContentContainer">
                                <p>{{ comment.review }}</p>
                            </div>
                        </div>
                    </div>
                    <div class="recipeAddCommentContainer">
                        <div class="recipeCommentTextFieldContainer">
                            <label class="label" for="commentInput">Add a comment:</label>
                            <textarea
                                    v-model="newComment"
                                    id="commentInput"
                                    placeholder="Write your comment"
                                    class="textarea"
                            ></textarea>
                        </div>
                    </div>
                    <button @click="addComment" class="submit-button">Add comment</button>
                </div>
            </div>
            <div class="recipeButtonContainer">
            <button @click="closeRecipe" class="submit-button" >Close</button>
                </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: "RecipePageRework",
    data() {
        return {
            showPopup: false,
            rating: 0, // Valoración inicial
            NumRatings: 0,
            CurrRating: 0,
            hoveredStar: 0,
            username: null,
            recipe: null,
            profileInfo: null,
            isFavorited: false,
            recipeId: 0,

            newComment: '',
            comments_updated: this.comments
        };
    },
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
            axios.get(`getRatings/`)
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
                .post("postRatings/", {
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
                .get(`/recipe/${this.recipeId}/`)
                .then((response) => {
                    if (response.status === 200) {
                        this.recipe = response.data.recipe;
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
                .post("/recipes/postFavorites/", {
                    user_id: this.username,
                    recipe_id: this.recipe.id,
                })
                .then((response) => {
                    if (response.status === 200) {
                        console.log("Recipe updated");
                        console.log(response)
                        this.isFavorited = this.recipeId in this.profileInfo.list_favorite_recipes
                        this.getUserInformation();
                        this.getRecipeInformation();
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
                .get(`/user/${this.username}/`)
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
        checkFavorite() {
            this.isFavorited = this.recipeId in this.profileInfo.list_favorite_recipes
        },
        createDate() {
            // Crear el objeto comment con la fecha actual y otros datos
            const currentDate = new Date();
            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const year = currentDate.getFullYear().toString();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');

            const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
            return formattedDate;
        },
        addComment() {

            if (this.checkComment()) {
                alert("No comment written")
                return
            }
            const comment = {
                username: this.username,
                review: this.newComment,
                date: this.createDate(),
            };

            axios
                .post("postRatings/", {
                    user_id: this.username,
                    recipe_id: this.recipeId,
                    comment: comment,
                    review_type: "comment",
                })
                .then((response) => {
                    if (response.status === 200) {
                        console.log("Rating added");
                        alert("Review added.");
                        this.newComment = ''
                        this.comments_updated = response.data.comments_list
                        this.getRecipeInformation()
                    }
                })
                .catch((error) => {
                    alert(error.response);
                });
        },
        checkComment() {
            return this.newComment == '';
        },
    },
    async created() {
        this.recipeId = this.$route.params.id;
        this.getRecipeInformation();
        this.username = localStorage.getItem('username');
        this.getUserInformation();
    }
}
</script>

<style scoped>

.recipeMainContainer {
    display: flex;
}

.recipeContainer {
    width: 50%;
    background-color: gainsboro;
    border-radius: 2%;
    border: 2px solid gray;
    margin: 2% auto 1vh;
}

.recipeTitleImageRatingFavContainer {
    display: flex;
}

.recipeImageContainer {
    text-align: end;
    width: 50%;
    aspect-ratio: 1/1; /* Establece una relación de aspecto 1:1 para hacer que la imagen sea un cuadrado */
    border-radius: 50%; /* Esto asegurará que el cuadrado sea una forma circular */
    overflow: hidden; /* Para asegurarse de que la imagen se ajuste al contenedor circular */
    margin: 2%;
    height: auto; /* Ajusta la altura automáticamente */
    display: block;
}

.recipeImageContainer img {
    width: 100%;
    height: 100%;
}

.recipeImageContainer p {
    background-color: white;
    text-align: center;
    padding: 5%;
    margin-top: 65%;
    margin-left: 50%;
    font-size: x-large;
    font-family: 'FontAwesome';
}

.recipeRatingTitleFavContainer {
    width: 50%;
    display: block;
}

.recipeRatingFavContainer {
    width: 100%;
    display: flex;
    margin-top: 2%;
    height: fit-content;
}

.recipeRatingContainer {
    display: flex;
    align-items: center; /* Alineación vertical al centro */
    width: 80%;
}

.recipeRatingStars {
    width: 100%;
    height: 100%;
    margin-top: -5%;
    display: flex;
    text-align: end;
}

.recipeRatingStars p {
    margin-left: 2%;
    width: 100%;
}

.recipeRatingStars span {
    font-size: xx-large;
    cursor: pointer;
    color: #FFFFFF;
}

.recipeRatingStars span.filled {
    color: #ffcc00;
}

.recipeRatingStars span.hovered {
    color: #ffcc00;
}

.hidden-stars {
    display: none;
}

.recipeFavContainer {
    height: 100%;
    padding: 3%;
    width: 100%;
    text-align: end;
}

.heart-btn {
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
}

.heart-icon {
    font-size: 30px;
    color: #FFFFFF;
    transition: color 0.3s ease;
}

.heart-icon:hover {
    color: #ff0000;
}

.active-heart {
    /* Estilos para el corazón relleno */
    color: #ff0000; /* Color del corazón relleno */
}


.recipeTitleContainer {
    text-align: center;
    font-size: xx-large;
    font-family: fantasy;
    background: white;
    padding: 1%;
    background: white;
    transform: translate(-11.2vh, 7.8vh);
}

.recipeInfoContainer {
    margin-left: 10%;
    margin-right: 10%;
    background-color: white;
    display: flex;
}

.recipeInfoLeftContainer {
    width: 50%;
    padding-left: 4vh;
}

.recipeIngredientsContainer {
    width: 100%;
}

.recipeIngredientsContainer h3 {
    font-size: larger;
    font-family: sans-serif;
}

.recipeIngredientsContainer ul {
    list-style-position: outside;
    padding-left: 2vh;
}

.recipeAllergensContainer {
    width: 100%;
}

.recipeAllergensContainer h3 {
    font-size: larger;
    font-family: sans-serif;
}

.recipeAllergensContainer ul {
    list-style-position: outside;
    padding-left: 2vh;
}

.recipeTypesContainer {
    width: 100%;
}

.recipeTypesContainer h3 {
    font-size: larger;
    font-family: sans-serif;
}

.recipeTypesContainer ul {
    list-style-position: outside;
    padding-left: 2vh;
}

.recipePrepTimeContainer {
    width: 100%;
}

.recipePrepTimeContainer h3 {
    font-size: larger;
    font-family: sans-serif;
}

.recipeServingsContainer {
    width: 100%;
    padding-bottom: 2vh;
}

.recipeServingsContainer h3 {
    font-size: larger;
    font-family: sans-serif;
}

.recipeInfoRightContainer {
    width: 50%;
    text-align: center;
}

.recipeInstructionsContainer {
    width: 100%;
    padding-bottom: 2vh;
}

.recipeInstructionsContainer h3 {
    font-size: larger;
    font-family: sans-serif;
}

.recipeInstructionsContainer ol {
    list-style-position: outside;
    text-align: left;
}

.recipeCommentsSectionContainer {
    margin-left: 10%;
    margin-right: 10%;
    background-color: white;
}

.recipeCommentsContainer {
    padding-left: 4vh;
    padding-right: 4vh;
    text-align: center;
    margin-bottom: 2vh;
}

.recipeCommentTitleContainer {
    text-align: center;
    margin-bottom: 3vh;
    color: #000000;
    border-bottom: 2px solid #000000;
}

.recipeCommentTitleContainer h3 {
    margin: 0%;
}

.label {
    display: block; /* Hace que la etiqueta sea un bloque, lo que permite centrar el texto */
    text-align: center;
    color: #000000;
}

.recipeCommentList {
    margin-bottom: 2vh;
}

.scrollable-content {
    max-height: 20vh;
    overflow-y: auto;
    padding: 1vh;
    border: 2px solid #000000;
    border-radius: 10px;
    background-color: #fff;
}

.recipeAddCommentContainer {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.recipeCommentTextFieldContainer {
    text-align: center;
    justify-content: center;
    margin-bottom: 1vh;
    width: 100%;
}

.textarea {
    margin-bottom: 1vh;
    padding: 0.5vh;
    border: 1px solid black;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    resize: vertical;
    min-height: 5vh; /* Medida inicial del cuadro de comentarios */
}

.submit-button {
    background-color: #efb378;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 3vh;
}

.submit-button:hover {
    background-color: #dc8428;
}

.recipeCommentContainer {
    margin-bottom: 2vh;
    border: 2px solid #868585;
    border-radius: 10px;
    padding: 1vh;
    background-color: #fff;
    text-align: justify;
}

.recipeCommentInfoContainer {
    margin-bottom: 1vh;
    display: flex;
    color: gray;
    margin-top: -2vh;
}

.recipeCommentInfoUsernameContainer {
    width: 50%;
}

.recipeCommentInfoDateContainer {
    width: 50%;
    text-align: end;
}

.recipeCommentContentContainer {
    /* Estilos adicionales para la sección de revisión */
    color: #333; /* Cambia el color del texto según tus preferencias */
}

.recipeButtonContainer {
    text-align: center;
}

@media screen and (max-width: 768px) {
    .recipeContainer {
        width: 80%;
    }

    .recipeLeftContainer,
    .recipeRightContainer {
        width: 100%;
    }

    .recipeTitleContainer {
        font-size: large;
    }

}

/* Para pantallas aún más pequeñas */
@media screen and (max-width: 480px) {
    .recipeContainer {
        width: 90%;
    }

    .recipeTitleContainer {
        font-size: medium;
    }
}

</style>
