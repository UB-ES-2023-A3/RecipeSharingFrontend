<template>
    <div class="button-image-user">
        <div @click="toggleMenu" class="button-image-user">
            <img :src="userImage" alt="Button" class="user-image"/>
        </div>
        <!-- Use v-if to show the menu when isMenuOpen is true -->
        <div v-if="logged && isMenuOpen" class="user-menu">
            <ul>
                <li @click="goToProfile">My Profile</li>
                <li @click="logout">Log Out</li>
            </ul>
        </div>
        <div v-if="!logged && isMenuOpen" class="user-menu">
            <ul>
                <li @click="goToLogin">Log In</li>
            </ul>
        </div>
    </div>
</template>

<script>

import axios from "axios";

export default {
    props: {
        logged: Boolean, // Define the logged property
        username: String,
        email: String,
        password: String,
    },
    data() {
        return {
            isMenuOpen: false, // Controls the visibility of the user menu
            name: "AppHeaderUserButton",
            userImage: require("../assets/images/DefaultUser.jpg"), // User image path
        };
    },
    methods: {
        toggleMenu() {
            this.isMenuOpen = !this.isMenuOpen; // Toggles the user menu
            if (this.isMenuOpen) {
                // Si el menú se abre, agrega un manejador de eventos de clic al documento
                document.addEventListener('click', this.closeMenuOnClickOutside);
            } else {
                // Si el menú se cierra, elimina el manejador de eventos de clic del documento
                document.removeEventListener('click', this.closeMenuOnClickOutside);
            }
        },
        closeMenu() {
            this.isMenuOpen = false;
            document.removeEventListener('click', this.closeMenuOnClickOutside);
        },
        closeMenuOnClickOutside(event) {
            // Cierra el menú si se hace clic en cualquier parte de la pantalla que no sea el botón o el menú.
            const button = this.$el.querySelector('.button-image-user');
            const menu = this.$el.querySelector('.user-menu');
            if (button && !button.contains(event.target) && menu && !menu.contains(event.target)) {
                this.closeMenu();
            }
        },
        goToLogin() {
            this.$router.push('/loginRegister'); // Navigate to the login page
        },
        goToProfile() {
            this.$router.push('/profile');
        },
        async logout() {
            try {
                let response = await axios.post('/loginRegister/', {
                    username: "Logout",
                    email: this.email,
                    password: this.password,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    // Successful login, redirect the user or perform other necessary actions
                }
            } catch (error) {
                if (error.response) {
                    // Handle login failure (e.g., display an error message).
                    if (error.response.status === 400) {
                        alert(error.response.data.error);
                        localStorage.setItem('logged', false);
                        localStorage.setItem('username', null);
                        localStorage.setItem('email', null);
                        localStorage.setItem('password', null);
                        window.location.reload();
                    } else if (error.response.status === 500) {
                        alert("An error occurred while logging in.");
                    } else {
                        // Handle other status codes
                        alert("Unexpected error");
                    }
                } else {
                    // Handle other errors.
                    console.error("An error occurred while logging in.");
                }
            }
        },
    },
};

</script>

<style scoped>

.button-image-user {
    position: absolute;
    top: 0;
    right: 0;
    margin-top: 0.7vh;
    margin-right: 1vh;
}

.user-image {
    width: 7vh;
    height: 7vh;
    border-radius: 50%;
    margin-right: 10px;
}

.user-menu {
    position: absolute;
    top: 60px;
    right: 0;
    background-color: #fff;
    border: 1px solid #ccc;
    border-radius: 4px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    width: 100px;
}

ul {
    list-style: none;
    padding: 0;
    margin: 0;
}

li {
    padding: 10px;
    cursor: pointer;
}

li:hover {
    background-color: #f0f0f0;
}

</style>