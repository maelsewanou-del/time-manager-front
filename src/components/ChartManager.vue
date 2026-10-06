<template>
  <div>
    <h2>Graphique des heures travaillées</h2>
    userId: <input v-model="userId" type="text" placeholder="Entrez l'ID de l'utilisateur" />
    <button @click="getChartData">Actualiser</button>
    <Bar :data="chartData" />
    <Line :data="chartData" />
    <Pie :data="chartData" />
  </div>
</template>

<script>
import axios from 'axios'
import { Bar, Line, Pie } from 'vue-chartjs'
import {
  Chart as ChartJS,
  Title,
  Tooltip,
  Legend,
  BarElement,
  LineElement,
  PointElement,
  ArcElement,
  CategoryScale,
  LinearScale
} from 'chart.js'

ChartJS.register(
  Title, Tooltip, Legend,
  BarElement, LineElement, PointElement, ArcElement,
  CategoryScale, LinearScale
)

export default {
  name: 'ChartManager',
  components: { Bar, Line, Pie },
  data() {
    return {
      userId: null,
      chartData: {
        labels: [],
        datasets: []
      }
    }
  },
  mounted() {
    this.userId = this.$route.params.userid
    this.getChartData()
  },
  methods: {
    getChartData() {
      axios.get('http://localhost:4000/api/workingtime/' + this.userId)
        .then(response => {
          const workingTimes = response.data

          const labels = workingTimes.map(wt => {
            const date = new Date(wt.start)
            return date.toLocaleDateString()
          })

          const durations = workingTimes.map(wt => {
            const start = new Date(wt.start)
            const end = new Date(wt.end)
            return (end - start) / (1000 * 60 * 60)
          })

          this.chartData = {
            labels: labels,
            datasets: [
              {
                label: 'Heures travaillées',
                data: durations,
                backgroundColor: '#C9A876'
              }
            ]
          }
        })
        .catch(error => {
          console.log(error)
        })
    }
  }
}
</script>