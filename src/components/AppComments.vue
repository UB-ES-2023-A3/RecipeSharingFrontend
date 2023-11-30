<template>
    <div class="commentContainer">
        <div class="title-container">
            <h3 style="border-bottom: 2px solid #3139d4; padding-bottom: 5px;">COMMENTS</h3>
        </div>
        <div class="comments-list scrollable-content">
            <div v-for="(comment, index) in comments_updated" :key="index" class="recipe-container">
                <div class="recipe-info">
                    <p><strong>Username:</strong> {{ comment.username }}</p>
                    <p><strong>Date:</strong> {{ comment.date }}</p>
                </div>
                <div class="recipe-review">
                    <p>{{ comment.review }}</p>
                </div>
            </div>
        </div>
        <div class="add-comment">
            <div class="textfield-container">
                <label class="label" for="commentInput">Add comment:</label>
                <textarea
                        v-model="newComment"
                        id="commentInput"
                        placeholder="Write your comment"
                        class="textarea"
                ></textarea>
            </div>
            <button @click="addComment" class="submit-button">Add comment</button>
        </div>
    </div>
</template>

<script>
import axios from 'axios';

export default {
    props: {
        username: String,
        recipe_id: Number,
        comments: Object,
    },
    data() {
        return {
            newComment: '', // Agrega la propiedad newComment al data
            comments_updated: this.comments
        };
    },
    methods: {
        createDate() {
            // Crear el objeto comment con la fecha actual y otros datos
            const currentDate = new Date();
            const day = currentDate.getDate().toString().padStart(2, '0');
            const month = (currentDate.getMonth() + 1).toString().padStart(2, '0');
            const year = currentDate.getFullYear().toString();
            const hours = currentDate.getHours().toString().padStart(2, '0');
            const minutes = currentDate.getMinutes().toString().padStart(2, '0');

            const formattedDate = `${day}/${month}/${year} ${hours}:${minutes}`;
            return formattedDate;
        },
        addComment() {

            if (this.checkComment()) {
                alert("No comment written")
                return
            }
            const comment = {
                username: this.username,
                review: this.newComment,
                date: this.createDate(),
            };

            axios
                .post("postRatings/", {
                    user_id: this.username,
                    recipe_id: this.recipe_id,
                    comment: comment,
                    review_type: "comment",
                })
                .then((response) => {
                    if (response.status === 200) {
                        console.log("Rating added");
                        alert("Review added.");
                        this.newComment = ''
                        this.comments_updated = response.data.comments_list
                    }
                })
                .catch((error) => {
                    alert(error.response);
                });
        },
        checkComment() {
            return this.newComment == '';
        },
    },
};
</script>

<style scoped>
.commentContainer {
    width: 75%;
    margin: 20px auto;
}

.title-container {
    text-align: center;
    margin-bottom: 10px;
    color: #314cd4;
}

.label {
    display: block; /* Hace que la etiqueta sea un bloque, lo que permite centrar el texto */
    text-align: center;
    color: #317dd4;
}

.comments-list {

    margin-bottom: 20px;
}

.scrollable-content {
    max-height: 200px;
    overflow-y: auto;
    padding: 10px;
    border: 2px solid #319bd4;
    border-radius: 10px;
    background-color: #fff;
}

.add-comment {
    display: flex;
    flex-direction: column;
    align-items: center;
    width: 100%;
}

.textfield-container {
    text-align: center;
    justify-content: center;
    margin-bottom: 10px;
    width: 100%;
}

.textarea {
    margin-bottom: 10px;
    padding: 5px;
    border: 1px solid #31a3d4;
    border-radius: 5px;
    width: 100%;
    box-sizing: border-box;
    resize: vertical;
    min-height: 50px; /* Medida inicial del cuadro de comentarios */
}

.submit-button {
    background-color: #0e819a;
    color: white;
    padding: 8px 15px;
    border: none;
    border-radius: 5px;
    cursor: pointer;
    transition: background-color 0.3s;
}

.submit-button:hover {
    background-color: #ffcc00;
}

.recipe-container {
    margin-bottom: 20px;
    border: 2px solid #31cfd4;
    border-radius: 10px;
    padding: 10px;
    background-color: #fff;
}

.recipe-info {
    margin-bottom: 10px;
    display: flex;
}

.recipe-review {
    /* Estilos adicionales para la sección de revisión */
    color: #333; /* Cambia el color del texto según tus preferencias */
}
</style>
