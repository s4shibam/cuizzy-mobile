import { useAuth } from '@/providers/auth-provider'
import { QuizQuestion, Submission } from '@/types'
import type { User } from 'firebase/auth'
import { child, get, getDatabase, push, ref, update } from 'firebase/database'
import { useState } from 'react'

export const useQuizSubmit = (quizId: string) => {
  const [isPending, setIsPending] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const { currentUser } = useAuth()

  const submitQuiz = async (qnaSet: QuizQuestion[]) => {
    if (!currentUser) {
      setError('User not authenticated')
      return
    }

    setIsPending(true)
    setError(null)

    try {
      const submission = createSubmission(qnaSet)
      await saveSubmission(currentUser, submission)
      await updateSubmissionCount()
      setIsPending(false)
      return submission
    } catch (err) {
      setError('Failed to submit quiz')
      setIsPending(false)
    }
  }

  const createSubmission = (qnaSet: QuizQuestion[]): Submission => {
    const date = new Date()

    const getTime = (date: Date) => {
      return `${date.getHours() % 12 || 12}:${date.getMinutes().toString().padStart(2, '0')} ${
        date.getHours() < 12 ? 'AM' : 'PM'
      }`
    }

    return {
      topicId: quizId,
      date: date.toLocaleDateString('en-IN'),
      time: getTime(date),
      ...getMarkSheet(qnaSet),
      qnaSet
    }
  }

  const getMarkSheet = (qnaSet: QuizQuestion[]) => {
    let correctAnswersCount = 0
    let incorrectAnswersCount = 0
    let unattemptedCount = 0

    qnaSet.forEach((question) => {
      const correctIndexes = question.options
        .map((option, index) => (option.correct ? index : -1))
        .filter((index) => index !== -1)
      const checkedIndexes = question.options
        .map((option, index) => (option.checked ? index : -1))
        .filter((index) => index !== -1)

      if (checkedIndexes.length === 0) unattemptedCount += 1
      else if (
        JSON.stringify(correctIndexes) === JSON.stringify(checkedIndexes)
      )
        correctAnswersCount += 1
      else incorrectAnswersCount += 1
    })

    const noq = qnaSet.length
    const obtainedPoints = correctAnswersCount * 10 - incorrectAnswersCount * 2
    const obtainedPercentage = obtainedPoints / (0.1 * noq)

    return {
      noq,
      correctAnswersCount,
      incorrectAnswersCount,
      unattemptedCount,
      obtainedPoints,
      obtainedPercentage
    }
  }

  const saveSubmission = async (currentUser: User, submission: Submission) => {
    const db = getDatabase()
    const submissionsKey = push(
      child(ref(db), `submissions/${currentUser.uid}`)
    ).key
    const submissionsData = {
      [`submissions/${currentUser.uid}/${submissionsKey}`]: submission
    }

    await update(ref(db), submissionsData)
  }

  const updateSubmissionCount = async () => {
    const db = getDatabase()
    const submissionCountRef = ref(db, 'submissionCount')
    const snapshot = await get(submissionCountRef)

    if (snapshot.exists()) {
      const currentSubmissionCount = snapshot.val()[quizId] || 0
      const updatedSubmissionCount = currentSubmissionCount + 1

      await update(submissionCountRef, {
        [quizId]: updatedSubmissionCount
      })
    }
  }

  return { submitQuiz, isPending, error }
}
