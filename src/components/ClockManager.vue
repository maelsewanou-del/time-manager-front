<template>
  <div class="card clock-card">
    <h2>Pointage en temps réel</h2>

    <p class="label">Heure locale</p>
    <p class="clock-time">{{ currentTime }}</p>

    <p class="status" :class="clockIn ? 'status-on' : 'status-off'">
      <span v-if="clockIn">Pointé depuis {{ formattedStart }}</span>
      <span v-else>Pas de période en cours</span>
    </p>

    <button class="btn-clock" @click="clock">
      {{ clockIn ? 'Terminer ma journée' : 'Commencer ma journée' }}
    </button>

    <p class="hint">Prêt quand vous l'êtes. Enregistrez votre temps ici.</p>

    <button class="btn-secondary" @click="refresh">Rafraîchir</button>
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
      errorMessage: "",
      currentTime: "",
      timer: null
    }
  },
  computed: {
    // format demandé par le sujet : YYYY-MM-DD hh:mm:ss
    formattedStart() {
      return this.startDateTime ? this.startDateTime.replace('T', ' ') : ''
    }
  },
  mounted() {
    this.userId = this.$route.params.userid
    this.refresh()
    this.updateTime()
    this.timer = setInterval(this.updateTime, 1000)
  },
  beforeUnmount() {
    clearInterval(this.timer)
  },
  methods: {
    updateTime() {
      this.currentTime = new Date().toLocaleTimeString('fr-FR')
    },
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

<style scoped>
.clock-card {
  text-align: center;
}

.label {
  color: var(--color-muted);
  font-size: 0.85rem;
  text-transform: uppercase;
  margin-bottom: 0;
}

.clock-time {
  font-family: 'Courier New', monospace;
  font-size: 2.8rem;
  font-weight: 700;
  margin: 0.2rem 0 1rem 0;
}

.status {
  display: inline-block;
  padding: 0.5rem 1rem;
  border-radius: 8px;
  font-weight: 600;
  font-size: 0.9rem;
}

.status-on {
  background-color: var(--color-success-bg);
  color: var(--color-success-dark);
}

.status-off {
  background-color: var(--color-bg);
  color: var(--color-muted);
}

.btn-clock {
  display: block;
  width: 100%;
  margin: 1.2rem 0 0.5rem 0;
  padding: 1rem;
  font-size: 1.1rem;
  font-weight: 700;
  text-transform: uppercase;
  background-color: var(--color-success);
}

.btn-clock:hover {
  background-color: var(--color-success-dark);
}

.hint {
  color: var(--color-muted);
  font-size: 0.85rem;
}
</style>