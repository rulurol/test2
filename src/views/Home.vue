<template>
  <h1 class="main-container__heading">Home (Orders)</h1>
  <DataParam :periodName="dataPeriods.cur.periodName"/>
  <DataParam :periodName="dataPeriods.prev.periodName"/>
  <Stats/>
</template>

<script setup>
import DataParam from '@/components/HomeView/DataParam.vue'
import Stats from '@/components/HomeView/Stats.vue'
import { useDataPeriodsStore } from '@/store/dataPeriods'
import { watch } from 'vue'

document.title = "Home (Orders)"


const dataPeriods = useDataPeriodsStore()

if (!dataPeriods.isFromInside) {
  dataPeriods.cur.update()
  dataPeriods.prev.update()
}
else dataPeriods.isFromInside = false

watch(() => [dataPeriods.cur.params.page, dataPeriods.cur.params.limit, dataPeriods.cur.params.dateFrom, dataPeriods.cur.params.dateTo], dataPeriods.cur.update)
watch(() => [dataPeriods.prev.params.page, dataPeriods.prev.params.limit, dataPeriods.prev.params.dateFrom, dataPeriods.prev.params.dateTo], dataPeriods.prev.update)
</script>