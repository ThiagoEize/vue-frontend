<template>
    <div class="container">
      <form @submit.prevent="handleSubmit">
        <h1>{{ isEdit ? "Edit Task" : "Create Task" }}</h1>
        <div>
          <label for="title">Title</label>
          <input type="text" id="title" v-model="taskTitle" required />
        </div>
        <div>
          <label for="description">Description</label>
          <textarea
            id="description"
            v-model="taskDescription"
            required
          ></textarea>
        </div>
        <button type="submit">{{ isEdit ? "Update" : "Create" }}</button>
        <button @click="goBack" type="button">Back</button>
      </form>
    </div>
  </template>
  
  <script>
  import axios from "axios";
  
  export default {
    props: ["id", "title", "description"],
    data() {
      return {
        isEdit: false,
        taskTitle: this.title || "",
        taskDescription: this.description || "",
      };
    },
    created() {
      if (this.id) {
        this.isEdit = true;
      }
    },
    methods: {
      handleSubmit() {
        const token = localStorage.getItem("authToken");
        const url = `http://127.0.0.1:8000/api/task`;
        const method = this.isEdit ? "put" : "post";
        const data = this.isEdit
          ? {
              id: this.id,
              title: this.taskTitle,
              description: this.taskDescription,
            }
          : { title: this.taskTitle, description: this.taskDescription };
  
        axios({
          method,
          url,
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
          data,
        })
          .then(() => {
            this.$router.push("/tasks");
          })
          .catch((error) => {
            console.error(error);
          });
      },
      goBack() {
        this.$router.push("/tasks");
      },
    },
  };
  </script>
  
  <style scoped>
  .container {
    max-width: 600px;
    margin: 0 auto;
  }
  
  h1 {
    color: #333;
  }
  
  form {
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    flex-wrap: wrap;
  }
  
  label {
    display: block;
    margin-bottom: 0.5rem;
  }
  
  input,
  textarea {
    display: block;
    width: 100%;
    padding: 0.75rem;
    margin-bottom: 1rem;
    border: 1px solid #ccc;
    border-radius: 0.375rem;
    transition: border-color 0.3s;
    box-sizing: border-box;
  }
  
  input:focus,
  textarea:focus {
    border-color: #3182ce;
  }
  
  button {
    display: inline-block;
    padding: 0.75rem 1.5rem;
    font-size: 1rem;
    font-weight: 600;
    border-radius: 0.375rem;
    transition: background-color 0.3s;
    margin-right: 0.5rem;
    background-color: grey;
    color: #fff;
  }
  
  button:hover {
    background-color: #a0aec0;
    color: #fff;
  }
  
  button[type="submit"] {
    background-color: #3182ce;
    color: #fff;
  }
  
  button[type="submit"]:hover {
    background-color: #2b6cb0;
  }
  
  button[type="button"] {
    background-color: #a0aec0;
    color: #fff;
  }
  
  button[type="button"]:hover {
    background-color: #718096;
  }
  </style>
  