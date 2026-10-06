<template>
  <div id="app">
    <h1>Time Manager</h1>
    <User />
    <nav>
      <router-link to="/workingTimes/1">Heures de travail</router-link>
      <router-link to="/workingTime/1">Gérer une plage</router-link>
      <router-link to="/clock/1">Pointeuse</router-link>
      <router-link to="/chartManager/1">Graphiques</router-link>
    </nav>
    <router-view />
  </div>
</template>

<script>
import User from './components/User.vue'

export default {
  name: 'App',
  components: {
    User
  }
}
</script>

<style>
:root {
  --color-primary: #C9A876;
  --color-primary-dark: #B08D5B;
  --color-bg: #F5F0E6;
  --color-surface: #EDE4D3;
  --color-text: #4A3F35;
  --color-border: #D6C9B3;
  --color-error: #B5543A;
}

body {
  background-color: var(--color-bg);
  color: var(--color-text);
  font-family: system-ui, -apple-system, sans-serif;
  margin: 0;
  padding: 2rem;
}

h1, h2 {
  color: var(--color-text);
  font-weight: 600;
}

input {
  background-color: var(--color-surface);
  color: var(--color-text);
  border: 1px solid var(--color-border);
  border-radius: 6px;
  padding: 0.5rem 0.75rem;
  margin: 0.25rem;
  font-size: 0.95rem;
}

input:focus {
  outline: none;
  border-color: var(--color-primary);
}

input::placeholder {
  color: var(--color-border);
}

button {
  background-color: var(--color-primary);
  color: var(--color-text);
  border: none;
  border-radius: 6px;
  padding: 0.5rem 1rem;
  margin: 0.25rem;
  font-size: 0.95rem;
  cursor: pointer;
  transition: background-color 0.2s ease;
}

button:hover {
  background-color: var(--color-primary-dark);
}

p {
  color: var(--color-text);
}

nav {
  display: flex;
  gap: 1rem;
  margin: 1.5rem 0;
  padding-bottom: 1rem;
  border-bottom: 2px solid var(--color-border);
}

nav a {
  color: var(--color-text);
  text-decoration: none;
  font-weight: 500;
  padding: 0.5rem 1rem;
  border-radius: 6px;
  transition: background-color 0.2s ease;
}

nav a:hover {
  background-color: var(--color-surface);
}

nav a.router-link-active {
  background-color: var(--color-primary);
}
</style>