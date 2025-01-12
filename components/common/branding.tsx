import { cn } from '@/utils/functions'
import { useRouter } from 'expo-router'
import React from 'react'
import { Image, Text, TouchableOpacity, View } from 'react-native'

const Branding = ({ className }: { className?: string }) => {
  const router = useRouter()
  return (
    <View className={cn('w-fit flex-row items-center px-6 pt-12', className)}>
      <TouchableOpacity
        activeOpacity={0.9}
        className="flex flex-row gap-1"
        onPress={() => router.push('/')}
      >
        <Image
          source={require('../../assets/images/logo.png')}
          className="size-12"
          resizeMode="contain"
        />
        <Text className="text-3xl/[40px] font-bold tracking-widest text-text-black dark:text-text-white">
          Cuizzy
        </Text>
      </TouchableOpacity>
    </View>
  )
}

export default Branding
