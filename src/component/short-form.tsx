'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import * as z from 'zod'

import { useRef } from 'react'

import { useTheme } from 'next-themes'

import data from '@emoji-mart/data'
import Picker from '@emoji-mart/react'
import Image from 'next/image'

import { Button } from '@/component/ui/button'
import { Textarea } from '@/component/ui/textarea'
import { useToast } from '@/util/use-toast'
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/component/ui/popover'

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/component/ui/form'

export default function ShortForm() {
  const shortSchema = z.object({
    content: z.string().min(1, {
      message: 'Short 最少包含 1 个字。',
    }).max(800, {
      message: 'Short 最多包含 400 个字。',
    }),
    images: z.array(
      z.object({
        url: z.string().url(),
      }),
    ),
  })

  const form = useForm<z.infer<typeof shortSchema>>({
    resolver: zodResolver(shortSchema),
    mode: 'onChange',
    defaultValues: {
      content: '',
      images: [],
    },
  })
  const imageInputRef = useRef<HTMLInputElement>(null)

  const { theme } = useTheme()

  function handleAddEmoji(emoji: { native: string }) {
    const { content } = form.getValues()
    form.setValue('content', `${content}${emoji.native}`)
  }

  function handleImageUpload() {
    imageInputRef.current?.click()
  }

  function handleImageAdd() {
    const { images } = form.getValues()
    const image = imageInputRef.current?.files?.[0]
    if (image) {
      const imageUrl = URL.createObjectURL(image)
      form.setValue('images', [...images, { url: imageUrl }])
    }
  }

  function handleImageDelete(image: { url: string }) {
    const newImages = form.getValues().images.filter(i => i.url !== image.url)
    form.setValue('images', newImages)
  }

  const { toast } = useToast()

  function onSubmit() {
    toast({
      title: 'Short 发布成功！🎉',
      description: '今日份的朋友们与你共享这一美妙时刻～',
    })
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="p-4 space-y-2">
        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormControl>
                <>
                  <Textarea className="resize-none" {...field} placeholder="你在想什么" />
                  <div className="w-full grid grid-cols-3 gap-2">
                    {form.watch('images').map(image => (
                      <div key={image.url} className="relative inline-block">
                        <Image width={32} height={32} className="h-32 w-32 object-cover rounded-lg" src={image.url} alt="preview" />
                        <Button
                          type="button"
                          onClick={handleImageDelete.bind(null, image)}
                          className="absolute top-1 right-1 rounded-full"
                          size="icon"
                        >
                          <span className="i-tabler-trash"></span>
                        </Button>
                      </div>
                    ))}
                  </div>
                  <div className="justify-between flex">
                    <div className="rounded-lg border divide-x overflow-hidden">
                      <>
                        <Button onClick={handleImageUpload} type="button" className="rounded-none" variant="ghost" size="icon">
                          <span className="i-tabler-photo"></span>
                        </Button>
                        <input ref={imageInputRef} onChange={handleImageAdd} type="file" accept="image/*" className="hidden" />
                      </>
                      <Button type="button" className="rounded-none" variant="ghost" size="icon">
                        <span className="i-tabler-map-pin"></span>
                      </Button>
                      <Button type="button" className="rounded-none" variant="ghost" size="icon">
                        <span className="i-tabler-hash"></span>
                      </Button>
                      <Button type="button" className="rounded-none" variant="ghost" size="icon">
                        <span className="i-tabler-at"></span>
                      </Button>
                      <Popover>
                        <PopoverTrigger asChild>
                          <Button type="button" className="rounded-none" variant="ghost" size="icon">
                            <span className="i-tabler-mood-smile"></span>
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-full p-0 bg-transparent shadow-none border-none">
                          <Picker theme={theme === 'dark' ? 'dark' : 'light'} data={data} locale="zh" onEmojiSelect={handleAddEmoji} />
                        </PopoverContent>
                      </Popover>
                    </div>
                    <Button type="submit">发布</Button>
                  </div>
                </>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
      </form>
    </Form>
  )
}
