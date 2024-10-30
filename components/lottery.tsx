'use client'

import { useState, useEffect, useCallback } from 'react'
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

// 模拟参与抽奖的人员名单
const participants = [
  "张三", "李四", "王五", "赵六", "钱七", "孙八", "周九", "吴十",
  "郑十一", "王十二", "冯十三", "陈十四", "褚十五", "卫十六"
]

// 模拟奖品列表
const prizes = [
  "一等奖：iPhone 13 Pro",
  "二等奖：iPad Air",
  "三等奖：AirPods Pro",
  "四等奖：Apple Watch",
  "五等奖：iTunes礼品卡"
]

export function Lottery() {
  const [currentName, setCurrentName] = useState('')
  const [isRolling, setIsRolling] = useState(false)
  const [remainingPrizes, setRemainingPrizes] = useState(prizes)
  const [winner, setWinner] = useState('')

  const rollName = useCallback(() => {
    const randomIndex = Math.floor(Math.random() * participants.length)
    setCurrentName(participants[randomIndex])
  }, [])

  useEffect(() => {
    let intervalId: NodeJS.Timeout

    if (isRolling) {
      intervalId = setInterval(rollName, 50) // 每50毫秒更换一个名字
    }

    return () => {
      if (intervalId) clearInterval(intervalId)
    }
  }, [isRolling, rollName])

  const handleLottery = () => {
    if (isRolling) {
      // 停止抽奖
      setIsRolling(false)
      setWinner(currentName)
      setRemainingPrizes(prev => prev.slice(1)) // 移除已抽取的奖品
    } else {
      // 开始抽奖
      setIsRolling(true)
      setWinner('')
    }
  }

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-400 via-pink-500 to-red-500 flex items-center justify-center">
      <Card className="w-96">
        <CardHeader>
          <CardTitle className="text-2xl font-bold text-center">公司年会抽奖</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center mb-6">
            <div className="text-4xl font-bold mb-4 h-16 flex items-center justify-center">
              {isRolling ? (
                <span className="animate-bounce">{currentName}</span>
              ) : (
                winner || "准备开始"
              )}
            </div>
            <Button 
              onClick={handleLottery} 
              className="w-full"
              disabled={remainingPrizes.length === 0}
            >
              {isRolling ? "停止" : "开始抽奖"}
            </Button>
          </div>
          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-2">剩余奖品：</h3>
            <ul className="list-disc list-inside">
              {remainingPrizes.map((prize, index) => (
                <li key={index}>{prize}</li>
              ))}
            </ul>
          </div>
        </CardContent>
      </Card>
    </div>
  )
}