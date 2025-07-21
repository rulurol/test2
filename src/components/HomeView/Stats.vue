<template>
  <section v-if="dataPeriods.statsByField !== null">
    <h2 class="stats__heading">Stats</h2>
    <div class="stats__description">
      <h3 class="stats__description-heading">How it's counted?</h3>
      <p>Total price: a sum of fields <span class="field-name">total_price</span> rounded down</p>
      <p>Discount percent: a sum of fields <span class="field-name">discount_percent</span></p>
      <p>Cancel count: number of fields <span class="field-name">is_cancel</span> with value <span class="field-name">true</span></p>
      <p>Oblasts: number of unique values from fieds <span class="field-name">oblast</span></p>
      <p>Grouped by field <span class="field-name">nm_id</span></p>
    </div>
    <section v-for="[title, statField, linkTo] in statItems">
      <h3 class="stat-heading">{{ title }}</h3>
      <RouterLink :to="`/home/${linkTo}`" class="stat-chart-container">
        <StatChart
          v-if="dataPeriods.statsByField[statField][0][3] !== dataPeriods.statsByField[statField][dataPeriods.statsByField[statField].length-1][3]"
          :statField="statField"
        />
        <div v-else>No difference between previous and current periods</div>
      </RouterLink>
      <StatTable :statField="statField"/>
    </section>
  </section>
  <div v-else>No data to show</div>
</template>

<script setup>
import { useDataPeriodsStore } from '@/store/dataPeriods'
import StatTable from './StatTable.vue'
import StatChart from './StatChart.vue'
const dataPeriods = useDataPeriodsStore()

const statItems = [
  //[title, statField, linkTo]
  ["Total price", "totalPrice", "total-price"],
  ["Discount percent", "discountPercent", "discount-percent"],
  ["Cancel count", "cancelCount", "cancel-count"],
  ["Oblasts", "oblasts", "oblasts"]
]
</script>

<style scoped>
.stats__heading {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 10px 0;
}
.stats__description {
  display: flex;
  flex-direction: column;
  gap: 9px;
  background-color: #f6f6f6;
  color: #333;
  max-width: 55ch;
  padding: 8px;
}
.stats__description-heading {
  font-size: 1.15rem;
  font-weight: 500;
}
.field-name {
  font-family:'Courier New', Courier, monospace;
  background-color: #e2e2e2;
  color: #222;
  padding: 1px 2px;
}

.stat-heading {
  font-size: 1.15rem;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 5px;
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