export type Topic = {
  topicID: string
  title: string
  noq: number
}

export type Topics = {
  [key: string]: Topic
}

export type QuizOption = {
  title: string
  correct?: boolean
  checked?: boolean
}

export type QuizQuestion = {
  title: string
  options: QuizOption[]
}

export type Quiz = {
  questions: QuizQuestion[]
}

export type Quizzes = {
  [key: string]: Quiz
}

export type Video = {
  title: string
  link: string
}

export type Videos = Video[]

export type Submission = {
  topicId: string
  date: string
  time: string
  noq: number
  correctAnswersCount: number
  incorrectAnswersCount: number
  unattemptedCount: number
  obtainedPoints: number
  obtainedPercentage: number
  qnaSet: QuizQuestion[] | null
}

export type PopularQuiz = { topicID: string; submissions: number }
