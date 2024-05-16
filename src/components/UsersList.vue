<template>
  <div class="users-list-container">
    <h1>Users List</h1>
    <div class="table-responsive">
      <table>
        <thead>
          <tr>
            <th class="id">ID</th>
            <th class="name">Name</th>
            <th class="email">Email</th>
            <th class="action">Action</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in paginatedUsers" :key="user.id">
            <td class="id">{{ user.id }}</td>
            <td class="name">{{ user.name }}</td>
            <td class="email">{{ user.email }}</td>
            <td class="action">
              <button @click="sendUserToken(user.id)">Login</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
    <div class="pagination-buttons">
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
      users: [],
      currentPage: 1,
      perPage: 10,
    };
  },
  computed: {
    totalPages() {
      return Math.ceil(this.users.length / this.perPage);
    },
    paginatedUsers() {
      const start = (this.currentPage - 1) * this.perPage;
      const end = start + this.perPage;
      return this.users.slice(start, end);
    },
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios
        .get(`http://127.0.0.1:8000/api/users`)
        .then((response) => {
          this.users = response.data;
        })
        .catch((error) => {
          console.error(error);
        });
    },
    sendUserToken(userId) {
      axios
        .post("http://127.0.0.1:8000/api/user/token", { id: userId })
        .then((response) => {
          const token = response.data.token;
          localStorage.setItem("authToken", token);
          this.$router.push(`/tasks/${token}`);
        })
        .catch((error) => {
          console.error(error);
          alert("Error sending token");
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
@import "../assets/styles/colors.css";

.users-list-container {
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

.table-responsive {
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

.id {
  width: 5%;
}
.name {
  width: 40%;
}
.email {
  width: 40%;
}
.id {
  width: 15%;
}

th {
  background-color: #f8f9fa;
  font-weight: bold;
}

tbody tr:nth-child(even) {
  background-color: #f9f9f9;
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

button {
  background-color: #3490dc;
  color: white;
}

button:hover {
  background-color: #2779bd;
}

button:disabled {
  background-color: #cccccc;
  cursor: not-allowed;
}

.pagination-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-buttons button {
  margin: 0 10px;
}
</style>