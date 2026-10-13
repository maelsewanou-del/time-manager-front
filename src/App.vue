<template>
  <div id="app">
    <!-- Barre du haut -->
    <header class="topbar">
      <div class="topbar-title">City of Gotham | TimeManager</div>
      <div class="topbar-right">
        <span class="user-badge">Utilisateur n°{{ currentUserId }}</span>
        <button class="btn-contrast" @click="toggleContrast">
          {{ highContrast ? 'Désactiver le contraste élevé' : 'Activer le contraste élevé' }}
        </button>
      </div>
    </header>

    <main class="container" :class="{ wide: $route.name === 'manager' }">
      <!-- Salutation -->
      <section class="greeting">
        <h1>{{ greeting }}</h1>
        <p class="today">{{ today }}</p>
      </section>

      <!-- User : visible sur toutes les pages (exigence du sujet) -->
      <User />

      <!-- Navigation -->
      <nav>
        <router-link to="/manager">Manager</router-link>
        <router-link to="/workingTimes/1">Heures de travail</router-link>
        <router-link to="/workingTime/1">Gérer une plage</router-link>
        <router-link to="/clock/1">Pointeuse</router-link>
        <router-link to="/chartManager/1">Graphiques</router-link>
      </nav>

      <router-view />
    </main>
  </div>
</template>

<script>
import User from './components/User.vue'

export default {
  name: 'App',
  components: { User },
  data() {
    return {
      highContrast: false
    }
  },
  computed: {
    // lit l'id dans l'URL, quel que soit le nom du paramètre
    currentUserId() {
      return this.$route.params.userid || this.$route.params.userID || '-'
    },
    greeting() {
      const hour = new Date().getHours()
      if (hour < 12) return 'Bonjour'
      if (hour < 18) return 'Bon après-midi'
      return 'Bonsoir'
    },
    today() {
      return new Date().toLocaleDateString('fr-FR', {
        weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'
      })
    }
  },
  methods: {
    toggleContrast() {
      this.highContrast = !this.highContrast
      document.body.classList.toggle('high-contrast', this.highContrast)
    }
  }
}
</script>

<style>
/* ===== Palette de la maquette ===== */
:root {
  --color-primary: #2563eb;
  --color-primary-dark: #1d4ed8;
  --color-success: #059669;
  --color-success-dark: #047857;
  --color-success-bg: #d1fae5;
  --color-topbar: #1e293b;
  --color-bg: #f1f5f9;
  --color-surface: #ffffff;
  --color-text: #1e293b;
  --color-muted: #64748b;
  --color-border: #e2e8f0;
  --color-error: #dc2626;
}

/* ===== Mode contraste élevé ===== */
body.high-contrast {
  --color-primary: #000000;
  --color-primary-dark: #333333;
  --color-success: #000000;
  --color-success-dark: #333333;
  --color-success-bg: #ffffff;
  --color-topbar: #000000;
  --color-bg: #ffffff;
  --color-surface: #ffffff;
  --color-text: #000000;
  --color-muted: #000000;
  --color-border: #000000;
}

/* ===== Base ===== */
body {
  margin: 0;
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: system-ui, -apple-system, 'Segoe UI', sans-serif;
}

h1, h2 {
  color: var(--color-text);
  font-weight: 700;
  margin: 0 0 0.75rem 0;
}

p {
  color: var(--color-text);
  margin: 0.4rem 0;
}

/* ===== Barre du haut ===== */
.topbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  flex-wrap: wrap;
  gap: 0.75rem;
  background-color: var(--color-topbar);
  color: #ffffff;
  padding: 1rem 2rem;
}

.topbar-title {
  font-weight: 600;
  font-size: 1.1rem;
}

.topbar-right {
  display: flex;
  align-items: center;
  gap: 0.75rem;
}

.user-badge {
  border: 1px solid #475569;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
  font-size: 0.9rem;
  color: #ffffff;
}

.btn-contrast {
  background: transparent;
  border: 1px solid #ffffff;
  color: #ffffff;
  border-radius: 8px;
  padding: 0.4rem 0.8rem;
}

.btn-contrast:hover {
  background-color: #334155;
}

/* ===== Conteneur central ===== */
.container {
  max-width: none;
  margin: 0;
  padding: 2rem;
}

.container.wide {
  max-width: none;
}

.greeting h1 {
  font-size: 1.8rem;
  margin-bottom: 0.2rem;
}

.today {
  color: var(--color-muted);
  text-transform: capitalize;
  margin-bottom: 1.5rem;
}

/* ===== Cartes (utilisées par chaque composant) ===== */
.card {
  background-color: var(--color-surface);
  border: 1px solid var(--color-border);
  border-radius: 16px;
  padding: 1.5rem;
  margin: 1rem 0;
  box-shadow: 0 2px 8px rgba(15, 23, 42, 0.06);
}

.card h2 {
  border-bottom: 1px solid var(--color-border);
  padding-bottom: 0.5rem;
  font-size: 1.1rem;
  text-transform: uppercase;
  letter-spacing: 0.03em;
}

/* ===== Champs et boutons ===== */
input {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 8px;
  padding: 0.55rem 0.8rem;
  margin: 0.25rem;
  font-size: 0.95rem;
}

input:focus {
  outline: none;
  border-color: var(--color-primary);
  box-shadow: 0 0 0 2px rgba(37, 99, 235, 0.2);
}

input::placeholder {
  color: var(--color-muted);
  opacity: 0.7;
}

button {
  background-color: var(--color-primary);
  color: #ffffff;
  border: none;
  border-radius: 8px;
  padding: 0.55rem 1rem;
  margin: 0.25rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: var(--color-primary-dark);
}

.btn-secondary {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
}

.btn-secondary:hover {
  background-color: var(--color-bg);
}

/* ===== Navigation ===== */
nav {
  display: flex;
  flex-wrap: wrap;
  gap: 0.5rem;
  margin: 1.5rem 0 1rem 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-border);
}

nav a {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 8px;
}

nav a:hover {
  background-color: var(--color-border);
}

nav a.router-link-active {
  background-color: var(--color-primary);
  color: #ffffff;
}

.error {
  color: var(--color-error);
  font-weight: 500;
}
</style>

/* ===== Responsive ===== */

/* Les champs et boutons ne débordent jamais */
input, button {
  max-width: 100%;
  box-sizing: border-box;
}

/* Tablette et moins */
@media (max-width: 900px) {
  .container,
  .container.wide {
    padding: 1rem;
  }

  .topbar {
    padding: 0.75rem 1rem;
  }

  .greeting h1 {
    font-size: 1.4rem;
  }
}

/* Téléphone */
@media (max-width: 600px) {
  .topbar {
    flex-direction: column;
    align-items: flex-start;
  }

  .topbar-right {
    flex-wrap: wrap;
  }

  nav {
    flex-direction: column;
  }

  nav a {
    padding: 0.7rem 1rem; /* zone de clic plus grande au doigt */
  }

  .card {
    padding: 1rem;
  }

  /* champs en pleine largeur */
  input {
    width: 100%;
    margin: 0.25rem 0;
  }

  .card button {
    width: 100%;
    margin: 0.25rem 0;
  }
}