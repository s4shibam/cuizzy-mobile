import type { QuizOption } from '@/types'
import { colors } from '@/utils/colors'
import { HelpCircle } from 'lucide-react-native'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import AnswerBox from './answer-box'

type Answer = {
  title: string
  options: QuizOption[]
}

type DetailedReportProps = {
  qnaSet: Answer[]
}

const DetailedReport = ({ qnaSet = [] }: DetailedReportProps) => {
  return (
    <ScrollView className="flex-1">
      <View className="my-12 h-px bg-primary" />
      <Text className="mb-10 text-center text-3xl font-bold uppercase tracking-wider text-black dark:text-white">
        Your Answers
      </Text>

      {qnaSet.map((answer, index) => (
        <View
          key={index}
          className="mb-10 rounded-md bg-white p-3 dark:bg-gray-800"
        >
          <View className="my-3 flex-row gap-2">
            <HelpCircle size={24} color={colors.primary} />
            <Text className="flex-1 text-lg/[1.5rem] font-bold text-black dark:text-white">
              {answer.title}
            </Text>
          </View>
          <View className="mb-8 h-px bg-primary" />
          <AnswerBox input={false} options={answer.options} />
        </View>
      ))}
    </ScrollView>
  )
}

export default DetailedReport
