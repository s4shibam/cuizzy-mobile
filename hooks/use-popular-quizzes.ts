import type { PopularQuiz } from '@/types'
import { get, getDatabase, query, ref } from 'firebase/database'
import { useEffect, useState } from 'react'

export const usePopularQuizzes = () => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [popularQuizzes, setPopularQuizzes] = useState<PopularQuiz[] | null>(
    null
  )

  useEffect(() => {
    async function fetchPopularQuizzes() {
      const db = getDatabase()
      const submissionsRef = ref(db, 'submissionCount')
      const submissionsQuery = query(submissionsRef)

      try {
        setError(false)
        setLoading(true)

        const snapshot = await get(submissionsQuery)

        setLoading(false)
        if (snapshot.exists()) {
          const submissionsData = snapshot.val()
          const popularQuizzesData = Object.entries(submissionsData)
            .sort(([, countA], [, countB]) => Number(countB) - Number(countA))
            .slice(0, 4)
            .map(([key, value]) => ({ topicID: key, submissions: value }))

          setPopularQuizzes(popularQuizzesData as PopularQuiz[])
        }
      } catch (err) {
        setLoading(false)
        setError(true)
      }
    }

    fetchPopularQuizzes()
  }, [])

  return { loading, error, popularQuizzes }
}
