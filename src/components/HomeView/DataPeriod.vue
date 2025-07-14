<template>
  <section>
    <h3 class="data-filter-container__heading">{{ title }}</h3>
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
            :value="page"
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
            :value="limit"
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
            :max="dateTo"
            :value="dateFrom"
            @change="handleDateFrom"
            class="data-filter__input"
          >
        </label>
        <label class="data-filter__elem">
          <span>date to:</span>
          <input
            type="date"
            :max="MAX_DATE"
            :min="dateFrom"
            :value="dateTo"
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

const MAX_DATE = getMaxDate()

const {page, limit, title} = defineProps(["maxPage", "maxLimit", "page", "limit", "dateFrom", "dateTo", "title"])
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