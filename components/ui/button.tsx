import { colors } from '@/utils/colors'
import { cn } from '@/utils/functions'
import React from 'react'
import {
  ActivityIndicator,
  Pressable,
  Text,
  type PressableProps
} from 'react-native'

type Props = {
  children?: React.ReactNode
  Icon?: React.ReactNode
  iconPosition?: 'left' | 'right'
  title?: string
  className?: string
  titleClassName?: string
  isLoading?: boolean
} & PressableProps

const Button = ({
  children,
  title,
  Icon,
  iconPosition = 'left',
  className,
  titleClassName,
  isLoading,
  ...rest
}: Props) => {
  return (
    <Pressable
      className={cn(
        'flex h-[56px] w-full flex-row items-center justify-center gap-2 rounded-xl bg-tertiary p-2',
        className,
        {
          'opacity-50': isLoading,
          'flex-row-reverse': iconPosition === 'right'
        }
      )}
      disabled={isLoading}
      {...rest}
    >
      {isLoading && (
        <ActivityIndicator
          animating={isLoading}
          color={colors.white}
          size="small"
        />
      )}

      {!isLoading && Icon && Icon}

      {children ? (
        children
      ) : (
        <Text
          className={cn(
            'text-xl font-semibold text-text-white',
            titleClassName
          )}
        >
          {title}
        </Text>
      )}
    </Pressable>
  )
}

export default Button
