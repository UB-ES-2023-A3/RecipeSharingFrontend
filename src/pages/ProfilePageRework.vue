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
                    <div class="profileOwnRecipesTitleContainer">
                        <h3>OWN RECIPES ({{ this.ownRecipes.length }})</h3>
                    </div>
                    <div class="profileCardRow">
                        <router-link
                                class="profileCard"
                                v-for="(recipe, index) in ownRecipes.slice(0, 4)"
                                :key="index"
                                :to="'/recipes/' + recipe.id"
                        >
                            <div class="profileCardImage">
                                <img src="../assets/images/loginRegisterBG.jpg" alt="Recipe Image">
                            </div>
                            <div class="profileCardTitle">
                                <h4>{{ recipe.title }}</h4>
                            </div>
                        </router-link>
                    </div>
                    <div class="seeMore" v-if="ownRecipes.length > 4">
                        <a href="#">See more</a>
                    </div>
                </div>
                <div class="profileLikedRecipesContainer">
                    <div class="profileLikedRecipesTitleContainer">
                        <h3>FAVORITE RECIPES ({{ this.favoriteRecipes.length }})</h3>
                    </div>
                    <div class="profileCardRow">
                        <router-link
                                class="profileCard"
                                v-for="(recipe, index) in favoriteRecipes.slice(0, 4)"
                                :key="index"
                                :to="'/recipes/' + recipe.id"
                        >
                            <div class="profileCardImage">
                                <img src="../assets/images/loginRegisterBG.jpg" alt="Recipe Image">
                            </div>
                            <div class="profileCardTitle">
                                <h4>{{ recipe.title }}</h4>
                            </div>
                        </router-link>
                    </div>
                    <div class="seeMore" v-if="favoriteRecipes.length > 4">
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
    height: 20%;
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
    display: flex;
    flex-direction: column;
    height: 100%;
}

.profileUsernameContainer {
    width: 100%;
    font-size: xx-large;
    font-family: sans-serif;
    margin-left: 0;
    height: 50%;
    margin-bottom: 10px;
}

.profileEmailContainer {
    width: 100%;
    font-size: medium;
    margin-left: 0;
    height: 50%;
    position: relative;
    bottom: 0;
}

.profileRecipesContainer {
    width: 100%;
    height: 80%;
    margin-top: 2%;
}

.profileOwnRecipesContainer, .profileLikedRecipesContainer {
    flex-wrap: wrap;
    justify-content: space-between;
}

.profileOwnRecipesTitleContainer, .profileLikedRecipesTitleContainer {
    text-align: center;
    color: #000000;
    border-bottom: 2px solid #000000;
    width: 100%;
    margin-top: 2%;
}

.profileOwnRecipesTitleContainer h3, .profileLikedRecipesTitleContainer h3 {
    margin: 0%;
}

.profileCardRow {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Centrado de los elementos */
    margin: 0 -10px; /* Ajuste para compensar los márgenes negativos */
}

.profileCard {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    margin: 10px;
    width: calc(25% - 50px); /* Reducido el ancho y ajustado el margen */
    box-shadow: 1px 3px 3px rgba(0, 0, 0, 0.2), -1px -1px 4px rgba(0, 0, 0, 0.2);
    position: relative;
    transition: box-shadow 130ms ease-in-out;
    height: 130px;
    color: black;
}

.profileCard:hover {
    box-shadow: 2px 6px 6px rgba(0, 0, 0, 0.2),
    -1px -1px 7px rgba(0, 0, 0, 0.2);
}

.profileCardImage img {
    height: 100%;
    width: 100%;
}

.profileCardTitle {
    background-color: white;
    bottom: 0;
    left: 0;
    text-align: center;
    position: absolute;
    right: 0;
}

.profileCardTitle p {
    margin: 0;
}

.seeMore {
    text-align: end;
    margin-right: 3%;
}

.seeMore a {
    color: #007bff;
    text-decoration: none;
    font-weight: bold;
}

@media (max-width: 768px) {
    .profileContainer {
        width: 80%; /* Reducir el ancho del contenedor principal */
        margin: 2% auto; /* Ajustar los márgenes */
    }

    .profileImageInfoContainer {
        flex-direction: column; /* Cambiar la dirección de los elementos */
        height: auto; /* Altura automática */
        margin: 5% 0; /* Ajustar los márgenes */
    }

    .profileImageContainer {
        width: 100%;
        margin-bottom: 5%; /* Espaciado inferior */
    }

    .profileInfoContainer {
        width: 100%;
        padding: 0 5%; /* Ajustar el relleno */
    }

    .profileUsernameContainer {
        font-size: large; /* Reducir el tamaño de la fuente */
        margin-bottom: 5px; /* Espaciado inferior */
    }

    .profileEmailContainer {
        font-size: small; /* Reducir el tamaño de la fuente */
        margin-bottom: 5px; /* Espaciado inferior */
    }

    .profileRecipesContainer {
        margin-top: 5%;
    }

    .profileCard {
        width: calc(50% - 20px); /* Reducir el ancho de las tarjetas */
        margin: 10px 5px; /* Ajustar los márgenes */
    }

    .profileOwnRecipesTitleContainer,
    .profileLikedRecipesTitleContainer {
        margin-top: 5%;
    }
}
</style>
