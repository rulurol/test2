const BASE_URL = "http://109.73.206.144:6969/api/" // for deployment "https://friendly-praline-37ab4e.netlify.app/api/"

export async function fetchData(path, page, limit, dateFrom, dateTo) {
  const data = {data: [], total: 0}
  try {
    const recievedData = await (await fetch(
      BASE_URL + path +
      "?dateFrom=" + dateFrom +
      "&dateTo=" + dateTo +
      "&page=" + page +
      "&limit=" + limit + "&key=E6kUTYrYwZq2tN4QEtyzsbEBk3ie"
    )).json()
    data.data = recievedData.data
    data.total = recievedData.meta.total
  }
  catch(error) {
    console.log(error.message)
  }
  return data
}

const tabs = ["incomes", "orders", "sales", "stocks"]

const date = new Date()
const MAX_DATE = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`
date.setDate(date.getDate() - 30)
const INITIAL_DATE_BEFORE = `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`

const MAX_LIMIT = 500
const INITIAL_PAGE = 1
const INITIAL_LIMIT = 20
const INITIAL_TAB = tabs[0]
export {MAX_LIMIT, MAX_DATE, INITIAL_LIMIT, INITIAL_PAGE, INITIAL_TAB, INITIAL_DATE_BEFORE, tabs}