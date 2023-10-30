import dummyPost from '@/app/api/dummy-post'
import { GET as fGET } from '@/app/api/user/following/route'

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url)
  const type = searchParams.get('type') || 'post'
  const page = searchParams.get('page') || '1'
  const limit = searchParams.get('limit') || '10'
  const id = searchParams.get('id')
  const hashtag = searchParams.get('hashtag')
  const author = searchParams.get('author')
  let result = dummyPost.filter((post) => {
    if (type === 'post')
      return !post.is_reply
    if (type === 'reply')
      return post.is_reply
    return false
  })
  if (hashtag || author) {
    result = result.filter((post) => {
      if (author)
        return post.author === author
      return true
    }).filter((post) => {
      if (hashtag)
        return post.hashtags.includes(hashtag)
      return true
    })
  }
  if (id) {
    // const following = await fetch(`http://localhost:3000/api/user/following?id=${id}`).then(res => res.json()).then(res => res[0].following)
    const following = await fGET(new Request(`http://test.com/api?id=${id}`)).then(res => res.json()).then(res => res[0].following)
    result = result.filter((post) => {
      if (following)
        return following.includes(post.author)
      return true
    })
  }
  const final = result.slice((Number(page) - 1) * Number(limit), Number(page) * Number(limit))

  return new Response(JSON.stringify(final), {
    headers: { 'content-type': 'application/json' },
  })
}
