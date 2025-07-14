<template>
  <h1 class="main-container__heading">{{ pageTitle }}</h1>
  <TableNav
    :maxPage="maxPage"
    :maxLimit="maxLimit"
    :isStocksPage="isStocksPage"
    :page="tablePage"
    :limit="limit"
    :dateFrom="dateFrom"
    :dateTo="dateTo"
    @changePage="tablePage = $event"
    @changeLimit="limit = $event"
    @changeDateFrom="dateFrom = $event"
    @changeDateTo="dateTo = $event"
  />
  <DataTable
    :data="data.data"
    :dataHeaders="dataHeaders"
    :dataKeys="dataKeys"
  />
  <Chart
    :data="data.data"
    :dataHeaders="dataHeaders"
    :dataKeys="dataKeys"
    :chartKey="chartKey"
    @chartKeyChange="chartKey = $event"
  />
</template>

<script setup>
import { computed, ref, watch, watchEffect } from 'vue'
import TableNav from '../components/BaseView/TableNav.vue'
import DataTable from '../components/BaseView/DataTable.vue'
import { fetchData, MAX_LIMIT } from '../model'
import Chart from '../components/BaseView/Chart.vue'
import { getDateBefore, getMaxDate } from '@/dateFunctions'


const INITIAL_LIMIT = 20
const INITIAL_PAGE = 1
const MAX_DATE = getMaxDate()
const INITIAL_DATE_BEFORE = getDateBefore(30)
const {page, pageTitle, isStocksPage} = defineProps(["page", "pageTitle", "isStocksPage"])


const chartKey = ref("")
const tablePage = ref(0)
const limit = ref(0)
const dateTo = ref("")
const dateFrom = ref("")
const maxPage = computed(() => Math.ceil(data.value.total / limit.value))
const maxLimit = computed(() => Math.min(MAX_LIMIT, Math.ceil(data.value.total / tablePage.value)))
let isHeaderChanged = true

//on page change
watch(() => page, () => {
  dateFrom.value = isStocksPage ? MAX_DATE : INITIAL_DATE_BEFORE
  dateTo.value = MAX_DATE
  chartKey.value = ""
  tablePage.value = INITIAL_PAGE
  limit.value = INITIAL_LIMIT
  isHeaderChanged = true
  document.title = pageTitle
}, {immediate: true})

let dataHeaders = null
let dataKeys = null
const data = ref({data: [], total: 0})
watchEffect(async () => {
  data.value = await fetchData(page, tablePage.value, limit.value, dateFrom.value, dateTo.value)
  if (data.value.data.length && isHeaderChanged) {
    isHeaderChanged = false
    dataKeys = Object.keys(data.value.data[0])
    dataHeaders = [...dataKeys]
    for (let i = 0; i < dataHeaders.length; i++) {
      dataHeaders[i] = dataHeaders[i].replaceAll("_", " ")
    }
  }
}, {flush: "post"})
</script>