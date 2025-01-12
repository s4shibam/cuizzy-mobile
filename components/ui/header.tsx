import { cn } from '@/utils/functions'
import React from 'react'
import { Text, View, type TextProps } from 'react-native'

type Props = {
  children?: React.ReactNode
  heading: string
  subHeading?: string
  headingWrapperClassName?: string
  headingClassName?: string
  subHeadingClassName?: string
  className?: string
} & TextProps

const Header = ({
  children,
  heading,
  subHeading,
  className,
  headingWrapperClassName,
  headingClassName,
  subHeadingClassName,
  ...props
}: Props) => {
  return (
    <View
      className={cn(
        'my-12 w-full flex-row items-center justify-between',
        className
      )}
    >
      <View className={cn('relative flex flex-col', headingWrapperClassName)}>
        <View className="absolute -right-4 bottom-1 h-5 w-20 self-end rounded-br-full rounded-tl-full bg-primary/50" />
        {subHeading && (
          <Text
            {...props}
            className={cn(
              'text-2xl font-semibold tracking-wider text-text-black opacity-70 dark:text-text-white',
              subHeadingClassName
            )}
          >
            {subHeading}
          </Text>
        )}
        {heading && (
          <Text
            {...props}
            className={cn(
              'max-w-80 text-4xl font-bold uppercase tracking-wider text-text-black dark:text-text-white',
              headingClassName
            )}
          >
            {heading}
          </Text>
        )}
        {/* <Image
          source={require('../../assets/images/path.png')}
          className="h-4 w-48 -mt-2 self-end pr-2"
        /> */}
      </View>

      {children}
    </View>
  )
}

export default Header
