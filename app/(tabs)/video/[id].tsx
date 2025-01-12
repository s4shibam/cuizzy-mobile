import Button from '@/components/ui/button'
import Header from '@/components/ui/header'
import { useAuth } from '@/providers/auth-provider'
import { colors } from '@/utils/colors'
import { toast } from '@backpackapp-io/react-native-toast'
import { Redirect, useLocalSearchParams } from 'expo-router'
import { PauseCircle, PlayCircle } from 'lucide-react-native'
import React, { useCallback, useState } from 'react'
import { Alert, ScrollView, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'
import YoutubePlayer from 'react-native-youtube-iframe'

const VideoById = () => {
  const { currentUser } = useAuth()

  const { id } = useLocalSearchParams() as { id: string }
  const [playing, setPlaying] = useState(false)

  const onStateChange = useCallback((state: string) => {
    if (state === 'ended') {
      setPlaying(false)
      Alert.alert('Video has finished playing')
    }
  }, [])

  const togglePlaying = useCallback(() => {
    setPlaying((prev) => !prev)
  }, [])

  if (!currentUser) {
    toast.error('You are not signed in!')
    return <Redirect href="/sign-in" />
  }

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex min-h-screen bg-bg-lighter dark:bg-bg-darker"
      >
        <Header heading="Video" className="px-8" />

        <View className="mb-8 h-[210px] w-full bg-bg-gray/20">
          <YoutubePlayer
            height={210}
            play={playing}
            videoId={id}
            onChangeState={onStateChange}
          />
        </View>

        <View className="mx-8">
          <Button
            onPress={togglePlaying}
            title={playing ? 'Pause' : 'Play'}
            Icon={
              playing ? (
                <PauseCircle size={28} color={colors.text.white} />
              ) : (
                <PlayCircle size={28} color={colors.text.white} />
              )
            }
          />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default VideoById
