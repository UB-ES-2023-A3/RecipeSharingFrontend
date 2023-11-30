<template>
    <div class="mainLoginRegisterContainer">
        <div class="container" id="container">
            <div class="form-container sign-up-container" v-show="!this.showLogin">
                <form class="registerForm" action="#">
                    <h1>Create Account</h1>
                    <input id="registerUsernameInput" type="text" placeholder="Username" v-model="this.registerUsername"
                           @input="this.checkUsername"/>
                    <div class="note">
                        <p>The username must be between 8 and 16 characters.</p>
                    </div>
                    <input id="registerEmailInput" type="email" placeholder="Email" v-model="this.registerEmail"
                           @input="this.checkEmail"/>
                    <div class="note">
                        <p>Only the following domains are valid: example.com, yourdomain.com, gmail.com, hotmail.com</p>
                    </div>
                    <input
                            id="registerPasswordInput"
                            :type="showRegisterPassword ? 'text' : 'password'"
                            placeholder="Password"
                            v-model="this.registerPassword"
                            @input="this.checkPassword"
                    />
                    <div class="input-group-append">
                        <button
                                class="btn btn-primary"
                                type="button"
                                @click="toggleShowRegisterPassword"
                        >
                            <span class="fa" :class="showRegisterPassword ? 'fa-eye' : 'fa-eye-slash'"></span>
                        </button>
                    </div>
                    <div class="note">
                        <p>The password must be at least 8 characters long, contain one uppercase letter, one lowercase
                            letter, one number, and one symbol.</p>
                    </div>
                    <input
                            id="registerPasswordInput"
                            :type="showRegisterPasswordConfirmation ? 'text' : 'password'"
                            placeholder="Password Confirmation"
                            v-model="this.registerPasswordConfirm"
                    />
                    <div class="input-group-append">
                        <button
                                class="btn btn-primary"
                                type="button"
                                @click="toggleShowRegisterPasswordConfirmation"
                        >
                            <span class="fa"
                                  :class="showRegisterPasswordConfirmation ? 'fa-eye' : 'fa-eye-slash'"></span>
                        </button>
                    </div>
                    <div class="password-strength">
                        <p>Password Strength:</p>
                        <div class="password-strength-meter">
                            <div class="password-strength-bar" :style="{ width: registerPasswordStrength + '%' }"></div>
                        </div>
                    </div>
                    <button @click.prevent="this.register">Register</button>
                    <hr>
                </form>
            </div>
            <div class="form-container sign-in-container" v-show="this.showLogin">
                <form class="loginForm" action="#">
                    <h1>Login</h1>
                    <input type="email" placeholder="Username or Email" v-model="this.loginUsernameOrEmail"/>
                    <input
                            id="loginPasswordInput"
                            :type="showLoginPassword ? 'text' : 'password'"
                            placeholder="Password"
                            v-model="this.loginPassword"
                    />
                    <div class="input-group-append">
                        <button
                                class="btn btn-primary"
                                type="button"
                                @click="toggleShowLoginPassword"
                        >
                            <span class="fa" :class="showLoginPassword ? 'fa-eye' : 'fa-eye-slash'"></span>
                        </button>
                    </div>
                    <button @click.prevent="this.login">Login</button>
                </form>
            </div>
            <div class="overlay-container">
                <div class="overlay">
                    <div class="overlay-panel overlay-left">
                        <h1>Welcome Back!</h1>
                        <p>Already have an account? Login and explore!</p>
                        <button class="ghost" id="signIn" @click="togglePanel(false)">Login</button>
                        <router-link to="/"><p>« Return to main page</p></router-link>
                    </div>
                    <div class="overlay-panel overlay-right">
                        <h1>Hello!</h1>
                        <p>Don't have an account yet? Register and start exploring!</p>
                        <button class="ghost" id="signUp" @click="togglePanel(true)">Register</button>
                        <router-link to="/"><p>« Return to main page</p></router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import axios from "axios";

