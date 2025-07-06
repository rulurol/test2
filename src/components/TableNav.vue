<template>
  <section class="table-nav-container">
    <div class="table-nav">
      <span class="table-nav__desc  table-nav__elem">Press "Enter" to set the value of the field</span>
      <label class="table-nav__elem">
        <span>page (from 1 to {{ maxPage || 1 }}):</span>
        <input
          type="number"
          step="1"
          :max="maxPage"
          min="1"
          @keyup="handlePage"
          :value="page"
          class="table-nav__input"
        >
      </label>
      <label class="table-nav__elem">
        <span>items per page (from 1 to {{ maxLimit }}):</span>
        <input
          type="number"
          step="1"
          :max="maxLimit"
          min="1"
          @keyup="handleLimit"
          :value="limit"
          class="table-nav__input"
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
          :disabled="isStocksTab"
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
          :disabled="isStocksTab"
          @change="handleDateTo"
          class="table-nav__input"
        >
      </label>
    </div>
  </section>
</template>

<script setup>
import { MAX_DATE } from '@/model'

const {page, limit} = defineProps(["maxPage", "maxLimit", "isStocksTab", "page", "limit", "dateFrom", "dateTo"])
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

<style>
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