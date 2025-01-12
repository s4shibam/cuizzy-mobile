import { colors } from '@/utils/colors'
import { cn } from '@/utils/functions'
import { Eye, EyeOff } from 'lucide-react-native'
import React, { useState } from 'react'
import {
  Text,
  TextInput,
  TouchableOpacity,
  View,
  type TextInputProps
} from 'react-native'

type Props = {
  title?: string
  type?: 'text' | 'password'
  value?: string
  placeholder?: string
  wrapperClassName?: string
  className?: string
  handleChangeText: (text: string) => void
} & TextInputProps

const Input = ({
  title,
  type = 'text',
  value,
  placeholder,
  handleChangeText,
  className,
  wrapperClassName,
  ...props
}: Props) => {
  const [showPassword, setShowPassword] = useState(false)

  return (
    <View className={cn('flex-col gap-1.5', wrapperClassName)}>
      {title && (
        <Text className="ml-1 text-lg font-medium text-text-black dark:text-text-white">
          {title}
        </Text>
      )}

      <View
        className={cn(
          'flex h-[60px] w-full flex-row items-center rounded-xl border-2 bg-bg-gray/10 px-4',
          className
        )}
        style={{ borderColor: `${colors.bg.gray}80` }}
      >
        <TextInput
          className="flex-1 text-lg font-semibold text-black dark:text-white"
          value={value}
          placeholder={placeholder}
          placeholderTextColor={colors.bg.gray}
          onChangeText={handleChangeText}
          secureTextEntry={type === 'password' && !showPassword}
          {...props}
        />

        {type === 'password' && (
          <TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
            {!showPassword ? (
              <Eye size={24} color={colors.secondary} />
            ) : (
              <EyeOff size={24} color={colors.secondary} />
            )}
          </TouchableOpacity>
        )}
      </View>
    </View>
  )
}

export default Input