export default {
    data() {
        return {
            loginUsernameOrEmail: "",
            loginUsername: "",
            loginEmail: "",
            loginPassword: "",

            registerUsername: "",
            registerEmail: "",
            registerPassword: "",
            registerPasswordConfirm: "",
            registerPasswordStrength: 0,
            strength: 0,

            showLoginPassword: false,
            showRegisterPassword: false,
            showRegisterPasswordConfirmation: false,

            showLogin: true,
            logged: false,

        }
    },
    methods: {
        togglePanel(isSignUp) {
            const container = document.querySelector('.container');
            const signUpContainer = document.querySelector('.form-container');

            if (isSignUp) {
                container.classList.add('right-panel-active');
                signUpContainer.style.display = '';
                signUpContainer.style.justifyContent = 'none';
                signUpContainer.style.overflow = 'auto';
                this.showLogin = false;
            } else {
                container.classList.remove('right-panel-active');
                signUpContainer.style.display = 'flex';
                signUpContainer.style.justifyContent = 'center'; // You might need to adjust this line
                signUpContainer.style.overflow = '';
                this.showLogin = true;
            }
        },

        toggleShowRegisterPassword() {
            this.showRegisterPassword = !this.showRegisterPassword;
        },
        toggleShowRegisterPasswordConfirmation() {
            this.showRegisterPasswordConfirmation = !this.showRegisterPasswordConfirmation;
        },
        toggleShowLoginPassword() {
            this.showLoginPassword = !this.showLoginPassword;
        },
        checkUsername() {
            const usernameInput = document.getElementById('registerUsernameInput');

            if (this.registerUsername.length !== 0) {
                if (this.registerUsername.length < 8 || this.registerUsername.length > 16) {
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
            const emailInput = document.getElementById('registerEmailInput');

            if (this.registerEmail.length != 0) {
                if (!emailRegex.test(this.registerEmail)) {
                    emailInput.style.border = '1px solid red';
                } else {
                    // Define valid email extensions
                    const validEmailExtensions = ["example.com", "yourdomain.com", "gmail.com", "hotmail.com"];
                    // Split the email to get the domain part
                    const emailParts = this.registerEmail.split("@");
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
            const passwordInput = document.getElementById('registerPasswordInput');

            if (this.registerPassword.length != 0) {
                if (!passwordRegex.test(this.registerPassword)) {
                    passwordInput.style.border = '1px solid red';
                } else {
                    passwordInput.style.border = '';
                }

                // Calculate password strength
                let strength = 0;
                if (this.registerPassword.length >= 8) {
                    strength++;
                }
                if (/[a-z]/.test(this.registerPassword) && /[A-Z]/.test(this.registerPassword)) {
                    strength++;
                }
                if (/\d/.test(this.registerPassword)) {
                    strength++;
                }
                if (/\W|_/.test(this.registerPassword)) {
                    strength++;
                }
                this.registerPasswordStrength = (strength / 4) * 100;
            } else {
                passwordInput.style.border = '';
            }
        },
        async login() {
            // Determine if the input is an email or username
            if (this.loginUsernameOrEmail === 0 || this.loginPassword.length === 0) {
                alert("Complete the form");
                return;
            }
            let loginIdentifier = this.loginUsernameOrEmail;
            if (loginIdentifier.match(/^[A-Za-z0-9._%-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,4}$/)) {
                // If it matches the email format, set it as an email
                this.loginEmail = loginIdentifier;
            } else {
                // Otherwise, set it as a username
                this.loginUsername = loginIdentifier;
            }

            try {
                let response = await axios.post('login/', {
                    username: this.loginUsername,
                    email: this.loginEmail,
                    password: this.loginPassword,
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
                    localStorage.setItem('username', this.loginUsername);
                    this.$emit('login-success', this.logged); // Emit a custom event indicating login success
                    this.$emit('username-success', this.loginUsername);
                    this.$emit('email-success', this.loginEmail);
                    this.$emit('password-success', this.loginPassword);
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
        async register() {
            // Check if passwords match
            if (this.registerUsername.length === 0 || this.registerEmail.length === 0 ||
                this.registerPassword.length === 0 || this.registerPasswordConfirm.length === 0) {
                alert("Complete the form");
                return;
            }
            if (this.registerPassword !== this.registerPasswordConfirm) {
                alert("Passwords do not match");
                return;
            }
            try {
                // Send a registration request to the server
                let response = await axios.post('register/', {
                    username: this.registerUsername,
                    email: this.registerEmail,
                    password: this.registerPassword,
                }, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });

                // Check the HTTP status code in the response
                if (response.status === 200) {
                    // Registration successful, you can handle success here
                    console.log("Registration successful");
                    alert("Registration successful");
                    this.$router.push('/');
                }
            } catch (error) {
                if (error.response) {
                    // Handle network errors
                    if (error.response.status === 400) {
                        // Handle client-side validation errors
                        alert(error.response.data.error);
                    } else if (error.response.status === 500) {
                        // Handle server errors
                        alert("An error occurred while registering.");
                    } else {
                        // Handle other status codes
                        alert("Unexpected error");
                    }
                } else {
                    // Handle other unexpected errors
                    alert("An error occurred while registering.");
                }
            }
        },
    }
}
</script>

<style scoped>
* {
    box-sizing: border-box;
}

body {
    background: #f6f5f7;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    font-family: 'Montserrat', sans-serif;
    height: 100vh;
    margin: -2vh 0 5vh;
}

h1 {
    font-weight: bold;
    margin: 0;
}

h2 {
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

button.ghost {
    background-color: transparent;
    border-color: #FFFFFF;
    margin-bottom: 0.2vh;
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

.loginForm {
    justify-content: center;
}

input {
    background-color: #eee;
    border: none;
    padding: 1.2vh 1.5vh;
    margin: 0.8vh 0;
    width: 100%;
}

.mainLoginRegisterContainer {
    width: 100%;
    height: 100%;
    background-image: url('../assets/images/loginRegisterBG.jpg');
    background-size: cover;
    background-repeat: no-repeat;
    background-position: center;
}

.container {
    background-color: #fff;
    border-radius: 10px;
    box-shadow: 0 14px 28px rgba(0, 0, 0, 0.25),
    0 10px 10px rgba(0, 0, 0, 0.22);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    overflow: hidden;
    width: 80vh;
    max-width: 100%;
    min-height: 70vh;
    display: flex;
    justify-content: center;
    align-items: center;
}

.form-container {
    position: absolute;
    top: 0;
    height: 100%;
    transition: all 0.6s ease-in-out;
}

.sign-in-container {
    left: 0;
    width: 50%;
    z-index: 2;
}

.container.right-panel-active .sign-in-container {
    transform: translateX(100%);
}

.sign-up-container {
    left: 0;
    width: 50%;
    opacity: 0;
    z-index: 1;
}

.container.right-panel-active .sign-up-container {
    transform: translateX(100%);
    opacity: 1;
    z-index: 5;
    animation: show 0.6s;
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

.overlay-container {
    position: absolute;
    top: 0;
    left: 50%;
    width: 50%;
    height: 100%;
    overflow: hidden;
    transition: transform 0.6s ease-in-out;
    z-index: 100;
}

.container.right-panel-active .overlay-container {
    transform: translateX(-100%);
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

.container.right-panel-active .overlay {
    transform: translateX(50%);
}

.overlay-panel {
    position: absolute;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;
    padding: 0 40px;
    text-align: center;
    top: 0;
    height: 100%;
    width: 50%;
    transform: translateX(0);
    transition: transform 0.6s ease-in-out;
}

.overlay-left {
    transform: translateX(-20%);
}

.container.right-panel-active .overlay-left {
    transform: translateX(0);
}

.overlay-right {
    right: 0;
    transform: translateX(0);
}

.container.right-panel-active .overlay-right {
    transform: translateX(20%);
}

.note {
    color: gray;
    font-size: 12px;
    text-align: justify;
}

.password-strength p {
    color: gray;
    text-align: justify;
    font-weight: normal;
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
}

.input-group-append button {
    padding: 0.2vh 0.3vh;
}

.input-group-append button .fa {
    font-size: 14px;
}

</style>