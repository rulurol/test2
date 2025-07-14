const date = new Date()

function formatDate() {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
}

const maxDate = formatDate()
export function getMaxDate() {
  return maxDate
}

export function getDateBefore(daysAgo) {
  date.setDate(date.getDate() - daysAgo)
  const formatedDate = formatDate(date)
  date.setDate(date.getDate() + daysAgo)
  return formatedDate
}