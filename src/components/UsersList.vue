<template>
  <div>
    <h1>Users List</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Email</th>
          <th>Action</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="user in users" :key="user.id">
          <td>{{ user.id }}</td>
          <td>{{ user.name }}</td>
          <td>{{ user.email }}</td>
          <td>
            <button @click="sendUserToken(user.id)">Login</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import axios from 'axios';

export default {
  data() {
    return {
      users: [],
      currentPage: 1,
      perPage: 10,
      totalPages: 1,
    };
  },
  created() {
    this.fetchUsers();
  },
  methods: {
    fetchUsers() {
      axios
        .get(`http://127.0.0.1:8000/api/users`)
        .then((response) => {
          this.users = response.data; // Assuming the data is in response.data.data
        })
        .catch((error) => {
          console.error(error);
        });
    },
    sendUserToken(userId) {
      axios
        .post('http://127.0.0.1:8000/api/user/token', { id: userId })
        .then((response) => {
          const token = response.data.token; // Assuming the token is in response.data.token
          localStorage.setItem('authToken', token); // Save the token to local storage
          this.$router.push(`/tasks/${token}`); // Navigate to the TaskList component with userId
        })
        .catch((error) => {
          console.error(error);
          alert('Error sending token');
        });
    },
  },
};
</script>

<style scoped>
@import '../assets/styles/colors.css';

.users-list {
  /* background-color: var(--background-color); */
  padding: 100px;
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

.pagination-buttons {
  display: flex;
  justify-content: center;
  margin-top: 20px;
}

.pagination-buttons button {
  margin: 0 10px;
}
</style>