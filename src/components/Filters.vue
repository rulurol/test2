<template>
  <section class="filters-container">
    <h3 class="filters-heading">Filters</h3>
    <p class="table-nav__desc">To apply a filter press "Enter". Active filters have background color</p>
    <div class="filters">
      <label class="filter-item">
        <span>Item identifier (nm id): </span>
        <input
          :value="filters.nm_id"
          @keyup="handleInput"
          name="nm_id"
          :class="{'filter-input': true, 'filter-active': filters.nm_id !== ''}"
        >
      </label>
      <label class="filter-item">
        <span>Region (oblast): </span>
        <input
          :value="filters.oblast"
          @keyup="handleInput"
          name="oblast"
          :class="{'filter-input': true, 'filter-active': filters.oblast !== ''}"
        >
      </label>
      <label class="filter-item">
        <span>Date (date): </span>
        <input
          :value="filters.date"
          @keyup="handleInput"
          name="date"
          :class="{'filter-input': true, 'filter-active': filters.date !== ''}"
        >
      </label>
      <label class="filter-item">
        <span>Brand (brand): </span>
        <input
          :value="filters.brand"
          @keyup="handleInput"
          name="brand"
          :class="{'filter-input': true, 'filter-active': filters.brand !== ''}"
        >
      </label>
    </div>
  </section>
</template>

<script setup>
import { useFiltersStore } from '@/store/filters'

const filters = useFiltersStore()

const handleInput = (e) => {
  if (e.key === "Enter") {
    filters[e.target.name] = e.target.value
  }
}
</script>

<style>
.filters-container {
  background-color: #f0f0f0;
  padding: 4px;
  margin: 10px 0;
  max-width: max-content;
  width: 100%;
  box-sizing: border-box;
}
.filters-heading {
  font-size: 1.1rem;
  font-weight: 500;
  margin: 2px 0 5px 0;
}
.table-nav__desc {
  color: #555;
  margin-bottom: 5px;
}

.filters {
  display: flex;
  flex-direction: column;
  justify-content: flex-start;
  align-items: flex-start;
  flex-wrap: wrap;
}
.filter-item {
  padding: 5px;
  display: flex;
  justify-content: space-between;
  width: 100%;
  box-sizing: border-box;
}
.filter-input {
  background-color: #ffffff;
  border: 1px solid #000000;
  padding: 0 2px;
  max-width: 150px;
}
.filter-input.filter-active {
  background-color: #d1eaff;
  border: 1px solid #003c8a;
}
</style>