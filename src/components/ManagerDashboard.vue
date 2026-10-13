<template>
  <div class="manager">
    <!-- Menu latéral sombre -->
    <aside class="sidebar">
      <p class="side-title">COMMAND CENTER</p>
      <ul>
        <li class="active">Vue d'ensemble</li>
        <li>Feuilles de temps <span class="soon">bientôt</span></li>
        <li>Présence équipe</li>
        <li>Planning <span class="soon">bientôt</span></li>
        <li>Demandes et congés <span class="soon">bientôt</span></li>
        <li>Rapports <span class="soon">bientôt</span></li>
      </ul>
      <div class="shift-box">
        <p class="shift-label">Équipe en poste</p>
        <p class="shift-count">{{ onDutyCount }} / {{ members.length }}</p>
      </div>
    </aside>

    <!-- Contenu principal -->
    <section class="content">
      <h2 class="title">Gardez Gotham en mouvement</h2>
      <p class="subtitle">Consultez la présence de l'équipe et ses heures en un coup d'œil.</p>

      <div class="top-actions">
        <button @click="loadTeam">Actualiser</button>
        <button class="btn-secondary" disabled>Tout valider (bientôt disponible)</button>
      </div>

      <p v-if="errorMessage" class="error">{{ errorMessage }}</p>

      <div class="table-card">
        <div class="row head">
          <span>Collaborateur</span>
          <span>Présence</span>
          <span>Heures enregistrées</span>
          <span>Feuille de temps</span>
        </div>

        <div v-for="member in members" :key="member.id" class="row">
          <span class="person">
            <span class="avatar">{{ initials(member.username) }}</span>
            <span>
              <strong>{{ member.username }}</strong><br />
              <small>{{ member.email }}</small>
            </span>
          </span>

          <span>
            <span class="badge" :class="member.onDuty ? 'on' : 'off'">
              {{ member.onDuty ? 'En poste' : 'Hors ligne' }}
            </span>
            <small v-if="member.since"> depuis {{ member.since.replace('T', ' ') }}</small>
          </span>

          <span class="hours">{{ member.hours }} h</span>

          <span>
            <button class="btn-secondary" disabled>Valider (bientôt)</button>
          </span>
        </div>

        <p v-if="members.length === 0" class="empty">Aucun collaborateur pour le moment.</p>
      </div>

      <div class="soon-grid">
        <div class="soon-card">
          <h3>Alerte nuits consécutives</h3>
          <p>Bientôt disponible : prévenir quand un agent dépasse 3 nuits d'affilée.</p>
        </div>
        <div class="soon-card">
          <h3>Planning de la semaine</h3>
          <p>Bientôt disponible : construire les rotations d'équipe.</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import axios from 'axios'

const API = 'http://localhost:4000/api'

export default {
  name: 'ManagerDashboard',
  data() {
    return {
      members: [],
      errorMessage: ''
    }
  },
  computed: {
    onDutyCount() {
      return this.members.filter(m => m.onDuty).length
    }
  },
  mounted() {
    this.loadTeam()
  },
  methods: {
    initials(name) {
      return name ? name.slice(0, 2).toUpperCase() : '??'
    },
    // somme des durées (en heures) d'une liste de plages horaires
    totalHours(workingTimes) {
      let total = 0
      workingTimes.forEach(wt => {
        total += (new Date(wt.end) - new Date(wt.start)) / (1000 * 60 * 60)
      })
      return Math.round(total * 10) / 10
    },
    async loadTeam() {
      try {
        const usersRes = await axios.get(API + '/users')
        const users = usersRes.data.data

        this.members = await Promise.all(
          users.map(async user => {
            const [clocksRes, wtRes] = await Promise.all([
              axios.get(API + '/clocks/' + user.id),
              axios.get(API + '/workingtime/' + user.id)
            ])
            const clocks = clocksRes.data.data
            const last = clocks.length > 0 ? clocks[0] : null

            return {
              id: user.id,
              username: user.username,
              email: user.email,
              onDuty: last ? last.status : false,
              since: last && last.status ? last.time : null,
              hours: this.totalHours(wtRes.data)
            }
          })
        )
        this.errorMessage = ''
      } catch (error) {
        this.errorMessage = "Impossible de charger l'équipe"
        console.log(error)
      }
    }
  }
}
</script>

