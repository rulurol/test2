<template>
  <h1 class="main-container__heading">Home (Orders)</h1>
  <DataParam :periodName="dataPeriods.cur.periodName"/>
  <DataParam :periodName="dataPeriods.prev.periodName"/>
  <Filters/>
  <Stats/>
</template>

<script setup>
import Filters from '@/components/Filters.vue'
import DataParam from '@/components/HomeView/DataParam.vue'
import Stats from '@/components/HomeView/Stats.vue'
import { useDataPeriodsStore } from '@/store/dataPeriods'
import { useFiltersStore } from '@/store/filters'
import { watch } from 'vue'

document.title = "Home (Orders)"


const dataPeriods = useDataPeriodsStore()
const filters = useFiltersStore()


if (!dataPeriods.isFromInside) {
  dataPeriods.cur.updateData(filters)
  dataPeriods.prev.updateData(filters)
}
else dataPeriods.isFromInside = false

watch(filters, () => {
  dataPeriods.cur.updateFilteredData(filters)
  dataPeriods.prev.updateFilteredData(filters)
})

watch(
  () => [dataPeriods.cur.params.page, dataPeriods.cur.params.limit, dataPeriods.cur.params.dateFrom, dataPeriods.cur.params.dateTo],
  () => dataPeriods.cur.updateData(filters)
)
watch(
  () => [dataPeriods.prev.params.page, dataPeriods.prev.params.limit, dataPeriods.prev.params.dateFrom, dataPeriods.prev.params.dateTo],
  () => dataPeriods.prev.updateData(filters)
)
</script>