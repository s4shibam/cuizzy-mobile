import BasicInfo from '@/components/home/basic-info'
import ContactUs from '@/components/home/contact-us'
import PopularQuizzes from '@/components/home/popular-quizzes'
import Statistics from '@/components/home/statistics'
import { colors } from '@/utils/colors'
import { themed } from '@/utils/functions'
import { StatusBar } from 'expo-status-bar'
import React from 'react'
import { Image, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Home = () => {
  return (
    <SafeAreaView>
      <StatusBar
        backgroundColor={themed(colors.tertiary, colors.tertiary)}
        style="light"
      />
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="relative flex min-h-screen flex-col bg-bg-lighter dark:bg-bg-darker"
      >
        <Image
          source={require('../../assets/images/bg.png')}
          className="absolute top-[-60px] h-[350px] w-full"
        />

        <View className="flex w-full flex-col items-center justify-center gap-1 pt-12">
          <Image
            resizeMode="contain"
            className="size-24"
            source={require('../../assets/images/white-logo.png')}
          />
          <Text className="text-2xl font-bold uppercase tracking-widest text-white">
            Cuizzy
          </Text>
        </View>

        <View className="relative flex w-full items-center gap-14 px-4">
          <Image
            resizeMode="contain"
            className="aspect-[16/10] max-h-[230px] w-full max-w-[400px]"
            source={require('../../assets/images/hero.webp')}
          />

          <Text className="text-center text-4xl font-bold uppercase tracking-widest text-text-black dark:text-text-white">
            The best{'\n'}
            <Text className="block text-primary">coding quiz</Text> platform you
            have ever seen!
          </Text>

          <Text className="rounded-br-3xl rounded-tl-3xl bg-primary p-3 text-center font-semibold uppercase tracking-wide text-black">
            Quizzes are like a mental workout, except you don&apos;t need to
            break a sweat!
          </Text>

          <Statistics />

          <BasicInfo />

          <PopularQuizzes />

          <ContactUs />
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Home
