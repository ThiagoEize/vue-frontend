<template>
  <div>
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
form {
  display: flex;
  flex-direction: column;
}
</style>