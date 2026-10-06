<template>
    <div>
        <h2>Heures de travail</h2>

        <p>ID d'utilisateur : {{ userID }}</p>

        <input v-model="userID" placeholder="ID d'utilisateur" />

        <button @click="getWorkingTimes">Récupérer les heures de travail</button>

        <ul>
            <li v-for="(item) in workingTimes" :key="item.id">
                {{ item.start }} - {{ item.end }}
            </li>
        </ul>

        <p v-if="errorMessage">{{ errorMessage }}</p>
        <p v-else>aucune heure de travail enregistrée</p>

    </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'WorkingTimes',
  data() {
    return {
      userID: null,
      workingTimes: [],
      errorMessage: ""
    }
  },
  mounted() {
    this.userID = this.$route.params.userID
    this.getWorkingTimes()
  },
  methods: {
    getWorkingTimes() {
      axios.get('http://localhost:4000/api/workingtime/' + this.userID)
        .then(response => {
          this.workingTimes = response.data
          this.errorMessage = ""
        })
        .catch(error => {
          this.errorMessage = "Erreur lors de la récupération des heures de travail"
        })
    }
  }
}
</script>