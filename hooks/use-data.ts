import { get, getDatabase, orderByKey, query, ref } from 'firebase/database'
import { useEffect, useState } from 'react'

export const useData = <T>(address: string) => {
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(false)
  const [data, setData] = useState<T[] | null>()

  async function getData() {
    const db = getDatabase()
    const dataRef = ref(db, address)
    const dataQuery = query(dataRef, orderByKey())

    try {
      setError(false)
      setLoading(true)

      // Request to firebase database
      const snapshot = await get(dataQuery)
      setLoading(false)

      if (snapshot.exists()) {
        setData(Object.values(snapshot.val()))
      }
    } catch (err) {
      setLoading(false)
      setError(true)
    }
  }
  useEffect(() => {
    // Fetch video list from database

    getData()
  }, [address])

  return { loading, error, data, refetch: getData }
}
