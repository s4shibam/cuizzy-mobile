import Branding from '@/components/common/branding'
import SignInWithGoogleButton from '@/components/common/sign-in-with-google-button'
import Button from '@/components/ui/button'
import Header from '@/components/ui/header'
import Input from '@/components/ui/input'
import { useFirebaseAuth } from '@/hooks/use-firebase-auth'
import { Link } from 'expo-router'
import React, { useState } from 'react'
import { ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const SignIn = () => {
  const { signIn, isSignInLoading } = useFirebaseAuth()
  const [form, setForm] = useState({
    email: '',
    password: ''
  })

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex min-h-screen bg-bg-lighter dark:bg-bg-darker"
      >
        <Branding />

        <Header
          heading="Login"
          headingClassName="capitalize"
          className="my-8 px-8"
        />

        <View className="mb-12 flex w-full flex-col justify-between gap-4 px-8">
          <Input
            placeholder="Your email address"
            value={form.email}
            handleChangeText={(e) => setForm({ ...form, email: e })}
            keyboardType="email-address"
          />

          <Input
            placeholder="Your secret password"
            value={form.password}
            handleChangeText={(e) => setForm({ ...form, password: e })}
            type="password"
          />

          <Link href="/forgot-password" className="self-end">
            <Text className="text-base font-semibold text-text-black dark:text-text-white">
              Forgot Password?
            </Text>
          </Link>

          <Button
            title="Log In"
            className="mt-6"
            onPress={() => signIn(form.email, form.password)}
            isLoading={isSignInLoading}
          />

          <SignInWithGoogleButton />
        </View>

        <View className="mb-20 flex-row items-center justify-center gap-1 px-8">
          <Text className="text-lg font-medium text-text-black dark:text-text-white">
            Don&apos;t have an account?
          </Text>
          <Link
            href="/sign-up"
            className="rounded-full bg-primary/15 px-2 py-px"
          >
            <Text className="text-xl font-semibold text-primary">Sign Up</Text>
          </Link>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default SignIn
