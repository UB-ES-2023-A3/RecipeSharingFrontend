<template>
    <div class="profileMainContainer" v-if="this.profileInfo">
        <div class="profileRecipeContainer">
            <div class="profileImageInfoContainer">
                <div class="profileImageContainer">
                    <div class="squareImageWrapper">
                        <img src="../assets/images/loginRegisterBG.jpg" alt="Recipe Image">
                    </div>
                </div>
                <div class="profileInfoContainer">
                    <div class="profileUsernameContainer">
                        <h3> {{ this.profileInfo.username }} </h3>
                    </div>
                    <div class="profileEmailContainer" v-if="this.username === this.username_id">
                        <h3> {{ this.profileInfo.email }}</h3>
                    </div>
                    <div class="profileFollowingFollowersContainer">
                        <div class="profileFollowingContainer" @click="showFollowingPopup">
                            <h3> Following: {{ Object.keys(this.profileInfo.list_following_users).length }} </h3>
                        </div>
                        <div v-if="showPopupFollowing" class="overlay" @click="closeFollowingPopup">
                            <div class="followingPopup">
                                <div class="users">
                                    <ul>
                                        <li v-for="(follower, index) in profileInfo.list_following_users" :key="index">
                                            <a :href="`/profiles/${follower}`">{{ follower }}</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="buttonClose">
                                    <button class="closeButton" @click="showFollowingPopup">Close</button>
                                </div>
                            </div>
                        </div>
                        <div class="profileFollowersContainer" @click="showFollowersPopup">
                            <h3> Followers: {{ Object.keys(this.profileInfo.list_follower_users).length }}</h3>
                        </div>
                        <div v-if="showPopupFollower" class="overlay" @click="closeFollowersPopup">
                            <div class="followersPopup">
                                <div class="users">
                                    <ul>
                                        <li v-for="(follower, index) in profileInfo.list_follower_users" :key="index">
                                            <a :href="`/profiles/${follower}`">{{ follower }}</a>
                                        </li>
                                    </ul>
                                </div>
                                <div class="buttonClose">
                                    <button class="closeButton" @click="showFollowersPopup">Close</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div class="profileFollowButtonContainer" v-if="this.username !== this.username_id">
                    <button class="followButton" @click="follow">
                        {{ isFollowing ? 'Unfollow' : 'Follow' }}
                    </button>
                </div>
            </div>
            <div class="profileRecipesUsersContainer">

                <div class="profileRecipesContainer">
                    <div class="profileOwnRecipesContainer">
                        <div class="profileOwnRecipesTitleContainer">
                            <h3>Own Recipes ({{ this.ownRecipes.length }})</h3>
                        </div>
                        <div class="profileCardRow">
                            <router-link
                                    class="profileCard"
                                    v-for="(recipe, index) in displayedOwnRecipes"
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
                        <div class="recipeLikedButton">
                            <div v-if="ownRecipes.length > 8" class="seeMore">
                                <a href="#" @click="toggleOwnRecipesView">{{
                                    showAllOwnRecipes ? "See less" : "See more"
                                    }}</a>
                            </div>
                        </div>
                    </div>
                    <div class="profileLikedRecipesContainer">
                        <div class="profileLikedRecipesTitleContainer">
                            <h3>Favorite Recipes ({{ this.favoriteRecipes.length }})</h3>
                        </div>
                        <div class="profileCardRow">
                            <router-link
                                    class="profileCard"
                                    v-for="(recipe, index) in displayedLikedRecipes"
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
                        <div class="recipeLikedButton">
                            <div v-if="favoriteRecipes.length > 8" class="seeMore">
                                <a href="#" @click="toggleLikedRecipesView">{{
                                    showAllLikedRecipes ? "See less" : "See more"
                                    }}</a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div class="profileButtonContainer">
                <button @click="closeProfile" class="submit-button close-button">Close</button>
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
            showAllLikedRecipes: false,
            showAllOwnRecipes: false,
            isFollowing: false,
            showPopupFollower: false,
            showPopupFollowing: false,
        };
    },
    computed: {
        displayedLikedRecipes() {
            return this.showAllLikedRecipes
                ? this.favoriteRecipes
                : this.favoriteRecipes.slice(0, 8); // Muestra solo las dos primeras filas
        },
        displayedOwnRecipes() {
            return this.showAllOwnRecipes
                ? this.ownRecipes
                : this.ownRecipes.slice(0, 8); // Muestra solo las dos primeras filas
        },
    },
    methods: {
        closeProfile() {
            this.$router.push(`/`);
        },
        showFollowersPopup() {
            this.showPopupFollower = !this.showPopupFollower;
        },
        showFollowingPopup() {
            this.showPopupFollowing = !this.showPopupFollowing;
        },
        follow() {
            axios
                .post(`/profile/${this.username_id}/`, {
                    user: this.username
                }).then((response) => {
                if (response.status === 200) {
                    console.log("Followed");
                    this.getUserInformation()
                }
            })
                .catch((error) => {
                    console.log(error.response)
                    alert(error.response);
                });
        },
        getUserInformation() {
            // Axios para recibir lla información del usuario
            axios
                .get(`/profile/${this.username_id}/`)
                .then((response) => {
                    if (response.status === 200) {
                        const info = response.data.user;
                        this.profileInfo = info;
                        this.favoriteRecipes = Object.values(this.profileInfo.list_favorite_recipes);
                        this.ownRecipes = Object.values(this.profileInfo.list_own_recipes);
                        let following = Object.values(this.profileInfo.list_follower_users);
                        if (following.indexOf(this.username) != -1) {
                            this.isFollowing = true;
                        } else {
                            this.isFollowing = false;
                        }
                        console.log(response.data.user)

                    }
                })
                .catch((error) => {
                    this.$router.push('/');
                    console.error("Error al obtener las información del usuario:", error);
                });
        },
        toggleLikedRecipesView(event) {
            event.preventDefault();
            this.showAllLikedRecipes = !this.showAllLikedRecipes;
        },
        toggleOwnRecipesView(event) {
            event.preventDefault();
            this.showAllOwnRecipes = !this.showAllOwnRecipes;
        },
    },
    created() {
        this.username_id = this.$route.params.id;
        if (this.username === "null") {
            this.$router.push('/');
        }
        this.getUserInformation();
    }
};
</script>

