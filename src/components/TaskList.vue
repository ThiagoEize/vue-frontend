<template>
  <div>
    <h1>Task List</h1>
    <div class="button-group">
      <button @click="goBack">Logout</button>
      <button @click="goToCreateTask">Create Task</button>
    </div>
    <table>
      <thead>
        <tr>
          <th>Title</th>
          <th>Description</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="task in tasks" :key="task.id">
          <td>{{ task.title }}</td>
          <td>{{ task.description }}</td>
          <td>
            <button @click="editTask(task)">Edit</button>
            <button @click="deleteTask(task.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  props: ['token'],
  data() {
    return {
      tasks: [],
    };
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
      axios
        .get('http://127.0.0.1:8000/api/tasks', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${this.token}`,
          },
        })
        .then((response) => {
          this.tasks = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    goBack() {
      this.$router.push('/');
    },
    goToCreateTask() {
      this.$router.push({ name: 'TaskForm', params: { token: this.token } });
    },
    editTask(task) {
      this.$router.push({ name: 'TaskForm', params: { ...task, token: this.token } });
    },
    deleteTask(taskId) {
      axios
        .delete('http://127.0.0.1:8000/api/task', {
          headers: {
            Accept: 'application/json',
            Authorization: `Bearer ${this.token}`,
          },
          data: { id: taskId },
        })
        .then(() => {
          this.fetchTasks();
        })
        .catch((error) => {
          console.error(error);
        });
    },
  },
};
</script>

<style scoped>
.button-group {
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}
th {
  background-color: #f2f2f2;
}
button {
  margin-right: 5px;
}
</style>