import type { Submission } from '@/types'
import { toast } from '@backpackapp-io/react-native-toast'
import React, { useState } from 'react'
import { Text, View } from 'react-native'
import Button from '../ui/button'

type ScoreCardProps = Partial<Submission>

type ScoreRowProps = {
  label: string
  count: string | number
  points: string
  textColor: string
}

type MarksRowProps = {
  label: string
  value: string | number
}

const ScoreCard = ({
  noq,
  correctAnswersCount,
  incorrectAnswersCount,
  unattemptedCount,
  obtainedPoints,
  obtainedPercentage
}: ScoreCardProps) => {
  const [isCertificateGenerating, setIsCertificateGenerating] = useState(false)

  const generateAndDownloadCertificate = async () => {
    try {
      setIsCertificateGenerating(true)
      toast.error('Please use our web platform to generate certificate')
    } catch (error) {
      console.error(error)
    } finally {
      setIsCertificateGenerating(false)
    }
  }
  return (
    <View className="w-full self-center rounded-xl bg-box-light p-5 dark:bg-box-dark">
      <Text className="mb-2 text-center text-3xl font-semibold uppercase text-black dark:text-white">
        Score Card
      </Text>
      <Text className="mb-4 text-center text-2xl font-bold uppercase text-primary">
        Score {obtainedPercentage}%
      </Text>

      <View className="mb-4 h-px w-full bg-gray-400" />

      <View className="w-full">
        <ScoreRow
          label="Answers"
          count="No."
          points="Points"
          textColor="text-black dark:text-white"
        />
        <ScoreRow
          label="Correct"
          count={correctAnswersCount || 0}
          points={`+${(correctAnswersCount ?? 0) * 10}`}
          textColor="text-green-500"
        />
        <ScoreRow
          label="Incorrect"
          count={incorrectAnswersCount || 0}
          points={`-${(incorrectAnswersCount ?? 0) * 2}`}
          textColor="text-red-500"
        />
        <ScoreRow
          label="Unattempted"
          count={unattemptedCount || 0}
          points="NA"
          textColor="text-gray-500"
        />
      </View>

      <View className="my-5 h-px w-full bg-gray-400" />

      <MarksRow label="Obtained Points" value={obtainedPoints || 0} />
      <MarksRow label="No of Questions" value={noq || 0} />
      <MarksRow label="Total Points" value={(noq ?? 0) * 10} />

      {(obtainedPercentage ?? 0) >= 60 ? (
        <Button
          className="mt-6 w-full"
          onPress={generateAndDownloadCertificate}
          isLoading={isCertificateGenerating}
          disabled={isCertificateGenerating}
        >
          <Text className="text-base font-semibold uppercase text-white">
            Get Certificate
          </Text>
        </Button>
      ) : (
        <Text className="mt-6 text-center text-base font-medium uppercase text-red-500">
          Score at least 60% to get Certificate
        </Text>
      )}
    </View>
  )
}

export default ScoreCard

const ScoreRow = ({ label, count, points, textColor }: ScoreRowProps) => (
  <View className="mb-2 w-full flex-row justify-between">
    <Text className={`w-2/4 text-xl font-medium uppercase ${textColor}`}>
      {label}
    </Text>
    <Text
      className={`w-1/4 text-center text-xl font-medium uppercase ${textColor}`}
    >
      {count}
    </Text>
    <Text
      className={`w-1/4 text-center text-xl font-medium uppercase ${textColor}`}
    >
      {points}
    </Text>
  </View>
)

const MarksRow = ({ label, value }: MarksRowProps) => (
  <View className="mb-2 w-full flex-row justify-between">
    <Text className="w-3/4 text-lg text-black dark:text-white">{label}</Text>
    <Text className="w-1/4 text-center text-lg text-black dark:text-white">
      {value}
    </Text>
  </View>
)
