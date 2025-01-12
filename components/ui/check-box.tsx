import { colors } from '@/utils/colors'
import { cn } from '@/utils/functions'
import ExpoCheckBox, { type CheckboxProps } from 'expo-checkbox'
import React from 'react'
import { Pressable, Text } from 'react-native'

type Props = {
  title: string
  value: boolean | undefined
  onValueChange?: (value: boolean) => void
  checkBoxClassName?: string
  checkBoxColor?: string
  className?: string
  textClassName?: string
} & CheckboxProps

const CheckBox = ({
  title,
  value,
  onValueChange,
  checkBoxClassName,
  checkBoxColor = colors.primary,
  className,
  textClassName,
  ...props
}: Props) => {
  return (
    <Pressable
      className={cn(
        'w-full flex-row gap-2 rounded-lg border-2 border-bg-gray bg-bg-gray/10 p-2',
        className
      )}
    >
      <ExpoCheckBox
        className={cn('mt-[3px]', checkBoxClassName)}
        value={value}
        color={value ? checkBoxColor : undefined}
        onValueChange={onValueChange}
        {...props}
      />
      <Text
        className={cn(
          'text-xl font-medium text-text-black dark:text-text-white',
          textClassName
        )}
      >
        {title}
      </Text>
    </Pressable>
  )
}

export default CheckBox
