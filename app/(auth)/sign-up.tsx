import Branding from '@/components/common/branding'
import SignInWithGoogleButton from '@/components/common/sign-in-with-google-button'
import Button from '@/components/ui/button'
import Header from '@/components/ui/header'
import Input from '@/components/ui/input'
import { useAlert } from '@/hooks/use-alert'
import { useFirebaseAuth } from '@/hooks/use-firebase-auth'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignUp = () => {
  const { signUp, isSignUpLoading } = useFirebaseAuth()
  const [form, setForm] = useState({
    userName: '',
    email: '',
    password: '',
    confirmPassword: ''
  })

  const handleSubmit = () => {
    const { userName, email, password, confirmPassword } = form

    if (password !== confirmPassword) {
      useAlert('error', 'password-no-match')
      return
    }

    signUp(email, password, userName)
  }

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex min-h-screen bg-bg-lighter dark:bg-bg-darker"
      >
        <Branding />

        <Header
          heading="Signup"
          headingClassName="capitalize"
          className="my-8 px-8"
        />

        <View className="mb-12 flex w-full flex-col justify-between gap-4 px-8">
          <Input
            placeholder="Your name"
            value={form.userName}
            handleChangeText={(text) => setForm({ ...form, userName: text })}
          />
          <Input
            placeholder="Your email address"
            value={form.email}
            handleChangeText={(text) => setForm({ ...form, email: text })}
          />

          <Input
            placeholder="Your secret password"
            value={form.password}
            handleChangeText={(text) => setForm({ ...form, password: text })}
            type="password"
          />

          <Input
            placeholder="Confirm your password"
            value={form.confirmPassword}
            handleChangeText={(text) =>
              setForm({ ...form, confirmPassword: text })
            }
            type="password"
          />

          <Button
            title="Sign up"
            className="mt-4"
            isLoading={isSignUpLoading}
            disabled={isSignUpLoading}
            onPress={handleSubmit}
          />

          <SignInWithGoogleButton />
        </View>

        <View className="mb-20 flex-row items-center justify-center gap-1 px-8">
          <Text className="text-lg font-medium text-text-black dark:text-text-white">
            Already have an account?
          </Text>
          <Link
            href="/sign-in"
            className="rounded-full bg-primary/15 px-2 py-px"
          >
            <Text className="text-xl font-semibold text-primary">Sign In</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignUp
