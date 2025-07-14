<template>
  <section v-show="data.length > 0">
    <h2 class="chart__heading">Chart</h2>
    <span class="chart__desc">Group table values by: </span>
    <select @change="emit('chartKeyChange', $event.target.value)" :value="chartKey">
      <option value="" disabled selected>Choose a field</option>
      <option v-for="name, i in dataHeaders" :value="dataKeys[i]">{{ name }}</option>
    </select>
    <div v-show="chartKey" class="chart__items">
      <div v-for="[k, v] in vals.entries()" class="chart__item">
        <div class="chart__item-val">{{v.val}}</div>
        <div
          class="chart__item-view"
          :style="`height: ${v.height}px; background-color:${v.color}`"
        ></div>
        <div class="chart__item-label-container">
          <div class="chart__item-label">{{k}}</div>
        </div>
      </div>
    </div>
  </section>
</template>

<script setup>
import { computed } from 'vue'

const MAX_HEIGHT = 150
const MIN_COLOR = 140
const MULT_COLOR = 75

const {data, dataHeaders, dataKeys, chartKey} = defineProps(["data", "dataKeys", "dataHeaders", "chartKey"])
const emit = defineEmits(["chartKeyChange"])

const vals = computed(() => {
  let maxVal = 0
  const map = new Map()
  if (!chartKey) return map
  for (const item of data) {
    const v = (map.get(item[chartKey]) || 0) + 1
    map.set(item[chartKey], v)
    if (v > maxVal) maxVal = v
  }
  if (map.has("") || map.has(null) || map.has(undefined)) {
    map.set("no value", (map.get("") || 0) + (map.get(null) || 0) + (map.get(undefined) || 0))
    map.delete("")
    map.delete(null)
    map.delete(undefined)
  }
  for (const [k, v] of map.entries()) {
    const part = v / maxVal
    const col = MULT_COLOR * (1-part) + MIN_COLOR
    map.set(k, {
      val: v,
      height: MAX_HEIGHT * part,
      color: `rgb(${col},${col},${col})`
    })
  }
  return map
})
</script>

<style scoped>
.chart__heading {
  font-size: 1.5rem;
  font-weight: 600;
  margin: 10px 0;
}
.chart__desc {
  color: #555;
}
.chart__items {
  display: flex;
  flex-wrap: nowrap;
  align-items:end;
  justify-content: flex-start;
  overflow-x: auto;
  padding: 2px;
  user-select: none;
}
.chart__item {
  width: 2rem;
}
.chart__item-val {
  text-align: center;
  margin-bottom: 2px;
  width: 100%;
  color: #606060;
}
.chart__item-view {
  box-sizing: border-box;
  border: 1px solid #0007;
}
.chart__item-label-container {
  height: 100px;
  overflow: hidden;
  margin-top: 2px
}
.chart__item-label {
  transform: rotate(-90deg) translateY(-2rem) translateX(-2rem);
  width: 100px;
  height: 2rem;
  text-align: right;
  padding-right: 4px;
  white-space: nowrap;
}
</style>