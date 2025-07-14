<template>
  <section v-if="prev !== null && cur !== null">
    <h2 class="stats__heading">Stats</h2>
    <div class="stats__description">
      <h3 class="stats__description-heading">How it's counted?</h3>
      <p>Total price: a sum of fields <span class="field-name">total_price</span> rounded down</p>
      <p>Discount percent: a sum of fields <span class="field-name">discount_percent</span></p>
      <p>Cancel count: number of fields <span class="field-name">is_cancel</span> with value <span class="field-name">true</span></p>
      <p>Oblasts: number of unique values from fieds <span class="field-name">oblast</span></p>
      <p>Grouped by field <span class="field-name">nm_id</span></p>
    </div>
    <StatElem title="Total price" :items="totalPrice"/>
    <StatElem title="Discount percent" :items="discountPercent"/>
    <StatElem title="Cancel count" :items="cancelCount"/>
    <StatElem title="Oblasts" :items="oblasts"/>
  </section>
  <div v-else>No data to show</div>
</template>

<script setup>
import { watchEffect, ref } from 'vue'
import StatElem from './StatElem.vue'

const {prev, cur} = defineProps(["prev", "cur"])

const totalPrice = ref(null)
const discountPercent = ref(null)
const cancelCount = ref(null)
const oblasts = ref(null)


const sortDescending = (a, b) => b[3] - a[3]
const getPercent = (baseV, newV) => baseV === 0 ? 0 : Math.floor((newV / baseV - 1) * 1000) / 10
watchEffect(() => {
  if (cur === null || prev === null) return
  totalPrice.value = []
  discountPercent.value = []
  cancelCount.value = []
  oblasts.value = []

  for (const [k, v] of cur.entries()) {
    if (prev.has(k)) {
      const pv = prev.get(k)
      totalPrice.value.push([k, v.totalPrice, pv.totalPrice, getPercent(pv.totalPrice, v.totalPrice)])
      discountPercent.value.push([k, v.totalPrice, pv.discountPercent, getPercent(pv.discountPercent, v.totalPrice)])
      cancelCount.value.push([k, v.cancelCount, pv.cancelCount, getPercent(pv.cancelCount, v.cancelCount)])
      oblasts.value.push([k, v.oblasts.size, pv.oblasts.size, getPercent(pv.oblasts.size, v.oblasts.size)])
    }
  }
  totalPrice.value.sort(sortDescending)
  discountPercent.value.sort(sortDescending)
  cancelCount.value.sort(sortDescending)
  oblasts.value.sort(sortDescending)
})
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
</style>