<template>
    <div id="registerMainContainer">
        <div id="registerCenteredContainer">
            <div id="register">
                <form @submit.prevent="register" class="registerForm">
                    <label for="username">Username:</label>
                    <!-- AppTextField component for username input -->
                    <AppTextField
                            :defaultMessage="defaultMessageUsername"
                            @update:textValue="username = $event"
                            @input="checkUsername"
                    />
                    <div class="note">
                        <p>The username must be between 8 and 16 characters.</p>
                    </div>
                    <p v-if="usernameError" class="error">This username is not valid</p>
                    <label for="email">Email:</label>
                    <!-- AppTextField component for email input -->
                    <AppTextField
                            :defaultMessage="defaultMessageEmail"
                            @update:textValue="email = $event"
                            @input="checkEmail"
                    />
                    <div class="note">
                        <p>Only the following domains are valid: example.com, yourdomain.com, gmail.com, hotmail.com</p>
                    </div>
                    <p v-if="emailError" class="error">This email extension is not valid</p>
                    <label for="password">Password:</label>
                    <!-- AppTextFieldPassword component for password input -->
                    <AppTextFieldPassword
                            :defaultMessage="defaultMessagePassword"
                            @update:textValue="password = $event"
                            @input="checkPassword"
                    />
                    <div class="note">
                        <p>The password must be at least 8 characters long, contain one uppercase letter, one lowercase
                            letter, one number, and one symbol.</p>
                    </div>
                    <p v-if="passwordError" class="error">This password is not valid</p>
                    <label for="confirmPassword">Confirm Password:</label>
                    <!-- AppTextFieldPassword component for password confirmation input -->
                    <AppTextFieldPassword
                            :defaultMessage="defaultMessagePasswordCheck"
                            @update:textValue="confirmPassword = $event"
                    />
                    <br>
                    <div class="password-strength">
                        Password Strength:
                        <div class="password-strength-meter">
                            <div class="password-strength-bar" :style="{ width: passwordStrength + '%' }"></div>
                        </div>
                    </div>
                    <button type="submit" class="submit-button">Register</button>
                </form>
            </div>
            <div id="registerRight">
                <div class="registerTitle">
                    Register
                </div>
                <hr>
                <div class="registerRightForm">
                    <!-- Router link to navigate to the login page if the user already has an account -->
                    <router-link to="/login">Already have an account? Log in</router-link>
                    <hr>
                    <router-link to="/">« Go back to the main page</router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import '../assets/styles/appStyles.css';
import AppTextField from "@/components/AppTextField.vue";
import AppTextFieldPassword from "@/components/AppTextFieldPassword.vue";
import axios from 'axios';

export default {
    name: "RegisterPage",
    components: {AppTextField, AppTextFieldPassword},
    data() {
        return {
            // Data properties for username, email, password, and more
            username: "",
            usernameError: false,
            email: "",
            emailError: false,
            password: "",
            passwordError: false,
            confirmPassword: "",
            passwordStrength: 0,
            defaultMessageUsername: "Introduce your username",
            defaultMessageEmail: "Introduce your email",
            defaultMessagePassword: "Introduce your password",
            defaultMessagePasswordCheck: "Introduce your password again",
        };
    },
    methods: {
        checkUsername() {
            this.usernameError = this.username.length < 8 || this.username.length > 16;
        },
        checkEmail() {
            // Check the validity of the entered email
            const emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
            if (!emailRegex.test(this.email)) {
                this.emailError = true;
            } else {
                // Define valid email extensions
                const validEmailExtensions = ["example.com", "yourdomain.com", "gmail.com", "hotmail.com"];
                // Split the email to get the domain part
                const emailParts = this.email.split("@");
                const emailExtension = emailParts[1];
                // Check if the email extension is valid
                this.emailError = !validEmailExtensions.includes(emailExtension);
            }
        },
        checkPassword() {
            // Check the validity and strength of the entered password
            const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[\W_]).{8,}$/;
            this.passwordError = !passwordRegex.test(this.password);

            // Calculate password strength
            let strength = 0;
            if (this.password.length >= 8) {
                strength++;
            }
            if (/[a-z]/.test(this.password) && /[A-Z]/.test(this.password)) {
                strength++;
            }
            if (/\d/.test(this.password)) {
                strength++;
            }
            if (/\W|_/.test(this.password)) {
                strength++;
            }
            this.passwordStrength = (strength / 4) * 100;
        },
        clearForm() {
            this.username = "";
            this.email = "";
            this.password = "";
            this.confirmPassword = "";
        },
        async register() {
            // Check if passwords match
            if (this.username.length === 0 || this.email.length === 0 ||
                this.password.length === 0 || this.confirmPassword.length === 0) {
                alert("Complete the form");
                return;
            }
            if (this.password !== this.confirmPassword) {
                alert("Passwords do not match");
                return;
            }
            try {
                // Send a registration request to the server
                let response = await axios.post('/register/', {
                    username: this.username,
                    email: this.email,
                    password: this.password,
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
    },
};

</script>

<style scoped>

#registerMainContainer {
    display: flex;
    align-items: center;
    justify-content: center;

    margin: 0;
    padding: 0;
    min-width: 100vw;
    min-height: 100vh;

    background-position: center;
    background-size: cover;
}

#registerCenteredContainer {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: row;

    min-width: 380px;
    max-width: 900px;
    width: 90%;

    margin-top: 5%;
    margin-bottom: 5%;

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

#register {
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

#registerRight {
    text-align: center;
    width: 100%;

    padding: 20px 20px 20px 50px;
    box-sizing: border-box;
}

.registerTitle {
    font-size: 500%;
    color: #ffffff;
}

hr {
    border-top: 1px solid #df8500;
    border-bottom: 1px solid #ffbf00;

}

.registerRightForm {
    font-size: 90%;
    text-align: center;
    margin-top: 15px;
    color: #ffffff;
}

.registerRightForm a {
    display: block;
    text-decoration: none;
    color: #e7d6c6;
    margin-bottom: 3px;
    font-size: 120%;
}

.registerRightForm a:hover {
    color: #ffffff;
}

#register button {
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

#register button:hover {
    background-color: #ff8c00;
    color: #ffffff;
}

@media all and (max-width: 775px) {
    #registerMainContainer {
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

    #register {
        margin: 0 auto;
    }

    #registerRight {
        padding: 20px 20px 20px 20px;
    }
}

.password-strength {
    font-weight: bold;
}

.password-strength-meter {
    height: 10px;
    background-color: #ccc;
    border-radius: 5px;
    margin-top: 10px;
    overflow: hidden;
}

.password-strength-bar {
    height: 100%;
    background-color: #4CAF50;
    width: 0;
    transition: width 0.3s;
}

</style>