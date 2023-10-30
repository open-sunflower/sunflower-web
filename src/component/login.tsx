'use client'

import Image from 'next/image'
import * as z from 'zod'
import { zodResolver } from '@hookform/resolvers/zod'

import { useForm } from 'react-hook-form'
import { useRef, useState } from 'react'
import { useToast } from '@/util/use-toast'

import Avatar from '@/asset/image/avatar.jpeg'

import {
  Dialog,
  DialogContent,
  DialogTrigger,
} from '@/component/ui/dialog'
import { Button } from '@/component/ui/button'
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from '@/component/ui/form'
import { Input } from '@/component/ui/input'

export default function Login() {
  const [step, setStep] = useState(0)
  const inputRefs = [useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null), useRef<HTMLInputElement>(null)]
  const { toast } = useToast()

  const emailSchema = z.object({
    email: z.string()
      .min(1, { message: '邮箱不能为空' })
      .email('请输入正确的邮箱'),
  })

  const verifySchema = z.object({
    email: z.string()
      .min(1, { message: '邮箱不能为空' })
      .email('请输入正确的邮箱'),
    code: z.string()
      .refine(value => /^\d{4}$/.test(value), {
        message: '验证码必须由四个数字组成。',
      }),
  })

  const emailForm = useForm<z.infer<typeof emailSchema>>({
    resolver: zodResolver(emailSchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
    },
  })

  const verifyForm = useForm<z.infer<typeof verifySchema>>({
    resolver: zodResolver(verifySchema),
    mode: 'onSubmit',
    defaultValues: {
      email: '',
      code: '',
    },
  })

  function onVerifyChange(index: number, e: React.ChangeEvent<HTMLInputElement>) {
    const value = e.target.value.toString()
    const prevInputRef = index > 0 ? inputRefs[index - 1] : inputRefs[index]
    const nextInputRef = index < 3 ? inputRefs[index + 1] : inputRefs[index]
    const all = () => inputRefs.map(ref => ref.current?.value).join('')
    switch (value.length) {
      case 1:
        verifyForm.setValue('code', all())
        nextInputRef.current?.focus()
        break
      case 0:
        prevInputRef.current?.focus()
        verifyForm.setValue('code', all())
        break
      case 2:
        e.target.value = value.slice(0, 1)
        if (nextInputRef.current)
          nextInputRef.current.value = index < 3 ? value.slice(1, 2) : value.slice(0, 1)
        nextInputRef.current?.focus()
        verifyForm.setValue('code', all())
        break
    }
  }

  function onVerifyPaste(e: React.ClipboardEvent<HTMLInputElement>) {
    e.preventDefault()
    const value = e.clipboardData.getData('Text')
    if (value.length === 4) {
      inputRefs.forEach((ref, index) => {
        ref.current?.focus()
        if (ref.current)
          ref.current.value = value[index]
      })
      verifyForm.setValue('code', value)
      verifyForm.handleSubmit(onVerifySubmit)()
    }
  }

  function onEmailSubmit() {
    toast({
      title: '邮件发送成功🎉',
      description: '请检查你的邮箱，输入验证码或点击邮件中的链接完成登录。',
    })
    verifyForm.setValue('email', emailForm.getValues('email'))
    setStep(1)
  }

  function onVerifySubmit(data: z.infer<typeof verifySchema>) {
    data.email = emailForm.getValues('email')
    toast({
      title: '登录成功🎉',
      description: '欢迎回来！',
    })
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon">
          <Image className="rounded-lg border" src={Avatar} alt="avatar" width={36} height={36} />
        </Button>
      </DialogTrigger>
      <DialogContent className="w-11/12 rounded-lg">
        { step === 0
          ? (
            <div className="space-y-4">
              <div className="space-y-4">
                <div className="flex items-center p-4 rounded-full bg-slate-500/30 w-fit">
                  <span className="i-fluent-emoji-sunflower text-6xl"></span>
                </div>
                <div className="space-y-2">
                  <h1 className="text-2xl font-bold">今日份の</h1>
                  <h2 className="text-sm text-gray-500">记录今天，发现明天</h2>
                </div>
              </div>
              <Form {...emailForm}>
                <form onSubmit={emailForm.handleSubmit(onEmailSubmit)} className="space-y-6">
                  <FormField
                    control={emailForm.control}
                    name="email"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <Input placeholder="输入邮箱" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full" type="submit">登录 / 注册</Button>
                </form>
              </Form>
            </div>
            )
          : (
            <div className="space-y-4">
              <h2 className="text-center">请检查你的邮箱，输入邮件中的验证码完成登录。</h2>
              <div className="flex gap-4 justify-center items-center">
                {inputRefs.map((ref, index) => (
                  <Input
                    className="w-12 h-12 text-4xl text-center rounded-lg font-mono"
                    key={index}
                    type="number"
                    ref={ref}
                    maxLength={1}
                    onChange={e => onVerifyChange(index, e)}
                    onPaste={e => onVerifyPaste(e)}
                  />
                ))}
              </div>
              <Form {...verifyForm}>
                <form onSubmit={verifyForm.handleSubmit(onVerifySubmit)}>
                  <FormField
                    control={verifyForm.control}
                    name="code"
                    render={({ field }) => (
                      <FormItem>
                        <FormControl>
                          <input className="hidden" name={field.name} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button className="w-full" type="submit">提交验证码</Button>
                </form>
              </Form>
            </div>
            ) }
      </DialogContent>
    </Dialog>
  )
}
