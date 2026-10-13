<template>
  <div class="card user-bar">
    <span class="user-label">Utilisateur</span>
    <input v-model="searchId" placeholder="ID" class="small" />
    <input v-model="username" placeholder="Nom d'utilisateur" />
    <input v-model="email" placeholder="Email" />
    <button @click="createUser">Créer</button>
    <button @click="getUser(searchId)">Récupérer</button>
    <button @click="updateUser">Mettre à jour</button>
    <button @click="deleteUser">Supprimer</button>
    <span v-if="id" class="current">Actuel : n°{{ id }} {{ username }}</span>
    <p v-if="errorMessage" class="error full">{{ errorMessage }}</p>
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

<style scoped>
.user-bar {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 0.4rem;
  padding: 0.75rem 1rem;
  margin: 0.5rem 0;
}

.user-label {
  font-weight: 700;
  margin-right: 0.5rem;
}

.user-bar input {
  margin: 0;
  width: 160px;
}

.user-bar input.small {
  width: 60px;
}

.user-bar button {
  margin: 0;
  padding: 0.45rem 0.8rem;
  font-size: 0.85rem;
}

.current {
  color: var(--color-muted);
  font-size: 0.85rem;
  margin-left: 0.5rem;
}

.full {
  width: 100%;
  margin: 0.3rem 0 0 0;
}

@media (max-width: 600px) {
  .user-bar input,
  .user-bar input.small {
    width: 100%;
  }

  .user-bar button {
    width: 100%;
  }
}
</style>