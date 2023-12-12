<template>
    <div class="mainContainer" style="color: black">
        <div class="form-background">
            <div class="mainTitle" style="color: #ff5733">
                <h1>Add Recipe</h1>
            </div>
            <form @submit.prevent="addRecipe" class="form">
                <!-- Recipe Name Field -->
                <div class="form-group">
                    <label for="recipeName">Name of the recipe:</label>
                    <!-- AppTextField component for recipe name -->
                    <AppTextField
                            :defaultMessage="defaultMessageRecipe"
                            v-model="recipeName"
                            @update:textValue="handleTextFieldValueUpdate"
                    />
                </div>

                <!-- Ingredients Field -->
                <div class="form-group">
                    <label for="ingredients">Ingredients:</label>
                    <!-- DropdownSelect component for selecting ingredients -->
                    <DropdownSelect
                            :options="ingredientsList"
                            v-model="selectedIngredients"
                            label="an ingredient"
                            groupTitle="Selected Ingredients"
                            @update:selectedValue="handleIngredientsUpdate"
                            :choose="true"
                    />
                </div>

                <!-- Instructions Field -->
                <div class="form-group">
                    <label for="instructions">Instructions:</label>
                    <!-- TextArea component for providing recipe instructions -->
                    <TextArea
                            :defaultMessage="defaultMessageInstructions"
                            v-model="instructions"
                            @update:textValue="handleInstructionsUpdate"
                    ></TextArea>
                </div>

                <!-- Recipe Type Field -->
                <div class="form-group">
                    <label for="recipeType">Type of recipe:</label>
                    <!-- DropdownSelect component for selecting the recipe type -->
                    <DropdownSelect
                            :options="recipeTypes"
                            v-model="selectedRecipeType"
                            label="Recipe type"
                            groupTitle="Selected Type"
                            @update:selectedValue="handleTypesUpdate"
                            :choose="true"
                    />
                </div>

                <!-- Allergens Field -->
                <div class="form-group">
                    <label for="allergens">Allergens:</label>
                    <!-- DropdownSelect component for selecting allergens -->
                    <DropdownSelect
                            :options="allergensList"
                            v-model="selectedAllergens"
                            label="an allergen"
                            groupTitle="Selected Allergens"
                            @update:selectedValue="handleAllergensUpdate"
                            :choose="true"
                    />
                </div>

                <!-- Preparation Time Field -->
                <div class="form-group">
                    <label for="preparationTime">Preparation time:</label>
                    <!-- DropdownSelect component for selecting preparation time -->
                    <DropdownSelect
                            :options="preparationTimeOptions"
                            v-model="preparationTime"
                            label="preparation time"
                            groupTitle="Selected Preparation Time"
                            @update:selectedValue="handleTimeUpdate"
                            :choose="false"
                    />
                </div>

                <!-- Servings Field -->
                <div class="form-group">
                    <label for="servings">Servings:</label>
                    <input type="number" id="servings" v-model="servings" class="full-width-dropdown" min="1" max="10">
                </div>

                <!-- Upload Image Field -->
                <div class="form-group">
                    <label for="image_label" style="font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">Upload Image:</label>
                    <div style="display: flex; align-items: center;">
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
                    <div v-if="recipe_image" class="image-container" style="padding: 2px; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
                        <div v-if="recipe_image" style="padding-top: 2px; font-family: 'Gill Sans', 'Gill Sans MT', Calibri, 'Trebuchet MS', sans-serif;">
                            File Name: {{ file_name }} | Image Size: {{ formatBytes(imageSize) }}
                        </div>
                        <img :src="recipe_image" alt="Recipe Image" style="padding-top: 3px; max-width: 100%; max-height: 100%; padding-bottom: 2px;"/>
                        <button @click="removeImage" class="remove-button">Remove Image</button>
                    </div>
                    <div v-if="imageSizeError">Image size exceeds the allowed limit.</div>
                </div>
                <!-- Error Message Display -->
                <div class="error-message" v-if="showErrorMessage">
                    {{ errorMessage }}
                </div>

                <!-- Submit Button -->
                <div class="secondaryContainer" style="background-color: white">
                    <button type="submit" class="submit-button">Add Recipe</button>
                </div>
            </form>
        </div>
    </div>
</template>

<script>

import AppTextField from "@/components/AppTextField.vue";
import DropdownSelect from "@/components/AppDropdownSelect.vue";
import TextArea from "@/components/AppTextArea.vue";
import axios from "axios";
import ingredientsData from "@/assets/lists/Ingredients.json";
import allergensData from "@/assets/lists/Allergens.json";
import typesData from "@/assets/lists/Types.json";
import prepTimeData from "@/assets/lists/prepTime.json";

