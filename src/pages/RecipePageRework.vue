<template>
    <div class="recipeMainContainer" v-if="this.recipe">
        <div class="recipeContainer" v-if="this.profileInfo">
            <div class="recipeTitleFavContainer">
                <div class="recipeTitleContainer">
                    <h1>{{ this.recipe.title }}</h1>
                </div>
                <div class="recipeFavContainer">
                    <button @click="addToFavorites" :class="{ 'active': isFavorited }" class="heart-btn">
                        <i class="far fa-heart heart-icon" v-if="!isFavorited"></i>
                        <i class="fas fa-heart heart-icon active-heart" v-if="isFavorited"></i>
                    </button>
                </div>
            </div>
            <div class="recipeUserRatingContainer">
                <div class="recipeUserImageContainer">
                    <img src="../assets/images/loginRegisterBG.jpg" alt="Recipe Image">
                </div>
                <div class="recipeUserRatingInfoContainer">
                    <div class="recipeRatingCommentsContainer">
                        <div class="recipeRatingStars">
                            <div class="starsContainer">
                                <span
                                        v-for="star in [1, 2, 3, 4, 5]"
                                        :key="star"
                                        @click="setRating(star)"
                                        @mouseover="hoverStars(star)"
                                        @mouseout="resetStars"
                                        :class="{ 'filled': star <= rating, 'hovered': star <= hoveredStar,
                                        'hidden-stars': username === this.recipe.username_id }"
                                >
                                ★
                                </span>
                            </div>
                            <div class="ratingStarsInfoContainer">
                                <p>
                                    Rating: {{
                                    this.recipe.rating_average + " (" + this.recipe.rating_amount + " votes)"
                                    }}
                                </p>
                            </div>
                        </div>
                        <div class="recipeNumCommentsContainer">
                            <p class="clickable-comments" @click="goToComments">{{ this.recipe.comments_amount }}
                                comments</p>
                        </div>
                    </div>
                    <div class="recipeUserDateContainer">
                        <p>
                            Made by:
                            <span class="clickable-username" @click="goToProfile">{{ this.recipe.username_id }}</span>.
                            Creation Date: {{ this.recipe.creation_date }}.
                        </p>
                    </div>
                </div>
            </div>
            <div class="recipeImageContainer">
                <img src="../assets/images/loginRegisterBG.jpg" alt="Recipe Image">
            </div>
            <div class="recipeTableContainer">
                <div class="recipeTableFirstRowContainer">
                    <div class="recipeTableServings">
                        <p>{{ this.recipe.servings }} servings</p>
                    </div>
                    <div class="recipeTablePrepTime">
                        <p>{{ this.recipe.preparation_time }}m</p>
                    </div>
                    <div class="recipeTableKCal">
                        <p>{{ this.recipe.kcal }}kcal</p>
                    </div>
                </div>
                <div class="recipeTableSecondRowContainer">
                    <h3>Ingredients</h3>
                    <ul class="ingredientItems">
                        <li v-for="(ingredient, index) in this.parseText(this.recipe.ingredients)" :key="index">
                            <label>
                                <input type="checkbox" :value="ingredient">
                                {{ ingredient }}
                            </label>
                        </li>
                    </ul>
                </div>
                <div class="recipeTableThirdRowContainer">
                    <h3>Allergens</h3>
                    <ul class="allergenItems">
                        <li v-for="(allergen, index) in this.parseText(this.recipe.allergens)" :key="index">
                            {{ allergen }}
                        </li>
                    </ul>
                </div>
                <div class="recipeTableForthRowContainer">
                    <h3>Types</h3>
                    <ul class="typeItems">
                        <li v-for="(type, index) in this.parseText(this.recipe.recipe_type)" :key="index">
                            {{ type }}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="recipeInstructionsContainer">
                <h3>Instructions</h3>
                <ol class="instructionItems">
                    <li v-for="(step, index) in this.recipe.instructions.split('\n')" :key="index">
                        {{ step }}
                    </li>
                </ol>
            </div>
            <div class="recipeCommentsSectionContainer" id="recipeCommentsSectionContainer">
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
                <button @click="closeRecipe" class="submit-button close-button">Close</button>
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
            comments_updated: this.comments,
            previousRoute: "",
        };
    },
    methods: {
        closeRecipe() {
            this.$router.push(`${this.previousRoute}`);
        },
        goToLogin() {
            alert('Log in to see the recipe!');
            this.$router.push('/login');
        },
        goToComments() {
            const element = document.getElementById('recipeCommentsSectionContainer');
            if (element) {
                element.scrollIntoView({behavior: 'smooth'});
            }
        },
        goToProfile() {

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
                    this.$router.push('/');
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
                    this.$router.push('/');
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
        this.previousRoute = this.$router.options.history.state.back
        if (this.previousRoute === null) {
            this.previousRoute = "/";
        }
    }
}
</script>

<style scoped>

.recipeMainContainer {
    display: flex;
    justify-content: center;
    align-items: flex-start;
    padding: 1em;
    width: 100%;
    height: 100%;
}

.recipeContainer {
    max-width: 100%;
    margin: 0 0 0 300px;
    padding: 0 15px;
    width: 100%;
    height: 100%;
}

.recipeFavContainer {
    display: flex;
    margin-left: 2%;
}


.recipeTitleFavContainer {
    display: flex;
}

.recipeTitleContainer {
    margin-bottom: 10px;
}

.recipeTitleContainer h1 {
    font-size: 2em;
    line-height: 1.2;
    font-weight: 600;
    margin: 5px 0;
    color: #333;
    font-family: Catamaran, sans-serif;
}

.recipeUserRatingContainer {
    display: flex;
    align-items: center;
    margin-bottom: 10px;
}

