import { createRouter, createWebHistory } from 'vue-router'
import WorkingTimes from '../components/WorkingTimes.vue'
import WorkingTime from '../components/WorkingTime.vue'
import ClockManager from '../components/ClockManager.vue'
import ChartManager from '../components/ChartManager.vue'


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/workingTimes/:userID', name: 'workingTimes', component: WorkingTimes },
    { path: '/workingTime/:userid', name: 'workingTimeCreate', component: WorkingTime },
    { path: '/workingTime/:userid/:workingtimeid', name: 'workingTimeEdit', component: WorkingTime },
    { path: '/clock/:userid', name: 'clock', component: ClockManager },
    { path: '/chartManager/:userid', name: 'chartManager', component: ChartManager }
  ]
})

export default router