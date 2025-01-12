import AnswerBox from '@/components/common/answer-box'
import Header from '@/components/ui/header'
import Modal from '@/components/ui/modal'
import { useOpenClose } from '@/hooks/use-open-close'
import { useQuiz } from '@/hooks/use-quiz'
import { useQuizSubmit } from '@/hooks/use-quiz-submit'
import { useAuth } from '@/providers/auth-provider'
import { useSubmissionContext } from '@/providers/submission-provider'
import type { QuizOption, QuizQuestion } from '@/types'
import { colors } from '@/utils/colors'
import { cn } from '@/utils/functions'
import { toast } from '@backpackapp-io/react-native-toast'
import { Redirect, useLocalSearchParams, useRouter } from 'expo-router'
import _ from 'lodash'
import {
  CircleCheck,
  CircleChevronLeft,
  CircleChevronRight,
  CircleX,
  ScrollText
} from 'lucide-react-native'
import React, { useCallback, useEffect, useReducer, useState } from 'react'
import { Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const initialState: QuizQuestion[] | null = null

type Action =
  | { type: 'quiz'; value: QuizQuestion[] }
  | { type: 'answer'; questionID: number; optionIndex: number; value: boolean }
  | { type: 'reset' }

const reducer = (
  state: QuizQuestion[] | null,
  action: Action
): QuizQuestion[] | null => {
  switch (action.type) {
    case 'quiz': {
      const qnaSet = _.cloneDeep(action.value)
      qnaSet.forEach((question: QuizQuestion) => {
        question.options.forEach((option: QuizOption) => {
          option.checked = false
        })
      })
      return qnaSet
    }
    case 'answer': {
      if (!state) return state
      const question = _.cloneDeep(state)
      question[action.questionID].options[action.optionIndex].checked =
        action.value
      return question
    }
    case 'reset':
      return initialState
    default:
      return state
  }
}

const QuizById = () => {
  const router = useRouter()
  const { currentUser } = useAuth()
  const { setSubmission } = useSubmissionContext()
  const { id: quizId } = useLocalSearchParams() as { id: string }
  const [qnaSet, dispatch] = useReducer(reducer, initialState)
  const [currentQuestionNum, setCurrentQuestionNum] = useState(0)
  const { loading, error, quiz } = useQuiz(quizId)
  const [progressPercentage, setProgressPercentage] = useState(0)

  const {
    submitQuiz,
    isPending: isSubmitQuizPending,
    error: submissionError
  } = useQuizSubmit(quizId)

  useEffect(() => {
    if (quiz) {
      dispatch({
        type: 'quiz',
        value: quiz
      })
    }
  }, [quiz])

  useEffect(() => {
    dispatch({ type: 'reset' })
    setCurrentQuestionNum(0)
  }, [quizId])

  useEffect(() => {
    if (!qnaSet || qnaSet.length === 0) return

    const newProgressPercentage =
      ((currentQuestionNum + 1) * 100) / qnaSet.length

    setProgressPercentage(newProgressPercentage)
  }, [qnaSet, currentQuestionNum])

  // Answer option selection
  const handleAnswerChange = useCallback(
    (value?: boolean, index?: number) => {
      if (value === undefined || index === undefined) {
        return
      }

      dispatch({
        type: 'answer',
        questionID: currentQuestionNum,
        optionIndex: index,
        value
      })
    },
    [dispatch, currentQuestionNum]
  )

  const nextQuestion = useCallback(() => {
    if (qnaSet && currentQuestionNum < qnaSet.length - 1)
      setCurrentQuestionNum((curr) => curr + 1)
  }, [currentQuestionNum, qnaSet])

  const previousQuestion = useCallback(() => {
    if (
      qnaSet &&
      currentQuestionNum >= 1 &&
      currentQuestionNum <= qnaSet.length
    )
      setCurrentQuestionNum((curr) => curr - 1)
    else router.back()
  }, [currentQuestionNum, qnaSet])

  const handleSubmitQuiz = useCallback(async () => {
    if (!qnaSet) {
      toast.error('No submission found')
      return
    }

    try {
      const submission = await submitQuiz(qnaSet)
      if (submission) {
        toast.success('Quiz submitted successfully!')
        setSubmission(submission)
        router.push('/submission')
      }
    } catch (error) {
      console.error('Error submitting quiz:', error)
      toast.error('Failed to submit quiz. Please try again.')
    }
  }, [submitQuiz, qnaSet, setSubmission, router])

  if (!currentUser) {
    toast.error('You are not signed in!')
    return <Redirect href="/sign-in" />
  }

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex min-h-screen bg-bg-lighter px-8 dark:bg-bg-darker"
      >
        <Header
          headingClassName="text-3xl capitalize"
          heading={`${quizId.split('-').join(' ')} Quiz`}
        >
          <Rules />
        </Header>

        {loading && qnaSet?.length === 0 && (
          <View className="w-full items-center justify-center p-4">
            <Text className="text-lg font-semibold text-text-black dark:text-text-white">
              Loading...
            </Text>
          </View>
        )}

        {error && (
          <View className="w-full items-center justify-center p-4">
            <Text className="text-lg font-semibold text-text-black dark:text-text-white">
              Something went wrong
            </Text>
          </View>
        )}

        {!loading && !error && qnaSet && qnaSet.length === 0 && (
          <View className="w-full items-center justify-center p-4">
            <Text className="text-lg font-semibold text-text-black dark:text-text-white">
              Quiz not found
            </Text>
          </View>
        )}

        {qnaSet && qnaSet?.length > 0 && (
          <View className="mb-[100px] flex-col gap-4 rounded-lg border bg-box-light p-4 dark:bg-box-dark">
            <Text className="text-2xl font-semibold text-text-black dark:text-text-white">
              Q. {qnaSet?.[currentQuestionNum].title}
            </Text>
            <View className="mb-3 h-0.5 w-full bg-primary" />
            <AnswerBox
              input
              handleChange={handleAnswerChange}
              options={qnaSet?.[currentQuestionNum].options}
            />
          </View>
        )}
      </ScrollView>
      <ProgressBar
        key={quizId + currentQuestionNum}
        error={submissionError}
        isPending={isSubmitQuizPending}
        nextQ={nextQuestion}
        prevQ={previousQuestion}
        progress={progressPercentage}
        submit={handleSubmitQuiz}
      />
    </SafeAreaView>
  )
}

