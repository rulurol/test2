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
    if (recievedData.data) data.data = recievedData.data
    if(recievedData.meta?.total) data.total = recievedData.meta.total
  }
  catch(error) {
    console.log(error.message)
  }
  return data
}

const MAX_LIMIT = 500
export {MAX_LIMIT}