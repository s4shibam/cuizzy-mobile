import { Toasts } from '@backpackapp-io/react-native-toast'
import { useFonts } from 'expo-font'
import { SplashScreen, Stack } from 'expo-router'
import React, { useEffect } from 'react'
import { GestureHandlerRootView } from 'react-native-gesture-handler'
import { SafeAreaProvider } from 'react-native-safe-area-context'

import Loader from '@/components/ui/loader'
import { AuthProvider, useAuth } from '@/providers/auth-provider'
import { SubmissionProvider } from '@/providers/submission-provider'
import { themed } from '@/utils/functions'
import '../global.css'

SplashScreen.preventAutoHideAsync()

const MainNavigator = () => {
  const color = themed()
  const { loading } = useAuth()

  const [fontsLoaded, error] = useFonts({
    'montserrat-800': require('../assets/fonts/montserrat-800.ttf'),
    'montserrat-700': require('../assets/fonts/montserrat-700.ttf'),
    'montserrat-600': require('../assets/fonts/montserrat-600.ttf'),
    'montserrat-500': require('../assets/fonts/montserrat-500.ttf'),
    'montserrat-400': require('../assets/fonts/montserrat-400.ttf')
  })

  useEffect(() => {
    if (error) throw error
  }, [error])

  useEffect(() => {
    if (fontsLoaded) {
      SplashScreen.hideAsync()
    }
  }, [fontsLoaded])

  if (!fontsLoaded || loading) {
    return <Loader isLoading />
  }

  return (
    <>
      <Stack
        screenOptions={{
          animation: 'fade_from_bottom',
          contentStyle: { backgroundColor: color },
          headerShown: false
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
      </Stack>
      <Toasts
        defaultStyle={{
          text: { color: '#FFFFFF' },
          view: { borderRadius: 10, backgroundColor: '#222222' },
          pressable: {
            borderRadius: 10,
            overflow: 'hidden',
            backgroundColor: '#222222'
          }
        }}
      />
    </>
  )
}

const RootLayout = () => {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <GestureHandlerRootView style={{ flex: 1 }}>
          <SubmissionProvider>
            <MainNavigator />
          </SubmissionProvider>
        </GestureHandlerRootView>
      </SafeAreaProvider>
    </AuthProvider>
  )
}

export default RootLayout