<style scoped>
.profileMainContainer {
    height: 100%; /* Utilizar vh (viewport height) para ocupar toda la altura visible */
    width: 100%;
    display: flex;
    flex-direction: column; /* Asegurarse de que sea un contenedor de columna */
    justify-content: space-between; /* Ajustar el espacio entre elementos si es necesario */
}

.profileRecipeContainer {
    margin: 2%;
    width: 96%;
    height: 100%;
}

.profileImageInfoContainer {
    display: flex;
    height: 30%;
    width: 100%;
}

.profileImageContainer {
    width: 300px;
    height: 300px;
}

.squareImageWrapper {
    width: 100%;
}

.squareImageWrapper img {
    width: 300px;
    height: 300px;
}

.profileInfoContainer {
    width: 40%;
    padding-left: 2%;
    display: flex;
    flex-direction: column;
    height: 100%;
}

.profileUsernameContainer {
    width: 100%;
    font-size: xx-large;
    font-family: sans-serif;
    height: 30%;
}

.profileUsernameContainer h3 {
    position: absolute;
    top: 0%;
}

.profileEmailContainer {
    width: 100%;
    font-size: medium;
    height: 25%;
}

.profileEmailContainer h3 {

}

.profileFollowingFollowersContainer {
    width: 100%;
    height: 40%;
    justify-content: space-between;

}

.profileFollowButtonContainer {
    width: 30%;
    height: 100%;
    text-align: end;
}

.profileRecipesUsersContainer {
    width: 100%;
    height: 70%;
    display: flex;
    margin-top: 2%;
}

.profileUsersContainer {
    height: 100%;
    width: 30%;
    border-radius: 2%;
    border: 2px solid gray;
}

