import { defineStore } from "pinia"
import { ref } from "vue"

const useFiltersStore = defineStore("filters", () => {
  const nm_id = ref("")
  const oblast = ref("")
  const date = ref("")
  const brand = ref("")
  const filterFields = ["nm_id", "oblast", "date", "brand"]

  return {nm_id, oblast, date, brand, filterFields}
})

export {useFiltersStore}