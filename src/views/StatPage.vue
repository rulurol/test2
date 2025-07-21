<template>
    <div v-if="dataPeriods.statsByField !== null">
      <RouterLink to="/home" class="home-link">Go to home page</RouterLink>
      <h1 class="stat-heading">{{ title }} page</h1>
      <div class="stat-chart-container">
        <StatChart
          v-if="dataPeriods.statsByField[statField][0][3] !== dataPeriods.statsByField[statField][dataPeriods.statsByField[statField].length-1][3]"
          :statField="statField"
        />
        <div v-else>No difference between previous and current periods</div>
      </div>
      <StatTable :statField="statField"/>
    </div>
    <div v-else>No data to show</div>
</template>

<script setup>
import StatTable from '@/components/HomeView/StatTable.vue'
import StatChart from '@/components/HomeView/StatChart.vue'
import { useDataPeriodsStore } from '@/store/dataPeriods'
import { onBeforeRouteLeave, useRoute } from 'vue-router'

const pathToVal = {
  "/home/total-price": ["totalPrice", "Total price"],
  "/home/discount-percent": ["discountPercent", "Discount percent"],
  "/home/cancel-count": ["cancelCount", "Cancel count"],
  "/home/oblasts": ["oblasts", "Oblasts"]
}

const route = useRoute()
const [statField, title] = pathToVal[route.path]
const dataPeriods = useDataPeriodsStore()

document.title = title

onBeforeRouteLeave((to) => {
  if ((to.path === "/home" || to.path === "/") && dataPeriods.statsByField !== null) dataPeriods.isFromInside = true
})
</script>

<style scoped>
.home-link {
  color: #444;
  text-decoration: underline;
}
.stat-heading {
  font-size: 1.3rem;
  font-weight: 500;
  margin: 20px 0 10px 0;
}
.stat-chart-container {
  padding: 6px;
  user-select: none;
  background-color: #f0f0f0;
  width: max-content;
  max-width: 100%;
  display: block;
  margin: 10px 0;
  overflow-x: auto;
  box-sizing: border-box;
}
</style>