import Header from '@/components/ui/header'
import Thumbnail from '@/components/ui/thumbnail'
import { useData } from '@/hooks/use-data'
import { useAuth } from '@/providers/auth-provider'
import { colors } from '@/utils/colors'
import { themed } from '@/utils/functions'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { History } from 'lucide-react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { Pressable, RefreshControl, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Quizzes = () => {
  const router = useRouter()
  const { currentUser } = useAuth()
  const [refreshing, setRefreshing] = useState(false)
  const [shuffledData, setShuffledData] = useState<any>([])
  const {
    loading,
    error,
    data: quizzes,
    refetch: refetchQuizzes
  } = useData('topics')

  useEffect(() => {
    if (quizzes?.length ?? 0 > 0) {
      const availableQuizzes = quizzes?.filter((obj: any): any => obj.noq !== 0)
      const comingSoonQuizzes = quizzes?.filter((obj: any) => obj.noq === 0)

      if (availableQuizzes) {
        for (let i = availableQuizzes.length - 1; i > 0; i--) {
          const j = Math.floor(Math.random() * (i + 1))
          const temp = availableQuizzes[i]
          availableQuizzes[i] = availableQuizzes[j]
          availableQuizzes[j] = temp
        }
      }

      const shuffledArray = availableQuizzes?.concat(comingSoonQuizzes)
      setShuffledData((prevData: any) => {
        if (JSON.stringify(prevData) !== JSON.stringify(shuffledArray)) {
          return shuffledArray
        }
        return prevData
      })
    }
  }, [quizzes])

  const onRefresh = useCallback(async () => {
    setRefreshing(true)
    await refetchQuizzes()
    setRefreshing(false)
  }, [])

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="flex min-h-screen bg-bg-lighter px-8 dark:bg-bg-darker"
      >
        <Header subHeading="Attempt" heading="Quizzes">
          {currentUser && (
            <Pressable
              onPress={() => router.push('/submissions')}
              className="size-[50px] items-center justify-center rounded-full bg-primary/25"
            >
              <History size={32} color={colors.primary} />
            </Pressable>
          )}
        </Header>

        {loading && shuffledData?.length === 0 && (
          <View className="w-full items-center justify-center p-4">
            <Text className="text-lg font-semibold text-text-black dark:text-text-white">
              Loading...
            </Text>
          </View>
        )}

        {error && (
          <View className="w-full items-center justify-center p-4">
            <Text className="text-lg font-semibold text-text-black dark:text-text-white">
              Something went wrong
            </Text>
          </View>
        )}

        {!loading &&
          !error &&
          (shuffledData?.length || quizzes?.length) === 0 && (
            <View className="w-full items-center justify-center p-4">
              <Text className="text-lg font-semibold text-text-black dark:text-text-white">
                No quizzes available
              </Text>
            </View>
          )}

        <View className="mb-[100px] flex w-full flex-row flex-wrap justify-between gap-10">
          {shuffledData?.map((quiz: any, index: number) => (
            <Thumbnail
              key={quiz.noq == 0 ? `q-${index}` : quiz.topicID}
              {...(quiz.noq > 0 && {
                onPress: () => router.push(`/(tabs)/quiz/${quiz.topicID}`)
              })}
              type="quiz"
              title={quiz.title}
              noq={quiz.noq}
              id={quiz.topicID}
            />
          ))}
        </View>
      </ScrollView>
      <StatusBar
        backgroundColor={themed(colors.tertiary, colors.tertiary)}
        style="light"
      />
    </SafeAreaView>
  )
}

export default Quizzes
