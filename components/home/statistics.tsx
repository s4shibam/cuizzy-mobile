import Header from '@/components/ui/header'
import React from 'react'
import { Text, View } from 'react-native'

const Statistics = () => {
  const STATS = [
    {
      count: '200+',
      name: 'Questions'
    },
    {
      count: '100+',
      name: 'Quizzes'
    },
    {
      count: '150+',
      name: 'Lectures'
    },
    {
      count: '500+',
      name: 'Learners'
    }
  ]

  return (
    <View className="flex h-auto w-full py-12">
      <Header className="justify-center" heading="Our Stats" />

      <View className="flex w-full flex-row flex-wrap justify-between gap-5 px-4">
        {STATS.map((stat, index) => (
          <View
            key={index}
            className="flex w-[47%] flex-col items-center justify-center rounded-xl border-b-2 border-black bg-primary px-2 py-3 dark:border-white"
          >
            <Text className="text-5xl/[52px] font-bold">{stat.count}</Text>
            <Text className="text-xl font-semibold uppercase">{stat.name}</Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default Statistics
