<template>
  <div class="table-container" v-if="data.length > 0">
    <table class="table">
      <thead class="table__head">
        <tr>
          <th v-for="dataHeader in dataHeaders" class="table__cell">{{ dataHeader }}</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in data" class="table__row">
          <td v-for="key in dataKeys" class="table__cell">
            {{ item[key] }}
          </td>
        </tr>
      </tbody>
    </table>
  </div>
  <div v-else>No data</div>
</template>

<script setup>
defineProps(["data", "dataHeaders", "dataKeys"])
</script>

<style scoped>
.table-container {
  overflow: auto;
  padding: 2px;
  max-height: 500px;
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
</style>