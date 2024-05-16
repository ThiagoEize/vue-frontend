<template>
  <div class="container">
    <h1>Task List</h1>
    <div class="button-group">
      <button @click="goBack">Logout</button>
      <button @click="goToCreateTask">Create Task</button>
    </div>
    <div class="table-container">
      <table>
        <thead>
          <tr>
            <th class="title">Title</th>
            <th class="description">Description</th>
            <th class="actions">Actions</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="task in tasks" :key="task.id">
            <td class="title">{{ task.title }}</td>
            <td class="description">{{ task.description }}</td>
            <td class="actions">
              <button @click="editTask(task)">Edit</button>
              <button @click="deleteTask(task.id)">Delete</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  props: ["token"],
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
        .get("http://127.0.0.1:8000/api/tasks", {
          headers: {
            Accept: "application/json",
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
      this.$router.push("/");
    },
    goToCreateTask() {
      this.$router.push({ name: "TaskForm", params: { token: this.token } });
    },
    editTask(task) {
      this.$router.push({
        name: "TaskForm",
        params: { ...task, token: this.token },
      });
    },
    deleteTask(taskId) {
      axios
        .delete("http://127.0.0.1:8000/api/task", {
          headers: {
            Accept: "application/json",
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
.container {
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

h1 {
  color: #333;
  font-size: 2rem;
  text-align: center;
  margin-bottom: 20px;
}

.button-group {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}

button {
  padding: 10px 20px;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

button:hover {
  transform: translateY(-2px);
}

button:active {
  transform: translateY(0);
}

button:first-child {
  background-color: #e3342f;
  color: white;
}

button:first-child:hover {
  background-color: #cc1f1a;
}

button:last-child {
  background-color: #38c172;
  color: white;
}

button:last-child:hover {
  background-color: #2d995b;
}

.table-container {
  overflow-x: auto;
}

table {
  width: 100%;
  border-collapse: collapse;
  margin-bottom: 20px;
}

th,
td {
  padding: 15px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

.title {
  width: 30%;
}

.description {
  width: 45%;
}

.actions {
  width: 35%;
}

th {
  background-color: #f8f9fa;
  font-weight: bold;
}

tbody tr:hover {
  background-color: #f1f1f1;
}

td button {
  margin-right: 10px;
  padding: 5px 10px;
}

td button:first-child {
  background-color: #3490dc;
  color: white;
}

td button:first-child:hover {
  background-color: #2779bd;
}

td button:last-child {
  background-color: #e3342f;
  color: white;
}

td button:last-child:hover {
  background-color: #cc1f1a;
}
</style>
