<template>
  <TabNav :tab="tab" @changeTab="handleTabChange"/>
  <main class="main-container">
    <h1 class="main-container__heading">{{ title }}</h1>
    <TableNav
      :maxPage="maxPage"
      :maxLimit="maxLimit"
      :isStocksTab="isStocksTab"
      :page="page"
      :limit="limit"
      :dateFrom="dateFrom"
      :dateTo="dateTo"
      @changePage="page = $event"
      @changeLimit="limit = $event"
      @changeDateFrom="dateFrom = $event"
      @changeDateTo="dateTo = $event"
    />
    <DataTable
      :data="data.data"
      :tableHeaders="tableHeaders"
      :dataKeys="dataKeys"
    />
    <Chart
      :data="data.data"
      :keyNames="tableHeaders"
      :dataKeys="dataKeys"
      :chartKey="chartKey"
      @chartKeyChange="chartKey = $event"
    />
  </main>
  <footer class="footer">Test project. Colors: black, gray, white.</footer>
</template>

<script setup>
import { computed, ref, watchEffect } from 'vue'
import TabNav from './components/TabNav.vue'
import TableNav from './components/TableNav.vue'
import DataTable from './components/DataTable.vue'
import { fetchData, MAX_DATE, MAX_LIMIT, INITIAL_PAGE, INITIAL_LIMIT, INITIAL_TAB, INITIAL_DATE_BEFORE, tabs } from './model'
import Chart from './components/Chart.vue'

const tab = ref(INITIAL_TAB)
const title = computed(() => document.title = tab.value.charAt(0).toUpperCase() + tab.value.slice(1))
const isStocksTab = computed(() => tab.value === tabs[3])
const chartKey = ref("")

const page = ref(INITIAL_PAGE)
const limit = ref(INITIAL_LIMIT)
const dateTo = ref(MAX_DATE)
const dateFrom = ref(isStocksTab.value ? MAX_DATE : INITIAL_DATE_BEFORE)
const maxPage = computed(() => Math.ceil(data.value.total / limit.value))
const maxLimit = computed(() => {
  let t = Math.min(MAX_LIMIT, Math.ceil(data.value.total / page.value))
  console.log(t, data.value, page.value)
  return t
})

const handleTabChange = (val) => {
  tab.value = val
  isHeaderChanged = true
  page.value = INITIAL_PAGE
  limit.value = INITIAL_LIMIT
  dateFrom.value = isStocksTab.value ? MAX_DATE : INITIAL_DATE_BEFORE
  dateTo.value = MAX_DATE
  chartKey.value = ""
}


let isHeaderChanged = true
let tableHeaders = null
let dataKeys = null
const data = ref({data: [], total: 0})
watchEffect(async () => {
  data.value = await fetchData(tab.value, page.value, limit.value, dateFrom.value, dateTo.value)
  if (isHeaderChanged) {
    isHeaderChanged = false
    if (!data.value.data.length) return
    dataKeys = Object.keys(data.value.data[0])
    tableHeaders = [...dataKeys]
    for (let i = 0; i < tableHeaders.length; i++) {
      tableHeaders[i] = tableHeaders[i].replaceAll("_", " ")
    }
  }
})
</script>

<style>
.main-container {
  padding: 10px;
}
.main-container__heading {
  font-size: 2rem;
  font-weight: 600;
  color: #333;
  margin: 12px 0;
}
.footer {
  background-color: #dfdfdf;
  padding: 15px;
  color: #626262;
  text-align: center;
  margin-top: auto;
}
</style>