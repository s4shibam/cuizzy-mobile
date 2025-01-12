import { colors } from '@/utils/colors'
import { cn, themed } from '@/utils/functions'
import { type LucideIcon } from 'lucide-react-native'
import React from 'react'
import { Text, View } from 'react-native'

type TabIconProps = {
  Icon: LucideIcon
  color: string
  title: string
  focused: boolean
}

const TabIcon = ({ Icon, color, title, focused }: TabIconProps) => {
  const iconColor = focused ? themed(colors.tertiary, colors.primary) : color
  return (
    <View className="flex h-16 w-20 items-center justify-center gap-1">
      <Icon color={iconColor} size={28} />
      <Text
        className={cn(
          'rounded-full px-2 py-px text-center text-sm font-normal tracking-wide',
          {
            'bg-primary/15 font-semibold': focused
          }
        )}
        style={{ color: iconColor }}
      >
        {title}
      </Text>
    </View>
  )
}

export default TabIcon
