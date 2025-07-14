<template>
  <section>
    <h3 class="stat-heading">{{ title }}</h3>
    <div class="chart__items" :style="'height:' + MAX_HEIGHT + 'px'">
      <div v-for="val in vals" class="chart__item">
        <div
          class="chart__item-view"
          :style="{
            height: Math.abs(val) + 'px',
            transform: `translateY(${Math.min(maxVal - val, maxVal)}px)`,
            backgroundColor: val < 0 ? '#e00000' : '#00e000'
          }"
        ></div>
      </div>
    </div>
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
          <tr v-for="item in items" class="table__row">
            <td class="table__cell">{{ item[0] }}</td>
            <td class="table__cell">{{ item[1] }}</td>
            <td class="table__cell">{{ item[2] }}</td>
            <td v-if="item[3] === 0" class="table__cell">= {{ item[3] }}%</td>
            <td v-else-if="item[3] > 0" class="table__cell table__cell--green">↗ {{ item[3] }}%</td>
            <td v-else class="table__cell table__cell--red">↘ {{ item[3] }}%</td>
          </tr>
        </tbody>
      </table>
    </div>
  </section>
</template>

<script setup>
import { computed, ref } from 'vue'

const {items} = defineProps(["items", "title"])

const MAX_HEIGHT = 150

const maxVal = ref(0)
const vals = computed(() => {
  let dif = items[0][3] //all values > 0
  if (items[0][3] <= 0) dif = -items[items.length-1][3] //all values < 0
  else if (items[items.length-1][3] < 0) dif -= items[items.length-1][3] //some values > 0 and some < 0

  const arr = new Array(items.length)
  for (let i = 0; i < items.length; i++) {
    arr[i] = items[i][3] * MAX_HEIGHT / dif
  }
  maxVal.value = Math.max(0, arr[0])
  return arr
})
</script>

<style scoped>
.stat-heading {
  font-size: 1.15rem;
  font-weight: 500;
  margin-top: 10px;
  margin-bottom: 5px;
}
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

.chart__items {
  display: flex;
  flex-wrap: nowrap;
  align-items:start;
  justify-content: flex-start;
  overflow-x: auto;
  padding: 6px;
  user-select: none;
  background-color: #f0f0f0;
  width: max-content;
  max-width: 100%;
}
.chart__item {
  width: 2rem;
}
.chart__item-view {
  box-sizing: border-box;
  border: 1px solid #0007;
  background-color: #eee;
}
</style>