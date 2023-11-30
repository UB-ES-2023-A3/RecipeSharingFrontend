<template>
    <div id="pages" class="pages-container">
        <router-view :logged="logged" :username="username" @login-success="onLoginSuccess"
                     @username-success="onUsernameSuccess" @email-success="onEmailSuccess"
                     @password-sucess="onPasswordSuccess"/>
    </div>
    <div id="header">
        <AppHeader :logged="logged" :username="username" :email="email" :password="password"/>
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
    },
};
</script>

<style scoped>
.pages-container {
    position: absolute;
    top: 10vh;
    left: 0;
    width: 100%;
    height: 90%
}
</style>