import { useAlert } from '@/hooks/use-alert'
import { useAuth } from '@/providers/auth-provider'
import { auth } from '@/utils/firebase'
import {
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signOut,
  updateProfile
} from 'firebase/auth'
import { getDownloadURL, getStorage, ref, uploadBytes } from 'firebase/storage'
import { useState } from 'react'

export const useFirebaseAuth = () => {
  const { currentUser } = useAuth()

  const [isSignUpLoading, setIsSignUpLoading] = useState(false)
  const [isSignInLoading, setIsSignInLoading] = useState(false)
  const [isSignOutLoading, setIsSignOutLoading] = useState(false)
  const [isResetPasswordLoading, setIsResetPasswordLoading] = useState(false)
  const [isUpdateUserNameLoading, setIsUpdateUserNameLoading] = useState(false)
  const [isUpdateProfileImageLoading, setIsUpdateProfileImageLoading] =
    useState(false)
  const [isGoogleSignInLoading, setIsGoogleSignInLoading] = useState(false)

  return {
    signUp: async (email: string, password: string, userName: string) => {
      setIsSignUpLoading(true)
      try {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          email,
          password
        )
        if (userCredential.user) {
          await updateProfile(userCredential.user, { displayName: userName })
        }
        useAlert('success', 'account-created')
      } catch (error: any) {
        useAlert('error', error.code)
      } finally {
        setIsSignUpLoading(false)
      }
    },

    signIn: async (email: string, password: string) => {
      setIsSignInLoading(true)
      try {
        await signInWithEmailAndPassword(auth, email, password)
        useAlert('success', 'login-success')
      } catch (error: any) {
        useAlert('error', error.code)
      } finally {
        setIsSignInLoading(false)
      }
    },

    signOutUser: async () => {
      setIsSignOutLoading(true)
      try {
        await signOut(auth)
        useAlert('success', 'logout-success')
      } catch (error: any) {
        useAlert('error', error.code)
      } finally {
        setIsSignOutLoading(false)
      }
    },

    resetPassword: async (email: string) => {
      setIsResetPasswordLoading(true)
      try {
        await sendPasswordResetEmail(auth, email)
        useAlert('success', 'mail-sent')
      } catch (error: any) {
        useAlert('error', error.code)
      } finally {
        setIsResetPasswordLoading(false)
      }
    },

    updateUserName: async (displayName: string) => {
      setIsUpdateUserNameLoading(true)
      try {
        if (currentUser) {
          await updateProfile(currentUser, { displayName })
          useAlert('success', 'username-updated')
        } else {
          useAlert('error', 'User not found')
        }
      } catch (error: any) {
        useAlert('error', error.code)
      } finally {
        setIsUpdateUserNameLoading(false)
      }
    },

    updateProfileImage: async (imageUri: string) => {
      setIsUpdateProfileImageLoading(true)
      try {
        if (currentUser) {
          const response = await fetch(imageUri)
          const blob = await response.blob()

          const contentType =
            response.headers.get('content-type') || 'image/jpeg'
          const metadata = {
            contentType
          }

          const storage = getStorage()
          const fileRef = ref(storage, currentUser.uid)

          await uploadBytes(fileRef, blob, metadata)
          const photoURL = await getDownloadURL(fileRef)
          await updateProfile(currentUser, { photoURL })
          useAlert('success', 'profile-image-updated')
        } else {
          useAlert('error', 'User not found')
        }
      } catch (error: any) {
        useAlert('error', error.code)
      } finally {
        setIsUpdateProfileImageLoading(false)
      }
    },

    googleSignIn: async () => {
      setIsGoogleSignInLoading(true)
      // TODO: Implement Google sign in
    },

    isSignUpLoading,
    isSignInLoading,
    isSignOutLoading,
    isResetPasswordLoading,
    isUpdateUserNameLoading,
    isUpdateProfileImageLoading,
    isGoogleSignInLoading
  }
}
