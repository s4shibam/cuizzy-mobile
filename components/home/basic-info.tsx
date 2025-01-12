import Header from '@/components/ui/header'
import { colors } from '@/utils/colors'
import {
  CircleHelp,
  Clock,
  MonitorPlay,
  ShieldCheck,
  type LucideIcon
} from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'

const BasicInfo = () => {
  const REASONS = [
    {
      Icon: CircleHelp as LucideIcon,
      heading: 'Wide Range of Topics',
      description:
        'Explore diverse quizzes on various computer science topics to enhance your knowledge and skills.'
    },
    {
      Icon: MonitorPlay as LucideIcon,
      heading: 'Video Content',
      description:
        'Learn through our informative and easy-to-follow video content at your own pace.'
    },
    {
      Icon: ShieldCheck as LucideIcon,
      heading: 'Verified Certificate',
      description:
        'Earn a verified certificate to showcase your knowledge and enhance your CV or resume.'
    },
    {
      Icon: Clock as LucideIcon,
      heading: 'Flexible Learning Paths',
      description:
        'Customize your learning journey with flexible schedules and personalized learning paths.'
    }
  ]

  return (
    <View className="flex h-auto w-full py-12">
      <Header className="justify-center" heading="Why Cuizzy?" />

      <View className="flex w-full flex-row flex-wrap justify-between gap-8 px-4">
        {REASONS.map((reason, index) => (
          <View
            key={index}
            className="flex w-full flex-col items-center justify-center gap-5 rounded-2xl border-b-4 border-tertiary bg-box-light p-8 dark:bg-box-dark"
          >
            <View className="rounded-full border-2 border-tertiary bg-primary p-3">
              <reason.Icon color={colors.white} size={48} />
            </View>
            <Text className="text-2xl font-bold text-text-black dark:text-text-white">
              {reason.heading}
            </Text>
            <Text className="text-center text-base font-semibold text-text-black dark:text-text-white">
              {reason.description}
            </Text>
          </View>
        ))}
      </View>
    </View>
  )
}

export default BasicInfo
