import { time } from 'node:console'

export default function formatDate(dateString: string): string {
  // 将日期字符串转换为 Date 对象
  const date = new Date(dateString)

  // 获取当前日期和时间
  const now = new Date()

  // 计算日期差异（毫秒数）
  const timeDifference = now.getTime() - date.getTime()

  // 如果日期差异小于一天（86400000 毫秒），则显示为“几小时前”
  if (timeDifference < 86400000 && timeDifference > 0) {
    const hoursAgo = Math.floor(timeDifference / 3600000)
    return `${hoursAgo} 小时前`
  }

  // 否则，格式化为具体日期和时间，例如 "YYYY-MM-DD HH:mm"
  const formattedDate = date.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  })

  return formattedDate
}
