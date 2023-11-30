<template>
    <div class="recipe-card" :style="{ 'max-width': calculatedMaxWidth }">
        <div v-if="logged">
            <div @click="logged ? togglePopup() : goToLogin()" class="recipe-title">
                <h2>{{ this.recipe.title }}</h2>
                <h3 v-if="displaySecondaryInfo(type)">{{ getSecondaryInfo(type) }}</h3>
            </div>
        </div>
        <div v-else>
            <div @click="goToLogin" class="recipe-title">
                <h2>{{ this.recipe.title }}</h2>
                <h3 v-if="displaySecondaryInfo(type)">{{ getSecondaryInfo(type) }}</h3>
            </div>
        </div>
    </div>
</template>


<script>

import '../assets/styles/appStyles.css';

export default {
    props: {
        recipe: Object,
        username: String,
        logged: Boolean,
        type: String,
        visibleRecipes: Number,
    },
    computed: {
        calculatedMaxWidth() {
            const base = (100 / this.visibleRecipes);
            const extra = 1.7;
            return `${base - extra}%`;
        }
    },
    data() {
        return {
            showPopup: false,
            rating: 0, // Valoración inicial
            NumRatings: this.recipe.rating_amount,
            CurrRating: this.recipe.rating_average,
            recipe_id: this.recipe.id,
            hoveredStar: 0,
        };
    },
    methods: {
        togglePopup() {
            this.$router.push(`/recipes/${this.recipe_id}`);
        },
        goToLogin() {
            alert('Log in to see the recipe!');
            this.$router.push('/loginRegister');
        },
        displaySecondaryInfo(type) {
            return ['rate', 'recent', 'preparation_time', 'name', 'servings', 'recipe_type', 'allergens', 'ingredients'].includes(type);
        },
        getSecondaryInfo(type) {
            switch (type) {
                case 'rate':
                    return 'Rating: ' + this.CurrRating;
                case 'recent':
                    return this.recipe.creation_date;
                case 'preparation_time':
                    return this.recipe.preparation_time;
                case 'name':
                    return '';
                case 'servings':
                    return this.recipe.servings;
                case 'recipe_type':
                    return this.recipe.recipe_type;
                case 'allergens':
                    return this.recipe.allergens;
                case 'ingredients':
                    return this.recipe.ingredients;
                default:
                    return '';
            }
        },
    },
};

</script>

<style scoped>
.recipe-card,
.recipe-title {
    cursor: pointer;
}

.recipe-card {
    flex: 0 0 auto;
    width: 100%;
//max-width: calc(12.5% - 1.7%);
}

.recipe-title {
    text-align: center;
    border-radius: 4px;
    background-color: #a51d1de7;
    color: white;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    max-width: 250px;
    padding: 10px;
    margin-bottom: 10px; /* Añadido margen inferior */
    height: 88%;
}

.recipe-title:hover {
    background-color: #ff5733;
}

.popup {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 999;
    background: rgba(0, 0, 0, 0.8);
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup-content {
    background-color: #fce4a4;
    border: 1px solid #ccc;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-height: 500px;
    padding: 20px;
    overflow-y: auto;
    margin-top: 100px;
}

.section {
    color: black;
}

.section h2 {
    font-size: 1.5rem;
}

.section h3 {
    font-size: 1.3rem;
    margin-bottom: 10px;
    color: #d44d31;
}

.rating-stars span {
    font-size: 1.5rem;
    cursor: pointer;
    color: #ccc;
    margin-left: 5px;
}

.rating-stars span.filled,
.rating-stars span.hovered {
    color: #ffcc00;
}

.hidden-stars {
    display: none;
}

.recipe-header {
    background-color: #ff5733;
    display: flex;
    justify-content: space-evenly;
    align-items: center;
    padding: 10px;
    border-radius: 5px;
    margin-bottom: 10px;
}

.recipe-card-title,
.recipe-card-section {
    border-radius: 5px;
    padding: 10px;
    border: 2px solid #d44d31;
    margin: 5px;
}

.recipe-card-title {
    width: 60%;
}

.recipe-card-rating {
    border: 2px solid #d44d31;
    border-radius: 5px;
    padding: 10px;
}

h3 {
    display: block;
    font-size: 20px;
    margin-block-start: 1em;
    margin-block-end: 1em;
    margin-inline-start: 0;
    margin-inline-end: 0;
    font-weight: bold;
    color: white;
}

hr {
    border-top: 1px solid #df8500;
    border-bottom: 1px solid #ffbf00;
    margin-left: 2%;
    margin-right: 2%;
}
</style>