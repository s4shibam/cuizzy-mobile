import Loader from '@/components/ui/loader'
import { auth } from '@/utils/firebase'
import { onAuthStateChanged, type User as FBUser } from 'firebase/auth'
import React, {
  createContext,
  useContext,
  useEffect,
  useState,
  type ReactNode
} from 'react'

type User = FBUser & { uid: string }

type AuthContextType = {
  currentUser: User | null
  loading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider')
  }
  return context
}

type AuthProviderProps = {
  children: ReactNode
}

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [loading, setLoading] = useState(true)
  const [currentUser, setCurrentUser] = useState<User | null>(null)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        setCurrentUser(user)
      } else {
        setCurrentUser(null)
      }
      setLoading(false)
    })

    return () => unsubscribe()
  }, [auth])

  const value = { currentUser, loading }

  if (loading) {
    return <Loader isLoading />
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}
