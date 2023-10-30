// import process from 'node:process'
import Image from 'next/image'
import Avatar from '@/asset/image/avatar.jpeg'
import formatDate from '@/util/format-date'
import { GET } from '@/app/api/user/profile/route'

interface SnippetProps {
  id: string
  author: string
  content: string
  created_at: string
  likes: number
  replies: number
  media?: {
    type: 'image' | 'video'
    url: string
  }[]
  hashtags: string[]
  mentions?: string[]
  is_reply: boolean
  reply_id?: string
}

export default async function Snippet({
  id,
  author,
  content,
  created_at,
  likes,
  replies,
  media,
  hashtags,
  is_reply,
}: SnippetProps) {
  // const response = await fetch(`${process.env.HOSTNAME}/api/user/profile?id=${author}`)
  const response = await GET(new Request(`http://test.com/api?id=${author}`))
  const data = await response.json()
  const { name, avatar } = data[0]
  return (
    !is_reply
      ? (
        <article className="flex flex-col  gap-2 px-4 py-4">
          <div className="flex gap-2 items-center">
            <div>
              { avatar ? <Image className="rounded-full w-10 h-10 object-cover" src={avatar} width={40} height={40} alt="avatar" /> : <Image src={Avatar} alt="avatar" /> }
            </div>
            <div className="w-fit">
              <p className="font-bold">{ name }</p>
              <p className="text-sm text-slate-500">{ `@${author} · ${formatDate(created_at)}` }</p>
            </div>
          </div>
          <div>
            <p>{ content }</p>
            { media
              ? (
                <div className={`w-full grid gap-2 mt-2 ${media.length === 1 ? 'grid-cols-1' : (media.length === 2 ? 'grid-cols-2' : 'grid-cols-3')}`}>
                  { media.map(({ type, url }) => (
                    <div key={id + url}>
                      { type === 'image' ? <Image className="w-full object-cover rounded-lg aspect-square" src={url} width={300} height={300} alt="image" /> : <video src={url} controls /> }
                    </div>
                  )) }
                </div>
                )
              : null }
          </div>
          <div className="flex gap-2">
            { hashtags.map(hashtag => (
              <div key={id + hashtag} className="py-1">
                <span className="text-blue-500 text-sm">{ hashtag }</span>
              </div>
            )) }
          </div>
          <div className="flex gap-4">
            <div className="flex items-center gap-2">
              <span className="i-tabler-heart"></span>
              <span>{ likes }</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="i-tabler-message-circle"></span>
              <span>{ replies }</span>
            </div>
          </div>
        </article>
        )
      : null
  )
}
