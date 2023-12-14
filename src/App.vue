<template>
    <div id="pages" class="pages-container">
        <div id="header">
            <AppHeader :logged="logged" :username="username" :email="email" :password="password"/>
        </div>
        <div id="content">
            <router-view :logged="logged" :username="username" @login-success="onLoginSuccess"
                         @username-success="onUsernameSuccess" @email-success="onEmailSuccess"
                         @password-sucess="onPasswordSuccess" @profile_image-success="onProfile_imageSuccess"/>
        </div>
    </div>
</template>

<script>
import AppHeader from "./components/AppHeader.vue";

export default {
    components: {
        AppHeader,
    },
    data() {
        return {
            logged: localStorage.getItem('logged') === 'true',
            username: localStorage.getItem('username'),
            email: localStorage.getItem('email'),
            password: localStorage.getItem('password'),
            profile_image: localStorage.getItem('profile_image'),
        };
    },
    methods: {
        onLoginSuccess(logged) {
            this.logged = logged;
            localStorage.setItem('logged', logged);
        },
        onUsernameSuccess(username) {
            this.username = username;
            localStorage.setItem('username', username);
        },
        onEmailSuccess(email) {
            this.email = email;
            localStorage.setItem('email', email);
        },
        onPasswordSuccess(password) {
            this.password = password;
            localStorage.setItem('password', password);
        },
        onProfile_imageSuccess(profile_image) {
            this.profile_image = profile_image;
            localStorage.setItem('profile_image', profile_image);
        },
    },
};
</script>

<style scoped>
.pages-container {
    position: absolute;
    top: 10vh;
    left: 0;
    width: 100%;
    height: 90%;
    z-index: 1; /* Asegura que el contenido esté detrás del encabezado */
}

#header {
    position: fixed;
    z-index: 2; /* Asegura que el encabezado esté por encima del contenido */
}
</style>