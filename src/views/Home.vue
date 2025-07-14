<template>
  <h1 class="main-container__heading">Home (Orders)</h1>
  <DataPeriod
    title="Current period"
    v-bind="curFilters"
    :maxPage="curMaxPage"
    :maxLimit="curMaxLimit"
    @changePage="curFilters.page = $event"
    @changeLimit="curFilters.limit = $event"
    @changeDateFrom="curFilters.dateFrom = $event"
    @changeDateTo="curFilters.dateTo = $event"
  />
  <DataPeriod
    title="Previous period"
    v-bind="prevFilters"
    :maxPage="prevMaxPage"
    :maxLimit="prevMaxLimit"
    @changePage="prevFilters.page = $event"
    @changeLimit="prevFilters.limit = $event"
    @changeDateFrom="prevFilters.dateFrom = $event"
    @changeDateTo="prevFilters.dateTo = $event"
  />
  <Stats :prev="prevStats" :cur="curStats"/>
</template>

<script setup>
import DataPeriod from '@/components/HomeView/DataPeriod.vue'
import Stats from '@/components/HomeView/Stats.vue'
import { getDateBefore, getMaxDate } from '@/dateFunctions'
import { fetchData, MAX_LIMIT } from '@/model'
import { computed, reactive, ref, watchEffect } from 'vue'

document.title = "Home (Orders)"

const CUR_MAX_DATE = getMaxDate()
const CUR_BEFORE_DATE = getDateBefore(30)
const PREV_MAX_DATE = getDateBefore(31)
const PREV_BEFORE_DATE = getDateBefore(61)
const INITIAL_PAGE = 1
const INITIAL_LIMIT = 50
const INITIAL_DATA = {data: [], total: 0}

const curFilters = reactive({
  dateFrom: CUR_BEFORE_DATE,
  dateTo: CUR_MAX_DATE,
  page: INITIAL_PAGE,
  limit: INITIAL_LIMIT
})
const prevFilters = reactive({
  dateFrom: PREV_BEFORE_DATE,
  dateTo: PREV_MAX_DATE,
  page: INITIAL_PAGE,
  limit: INITIAL_LIMIT
})

const curMaxPage = computed(() => Math.ceil(curData.value.total / curFilters.limit))
const curMaxLimit = computed(() => Math.min(MAX_LIMIT, Math.ceil(curData.value.total / curFilters.page)))

const prevMaxPage = computed(() => Math.ceil(prevData.value.total / prevFilters.limit))
const prevMaxLimit = computed(() => Math.min(MAX_LIMIT, Math.ceil(prevData.value.total / prevFilters.page)))


const curData = ref(INITIAL_DATA)
const prevData = ref(INITIAL_DATA)

const curStats = ref(null)
const prevStats = ref(null)

const calculateStats = (data) => {
  if (!data) return null

  const map = new Map()
  for (const item of data) {
    if (!map.has(item.nm_id)) map.set(item.nm_id, {
      totalPrice: 0,
      discountPercent: 0,
      cancelCount: 0,
      oblasts: new Set()
    })
    const v = map.get(item.nm_id)

    v.totalPrice += parseInt(item.total_price)
    v.discountPercent += item.discount_percent
    if (item.is_cancel) v.cancelCount++
    v.oblasts.add(item.oblast)
  }
  return map
}

watchEffect(async () => {
  curData.value = await fetchData("orders", curFilters.page, curFilters.limit, curFilters.dateFrom, curFilters.dateTo)
  curStats.value = calculateStats(curData.value.data)
}, {flush: "post"})
watchEffect(async () => {
  prevData.value = await fetchData("orders", prevFilters.page, prevFilters.limit, prevFilters.dateFrom, prevFilters.dateTo)
  prevStats.value = calculateStats(prevData.value.data)
}, {flush: "post"})
</script>