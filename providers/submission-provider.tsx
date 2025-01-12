import { Submission } from '@/types/index'
import React, { createContext, ReactNode, useContext, useState } from 'react'

type TGlobalData = Submission

type SubmissionContextType = {
  submission: TGlobalData | undefined
  setSubmission: React.Dispatch<React.SetStateAction<TGlobalData | undefined>>
}

const SubmissionContext = createContext<SubmissionContextType | undefined>(
  undefined
)

const SubmissionProvider = ({ children }: { children: ReactNode }) => {
  const [submission, setSubmission] = useState<TGlobalData>()

  return (
    <SubmissionContext.Provider value={{ submission, setSubmission }}>
      {children}
    </SubmissionContext.Provider>
  )
}

const useSubmissionContext = (): SubmissionContextType => {
  const context = useContext(SubmissionContext)

  if (context === undefined) {
    throw new Error('useAuth must be used within an SubmissionProvider')
  }

  return context
}

export { SubmissionProvider, useSubmissionContext }
