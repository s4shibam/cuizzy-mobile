import Branding from '@/components/common/branding'
import Button from '@/components/ui/button'
import Header from '@/components/ui/header'
import Input from '@/components/ui/input'
import { useFirebaseAuth } from '@/hooks/use-firebase-auth'
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const ResetPassword = () => {
  const { resetPassword, isResetPasswordLoading } = useFirebaseAuth()
  const [email, setEmail] = useState('')

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex min-h-screen bg-bg-lighter dark:bg-bg-darker"
      >
        <Branding />

        <Header
          heading="Reset Password"
          headingClassName="capitalize"
          className="my-8 px-8"
        />

        <View className="mb-12 flex w-full flex-col justify-between gap-4 px-8">
          <Input
            placeholder="Your email address"
            value={email}
            handleChangeText={(e) => setEmail(e)}
            keyboardType="email-address"
          />

          <Button
            title="Send Email"
            className="mt-6"
            isLoading={isResetPasswordLoading}
            onPress={() => resetPassword(email)}
          />
          <Text className="mt-2 text-center text-lg font-medium text-text-black opacity-50 dark:text-text-white">
            Password reset link will be sent to the mail
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default ResetPassword
