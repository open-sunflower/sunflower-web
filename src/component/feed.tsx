// import process from 'node:process'
import Snippet from './snippet'
import { GET } from '@/app/api/post/get/route'

interface FeedData {
  id: string
  author: string
  content: string
  created_at: string
  likes: number
  replies: number
  images?: [
    {
      type: 'image' | 'video'
      url: string
    },
  ]
  hashtags: string[]
  mentions: string[]
  is_reply: boolean
  reply_id?: string
}

export default async function Feed() {
  // const response = await fetch(`${process.env.HOSTNAME}/api/post/get?id=user123`)
  const response = await GET(new Request('http://test.com/api?id=user123'))
  const feeds: FeedData[] = await response.json()

  return (
    <>
      {feeds?.map(feed => (
        <Snippet {...feed} key={feed.id} />
      ))}
    </>
  )
}
