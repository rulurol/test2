<template>
  <div class="table-container">
    <table class="table">
      <thead class="table__head">
        <tr>
          <th class="table__cell table__cell--header">nm_id</th>
          <th class="table__cell table__cell--header">current value</th>
          <th class="table__cell table__cell--header">previous value</th>
          <th class="table__cell table__cell--header">difference</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in dataPeriods.statsByField[statField]" class="table__row">
          <td class="table__cell"><RouterLink :to="`/home/item/${item[0]}`">{{ item[0] }}</RouterLink></td>
          <td class="table__cell">{{ item[1] }}</td>
          <td class="table__cell">{{ item[2] }}</td>
          <td v-if="item[3] === 0" class="table__cell">= {{ item[3] }}%</td>
          <td v-else-if="item[3] > 0" class="table__cell table__cell--green">↗ {{ item[3] }}%</td>
          <td v-else class="table__cell table__cell--red">↘ {{ item[3] }}%</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script setup>
import { useDataPeriodsStore } from '@/store/dataPeriods'
import { RouterLink } from 'vue-router';

defineProps(["statField"])
const dataPeriods = useDataPeriodsStore()
</script>

<style scoped>
.table-container {
  overflow: auto;
  padding: 2px;
  max-height: 500px;
  text-align: right;
}
.table {
  border-collapse: collapse;
}
.table__head {
  background-color: #eee;
  font-weight: 500;
}
.table__row:nth-child(even) {
  background-color: #f5f5f5;
}
.table__cell {
  border: 1px solid #000;
  padding: 0 2px;
}
.table__cell--header {
  text-align: center;
}
.table__cell--green {
  color: #008000;
}
.table__cell--red {
  color: #980000;
}
</style>