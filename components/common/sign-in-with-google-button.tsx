import Button from '@/components/ui/button'
import { useAlert } from '@/hooks/use-alert'
import React from 'react'
import { Image, Text, View } from 'react-native'

const SignInWithGoogleButton = () => {
  const isGoogleSignInLoading = false

  const showSoonAlert = () => {
    useAlert('error', 'Google sign will be available soon')
  }

  return (
    <View className="mt-6 flex w-full flex-col items-center gap-6">
      <Text className="text-center text-lg font-medium text-text-black opacity-50 dark:text-text-white">
        Or Sign in with
      </Text>

      <Button
        className="bg-black dark:bg-white"
        onPress={showSoonAlert}
        isLoading={isGoogleSignInLoading}
      >
        {!isGoogleSignInLoading && (
          <Image
            source={require('../../assets/images/google.png')}
            className="size-9"
          />
        )}
        <Text className="text-xl font-semibold text-white dark:text-black">
          Google
        </Text>
      </Button>
    </View>
  )
}

export default SignInWithGoogleButton
