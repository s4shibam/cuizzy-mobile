import Loader from '@/components/ui/loader'
import TabIcon from '@/components/ui/tab-icon'
import { useAuth } from '@/providers/auth-provider'
import { colors } from '@/utils/colors'
import { themed } from '@/utils/functions'
import { Tabs, useSegments } from 'expo-router'
import {
  Home,
  SquareLibrary,
  SquarePlay,
  SquareUser
} from 'lucide-react-native'
import React, { useEffect, useState } from 'react'
import { Keyboard, KeyboardAvoidingView, Platform } from 'react-native'

const SCREENS = [
  {
    Icon: Home,
    name: 'home',
    title: 'Home'
  },
  {
    Icon: SquareLibrary,
    name: 'quizzes',
    title: 'Quizzes'
  },
  {
    Icon: SquarePlay,
    name: 'videos',
    title: 'Videos'
  }
]

const DISABLED_SCREENS = [
  'submissions',
  'quiz/[id]',
  'video/[id]',
  'submission'
]

const NO_TAB_BAR_SCREENS = [
  ['(tabs)', 'quiz', '[id]'],
  ['(tabs)', 'video', '[id]']
]

const TabsLayout = () => {
  const { currentUser, loading } = useAuth()
  const segments = useSegments()
  const [keyboardVisible, setKeyboardVisible] = useState(false)

  const isHideTabBar = (() => {
    for (const screen of NO_TAB_BAR_SCREENS) {
      if (segments.toString() === screen.toString()) {
        return true
      }
    }
    return false
  })()

  useEffect(() => {
    const keyboardDidShowListener = Keyboard.addListener(
      'keyboardDidShow',
      () => {
        setKeyboardVisible(true)
      }
    )
    const keyboardDidHideListener = Keyboard.addListener(
      'keyboardDidHide',
      () => {
        setKeyboardVisible(false)
      }
    )

    return () => {
      keyboardDidShowListener.remove()
      keyboardDidHideListener.remove()
    }
  }, [])

  const profileOrSignIn = {
    Icon: SquareUser,
    name: currentUser ? 'profile' : 'profile',
    title: currentUser ? 'Profile' : 'Sign In'
  }

  const allScreens = [...SCREENS, profileOrSignIn]

  if (loading) {
    return <Loader isLoading />
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}
    >
      <Tabs
        screenOptions={{
          animation: 'fade',
          headerShown: false,
          tabBarActiveTintColor: colors.tertiary,
          tabBarInactiveTintColor: themed(colors.text.black, colors.text.white),
          tabBarShowLabel: false,
          tabBarStyle: {
            paddingTop: 20,
            borderTopWidth: 1,
            height: keyboardVisible ? 0 : 80,
            display: keyboardVisible || isHideTabBar ? 'none' : 'flex',
            backgroundColor: themed(colors.bg.light, colors.bg.dark),
            borderTopColor: themed(colors.primary, colors.tertiary)
          }
        }}
      >
        {allScreens.map(({ Icon, name, title }) => (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              tabBarIcon: ({ color, focused }) => (
                <TabIcon
                  Icon={Icon}
                  color={color}
                  title={title}
                  focused={focused}
                />
              )
            }}
          />
        ))}

        {DISABLED_SCREENS.map((name) => (
          <Tabs.Screen
            key={name}
            name={name}
            options={{
              href: null
            }}
          />
        ))}
      </Tabs>
    </KeyboardAvoidingView>
  )
}

export default TabsLayout
