import { defineStore } from "pinia"
import { computed, reactive } from "vue"
import { getDateBefore, getMaxDate } from "@/dateFunctions"
import { fetchData } from "@/model"

//initial values
const INITIAL_DATA = {data: [], total: 0}
const CUR_MAX_DATE = getMaxDate()
const CUR_BEFORE_DATE = getDateBefore(30)
const PREV_MAX_DATE = getDateBefore(31)
const PREV_BEFORE_DATE = getDateBefore(61)
const INITIAL_LIMIT = 50
const INITIAL_PAGE = 1

//helper functions
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

const sortDescending = (a, b) => b[3] - a[3]
const getPercent = (baseV, newV) => baseV === 0 ? 0 : Math.floor((newV / baseV - 1) * 1000) / 10


const useDataPeriodsStore = defineStore("dataPeriods", () => {
  const cur = reactive({
    periodName: "cur",
    params: {
      dateFrom: CUR_BEFORE_DATE,
      dateTo: CUR_MAX_DATE,
      page: INITIAL_PAGE,
      limit: INITIAL_LIMIT
    },
    data: INITIAL_DATA,
    stats: null,
    async update() {
      console.log("update current")
      cur.data = await fetchData("orders", cur.params.page, cur.params.limit, cur.params.dateFrom, cur.params.dateTo)
      cur.stats = calculateStats(cur.data.data)
    }
  })
  const prev = reactive({
    params: {
      periodName: "prev",
      dateFrom: PREV_BEFORE_DATE,
      dateTo: PREV_MAX_DATE,
      page: INITIAL_PAGE,
      limit: INITIAL_LIMIT
    },
    data: INITIAL_DATA,
    stats: null,
    async update() {
      console.log("update previous")
      prev.data = await fetchData("orders", prev.params.page, prev.params.limit, prev.params.dateFrom, prev.params.dateTo)
      prev.stats = calculateStats(prev.data.data)
    }
  })

  const statsByField = computed(() => {
    if (cur.stats === null || prev.stats === null) return null
    const obj = {
      totalPrice: [],
      discountPercent: [],
      cancelCount: [],
      oblasts: []
    }
    for (const [k, v] of cur.stats.entries()) {
      if (prev.stats.has(k)) {
        const pv = prev.stats.get(k)
        obj.totalPrice.push([k, v.totalPrice, pv.totalPrice, getPercent(pv.totalPrice, v.totalPrice)])
        obj.discountPercent.push([k, v.totalPrice, pv.discountPercent, getPercent(pv.discountPercent, v.totalPrice)])
        obj.cancelCount.push([k, v.cancelCount, pv.cancelCount, getPercent(pv.cancelCount, v.cancelCount)])
        obj.oblasts.push([k, v.oblasts.size, pv.oblasts.size, getPercent(pv.oblasts.size, v.oblasts.size)])
      }
    }
    obj.totalPrice.sort(sortDescending)
    obj.discountPercent.sort(sortDescending)
    obj.cancelCount.sort(sortDescending)
    obj.oblasts.sort(sortDescending)
    return obj
  })

  return {cur, prev, statsByField, isFromInside: false}
})

export {useDataPeriodsStore}