<template >
  <div class="container">
    <h1>{{ isEdit ? 'Edit Task' : 'Create Task' }}</h1>
    <form @submit.prevent="handleSubmit">
      <div>
        <label for="title">Title</label>
        <input type="text" id="title" v-model="taskTitle" required />
      </div>
      <div>
        <label for="description">Description</label>
        <textarea id="description" v-model="taskDescription" required></textarea>
      </div>
      <button type="submit">{{ isEdit ? 'Update' : 'Create' }}</button>
      <button @click="goBack">Back</button>
    </form>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['id', 'title', 'description', 'token'],
  data() {
    return {
      isEdit: false,
      taskTitle: this.title || '',
      taskDescription: this.description || '',
    };
  },
  created() {
    if (this.id) {
      this.isEdit = true;
    }
  },
  methods: {
    handleSubmit() {
      const token = localStorage.getItem('authToken');
      const url = this.isEdit
        ? `http://127.0.0.1:8000/api/task`
        : `http://127.0.0.1:8000/api/task`;
      const method = this.isEdit ? 'put' : 'post';
      const data = this.isEdit
        ? { id: this.id, title: this.taskTitle, description: this.taskDescription }
        : { title: this.taskTitle, description: this.taskDescription };

      axios({
        method,
        url,
        headers: {
          Accept: 'application/json',
          Authorization: `Bearer ${token}`,
        },
        data,
      })
        .then(() => {
          this.$router.push(`/tasks/${this.token}`);
        })
        .catch((error) => {
          console.error(error);
        });
    },
    goBack() {
      this.$router.push(`/tasks/${this.token}`);
    },
  },
};
</script>

<style scoped>
@import '../assets/styles/colors.css';

.task-form {
  background-color: var(--background-color);
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  max-width: 600px;
  margin: 0 auto;
}

h1 {
  color: var(--text-color);
  margin-bottom: 20px;
  text-align: center;
}

.form-group {
  margin-bottom: 15px;
}

label {
  display: block;
  margin-bottom: 5px;
  color: var(--text-color);
}

input,
textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid var(--border-color);
  border-radius: 4px;
  box-sizing: border-box;
  margin-bottom: 1rem
}

textarea {
  resize: vertical;
  min-height: 100px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-top: 20px;
}

button {
  padding: 10px 20px;
  background-color: var(--primary-color);
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s;
  margin-right: 1rem
}

button:hover {
  background-color: var(--primary-dark-color);
}

button[type="button"] {
  background-color: var(--secondary-color);
}

button[type="button"]:hover {
  background-color: var(--secondary-dark-color);
}
</style>