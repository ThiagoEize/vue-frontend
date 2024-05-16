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
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  border: 1px solid #ddd;
  padding: 8px;
}
th {
  background-color: #f2f2f2;
}
button {
  margin: 5px;
}
</style>
