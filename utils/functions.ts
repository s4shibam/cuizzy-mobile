import { clsx, type ClassValue } from 'clsx'
import { useColorScheme } from 'nativewind'
import { twMerge } from 'tailwind-merge'
import { colors } from './colors'
import AsyncStorage from '@react-native-async-storage/async-storage'

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

export const themed = (
  forLight = colors.bg.light,
  forDark = colors.bg.darker
) => {
  const { colorScheme } = useColorScheme()

  if (colorScheme === 'dark') {
    return forDark
  }

  return forLight
}

export const getLocalUser = async () => {
  const userJSON = await AsyncStorage.getItem('@user')
  const userData = userJSON ? JSON.parse(userJSON) : null
  return userData
}
