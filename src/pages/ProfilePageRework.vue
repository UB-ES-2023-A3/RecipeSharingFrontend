<template>
    <div class="profileMainContainer" v-if="username_id">
        <div class="profileContainer">
            <div class="profileImageInfoContainer">
                <div class="profileImageContainer">
                    <img src="../assets/images/loginRegisterBG.jpg" alt="Recipe Image">
                </div>
                <div class="profileInfoContainer">
                    <div class="profileUsernameContainer">
                        <h3> {{ this.profileInfo.username }} </h3>
                    </div>
                    <div class="profileEmailContainer" v-if="this.username === this.username_id">
                        <h3> {{ this.profileInfo.email }}</h3>
                    </div>
                </div>
                <div class="profileFollowersFollowingContainer">
                    <div class="profileFollowingContainer">

                    </div>
                    <div class="profileFollowersContainer">

                    </div>
                </div>
            </div>
            <div class="profileRecipesContainer">
                <div class="profileOwnRecipesContainer">
                    <div class="profileCardRow">
                        <div
                                class="profileCard"
                                v-for="(recipe, index) in chunkArray(ownRecipes, 4)"
                                :key="index"
                        >
                            <div class="profileCardImage">
                                <img src="../assets/images/loginRegisterBG.jpg" alt="Recipe Image">
                            </div>
                            <div class="profileCardTitle">
                                <h4>{{ recipe.title }}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="seeMore" v-if="ownRecipes.length > 8">
                        <a href="#">See more</a>
                    </div>
                </div>
                <div class="profileLikedRecipesContainer">
                    <div class="profileCardRow">
                        <div
                                class="profileCard"
                                v-for="(recipe, index) in chunkArray(favoriteRecipes, 4)"
                                :key="index"
                        >
                            <div class="profileCardImage">
                                <img src="../assets/images/loginRegisterBG.jpg" alt="Recipe Image">
                            </div>
                            <div class="profileCardTitle">
                                <h4>{{ recipe.title }}</h4>
                            </div>
                        </div>
                    </div>
                    <div class="seeMore" v-if="favoriteRecipes.length > 8">
                        <a href="#">See more</a>
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
        chunkArray(array, size) {
            // Función para dividir el array en sub-arrays de tamaño específico
            const chunkedArray = [];
            let i, j;
            for (i = 0, j = array.length; i < j; i += size) {
                chunkedArray.push(array.slice(i, i + size));
            }
            return chunkedArray;
        },
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
.profileMainContainer {
    display: flex;
}

.profileContainer {
    width: 50%;
    background-color: gainsboro;
    border-radius: 2%;
    border: 2px solid gray;
    margin: 2% auto 1vh;
}

.profileImageInfoContainer {
    height: 30%;
    border-radius: 2%;
    margin-top: 5%;
    margin-left: 10%;
    margin-right: 10%;
    background-color: white;
    display: flex;
}

.profileImageContainer {
    width: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.profileImageContainer img {
    width: 100%;
    border-radius: 5%;
    border: 2px solid gray;
    height: 100%;
}

.profileInfoContainer {
    width: 70%;
    padding-left: 2%;
}

.profileUsernameContainer {
    width: 100%;
    font-size: xx-large;
    font-family: sans-serif;
    margin-left: 0;
}

.profileEmailContainer {
    width: 100%;
    font-size: medium;
}

.profileRecipesContainer {
    width: 100%;
    height: 70%;
    padding: 5%;
}

.profileOwnRecipesContainer {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
}

.profileLikedRecipesContainer {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
}

.profileCardRow {
    display: flex;
}

.profileCard {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    margin: 10px;
    width: calc(25% - 20px);
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.profileCardImage img {
    width: 100%;
    height: auto;
    border-radius: 6px;
}

.profileCardTitle {
    padding: 10px;
    background-color: #f5f5f5; /* Background color for the title section */
}

.seeMore a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
}
</style>
