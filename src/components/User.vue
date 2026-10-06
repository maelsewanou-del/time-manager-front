<template>
    <div>
        <p>Utilisateur : {{ id }} {{ username }} {{ email }}</p>

        <input v-model="searchId" placeholder="ID a chercher" />
        <input v-model="username" placeholder="Nom d'utilisateur" />
        <input v-model="email" placeholder="Email" />

        <button @click="createUser">Créer</button>
        <button @click="deleteUser">Supprimer</button>
        <button @click="getUser(searchId)">Récupérer</button>
        <button @click="updateUser">Mettre à jour</button>

        <p v-if="errorMessage">{{ errorMessage }}</p>
    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'User',
  data() {
    return {
      id: null,
      username: "",
      email: "",
      errorMessage: "",
      searchId:""
    }
  },
  methods: {
    createUser() {
      axios.post('http://localhost:4000/api/users', {
        user: {
          username: this.username,
          email: this.email
        }
      })
      .then(response => {
        this.id = response.data.data.id
        this.username = response.data.data.username
        this.email = response.data.data.email
        this.errorMessage = ""
      })
      .catch(error => {
        this.errorMessage = "Erreur lors de la création"
      })
    },
    getUser(userId) {
      axios.get('http://localhost:4000/api/users/' + userId)
      .then(response => {
        this.id = response.data.data.id
        this.username = response.data.data.username
        this.email = response.data.data.email
        this.errorMessage = ""
      })
      .catch(error => {
        this.errorMessage = "Utilisateur introuvable"
      })
    },
    updateUser() {
      axios.put('http://localhost:4000/api/users/' + this.id, {
        user: {
          username: this.username,
          email: this.email
        }
      })
      .then(response => {
        this.username = response.data.data.username
        this.email = response.data.data.email
        this.errorMessage = ""
      })
      .catch(error => {
        this.errorMessage = "Erreur lors de la mise à jour"
      })
    },
    deleteUser() {
      axios.delete('http://localhost:4000/api/users/' + this.id)
      .then(() => {
        this.id = null
        this.username = ""
        this.email = ""
        this.errorMessage = ""
      })
      .catch(error => {
        this.errorMessage = "Erreur lors de la suppression"
      })
    }
  }
}
</script>