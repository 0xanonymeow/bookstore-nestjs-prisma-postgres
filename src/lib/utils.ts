export function paginateResponse(
  data: [unknown[], number],
  page: number = 1,
  limit: number = 50,
) {
  const [result, total] = data
  const lastPage = Math.ceil(total / limit)
  const nextPage = page + 1 > lastPage ? null : page + 1
  const prevPage = page - 1 < 1 ? null : page - 1
  return {
    statusCode: 'success',
    data: [...result],
    count: total,
    currentPage: page,
    nextPage: nextPage,
    prevPage: prevPage,
    lastPage: lastPage,
  }
}
