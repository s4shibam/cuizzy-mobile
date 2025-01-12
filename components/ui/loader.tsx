import { colors } from '@/utils/colors'
import { themed } from '@/utils/functions'
import React from 'react'
import { ActivityIndicator, Dimensions, Platform, View } from 'react-native'

const Loader = ({ isLoading = false }: { isLoading?: boolean }) => {
  const osName = Platform.OS
  const screenHeight = Dimensions.get('screen').height

  if (!isLoading) return null

  return (
    <View
      className="absolute z-10 flex size-full items-center justify-center bg-bg-light/60 dark:bg-bg-dark/60"
      style={{
        height: screenHeight
      }}
    >
      <ActivityIndicator
        animating={isLoading}
        color={themed(colors.primary, colors.primary)}
        size={osName === 'ios' ? 'large' : 50}
      />
    </View>
  )
}

export default Loader
