import { useAuth } from '@/providers/auth-provider'
import type { Submission } from '@/types'
import { get, getDatabase, query, ref } from 'firebase/database'
import { useEffect, useState } from 'react'

export const useSubmissions = () => {
  const { currentUser } = useAuth()
  const uid = currentUser?.uid
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [submissions, setSubmissions] = useState<Submission[]>([])

  async function fetchAnswers() {
    const db = getDatabase()
    const submissionsRef = ref(db, `submissions/${uid}`)
    const submissionsQuery = query(submissionsRef)

    try {
      setError(false)
      setLoading(true)

      // Request to firebase database
      const snapshot = await get(submissionsQuery)
      setLoading(false)

      if (snapshot.exists()) {
        setSubmissions(Object.values(snapshot.val()))
      }
    } catch (err) {
      setLoading(false)
      setError(true)
    }
  }

  useEffect(() => {
    // Fetch answers from database to check result

    fetchAnswers()
  }, [uid])

  return { loading, error, submissions, refetch: fetchAnswers }
}
