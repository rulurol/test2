<template>
  <section class="table-nav-container">
    <div class="table-nav">
      <span class="table-nav__desc  table-nav__elem">Press "Enter" to set the value of the field</span>
      <label class="table-nav__elem">
        <span>page {{maxPage ? `(from 1 to ${maxPage})` : "isn't available"}}:</span>
        <input
          type="number"
          step="1"
          :max="maxPage"
          min="1"
          @keyup="handlePage"
          :value="page"
          class="table-nav__input"
          :disabled="!maxPage"
        >
      </label>
      <label class="table-nav__elem">
        <span>items per page {{maxLimit ? `(from 1 to ${maxLimit})` : "isn't available"}}:</span>
        <input
          type="number"
          step="1"
          :max="maxLimit"
          min="1"
          @keyup="handleLimit"
          :value="limit"
          class="table-nav__input"
          :disabled="!maxLimit"
        >
      </label>
    </div>
    <div class="table-nav">
      <label class="table-nav__elem">
        <span>date from:</span>
        <input
          type="date"
          :max="dateTo"
          :value="dateFrom"
          :disabled="isStocksPage"
          @change="handleDateFrom"
          class="table-nav__input"
        >
      </label>
      <label class="table-nav__elem">
        <span>date to:</span>
        <input
          type="date"
          :max="MAX_DATE"
          :min="dateFrom"
          :value="dateTo"
          :disabled="isStocksPage"
          @change="handleDateTo"
          class="table-nav__input"
        >
      </label>
    </div>
  </section>
</template>

<script setup>
import { getMaxDate } from '@/dateFunctions'


const MAX_DATE = getMaxDate()

const {page, limit} = defineProps(["maxPage", "maxLimit", "isStocksPage", "page", "limit", "dateFrom", "dateTo"])
const emit = defineEmits(["changePage", "changeLimit", "changeDateFrom", "changeDateTo"])


const handlePage = (e) => {
  if (e.key !== "Enter" || e.target.value === "" || Number(e.target.value) === page) return
  emit("changePage", Number(e.target.value))
}
const handleLimit = (e) => {
  if (e.key !== "Enter" || e.target.value === "" || Number(e.target.value) === limit) return
  emit("changeLimit", Number(e.target.value))
}
const handleDateFrom = (e) => {
  emit("changeDateFrom", e.target.value)
}
const handleDateTo = (e) => {
  emit("changeDateTo", e.target.value)
}
</script>

<style scoped>
.table-nav-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  margin: 10px 0;
}
.table-nav {
  background-color: #f0f0f0;
  padding: 4px;
  display: flex;
  flex-direction: column;
  flex-basis: 250px;
  max-width: 350px;
  flex-grow: 1;
  flex-shrink: 1;
}
.table-nav__desc {
  color: #555;
  margin-bottom: 5px;
}
.table-nav__elem {
  display: flex;
  justify-content: space-between;
  margin: 5px;
  align-items: center;
}
.table-nav__input {
  padding: 1px 2px;
}
</style>