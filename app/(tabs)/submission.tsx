import DetailedReport from '@/components/common/detailed-report'
import ScoreCard from '@/components/common/score-card'
import Button from '@/components/ui/button'
import Header from '@/components/ui/header'
import { useOpenClose } from '@/hooks/use-open-close'
import { useAuth } from '@/providers/auth-provider'
import { useSubmissionContext } from '@/providers/submission-provider'
import { cn } from '@/utils/functions'
import { toast } from '@backpackapp-io/react-native-toast'
import { Redirect, useRouter } from 'expo-router'
import React from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const DetailedSubmission = () => {
  const router = useRouter()
  const {
    isOpen: showAnswers,
    open: openAnswers,
    close: closeAnswers
  } = useOpenClose()
  const { currentUser } = useAuth()
  const { submission } = useSubmissionContext()

  if (!currentUser) {
    toast.error('You are not signed in!')
    return <Redirect href="/sign-in" />
  }

  if (!submission) {
    return null
  }

  const {
    topicId,
    date,
    time,
    noq,
    correctAnswersCount,
    incorrectAnswersCount,
    unattemptedCount,
    obtainedPoints,
    obtainedPercentage,
    qnaSet
  } = submission

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex min-h-screen bg-bg-lighter px-8 dark:bg-bg-darker"
      >
        <Header subHeading="Detailed" heading="Result" />

        <View className="mb-[100px] flex-col gap-8">
          <View className="flex w-full flex-col items-center gap-1 rounded-2xl bg-tertiary/25 p-2.5">
            <Text className="text-xl font-semibold text-black dark:text-white">
              Topic: {topicId.split('-').join(' ')}
            </Text>
            <Text className="text-xl font-semibold text-black dark:text-white">
              Date: {date ? date : 'NA'}
            </Text>
            <Text className="text-xl font-semibold text-black dark:text-white">
              Time: {time ? time : 'NA'}
            </Text>
          </View>

          <ScoreCard
            correctAnswersCount={correctAnswersCount}
            date={date}
            incorrectAnswersCount={incorrectAnswersCount}
            noq={noq}
            obtainedPercentage={obtainedPercentage}
            obtainedPoints={obtainedPoints}
            topicId={topicId}
            unattemptedCount={unattemptedCount}
          />

          <View
            className={cn(
              'mt-4 flex-[2] flex-row items-center justify-between gap-4',
              { 'mb-10': !showAnswers }
            )}
          >
            <Button
              title={showAnswers ? 'Hide Answers' : 'Show Answers'}
              className="flex-1 bg-gray-400 dark:bg-gray-800"
              titleClassName="text-black dark:text-white"
              onPress={showAnswers ? closeAnswers : openAnswers}
            />
            <Button
              title="Retry Quiz"
              className="flex-1 bg-secondary"
              titleClassName="text-black"
              onPress={() => router.push(`/quiz/${topicId}`)}
            />
          </View>

          {qnaSet && showAnswers && <DetailedReport qnaSet={qnaSet} />}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default DetailedSubmission