export default {
    components: {AppTextField, DropdownSelect, TextArea},
    data() {
        return {
            username: "",
            recipe_image: "",
            recipeName: "",
            selectedIngredients: "",
            instructions: "",
            selectedRecipeType: "",
            selectedAllergens: "",
            preparationTime: "",
            servings: "",
            defaultMessageRecipe: "Introduce the name of your recipe",
            defaultMessageInstructions: "Introduce the instructions",
            showErrorMessage: false,
            errorField: null,
            errorMessage: "",
            errorMessages: {
                recipeName: "Please enter the recipe name.",
                selectedIngredients: "Please select at least one ingredient.",
                selectedAllergens: "Please select at least one allergen.",
                instructions: "Please provide instructions for the recipe.",
                selectedRecipeType: "Please select a recipe type.",
                preparationTime: "Please select the preparation time.",
                servings: "Please enter the number of servings.",
            },
            ingredientsList: ingredientsData,
            allergensList: allergensData,
            recipeTypes: typesData,
            preparationTimeOptions: prepTimeData,

            imageSizeError: false,
            maxSizeInBytes: 1024 * 1024,
            imageSize: 0,
            file_name: "",
        };
    },
    computed: {
        allSelectedIngredients() {
            return [...new Set(this.selectedIngredients)];
        },
        allSelectedAllergens() {
            return [...new Set(this.selectedAllergens)];
        },
    },
    methods: {
        checkForm() {
            this.showErrorMessage = false;
            this.errorField = null;

            if (!this.recipeName) {
                this.errorField = "recipeName";
            } else if (this.selectedIngredients.length === 0) {
                this.errorField = "selectedIngredients";
            } else if (!this.instructions) {
                this.errorField = "instructions";
            } else if (!this.selectedRecipeType) {
                this.errorField = "selectedRecipeType";
            } else if (this.selectedAllergens.length === 0) {
                this.errorField = "selectedAllergens";
            } else if (this.preparationTime === "") {
                this.errorField = "preparationTime";
            } else if (this.servings === "") {
                this.errorField = "servings";
            }

            if (this.errorField) {
                this.showErrorMessage = true;
                this.errorMessage = this.errorMessages[this.errorField];
            }
        },
        handleTextFieldValueUpdate(value) {
            this.recipeName = value;
        },
        handleIngredientsUpdate(value) {
            this.selectedIngredients = value;
        },
        handleInstructionsUpdate(value) {
            this.instructions = value;
        },
        handleTypesUpdate(value) {
            this.selectedRecipeType = value;
        },
        handleAllergensUpdate(value) {
            this.selectedAllergens = value;
        },
        handleTimeUpdate(value) {
            this.preparationTime = parseInt(value);
        },
        addRecipe() {
            if (this.recipe_image) {
                if (this.isBase64ImageTooLarge(this.recipe_image, this.maxSizeInBytes) === false) {
                    console.log("Entra");
                    this.checkForm();

                    if (this.showErrorMessage) {
                        return;
                    }
            
                    axios
                        .post("/addRecipe/", {
                            name: this.recipeName,
                            ingredients: this.allSelectedIngredients,
                            instructions: this.instructions,
                            type: this.selectedRecipeType,
                            allergens: this.allSelectedAllergens,
                            preparationTime: this.preparationTime,
                            servings: this.servings,
                            username_id: this.username,
                            recipe_image: this.recipe_image,
                        })
                        .then((response) => {
                            if (response.status === 200) {
                                console.log("Recipe added");
                                alert("Recipe added.");
                                this.$router.push("/");
                            }
                        })
                        .catch((error) => {
                            alert(error.response);
                        });
                }else{
                    alert("Image size exceeds the allowed limit.")
                    return;
                }
            }

        },
        handleImageUpload(event) {
            const file = event.target.files[0];

            if (file) {
                this.file_name = file.name;
            }
            const reader = new FileReader();

            reader.onload = (e) => {
                this.recipe_image = e.target.result;
            };
            this.imageSize = file.size;
            reader.readAsDataURL(file);
        },
        removeImage() {
            this.recipe_image = null;
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
        this.username = localStorage.getItem('username');
    }
};

</script>

<style scoped>
.selected-box h2 {
    font-size: 16px;
    margin-top: 0;
}

.full-width-dropdown {
    margin-top: 10px;
    width: 100%;
    resize: vertical;
}

.ingredient-list li,
.allergen-list li {
    margin: 0;
    padding: 0;
}

input {
    margin-top: 10px;
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