<style scoped>
.manager {
  display: grid;
  grid-template-columns: 240px 1fr;
  gap: 1.5rem;
  margin-top: 1rem;
}

/* ----- Menu latéral ----- */
.sidebar {
  background-color: var(--color-topbar);
  color: #ffffff;
  border-radius: 16px;
  padding: 1.5rem 1rem;
}

.side-title {
  color: #94a3b8;
  font-size: 0.75rem;
  letter-spacing: 0.08em;
  margin: 0 0 1rem 0.5rem;
}

.sidebar ul {
  list-style: none;
  padding: 0;
  margin: 0 0 1.5rem 0;
}

.sidebar li {
  padding: 0.65rem 0.75rem;
  border-radius: 8px;
  color: #e2e8f0;
  font-size: 0.9rem;
}

.sidebar li.active {
  background-color: var(--color-primary);
  color: #ffffff;
  font-weight: 600;
}

.sidebar li {
  padding: 0.65rem 0.75rem;
  border-radius: 8px;
  color: #e2e8f0;
  font-size: 0.85rem;
  white-space: nowrap;
}

.shift-box {
  border: 1px solid #475569;
  border-radius: 12px;
  padding: 0.9rem;
}

.shift-box p {
  color: #ffffff;
  margin: 0;
}

.shift-label {
  font-size: 0.8rem;
  color: #94a3b8 !important;
}

.shift-count {
  font-family: 'Courier New', monospace;
  font-size: 1.6rem;
  font-weight: 700;
}

/* ----- Contenu ----- */
.title {
  text-transform: uppercase;
  font-size: 1.8rem;
  margin-bottom: 0.2rem;
}

.subtitle {
  color: var(--color-muted);
  margin-bottom: 1rem;
}

.top-actions {
  margin-bottom: 1rem;
}

button:disabled {
  opacity: 0.55;
  cursor: not-allowed;
}

/* ----- Tableau ----- */
.table-card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  overflow: hidden;
}

.row {
  display: grid;
  grid-template-columns: 2fr 1.5fr 1fr 1.3fr;
  align-items: center;
  gap: 1rem;
  padding: 0.9rem 1.2rem;
  border-bottom: 1px solid var(--color-border);
}

.row.head {
  background-color: var(--color-bg);
  color: var(--color-muted);
  font-size: 0.75rem;
  text-transform: uppercase;
  letter-spacing: 0.05em;
  font-weight: 600;
}

.person {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.person small {
  color: var(--color-muted);
}

.avatar {
  width: 38px;
  height: 38px;
  border-radius: 50%;
  background-color: var(--color-bg);
  border: 1px solid var(--color-border);
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 0.8rem;
  font-weight: 700;
}

.badge {
  display: inline-block;
  padding: 0.25rem 0.6rem;
  border-radius: 6px;
  font-size: 0.8rem;
  font-weight: 600;
}

.badge.on {
  background-color: var(--color-success-bg);
  color: var(--color-success-dark);
}

.badge.off {
  background-color: var(--color-bg);
  color: var(--color-muted);
}

.hours {
  font-family: 'Courier New', monospace;
  font-size: 1.1rem;
  font-weight: 700;
}

.empty {
  padding: 1rem 1.2rem;
  color: var(--color-muted);
}

/* ----- Blocs "bientôt" ----- */
.soon-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-top: 1.5rem;
}

.soon-card {
  border: 2px dashed var(--color-border);
  border-radius: 16px;
  padding: 1.2rem;
  color: var(--color-muted);
}

.soon-card h3 {
  margin: 0 0 0.4rem 0;
  font-size: 1rem;
  color: var(--color-text);
}

/* ----- Petit écran ----- */
@media (max-width: 800px) {
  .manager { grid-template-columns: 1fr; }
  .row { grid-template-columns: 1fr; }
  .soon-grid { grid-template-columns: 1fr; }
}
</style>