<template>
  <div class="container">
    <h1>Task List</h1>
    <div class="button-group">
      <button @click="logout">Logout</button>
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
          <tr v-for="task in paginatedTasks" :key="task.id">
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
    <div class="pagination">
      <button :disabled="currentPage === 1" @click="prevPage">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button :disabled="currentPage === totalPages" @click="nextPage">
        Next
      </button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      tasks: [],
      currentPage: 1,
      itemsPerPage: 10,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.tasks.length / this.itemsPerPage);
    },
    paginatedTasks() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.tasks.slice(start, end);
    },
  },
  created() {
    this.fetchTasks();
  },
  methods: {
    fetchTasks() {
      const token = localStorage.getItem("authToken");
      axios
        .get("http://127.0.0.1:8000/api/tasks", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          this.tasks = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    logout() {
      localStorage.removeItem("authToken");
      this.$router.push("/");
    },
    goToCreateTask() {
      this.$router.push({ name: "TaskForm" });
    },
    editTask(task) {
      this.$router.push({
        name: "TaskForm",
        params: { id: task.id, title: task.title, description: task.description },
      });
    },
    deleteTask(taskId) {
      const token = localStorage.getItem("authToken");
      axios
        .delete("http://127.0.0.1:8000/api/task", {
          headers: {
            Accept: "application/json",
            Authorization: `Bearer ${token}`,
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
    nextPage() {
      if (this.currentPage < this.totalPages) {
        this.currentPage++;
      }
    },
    prevPage() {
      if (this.currentPage > 1) {
        this.currentPage--;
      }
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

.pagination {
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px 0;
}

.pagination button {
  padding: 10px;
  border: none;
  background-color: #38c172;
  color: white;
  font-size: 1rem;
  cursor: pointer;
  transition: background-color 0.3s, transform 0.3s;
}

.pagination button:disabled {
  background-color: #ccc;
  cursor: not-allowed;
}

.pagination button:hover:enabled {
  background-color: #2d995b;
}

.pagination span {
  font-size: 1rem;
  font-weight: 600;
}
</style>