import Header from '@/components/ui/header'
import Thumbnail from '@/components/ui/thumbnail'
import { usePopularQuizzes } from '@/hooks/use-popular-quizzes'
import { useRouter } from 'expo-router'
import React from 'react'
import { View } from 'react-native'

const PopularQuizzes = () => {
  const router = useRouter()
  const { popularQuizzes } = usePopularQuizzes()

  if (!popularQuizzes) {
    return null
  }

  return (
    <View className="flex h-auto w-full py-12">
      <Header className="justify-center" heading="Top Quizzes" />

      <View className="flex w-full flex-row flex-wrap justify-between gap-10 px-4">
        {popularQuizzes.map((quiz) => (
          <Thumbnail
            key={quiz?.topicID}
            onPress={() => router.push(`/quiz/${quiz?.topicID}`)}
            type="popularQuiz"
            title={quiz?.topicID?.split('-').join(' ')}
            submissions={quiz.submissions}
            id={quiz.topicID}
          />
        ))}
      </View>
    </View>
  )
}

export default PopularQuizzes
