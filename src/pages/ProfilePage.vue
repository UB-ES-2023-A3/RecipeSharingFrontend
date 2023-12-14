<template>
  <div class="mainContainer">
    <div class="secondaryContainer">
      <div class="titleContainerHP">
        <div class="mainTitleHP">
          <h1> Username </h1>
        </div>
      </div>
      <h3 class="profileInfo">{{ this.profileInfo.username }}</h3>
    </div>
    <div class="secondaryContainer">
      <div class="titleContainerHP">
        <div class="mainTitleHP">
          <h1> Email </h1>
        </div>
      </div>
      <h3 class="profileInfo">{{ this.profileInfo.email }}</h3>
    </div>
    <div class="secondaryContainer">
      <div class="titleContainerHP">
        <div class="mainTitleHP">
          <h1> Favorite Recipes </h1>
        </div>
      </div>
      <AppCardCarousel
        :recipes="this.favoriteRecipes"
        :visibleRecipes="8"
        :logged="this.logged"
        :username="this.username"
        v-if="favoriteRecipes.length > 0"
      ></AppCardCarousel>
    </div>
    <div class="secondaryContainer">
      <div class="titleContainerHP">
        <div class="mainTitleHP">
          <h1> Own Recipes </h1>
        </div>
      </div>
      <AppCardCarousel
        :recipes="this.ownRecipes"
        :visibleRecipes="8"
        :logged="this.logged"
        :username="this.username"
        v-if="ownRecipes.length > 0"
      ></AppCardCarousel>
    </div>
  </div>
</template>


<script>
import '../assets/styles/appStyles.css';
import axios from 'axios';
import AppCardCarousel from '@/components/AppCardCarousel.vue';

export default {
    name: "HomePage.vue",

    components: {AppCardCarousel},
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
        };
    },
    methods: {
        getUserInformation() {
            // Axios para recibir lla información del usuario
            axios
                .get(`user/${this.username}/`)
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
