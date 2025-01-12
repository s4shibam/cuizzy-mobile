import Loader from '@/components/ui/loader'
import { useAuth } from '@/providers/auth-provider'
import { colors } from '@/utils/colors'
import { themed } from '@/utils/functions'
import { Redirect, Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import React from 'react'

const AuthLayout = () => {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return <Loader isLoading />
  }

  if (currentUser) {
    return <Redirect href="/home" />
  }

  return (
    <>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: 'fade'
        }}
      >
        <Stack.Screen name="sign-up" />
        <Stack.Screen name="sign-in" />
        <Stack.Screen name="reset-password" />
      </Stack>
      <StatusBar
        backgroundColor={themed(colors.tertiary, colors.tertiary)}
        style="light"
      />
    </>
  )
}

export default AuthLayout
