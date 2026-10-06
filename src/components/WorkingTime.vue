<template>
  <div>
    <h2>Gestion des heures de travail</h2>

    <input v-model="userID" placeholder="ID d'utilisateur" />
    <input v-model="workingTimeId" placeholder="ID de la plage horaire" />
    <input v-model="start" placeholder="Heure de début (YYYY-MM-DD hh:mm:ss)" />
    <input v-model="end" placeholder="Heure de fin (YYYY-MM-DD hh:mm:ss)" />

    <button @click="createWorkingTime">Créer</button>
    <button @click="updateWorkingTime">Mettre à jour</button>
    <button @click="deleteWorkingTime">Supprimer</button>

    <p v-if="workingTimeId">ID actuel : {{ workingTimeId }}</p>
    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'WorkingTime',
  data() {
    return {
      start: null,
      end: null,
      errorMessage: "",
      userID: null,
      workingTimeId: null
    }
  },
  mounted() {
    this.userID = this.$route.params.userid
    this.workingTimeId = this.$route.params.workingtimeid || null
  },
  methods: {
    createWorkingTime() {
      axios.post('http://localhost:4000/api/workingtime/' + this.userID, {
        start: this.start,
        end: this.end
      })
      .then(response => {
        this.workingTimeId = response.data.id
        this.errorMessage = ""
      })
      .catch(error => {
        this.errorMessage = "Erreur lors de la création"
      })
    },
    updateWorkingTime() {
      axios.put('http://localhost:4000/api/workingtime/' + this.workingTimeId, {
        start: this.start,
        end: this.end
      })
      .then(response => {
        this.errorMessage = ""
      })
      .catch(error => {
        this.errorMessage = "Erreur lors de la mise à jour"
      })
    },
    deleteWorkingTime() {
      axios.delete('http://localhost:4000/api/workingtime/' + this.workingTimeId)
      .then(response => {
        this.workingTimeId = null
        this.start = null
        this.end = null
        this.errorMessage = ""
      })
      .catch(error => {
        this.errorMessage = "Erreur lors de la suppression"
      })
    }
  }
}
</script>