.recipeUserImageContainer {
    width: 100px;
    height: 100px;
}

.recipeUserImageContainer img {
    width: 100%;
    height: 100%;
    border-radius: 50%;
    object-fit: cover;
}

.recipeUserRatingInfoContainer {
    margin-left: 10px;
}

.recipeRatingStars {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #83d3fc;
    padding-bottom: 5px;
}

.recipeRatingStars p {

}

.recipeRatingStars span {
    cursor: pointer;
    color: #ccc;
}

.recipeRatingStars span.filled,
.recipeRatingStars span.hovered {
    color: #ffcc00;
}

.hidden-stars {
    display: none;
}

.starsContainer {
    margin-right: 5px;
}

.ratingStarsInfoContainer {

}

.recipeNumCommentsContainer {
    display: flex;
    align-items: center;
    border-bottom: 2px solid #83d3fc;
}

.recipeNumCommentsContainer p {
    margin-left: 5px;
    font-size: 0.8em;
    font-weight: 300;
    font-family: Catamaran, sans-serif;
}

.recipeUserDateContainer {
    font-size: 0.8em;
    font-weight: 300;
    font-family: Catamaran, sans-serif;
    display: flex;
}

.recipeImageContainer img {
    max-width: 100%;
    height: auto;
}

.recipeTableContainer {
    margin-top: 20px;
    border: 2px solid #83d3fc;
    max-width: 100%;
    width: 60%;
    overflow-x: auto;
    box-sizing: border-box;
}

.recipeTableFirstRowContainer {
    display: flex;
    text-align: center;
    border-bottom: 2px solid #83d3fc;
    padding: 5px;
}

.recipeTableServings,
.recipeTablePrepTime {
    flex: 1;
    border-right: 2px solid #83d3fc;
    padding: 10px 5px;
    box-sizing: border-box;
}

.recipeTableKCal {
    flex: 1;
    padding: 10px 5px;
    box-sizing: border-box;
}

.recipeTableSecondRowContainer,
.recipeTableThirdRowContainer {
    border-bottom: 2px solid #83d3fc;
    display: flex;
    flex-wrap: wrap;
    padding: 5px 5px 20px 20px;
}

.recipeTableForthRowContainer {
    display: flex;
    flex-wrap: wrap;
    padding: 5px 5px 20px 20px;

}

.ingredientItems,
.allergenItems,
.typeItems {
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    padding: 0;
    margin: 0;
    list-style: none;
}

.ingredientItems li {
    width: calc(33.33% - 10px);
    box-sizing: border-box;
}

.allergenItems li,
.typeItems li {
    width: calc(33.33% - 10px);
    box-sizing: border-box;
    list-style: inside;
}

.recipeCommentsSectionContainer {
    margin-right: 35%;
    background-color: white;
}

.recipeCommentsContainer {
    padding-top: 2vh;
    padding-right: 4vh;
}

.recipeCommentTitleContainer {
    margin-bottom: 1vh;
    color: #000000;
}

.recipeCommentTitleContainer h3 {
    margin: 0%;
}

.label {
    display: block;
    color: #000000;
}

.recipeCommentList {
    margin-bottom: 2vh;
}

.scrollable-content {
    max-height: 20vh;
    overflow-y: auto;
    padding: 1vh;
    border: 2px solid #83d3fc;
    border-radius: 10px;
    background-color: #fff;
}

.recipeAddCommentContainer {
    display: flex;
    flex-direction: column;
    width: 100%;
}

.recipeCommentTextFieldContainer {
    margin-bottom: 1vh;
    width: 100%;
}

.textarea {
    margin-bottom: 1vh;
    padding: 0.5vh;
    border: 1px solid #41c6ff;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    resize: vertical;
    min-height: 5vh;
}

.submit-button {
    background-color: #41c6ff;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    margin-bottom: 3vh;
}

.submit-button:hover {
    background-color: #41a0ff;
}

.recipeCommentContainer {
    margin-bottom: 2vh;
    border: 2px solid rgba(131, 211, 252, 0.98);
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
    color: #333;
}

.recipeButtonContainer {
    text-align: center;
}

.heart-btn {
    border: none;
    background: none;
    cursor: pointer;
    padding: 0;
}

.heart-icon {
    font-size: 30px;
    color: #ff0000;
    transition: color 0.3s ease;
}

.heart-icon:hover {
    color: #9b0000;
}

.active-heart {
    color: #9b0000;
}

.close-button {
    position: fixed;
    top: 100px;
    right: 10px;
    z-index: 1000;
}

.clickable-comments {
    color: #000000;
    cursor: pointer;
}

.clickable-comments:hover {
    text-decoration: underline;
}

.clickable-username {
    color: blue;
    cursor: pointer;
}

.clickable-username:hover {
    color: darkblue;
    text-decoration: underline;
}

.instructionItems {
    margin-left: -25px;
}

@media (max-width: 1200px) {
  .recipeContainer {
    margin: 0;
  }

  .recipeTableContainer {
    width: 80%;
  }
}

@media (max-width: 992px) {
  .recipeMainContainer {
    flex-direction: column;
    align-items: center;
  }

  .recipeContainer {
    margin: 0;
    width: 100%;
    padding: 0;
  }

  .recipeTableContainer {
    width: 100%;
  }
}

@media (max-width: 768px) {
  .recipeTableServings,
  .recipeTablePrepTime,
  .recipeTableKCal,
  .ingredientItems li,
  .allergenItems li,
  .typeItems li {
    width: 100%;
  }
}

@media (max-width: 576px) {
  .recipeTitleContainer h1 {
    font-size: 1.5em;
  }
}

</style>