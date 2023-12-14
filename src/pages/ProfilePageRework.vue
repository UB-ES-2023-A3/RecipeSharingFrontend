<template>
    <div class="profileMainContainer" v-if="this.profileInfo">
        <div class="profileRecipeContainer">
            <div class="profileImageInfoContainer">
                <div class="profileImageContainer">
                    <div class="squareImageWrapper">
                        <img :src="this.profileInfo.profile_image" alt="Recipe Image">
                    </div>
                </div>
                <div class="profileInfoContainer">
                    <div class="profileEditButtonContainer" v-if="this.username === this.username_id">
                        <button class="editButton" @click="openEditDialog">
                            Edit Profile
                        </button>
                    </div>
                    <div class="profileUsernameContainer">
                        <h3> {{ this.profileInfo.username }} </h3>
                    </div>
                    <div class="profileEmailContainer" v-if="this.username === this.username_id">
                        <h3> {{ this.profileInfo.email }}</h3>
                    </div>
                    
                    <div class="profileFollowingFollowersContainer">
                        <div class="profileFollowingContainer" @click="showFollowingPopup"
                             v-if="this.profileInfo.list_following_users">
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
                        <div class="profileFollowersContainer" @click="showFollowersPopup"
                             v-if="this.profileInfo.list_follower_users">
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
                            </div>
                        </div>
                    </div>
                </div>
                <div class="profileFollowButtonContainer" v-if="this.username !== this.username_id">
                    <button class="followButton" @click="follow">
                        {{ isFollowing ? 'Unfollow' : 'Follow' }}
                    </button>
                </div>
                <div v-if="showDialog" class="profile-dialog" style="overflow: auto;">
                    <div class="modal-dialog">
                        <div class="modal-content" style="background-color: white;">
                            <div class="modal-header">
                                <h2 class="modal-title">Edit Profile</h2>
                            </div>
                            <!-- Modal Body -->
                            <div class="modal-body">
                                <form class="editForm" action="#" title="Edit Profile">
                                    <div class="comment">
                                        <p style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-weight: bold;">Current Username:</p>
                                        <p style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">{{ this.username }}</p>
                                    </div>
                                    <input id="editUsernameInput" type="text" placeholder="Username" v-model="this.newUsername" text="this.username"
                                        @input="this.checkUsername"/>
                                    <div class="note">
                                        <p>The username must be between 8 and 16 characters.</p>
                                    </div>
                                    <div class="comment">
                                        <p style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-weight: bold;">Current Email:</p>
                                        <p style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">{{ this.userEmail }}</p>
                                    </div>
                                    <input id="editEmailInput" type="email" placeholder="Email" v-model="this.newEmail"
                                        @input="this.checkEmail"/>
                                    <div class="note">
                                        <p>Only the following domains are valid: example.com, yourdomain.com, gmail.com, hotmail.com</p>
                                    </div>
                                    <div class="comment">
                                        <p style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif; font-weight: bold;">Current Password:</p>
                                        <p style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">{{ this.userPassword }}</p>
                                    </div>
                                    <input
                                            id="editPasswordInput"
                                            :type="showEditPassword ? 'text' : 'password'"
                                            placeholder="Password"
                                            v-model="this.newPassword"
                                            @input="this.checkPassword"
                                    />
                                    <div class="input-group-append">
                                        <button
                                                class="btn btn-primary"
                                                type="button"
                                                @click="toggleShowEditPassword"
                                        >
                                            <span class="fa" :class="showEditPassword ? 'fa-eye' : 'fa-eye-slash'"></span>
                                        </button>
                                    </div>
                                    <div class="note">
                                        <p>The password must be at least 8 characters long, contain one uppercase letter, one lowercase
                                            letter, one number, and one symbol.</p>
                                    </div>
                                    <input
                                            id="editPasswordInputConfirm"
                                            :type="showEditPasswordConfirmation ? 'text' : 'password'"
                                            placeholder="Password Confirmation"
                                            v-model="this.newPasswordConfirm"
                                    />
                                    <div class="input-group-append">
                                        <button
                                                class="btn btn-primary"
                                                type="button"
                                                @click="toggleShowEditPasswordConfirmation"
                                        >
                                            <span class="fa"
                                                :class="showEditPasswordConfirmation ? 'fa-eye' : 'fa-eye-slash'"></span>
                                        </button>
                                    </div>
                                    <div class="password-strength">
                                        <p>Password Strength:</p>
                                        <div class="password-strength-meter">
                                            <div class="password-strength-bar" :style="{ width: editPasswordStrength + '%' }"></div>
                                        </div>
                                    </div>

                                    <!-- Upload Image Field -->
                                    <div class="form-group" style="padding-top: 10px;">
                                        <label for="image_label" style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Upload Image:</label>
                                        <div style="display: flex; align-items: center; padding-top: 10px;">
                                            <label for="image" style="background-color: #7f9ccb;
                                            padding: 5px 10px;
                                            border-radius: 5px;
                                            border: 1px ridge black;
                                            font-size: 0.8rem;
                                            height: auto;
                                            font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
                                            width: 85px;">Choose Image</label>
                                            <input type="file" id="image" accept="image/*" @change="handleImageUpload" ref="fileInput" style="display: none;">
                                        </div>
                                        <div v-if="new_profile_image" class="image-container" style="padding: 2px; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
                                            <div v-if="new_profile_image" style="padding-top: 2px; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
                                                File Name: {{ file_name }} | Image Size: {{ formatBytes(imageSize) }}
                                            </div>
                                            <img :src="new_profile_image" alt="Recipe Image" style="padding-top: 3px; max-width: 100%; max-height: 100%; padding-bottom: 2px;"/>
                                            <button @click="removeImage" class="remove-button">Remove Image</button>
                                        </div>
                                        <div v-if="imageSizeError">Image size exceeds the allowed limit.</div>
                                    </div>
                                    <button @click.prevent="this.editProfile" style="border: 1px solid #2ba3ff; background-color: #2ba3ff;">Edit</button>
                                    <button @click.prevent="this.closeDialog">Close</button>
                                    <hr>
                                    
                                </form>
                            </div>
                        </div>
                    </div>
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
                                    <img :src="recipe.recipe_image" alt="Recipe Image">
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
                                    <img :src="recipe.recipe_image" alt="Recipe Image">
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
            profile_image: "",

            showPopupFollower: false,
            showPopupFollowing: false,
            showDialog: false,
            
            newUsername: '',
            newEmail: '',
            newPassword: '',
            newPasswordConfirm: '',
            showPassword: false,
            editPasswordStrength: 0,
            showEditPassword: false,
            showEditPasswordConfirmation: false,
            userPassword: '',
            userEmail: '',

            new_profile_image: "",
            imageSizeError: false,
            maxSizeInBytes: 1024 * 1024,
            imageSize: 0,
            file_name: "",
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
        usernameChanged() {
            return this.newUsername !== this.username && this.newUsername.length !== 0;
        },
        emailChanged() {
            return this.newEmail !== this.userEmail && this.newEmail.length !== 0;
        },
        passwordChanged() {
            return this.newPassword !== this.userPassword && this.newPassword.length !== 0;
        },
        imageChanged() {
            return this.profile_image !== this.new_profile_image && this.new_profile_image.length !== 0;
        },
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
        editProfile() {
            axios
                .post(`/profile/${this.username_id}/`, {
                    username: this.usernameChanged() ? this.newUsername : this.username_id,
                    email: this.emailChanged() ? this.newEmail : this.userEmail,
                    password: this.passwordChanged() ? this.newPassword : this.userPassword,
                    profile_image: this.imageChanged() ? this.new_profile_image : this.profile_image

                }).then((response) => {
                if (response.status === 200) {
                    this.username_id = this.usernameChanged() ? this.newUsername : this.username_id;
                    this.userEmail = this.emailChanged() ? this.newEmail : this.userEmail;
                    this.userPassword = this.passwordChanged() ? this.newPassword : this.userPassword;
                    this.profile_image = this.imageChanged() ? this.new_profile_image : this.profile_image;

                    this.closeDialog();
                    localStorage.setItem('username', this.username_id);
                    this.$emit('username-success', this.username_id);

                    localStorage.setItem('email', this.userEmail);
                    this.$emit('email-success', this.userEmail);
                    localStorage.setItem('profile_image', this.profile_image);
                    this.$emit('profile_image-success', this.profile_image);

                    this.$router.push(`/profiles/${this.username_id}/`);

                    this.profileInfo.username = this.username_id;
                    this.profileInfo.email = this.userEmail;
                    this.profileInfo.profile_image = this.profile_image;
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
                        this.userEmail = info.email;
                        this.favoriteRecipes = Object.values(this.profileInfo.list_favorite_recipes);
                        this.ownRecipes = Object.values(this.profileInfo.list_own_recipes);
                        if (info.profile_image) {
                            this.profile_image = info.profile_image;
                        } else {
                            const response = require('@/assets/images/DefaultUser.jpg')
                        }

                        this.profile_image = info.profile_image;
                        let following = Object.values(this.profileInfo.list_follower_users);
                        if (following.indexOf(this.username_id) != -1) {
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
        openEditDialog() {
            this.showDialog = true;
            this.userPassword = localStorage.getItem('password');
        },
        closeDialog() {
            this.showDialog = false;
            
        },
        checkUsername() {
            const usernameInput = document.getElementById('editUsernameInput');

            if (this.newUsername.length !== 0) {
                if (this.newUsername.length < 8 || this.newUsername.length > 16) {
                    usernameInput.style.border = '1px solid red';
                } else {
                    usernameInput.style.border = '';
                }
            } else {
                usernameInput.style.border = '';
            }
        },
        checkEmail() {
            // Check the validity of the entered email
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            const emailInput = document.getElementById('editEmailInput');

            if (this.newEmail.length != 0) {
                if (!emailRegex.test(this.newEmail)) {
                    emailInput.style.border = '1px solid red';
                } else {
                    // Define valid email extensions
                    const validEmailExtensions = ["example.com", "yourdomain.com", "gmail.com", "hotmail.com"];
                    // Split the email to get the domain part
                    const emailParts = this.newEmail.split("@");
                    const emailExtension = emailParts[1];
                    // Check if the email extension is valid
                    if (!validEmailExtensions.includes(emailExtension)) {
                        emailInput.style.border = '1px solid red';
                    } else {
                        emailInput.style.border = '';
                    }
                }
            }
        },
        checkPassword() {
            // Check the validity and strength of the entered password
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
            const passwordInput = document.getElementById('editPasswordInput');

            if (this.newPassword.length != 0) {
                if (!passwordRegex.test(this.newPassword)) {
                    passwordInput.style.border = '1px solid red';
                } else {
                    passwordInput.style.border = '';
                }

                // Calculate password strength
                let strength = 0;
                if (this.newPassword.length >= 8) {
                    strength++;
                }
                if (/[a-z]/.test(this.newPassword) && /[A-Z]/.test(this.newPassword)) {
                    strength++;
                }
                if (/\d/.test(this.newPassword)) {
                    strength++;
                }
                if (/\W|_/.test(this.newPassword)) {
                    strength++;
                }
                this.editPasswordStrength = (strength / 4) * 100;
            } else {
                passwordInput.style.border = '';
            }
        },
        toggleShowEditPassword() {
            this.showEditPassword = !this.showEditPassword;
        },
        toggleShowEditPasswordConfirmation() {
            this.showEditPasswordConfirmation = !this.showEditPasswordConfirmation;
        },
        handleImageUpload(event) {
            const file = event.target.files[0];
            if (file) {
                this.file_name = file.name;
                const reader = new FileReader();
                reader.onload = (e) => {
                    this.new_profile_image = e.target.result;
                };
                this.imageSize = file.size;
                reader.readAsDataURL(file);
            }
        },
        removeImage() {
            this.new_profile_image = null;
            this.$refs.fileInput.value = null;
        },isBase64ImageTooLarge(base64String, maxSizeInBytes) {
            // Remove data URI prefix
            const base64WithoutPrefix = base64String.split(',')[1];
            const bytes = atob(base64WithoutPrefix).length;
            return bytes > maxSizeInBytes;
        },
        formatBytes(bytes, decimals = 2) {
            if (bytes === 0) return '0 Bytes';
            const k = 1024;
            const dm = decimals < 0 ? 0 : decimals;
            const sizes = ['Bytes', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'];
            const i = Math.floor(Math.log(bytes) / Math.log(k));
            return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + ' ' + sizes[i];
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
    align-content: space-around;
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

.editButton {
    background-color: #12afdc;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
    font-size: 20px;
}

.editButton:hover {
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
    background-color: rgb(239, 77, 77);
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

.profile-dialog {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgb(239, 203, 135);
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-dialog {
  border-radius: 10px;
  padding: 20px;
  padding-top: 300px;
  position: center;
}

.modal-header {
  font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
  padding-top: 10px;
  position: center;
  text-align: center;
}

a {
    color: #FFFFFF;
    font-size: 14px;
    text-decoration: none;
    margin: 1.5vh 0;
}

a:hover {
    text-decoration: underline;
    font-weight: bold;
}

button {
    border-radius: 20px;
    border: 1px solid #FF4B2B;
    background-color: #FF4B2B;
    color: #FFFFFF;
    font-size: 12px;
    padding-top: 5px;
    font-weight: bold;
    padding: 1.2vh 4.5vh;
    letter-spacing: 1px;
    text-transform: uppercase;
    transition: transform 80ms ease-in;
}

button:active {
    transform: scale(0.95);
}

button:focus {
    outline: none;
}

form {
    background-color: #FFFFFF;
    display: flex;
    align-items: center;
    flex-direction: column;
    padding: 0 5vh;
    height: 100%;
    text-align: center;
}

input {
    background-color: #eee;
    border: none;
    padding: 1.2vh 1.5vh;
    margin: 0.8vh 0;
    width: 100%;
}

@keyframes show {
    0%, 49.99% {
        opacity: 0;
        z-index: 1;
    }

    50%, 100% {
        opacity: 1;
        z-index: 5;
    }
}

.overlay {
    background: #FF416C;
    background: -webkit-linear-gradient(to right, #FF4B2B, #FF416C);
    background: linear-gradient(to right, #FF4B2B, #FF416C);
    background-repeat: no-repeat;
    background-size: cover;
    background-position: 0 0;
    color: #FFFFFF;
    position: relative;
    left: -100%;
    height: 100%;
    width: 200%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.note {
    color: gray;
    font-size: 12px;
    text-align: justify;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.password-strength p {
    color: gray;
    text-align: justify;
    font-weight: normal;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.password-strength {
    font-weight: bold;
    width: 100%;
    margin: 0.8vh 0;
}

.password-strength-meter {
    height: 1vh;
    background-color: #ccc;
    border-radius: 5px;
    margin-top: 1vh;
    overflow: hidden;
}

.password-strength-bar {
    height: 100%;
    background-color: #4CAF50;
    width: 0;
    transition: width 0.3s;
}

.input-group-append {
    width: 100%;
    text-align: justify;
    font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;
}

.input-group-append button {
    padding: 0.2vh 0.3vh;
}

.input-group-append button .fa {
    font-size: 14px;
}

.remove-button {
  position: bottom;
  top: 5px;
  right: 5px;
  background-color: red;
  color: white;
  border: 1px solid black;
  padding: 5px;
  cursor: pointer;
}
.image-container {
  position: relative;
}
.file-name {
  margin-left: 10px;
}

</style>
