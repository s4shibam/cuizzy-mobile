import React from 'react'
import {
  Image,
  Pressable,
  Text,
  Vibration,
  View,
  type PressableProps
} from 'react-native'

type ThumbnailProps = {
  id: string
  title: string
  submissions?: number
  noq?: number
  type: 'quiz' | 'video' | 'popularQuiz'
} & PressableProps

const Thumbnail = ({
  title = '',
  submissions = 0,
  id,
  noq = 0,
  type,
  ...props
}: ThumbnailProps) => {
  let link = ''

  if (type === 'video') {
    link = `http://img.youtube.com/vi/${id}/maxresdefault.jpg`
  } else {
    link = `https://raw.githubusercontent.com/s4shibam/cuizzy/master/thumbnails/${id}.webp`
  }

  const handlePress = (event: any) => {
    Vibration.vibrate(100)
    if (props.onPress) {
      props.onPress(event)
    }
  }

  return (
    <Pressable
      className="flex w-full flex-col items-center justify-center gap-4 rounded-lg border border-bg-dark bg-box-light p-4 hover:border-primary dark:border-bg-light dark:bg-box-dark"
      {...props}
      onPress={handlePress}
    >
      <Image
        className="aspect-video h-auto w-full rounded-lg border border-bg-dark dark:border-bg-light"
        resizeMode="contain"
        source={{ uri: link }}
      />

      <Text
        className="-mb-2 w-full px-px text-center text-xl font-semibold uppercase tracking-wide text-text-black dark:text-text-white"
        numberOfLines={2}
      >
        {title}
      </Text>

      {type === 'quiz' && (
        <View className="mt-2 flex w-full flex-row justify-between rounded-lg border border-bg-dark px-3 py-1 dark:border-bg-light">
          <Text className="text-base font-medium text-black dark:text-white">
            {noq}x Questions
          </Text>
          <Text className="text-base font-medium text-black dark:text-white">
            {noq * 10} Points
          </Text>
        </View>
      )}

      {type === 'popularQuiz' && (
        <Text className="text-lg font-semibold text-text-black dark:text-text-white">
          <Text className="text-xl font-bold">{submissions * 8}+</Text>{' '}
          Submissions
        </Text>
      )}
    </Pressable>
  )
}

export default Thumbnail
