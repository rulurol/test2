<template>
  <section>
    <h3 class="data-filter-container__heading">
      {{ periodName === "cur" ? "Current" : "Previous" }} period
    </h3>
    <article class="data-filter-container">
      <div class="data-filter">
        <span class="data-filter__desc  data-filter__elem">Press "Enter" to set the value of the field</span>
        <label class="data-filter__elem">
          <span>page {{maxPage ? `(from 1 to ${maxPage})` : "isn't available"}}:</span>
          <input
            type="number"
            step="1"
            :max="maxPage"
            min="1"
            @keyup="handlePage"
            :value="dataPeriods[period].params.page"
            class="data-filter__input"
            :disabled="!maxPage"
          >
        </label>
        <label class="data-filter__elem">
          <span>items per page {{maxLimit ? `(from 1 to ${maxLimit})` : "isn't available"}}:</span>
          <input
            type="number"
            step="1"
            :max="maxLimit"
            min="1"
            @keyup="handleLimit"
            :value="dataPeriods[period].params.limit"
            class="data-filter__input"
            :disabled="!maxLimit"
          >
        </label>
      </div>
      <div class="data-filter">
        <label class="data-filter__elem">
          <span>date from:</span>
          <input
            type="date"
            :max="dataPeriods[period].params.dateTo"
            :value="dataPeriods[period].params.dateFrom"
            @change="handleDateFrom"
            class="data-filter__input"
          >
        </label>
        <label class="data-filter__elem">
          <span>date to:</span>
          <input
            type="date"
            :max="MAX_DATE"
            :min="dataPeriods[period].params.dateFrom"
            :value="dataPeriods[period].params.dateTo"
            @change="handleDateTo"
            class="data-filter__input"
          >
        </label>
      </div>
    </article>
  </section>
</template>

<script setup>
import { getMaxDate } from '@/dateFunctions'
import { MAX_LIMIT } from '@/model'
import { useDataPeriodsStore } from '@/store/dataPeriods'
import { computed } from 'vue'

const MAX_DATE = getMaxDate()

const {periodName} = defineProps(["periodName"])
const dataPeriods = useDataPeriodsStore()

const period = periodName === dataPeriods.cur.periodName ? "cur" : "prev"

const maxPage = computed(() => Math.ceil(dataPeriods[period].data.total / dataPeriods[period].params.limit))
const maxLimit = computed(() => Math.min(MAX_LIMIT, Math.ceil(dataPeriods[period].data.total / dataPeriods[period].params.page)))


const handlePage = (e) => {
  if (e.key !== "Enter" || e.target.value === "" || Number(e.target.value) === dataPeriods[period].params.page) return
  dataPeriods[period].params.page = Number(e.target.value)
}
const handleLimit = (e) => {
  if (e.key !== "Enter" || e.target.value === "" || Number(e.target.value) === dataPeriods[period].params.limit) return
  dataPeriods[period].params.limit = Number(e.target.value)
}
const handleDateFrom = (e) => {
  console.log(e.key)
  dataPeriods[period].params.dateFrom = e.target.value
}
const handleDateTo = (e) => {
  dataPeriods[period].params.dateTo = e.target.value
}
</script>

<style scoped>
.data-filter-container__heading {
  font-weight: 500;
  font-size: 1.2rem;
  color: #111;
}
.data-filter-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0;
}
.data-filter {
  background-color: #f0f0f0;
  padding: 4px;
  display: flex;
  flex-direction: column;
  flex-basis: 250px;
  max-width: 350px;
  flex-grow: 1;
  flex-shrink: 1;
}
.data-filter__desc {
  color: #555;
  margin-bottom: 5px;
}
.data-filter__elem {
  display: flex;
  justify-content: space-between;
  margin: 5px;
  align-items: center;
}
.data-filter__input {
  padding: 1px 2px;
}
</style>