import Button from '@/components/ui/button'
import Header from '@/components/ui/header'
import Input from '@/components/ui/input'
import Loader from '@/components/ui/loader'
import Modal from '@/components/ui/modal'
import { useFirebaseAuth } from '@/hooks/use-firebase-auth'
import { useOpenClose } from '@/hooks/use-open-close'
import { useAuth } from '@/providers/auth-provider'
import { colors } from '@/utils/colors'
import { themed } from '@/utils/functions'
import { toast } from '@backpackapp-io/react-native-toast'
import * as ImagePicker from 'expo-image-picker'
import { Redirect } from 'expo-router'
import { StatusBar } from 'expo-status-bar'
import { PenLine, UploadCloud } from 'lucide-react-native'
import React, { useState } from 'react'
import { Alert, Image, Pressable, ScrollView, Text, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context'

const Profile = () => {
  const { currentUser, loading } = useAuth()

  if (loading) {
    return <Loader isLoading />
  }

  if (!loading && !currentUser) {
    return <Redirect href="/sign-in" />
  }

  return (
    <SafeAreaView>
      <ScrollView
        showsVerticalScrollIndicator={false}
        className="flex min-h-screen bg-bg-lighter px-8 dark:bg-bg-darker"
      >
        <Header subHeading="My" heading="Profile" />

        <View
          className="mb-[100px] flex w-full flex-col gap-5 rounded-2xl border-2 border-gray-700 bg-box-light p-6 dark:bg-box-dark"
          style={{ borderColor: colors.bg.gray }}
        >
          <ProfileImage />
          <ProfileData
            type="name"
            label="Name"
            value={currentUser?.displayName || 'N/A'}
            isEditable
          />
          <ProfileData
            type="email"
            label="Email"
            value={currentUser?.email || 'N/A'}
          />
          <ProfileData
            type="email-verification"
            label="Email Verification"
            value={currentUser?.emailVerified ? 'Completed' : 'Not Completed'}
          />

          <ProfileActions />
        </View>
      </ScrollView>
      <StatusBar
        backgroundColor={themed(colors.tertiary, colors.tertiary)}
        style="light"
      />
    </SafeAreaView>
  )
}

export default Profile

const ProfileImage = () => {
  const { currentUser } = useAuth()

  const { updateProfileImage, isUpdateProfileImageLoading } = useFirebaseAuth()

  const pickAndUploadImage = async () => {
    // Request permission to access media library
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      toast.error('Sorry, we need camera roll permissions to make this work!')
      return
    }

    // Open image picker
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ['images'],
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1
    })

    if (!result.canceled) {
      updateProfileImage(result.assets[0].uri as any)
    }
  }

  if (isUpdateProfileImageLoading) {
    return (
      <View className="relative mb-4 items-center justify-center">
        <View className="size-[150px] justify-center rounded-full bg-primary/10">
          <Text className="text-center text-primary">Uploading...</Text>
        </View>
      </View>
    )
  }

  return (
    <View className="relative mb-4 items-center justify-center">
      <Image
        source={{ uri: currentUser?.photoURL || '' }}
        className="size-[150px] rounded-full bg-primary/10"
      />
      <View className="absolute bottom-0 pl-[75px]">
        <Pressable
          onPress={pickAndUploadImage}
          className="rounded-full bg-black p-1.5 dark:bg-white"
        >
          <UploadCloud size={28} color={colors.primary} />
        </Pressable>
      </View>
    </View>
  )
}

const ProfileData = ({
  type,
  label,
  value,
  isEditable = false
}: {
  type: 'name' | 'email' | 'email-verification'
  label: string
  value: string
  isEditable?: boolean
}) => {
  const { isOpen, open, close } = useOpenClose()
  const { isUpdateUserNameLoading, updateUserName } = useFirebaseAuth()

  const [inputValue, setInputValue] = useState(value)

  const updateUser = async (
    value: string,
    type: 'name' | 'email' | 'email-verification'
  ) => {
    if (type === 'name') {
      await updateUserName(value)
    }
  }

  return (
    <View className="h-10 flex-1 flex-row items-center gap-2">
      <Text className="text-xl text-primary">{label}:</Text>

      <Text
        className="max-w-[210px] text-xl font-semibold text-text-black dark:text-text-white"
        numberOfLines={1}
      >
        {value}
      </Text>

      {isEditable && (
        <Pressable onPress={open} className="rounded-full bg-primary/30 p-2">
          <PenLine size={20} color={colors.primary} />
        </Pressable>
      )}

      <Modal close={close} isOpen={isOpen} maskClosable>
        <Input
          title={`Edit ${label}`}
          placeholder={`Edit ${label}`}
          value={inputValue}
          handleChangeText={(e) => setInputValue(e)}
        />

        <View className="flex-row justify-end gap-4 pt-4">
          <Button
            className="h-12 w-2/5 bg-red-600"
            title="Cancel"
            disabled={isUpdateUserNameLoading}
            titleClassName="text-base"
            onPress={close}
          />
          <Button
            className="h-12 w-2/5"
            isLoading={isUpdateUserNameLoading}
            title="Save"
            disabled={!inputValue || isUpdateUserNameLoading}
            titleClassName="text-base"
            onPress={() => updateUser(inputValue, type)}
          />
        </View>
      </Modal>
    </View>
  )
}

const ProfileActions = () => {
  const { currentUser } = useAuth()

  const { signOutUser, isSignOutLoading } = useFirebaseAuth()

  const { resetPassword, isResetPasswordLoading } = useFirebaseAuth()

  const sendResetMail = async () => {
    Alert.alert('Reset Password', 'Are you sure you want to reset?', [
      {
        text: 'Cancel',
        onPress: () => {},
        style: 'cancel'
      },
      {
        text: 'OK',
        onPress: () => {
          resetPassword(currentUser?.email || '')
        }
      }
    ])
  }
  return (
    <View className="mt-4 flex-row items-center justify-between">
      <Button
        title="Reset Password"
        className="w-[58%]"
        isLoading={isResetPasswordLoading}
        onPress={sendResetMail}
      />
      <Button
        title="Log Out"
        className="w-[38%] bg-red-600"
        onPress={signOutUser}
        isLoading={isSignOutLoading}
      />
    </View>
  )
}
