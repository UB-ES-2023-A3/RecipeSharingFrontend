<template>
    <div class="card-carousel">
        <div class="carousel-container">
            <button @click="moveCarousel(-1)" class="arrow-button left-arrow"
                    :class="{ 'disabled-button': isAtBeginning }">◄
            </button>
            <AppCardRecipe
                    v-for="(recipe, index) in displayedRecipes"
                    :key="index + this.currentCardIndex"
                    :type="this.type"
                    :recipeName="this.recipeName"
                    :recipe="recipe"
                    :logged="this.logged"
                    :username="username"
                    :visibleRecipes="visibleRecipes"
            ></AppCardRecipe>
            <button @click="moveCarousel(1)" class="arrow-button right-arrow" :class="{ 'disabled-button': isAtEnd }">
                ►
            </button>
        </div>
    </div>
</template>


<script>
import AppCardRecipe from '@/components/AppCardRecipe.vue';

export default {
    components: {AppCardRecipe},
    props: {
        recipes: Array,
        visibleRecipes: Number,
        username: String,
        logged: Boolean,
        type: String,
        recipeName: String,
    },
    data() {
        return {
            currentCardIndex: 0,
        };
    },
    computed: {
        displayedRecipes() {
            const startIndex = this.currentCardIndex;
            const endIndex = startIndex + this.visibleRecipes;
            return this.recipes.slice(startIndex, endIndex);
        },
        isAtBeginning() {
            return this.currentCardIndex === 0;
        },
        isAtEnd() {
            return this.currentCardIndex + this.visibleRecipes >= this.recipes.length;
        },
    },
    methods: {
        moveCarousel(step) {
            const newIndex = this.currentCardIndex + step;
            if (newIndex >= 0 && newIndex <= this.recipes.length - this.visibleRecipes) {
                this.currentCardIndex = newIndex;
            }
        },
    },
};
</script>


<style scoped>

.card-carousel {
    text-align: center;
    width: 100%;
}

.carousel-container {
    display: flex;
    flex-wrap: nowrap;
    gap: 20px;
    padding: 40px;
    border-radius: 4px;
    height: auto;
    width: 96%;
    margin: 15px auto 10px;
    max-width: 100%;
}

.carousel-item {
    flex: 0 0 auto;
}

.arrow-button {
    background-color: #ff5733;
    color: white;
    border: none;
    border-radius: 4px;
    padding: 10px;
    cursor: pointer;
    flex: 0 0 auto; /* Evita que los botones de flecha se expandan */
    display: flex;
    align-items: center;
    justify-content: center;
}

.arrow-button:hover {
    background-color: #ff8844; /* Cambia el color al pasar el cursor por encima */
}

.disabled-button {
    background-color: #ccc; /* Color de fondo gris para botones deshabilitados */
    pointer-events: none; /* Deshabilitar interacción con el botón */
    cursor: not-allowed; /* Cambiar el cursor a "no permitido" */
}

</style>