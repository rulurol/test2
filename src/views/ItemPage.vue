<template>
  <RouterLink to="/home" class="home-link">Go to home page</RouterLink>
  <div v-if="route.params.id === ''">No item chosen</div>
  <div v-else-if="item !== null">
    <h1 class="item-heading">Item {{ route.params.id }}</h1>
    <div class="item-container">
      <div class="item-info">
        <h2 class="item-sub-heading">Current data:</h2>
        <p v-for="(itemCur, field) in item.cur">
          {{ field }}: {{ itemCur }}
        </p>
        <h2 class="item-sub-heading">Previous data:</h2>
        <p v-for="(itemPrev, field) in item.prev">
          {{ field }}: {{ itemPrev }}
        </p>
        <img src="#" alt="some image here" class="item-image">
      </div>
      <div>
        <h2 class="item-sub-heading">Changes: </h2>
        <table class="table">
          <thead class="table__head">
            <tr>
              <th class="table__cell">Stat name</th>
              <th class="table__cell">current value</th>
              <th class="table__cell">previous value</th>
              <th class="table__cell">difference</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(itemStat, statName) in item.stat">
              <td class="table__cell">{{ statName }}</td>
              <td class="table__cell table__cell--right">{{ itemStat[1] }}</td>
              <td class="table__cell table__cell--right">{{ itemStat[2] }}</td>
              <td class="table__cell table__cell--right">
                <span v-if="itemStat[3] === 0">= </span>
                <span v-else-if="itemStat[3] > 0">↗ </span>
                <span v-else>↘ </span>
                {{ itemStat[3] }}%
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div v-else>No item found, try something else</div>
</template>

<script setup>
import { useDataPeriodsStore } from '@/store/dataPeriods'
import { computed } from 'vue'
import { onBeforeRouteLeave, useRoute } from 'vue-router'

document.title = "Item page"

const route = useRoute()

const dataPeriods = useDataPeriodsStore()

const item = computed(() => {
  const id = Number(route.params.id)
  const fromCur = dataPeriods.cur.data.data.findIndex(d => d.nm_id === id)
  const fromPrev = dataPeriods.prev.data.data.findIndex(d => d.nm_id === id)
  if (fromCur === -1 || fromPrev === -1) return null

  const stat = {}
  for (const statField in dataPeriods.statsByField) {
    stat[statField] = dataPeriods.statsByField[statField][dataPeriods.statsByField[statField].findIndex(d => d[0] === id)]
  }
  return {
    cur: dataPeriods.cur.data.data[fromCur],
    prev: dataPeriods.prev.data.data[fromPrev],
    stat
  }
})

onBeforeRouteLeave((to) => {
  if ((to.path === "/home" || to.path === "/") && dataPeriods.statsByField !== null) dataPeriods.isFromInside = true
})
</script>

<style scoped>
.home-link {
  color: #444;
  text-decoration: underline;
}
.item-heading {
  font-size: 1.4rem;
  margin: 20px 0 10px 0;
}
.item-container {
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  align-items: flex-start;
  justify-content: space-between;
  gap: 10px;
}
.item-sub-heading {
  font-size: 1.16rem;
  font-weight: 500;
  margin: 10px 0;
}
.item-info {
  width: 33%;
  flex-shrink: 0;
  @media(width < 900px) {
    width: 100%;
    max-width: 300px;
  }
}
.item-image {
  display: block;
  width: 100%;
  max-width: 300px;
  background-color: #777;
  aspect-ratio: 1 / 1;
}
.table {
  border-collapse: collapse;
}
.table__head {
  background-color: #eee;
  font-weight: 500;
  text-align: left;
}
.table__cell {
  border: solid #222 1px;
  padding: 1px 2px;
}
.table__cell--right {
  text-align: right;
}
</style>