export const getInterns = async (page = '1') => {
  try {
    const response = await fetch(`https://reqres.in/api/users?page=${page}`, {
      headers: {
        'Content-Type': 'application/json',
      }
    })

    return await response.json()
  } catch (e) {
    console.error('error', e)
  }
}
