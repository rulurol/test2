<template>
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
</template>

<script setup>
import { useDataPeriodsStore } from '@/store/dataPeriods'
import { computed, ref } from 'vue'

const {statField} = defineProps(["statField"])

const MAX_HEIGHT = 150
const dataPeriods = useDataPeriodsStore()

const maxVal = ref(0)
const vals = computed(() => {
  const items = dataPeriods.statsByField[statField]
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
.chart__items {
  display: flex;
  flex-wrap: nowrap;
  align-items:start;
  justify-content: flex-start;
}
.chart__item {
  width: 1.7rem;
  flex-shrink: 0;
  flex-grow: 0;
}
.chart__item-view {
  box-sizing: border-box;
  border: 1px solid #0007;
  background-color: #eee;
}
</style>