<template>
  <div>
    <h2>Clock Manager</h2>

    <input v-model="userId" placeholder="ID d'utilisateur" />
    <button @click="refresh">Rafraîchir</button>

    <p>Statut : {{ clockIn ? 'En cours' : 'Arrêté' }}</p>
    <p>Heure de début : {{ startDateTime }}</p>

    <button @click="clock">Pointer</button>

    <p v-if="errorMessage">{{ errorMessage }}</p>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ClockManager',
  data() {
    return {
      userId: null,
      clockIn: false,
      startDateTime: null,
      errorMessage: ""
    }
  },
  mounted() {
    this.userId = this.$route.params.userid
    this.refresh()
  },
  methods: {
    refresh() {
      axios.get('http://localhost:4000/api/clocks/' + this.userId)
        .then(response => {
          const clocks = response.data.data
          if (clocks.length > 0) {
            const lastClock = clocks[0]
            this.clockIn = lastClock.status
            this.startDateTime = lastClock.status ? lastClock.time : null
          } else {
            this.clockIn = false
            this.startDateTime = null
          }
        })
        .catch(error => {
          console.log(error)
        })
    },
    clock() {
      axios.post('http://localhost:4000/api/clocks/' + this.userId)
        .then(response => {
          const newClock = response.data.data
          this.clockIn = newClock.status
          this.startDateTime = newClock.status ? newClock.time : null
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>