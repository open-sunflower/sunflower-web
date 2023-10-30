import dummyUser from '@/app/api/dummy-user'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const id = searchParams.get('id')
  const result = dummyUser.filter((user) => {
    if (id)
      return user.id === id
    return true
  })
  return new Response(JSON.stringify(result), {
    headers: { 'content-type': 'application/json' },
  })
}
