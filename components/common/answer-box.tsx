import type { QuizOption } from '@/types'
import { cn } from '@/utils/functions'
import React, { Fragment } from 'react'
import { View } from 'react-native'
import CheckBox from '../ui/check-box'

type Props = {
  input?: boolean
  handleChange?: (value?: boolean, index?: number) => void
  options?: QuizOption[]
}

const AnswerBox = ({ input, handleChange, options }: Props) => {
  return (
    <View className="flex-col gap-3">
      {options?.map((option, index) => (
        <Fragment key={index}>
          {input ? (
            <CheckBox
              value={option.checked}
              title={option.title}
              {...(handleChange
                ? { onValueChange: (value) => handleChange(value, index) }
                : {})}
            />
          ) : (
            <CheckBox
              className={cn(
                option.correct
                  ? 'border-green-600 bg-green-400'
                  : option.checked
                    ? 'border-red-600 bg-red-400'
                    : null
              )}
              textClassName={
                option.correct || option.checked
                  ? 'text-black dark:text-black'
                  : ''
              }
              key={index}
              value={option.checked}
              title={option.title}
            />
          )}
        </Fragment>
      ))}
    </View>
  )
}

export default AnswerBox
