<template>
  <div  class="container">
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


.task-list {
  /* background-color: var(--background-color); */
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
}

h1 {
  color: var(--text-color);
  margin-bottom: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th, td {
  border: 1px solid var(--border-color);
  padding: 10px;
  text-align: left;
}

th {
  background-color: var(--primary-color);
  color: white;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
}

button {
  padding: 5px 10px;
  margin-right: 5px;
  background-color: var(--secondary-color);
  color: white;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: background-color 0.3s;
}

button:hover {
  background-color: var(--secondary-dark-color);
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.button-group {
  margin-bottom: 20px;
  display: flex;
  gap: 10px;
}
</style>