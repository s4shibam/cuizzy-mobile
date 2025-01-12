import Header from '@/components/ui/header'
import Thumbnail from '@/components/ui/thumbnail'
import { useData } from '@/hooks/use-data'
import { colors } from '@/utils/colors'
import { themed } from '@/utils/functions'
import { useRouter } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React, { useEffect, useState } from 'react'
import { RefreshControl, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

type Video = {
  title: string
  link: string
}

const Videos = () => {
  const router = useRouter()
  const {
    loading,
    error,
    data: videos,
    refetch: refetchVideos
  } = useData<Video>('videos')

  const [refreshing, setRefreshing] = useState(false)
  const [shuffledVideos, setShuffledVideos] = useState<Video[] | null>([])

  useEffect(() => {
    if (videos?.length ?? 0 > 0) {
      const shuffledArray = videos ? [...videos] : []
      for (let i = shuffledArray.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1))
        const temp = shuffledArray[i]
        shuffledArray[i] = shuffledArray[j]
        shuffledArray[j] = temp
      }
      setShuffledVideos(shuffledArray)

      setShuffledVideos((prevData) => {
        if (JSON.stringify(prevData) !== JSON.stringify(shuffledArray)) {
          return shuffledArray
        }
        return prevData
      })
    }
  }, [videos])

  const onRefresh = async () => {
    setRefreshing(true)
    await refetchVideos()
    setRefreshing(false)
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
        <Header subHeading="Watch" heading="Videos" />

        {loading && videos?.length === 0 && (
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

        {!loading && !error && videos?.length === 0 && (
          <View className="w-full items-center justify-center p-4">
            <Text className="text-lg font-semibold text-text-black dark:text-text-white">
              No submissions available
            </Text>
          </View>
        )}

        <View className="mb-[100px] flex w-full flex-row flex-wrap justify-between gap-10">
          {shuffledVideos?.map((video) => (
            <Thumbnail
              key={video.link}
              onPress={() => router.push(`/video/${video.link}`)}
              id={video.link}
              title={video.title}
              type="video"
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

export default Videos