export default QuizById

const Rules = ({ className }: { className?: string }) => {
  const { isOpen, open, close } = useOpenClose()

  const RULES = [
    'Questions may have multiple answers.',
    'Each question carries 10 Points.',
    'Incorrect or partially correct submission both leads to the deduction of 2 points.',
    'Not attempting any question does not affect points.'
  ]

  return (
    <>
      <Pressable
        onPress={open}
        className={cn(
          'size-12 flex-col items-center justify-center rounded-full border-2 border-primary bg-primary/20',
          className
        )}
      >
        <ScrollText size={24} color={colors.primary} />
      </Pressable>
      <Modal isOpen={isOpen} close={close} maskClosable>
        <Text className="text-2xl font-semibold tracking-wider text-text-black dark:text-text-white">
          Rules And Guidelines
        </Text>
        <View className="-mt-3 mb-1 h-0.5 w-full bg-primary" />
        <View className="w-full flex-col gap-3">
          {RULES.map((rule, index) => (
            <View key={index} className="flex-row items-start gap-1">
              <CircleChevronRight size={20} color={colors.primary} />
              <Text className="w-[90%] text-wrap text-lg/[20px] font-medium text-text-black dark:text-text-white">
                {rule}
              </Text>
            </View>
          ))}
        </View>
      </Modal>
    </>
  )
}

type ProgressProps = {
  error: string | null
  isPending: boolean
  nextQ: () => void
  prevQ: () => void
  progress: number
  submit: () => void
}

const ProgressBar = ({
  error,
  isPending,
  nextQ,
  prevQ,
  progress,
  submit
}: ProgressProps) => {
  return (
    <View className="absolute bottom-5 w-full bg-bg-lighter px-8 pb-4 dark:bg-bg-darker">
      <View className="h-[68px] w-full flex-row items-center justify-between gap-4 rounded-xl border-2 border-bg-gray bg-bg-gray/20 p-3">
        {isPending && (
          <Text className="mx-auto text-lg font-semibold text-amber-500">
            Quiz is being submitted...
          </Text>
        )}

        {!isPending && error && (
          <Text className="mx-auto text-lg font-semibold text-red-500">
            {error}
          </Text>
        )}

        {!isPending && !error && (
          <>
            <Pressable
              className="size-14 items-center justify-center rounded-lg bg-red-400"
              onPress={prevQ}
            >
              {progress === 0 ? (
                <CircleX size={32} color={colors.text.black} />
              ) : (
                <CircleChevronLeft size={32} color={colors.text.black} />
              )}
            </Pressable>

            <View className="relative flex-1 overflow-hidden rounded-lg bg-bg-gray/40">
              <View
                className="size-full bg-primary"
                style={{ width: `${progress}%` }}
              />
              <Text className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 text-xl font-semibold text-white">
                {progress.toFixed()}%
              </Text>
            </View>

            <Pressable
              className="size-14 items-center justify-center rounded-lg bg-green-400"
              onPress={progress === 100 ? submit : nextQ}
            >
              {progress === 100 ? (
                <CircleCheck size={32} color={colors.text.black} />
              ) : (
                <CircleChevronRight size={32} color={colors.text.black} />
              )}
            </Pressable>
          </>
        )}
      </View>
    </View>
  )
}
