<template>
    <div id="loginMainContainer">
        <div id="loginCenteredContainer">
            <div id="login">
                <form @submit.prevent="login" id="loginForm">
                    <label for="usernameOrEmail">Username or Email:</label>
                    <!-- AppTextField component for username or email input -->
                    <AppTextField
                            :defaultMessage="defaultMessageUsernameOrEmail"
                            @update:textValue="usernameOrEmail = $event"
                    />
                    <label for="password">Password:</label>
                    <!-- AppTextFieldPassword component for password input -->
                    <AppTextFieldPassword
                            :defaultMessage="defaultMessagePassword"
                            @update:textValue="password = $event"
                    />
                    <button type="submit">Login</button>
                </form>
            </div>
            <div id="loginRight">
                <div class="loginTitle">
                    Login
                </div>
                <hr>
                <div class="loginRightForm">
                    <router-link to="/register">Don't have an account? Register here</router-link>
                    <hr>
                    <router-link to="/">« Return</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import '../assets/styles/appStyles.css';
import AppTextField from "@/components/AppTextField.vue";
import axios from 'axios';
import AppTextFieldPassword from "@/components/AppTextFieldPassword.vue"

export default {
    name: "LoginPage",
    components: {AppTextFieldPassword, AppTextField},
    data() {
        return {
            // Data properties for username, email, password, and more
            usernameOrEmail: "",
            password: "",
            username: "",
            email: "",
            defaultMessageUsernameOrEmail: "Enter your username or email",
            defaultMessagePassword: "Enter your password",
            logged: false, // A flag to indicate if the user is logged in
        };
    },
    methods: {
        async login() {
            // Determine if the input is an email or username
            if (this.usernameOrEmail === 0 || this.password.length === 0) {
                alert("Complete the form");
                return;
            }
            let loginIdentifier = this.usernameOrEmail;
            if (loginIdentifier.match(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
                // If it matches the email format, set it as an email
                this.email = loginIdentifier;
            } else {
                // Otherwise, set it as a username
                this.username = loginIdentifier;
            }

            try {
                let response = await axios.post('login/', {
                    username: this.username,
                    email: this.email,
                    password: this.password,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                if (response.status === 200) {
                    // Successful login, perform necessary actions
                    alert("Logged!") // Display a success message
                    this.logged = true; // Set the logged flag to true
                    localStorage.setItem('logged', this.logged); // Store the logged status in local storage
                    localStorage.setItem('username', this.username);
                    this.$emit('login-success', this.logged); // Emit a custom event indicating login success
                    this.$emit('username-success', this.username);
                    this.$emit('email-success', this.email);
                    this.$emit('password-success', this.password);
                    this.$router.push('/'); // Redirect to the home page
                }
            } catch (error) {
                if (error.response) {
                    // Handle login failure (e.g., display an error message).
                    if (error.response.status === 400) {
                        alert(error.response.data.error);
                    } else if (error.response.status === 500) {
                        alert("An error occurred while registering.");
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
    }
};

</script>

<style scoped>

#loginMainContainer {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0;
    padding: 0;
    min-width: 100vw;
    min-height: 100vh;
    width: 100%;
    height: 100%;

    background-position: center;
    background-size: cover;
}

#loginCenteredContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    min-width: 380px;
    max-width: 900px;
    width: 90%;

    background-color: #f39a3d;

    border-radius: 10px 10px 10px 10px;
    -moz-border-radius: 10px 10px 10px 10px;
    -webkit-border-radius: 10px 10px 10px 10px;

    -webkit-box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.15);

    padding: 30px;
    box-sizing: border-box;
}

#login {
    width: 100%;
    padding: 30px 30px 50px 30px;
    background-color: #efb378;

    -webkit-box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.15);
    -moz-box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.15);
    box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.15);

    -webkit-border-radius: 3px 3px 3px 3px;

    box-sizing: border-box;

    opacity: 1;
}

#loginRight {
    text-align: center;
    width: 100%;

    padding: 20px 20px 20px 50px;
    box-sizing: border-box;
}

.loginTitle {
    font-size: 500%;
    color: #ffffff;
}

hr {
    border-top: 1px solid #df8500;
    border-bottom: 1px solid #ffbf00;

}

.loginRightForm {
    font-size: 90%;
    text-align: center;
    margin-top: 15px;
    color: #ffffff;
}

.loginRightForm a {
    display: block;
    text-decoration: none;
    color: #e7d6c6;
    margin-bottom: 3px;
    font-size: 120%;
}

.loginRightForm a:hover {
    color: #ffffff;
}

#login button {
    font-family: 'Overpass', sans-serif;
    font-size: 110%;
    color: #e7d6c6;
    width: 100%;
    height: 40px;
    border: none;

    border-radius: 3px 3px 3px 3px;
    -moz-border-radius: 3px 3px 3px 3px;
    -webkit-border-radius: 3px 3px 3px 3px;

    background-color: #ffa500;

    margin-top: 10px;
}

#login button:hover {
    background-color: #ff8c00;
    color: #ffffff;
}

@media all and (max-width: 775px) {
    #loginMainContainer {
        flex-direction: column-reverse;

        min-width: 380px;
        max-width: 900px;
        width: 90%;

        background-color: #5f6769;

        border-radius: 10px 10px 10px 10px;
        -moz-border-radius: 10px 10px 10px 10px;
        -webkit-border-radius: 10px 10px 10px 10px;

        -webkit-box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.15);
        -moz-box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.15);
        box-shadow: 0px 0px 5px 5px rgba(0, 0, 0, 0.15);

        padding: 30px;
        box-sizing: border-box;
    }

    #login {
        margin: 0 auto;
    }

    #loginRight {
        padding: 20px 20px 20px 20px;
    }
}

</style>
