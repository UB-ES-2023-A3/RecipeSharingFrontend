<template>
    <div class="profileMainContainer" v-if="username_id">
        <div class="profileContainer">
            <div class="profileImageInfoContainer">
                <div class="profileImageContainer">

                </div>
                <div class="profileUsernameContainer">
                    <h3> {{ this.profileInfo.username }} </h3>
                </div>
                <div class="profileEmailContainer" v-if="this.username === this.username_id">
                    <h3> {{ this.profileInfo.email }}</h3>
                </div>
                <div class="profileFollowersFollowingContainer">
                    <div class="profileFollowingContainer">

                    </div>
                    <div class="profileFollowersContainer">

                    </div>
                </div>
                <div class="profileRecipesContainer">
                    <div class="profileOwnRecipesContainer">
                        <!-- Loop through list_own_recipes to generate cards -->
                        <div class="cardRow" v-for="(recipe, index) in ownRecipes" :key="index">
                            <div class="card">
                                <!-- Display recipe information dynamically -->
                                <h4>{{ recipe.title }}</h4>
                                <!-- Other recipe details -->
                            </div>
                        </div>

                        <!-- See more button -->
                        <div class="seeMore">
                            <a href="#">See more</a>
                        </div>
                    </div>
                    <div class="profileLikedRecipesContainer">

                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import axios from 'axios';

export default {
    name: "HomePage.vue",

    props: {
        logged: Boolean,
        username: String,
        email: String,
        password: String,
    },
    data() {
        return {
            ownRecipes: [],
            favoriteRecipes: [],
            rate: "rate",
            recent: "recent",
            profileInfo: {},
            username_id: "",
        };
    },
    methods: {
        getUserInformation() {
            // Axios para recibir lla información del usuario
            axios
                .get(`/profile/${this.username_id}/`)
                .then((response) => {
                    if (response.status === 200) {
                        const info = response.data.user;
                        this.profileInfo = info;
                        this.favoriteRecipes = Object.values(this.profileInfo.list_favorite_recipes)
                        this.ownRecipes = Object.values(this.profileInfo.list_own_recipes)
                        console.log(response.data.user)

                    }
                })
                .catch((error) => {
                    console.error("Error al obtener las información del usuario:", error);
                });
        },
    },
    created() {
        this.username_id = this.$route.params.id;
        this.getUserInformation();
    }
};
</script>

<style scoped>
.profileInfo {
    text-align: left;
    color: black;
}
</style>