.profileRecipesContainer {
    width: 100%;
    height: 80%;
}

.profileOwnRecipesContainer, .profileLikedRecipesContainer {
    flex-wrap: wrap;
    justify-content: space-between;
    width: 100%;
}

.profileOwnRecipesTitleContainer, .profileLikedRecipesTitleContainer {
    text-align: center;
    color: #000000;
    border-bottom: 2px solid #000000;
    width: 100%;
    margin-top: 2%;
}

.profileOwnRecipesTitleContainer h3, .profileLikedRecipesTitleContainer h3 {
    width: 100%;
}

.profileCardRow {
    display: flex;
    flex-wrap: wrap;
    justify-content: center; /* Centrado de los elementos */
    width: 100%;
}

.profileCard {
    border: 1px solid #ccc;
    border-radius: 8px;
    padding: 10px;
    margin: 10px;
    width: calc(20% - 6.7%);
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
}

.seeMore a {
    color: #007bff;
    text-decoration: underline;
    font-weight: bold;
    padding-bottom: 2%;
}

.followButton {
    background-color: #12afdc;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.followButton:hover {
    background-color: #2e80ce;
}

.recipeLikedButton {
    width: 100%;
    text-align: end;
}

@media (max-width: 768px) {
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

.view-more-button {
    background-color: #83d3fc !important;
    color: white !important;
    border: none !important;
    padding: 5px !important;
    cursor: pointer !important;
    font-size: 12px !important;
    transition: background-color 0.3s ease !important;
}

.view-more-button:hover {
    background-color: #6db8f8;
}

.followersPopup {
position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid #ccc;
    padding: 20px;
    max-height: 80%;
    z-index: 999;
    width: 30%;
    max-width: 600px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.followersPopup ul {
    list-style: none;
    padding: 0;
}

.followersPopup ul li {
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc; /* Añade una línea divisoria entre los usuarios */
    padding-bottom: 5px; /* Espaciado entre los usuarios */
}


.followingPopup {
position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: white;
    border: 1px solid #ccc;
    padding: 20px;
    max-height: 80%;
    z-index: 999;
    width: 30%;
    max-width: 600px;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: 10px;
}

.followingPopup ul {
    list-style: none;
    padding: 0;
}

.followingPopup ul li {
    margin-bottom: 10px;
    border-bottom: 1px solid #ccc; /* Añade una línea divisoria entre los usuarios */
    padding-bottom: 5px; /* Espaciado entre los usuarios */
}

.overlay {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5); /* Ajusta el valor alfa para oscurecer */
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 999; /* Asegúrate de que esté por encima de otros elementos */
}

.users {
    height: 90%;
    width: 100%;
    overflow-y: auto; /* Agregamos scroll si el contenido excede el tamaño del popup */
}

.users a {
    color: black;
    cursor: pointer;
    text-decoration: none;
    font-family: sans-serif;
    font-size: larger;
}

.users a:hover {
    text-decoration: underline;
}

.buttonClose {
    height: 10%;
    width: 100%;
    text-align: center;
}

.profileFollowingContainer h3, .profileFollowersContainer h3 {
    color: black;
    cursor: pointer;
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

.close-button {
    position: fixed;
    top: 100px;
    right: 10px;
    z-index: 1000;
}

.profileButtonContainer {
    text-align: center;
}

@media (max-width: 768px) {
    .profileMainContainer {
        padding: 2%; /* Agregar relleno al contenedor principal */
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

    /* Nuevos estilos para los pop-ups */
    .followersPopup,
    .followingPopup {
        width: 90%; /* Modificar el ancho */
        max-width: 100%; /* Ajustar el ancho máximo */
        padding: 10px; /* Modificar el relleno */
    }

    .followersPopup ul li,
    .followingPopup ul li {
        margin-bottom: 5px; /* Reducir el espaciado entre los usuarios */
        padding-bottom: 3px; /* Reducir el espaciado inferior */
        border-bottom: none; /* Eliminar la línea divisoria entre los usuarios */
    }
}
</style>
