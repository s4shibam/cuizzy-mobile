import Header from '@/components/ui/header'
import { useSubmissions } from '@/hooks/use-submissions'
import { useAuth } from '@/providers/auth-provider'
import { useSubmissionContext } from '@/providers/submission-provider'
import { colors } from '@/utils/colors'
import { toast } from '@backpackapp-io/react-native-toast'
import { Redirect, useRouter } from 'expo-router'
import { BadgePercent, CalendarFold, Timer } from 'lucide-react-native'
import React, { useState } from 'react'
import { Pressable, RefreshControl, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Submissions = () => {
  const router = useRouter()
  const { currentUser } = useAuth()
  const { setSubmission } = useSubmissionContext()
  const [refreshing, setRefreshing] = useState(false)
  const { loading, error, submissions, refetch } = useSubmissions()

  const onRefresh = async () => {
    try {
      setRefreshing(true)
      await refetch()
      setRefreshing(false)
    } catch (err) {
      setRefreshing(false)
    }
  }

  if (!currentUser) {
    toast.error('You are not signed in!')
    return <Redirect href="/sign-in" />
  }

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        className="flex min-h-screen bg-bg-lighter px-8 dark:bg-bg-darker"
      >
        <Header subHeading="Quiz" heading="Submissions" />

        {loading && submissions.length === 0 && (
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

        {!loading && !error && submissions.length === 0 && (
          <View className="w-full items-center justify-center p-4">
            <Text className="text-lg font-semibold text-text-black dark:text-text-white">
              No submissions available
            </Text>
          </View>
        )}

        <View className="mb-[100px] flex-col-reverse items-center gap-6">
          {submissions.map((submission, index) => (
            <Pressable
              key={index}
              onPress={() => {
                setSubmission(submission)
                router.push(`/submission`)
              }}
              className="flex w-full flex-col items-center justify-center gap-2 rounded-xl border-b-2 border-tertiary bg-box-light px-4 py-3 dark:bg-box-dark"
            >
              <View className="w-full flex-row items-center justify-between">
                <Text className="text-xl font-semibold text-tertiary">
                  {submission.topicId?.split('-').join(' ')} Quiz
                </Text>
                <View className="flex-row items-center gap-2 rounded-full bg-primary/15 px-2 py-px">
                  <BadgePercent color={colors.tertiary} size={24} />
                  <Text className="text-lg/[30px] font-semibold text-text-black dark:text-text-white">
                    {submission.obtainedPercentage}%
                  </Text>
                </View>
              </View>

              <View className="h-0.5 w-full bg-bg-gray" />

              <View className="w-full flex-row items-center justify-between">
                <View className="flex-row items-center gap-2">
                  <CalendarFold color={colors.tertiary} size={24} />
                  <Text className="text-base/[25px] font-semibold text-text-black dark:text-text-white">
                    {submission.date}
                  </Text>
                </View>
                <View className="flex-row items-center gap-2">
                  <Timer color={colors.tertiary} size={24} />
                  <Text className="text-base/[25px] font-semibold text-text-black dark:text-text-white">
                    {submission.time}
                  </Text>
                </View>
              </View>
            </Pressable>
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Submissions
