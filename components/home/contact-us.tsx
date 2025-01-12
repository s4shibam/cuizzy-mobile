import Button from '@/components/ui/button'
import Header from '@/components/ui/header'
import Input from '@/components/ui/input'
import { toast } from '@backpackapp-io/react-native-toast'
import { EmailJSResponseStatus, send } from '@emailjs/react-native'
import React, { useState } from 'react'
import { View } from 'react-native'

const ContactUs = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })
  const [loading, setLoading] = useState(false)

  const handleSubmit = async () => {
    if (!form.name || !form.email || !form.subject || !form.message) {
      toast.error('Please fill in all fields')
      return
    }

    setLoading(true)
    try {
      await send(
        process.env.EXPO_PUBLIC_EMAILJS_SERVICE_ID!,
        process.env.EXPO_PUBLIC_EMAILJS_TEMPLATE_ID!,
        {
          from_name: form.name,
          from_email: form.email,
          subject: form.subject,
          message: form.message
        },
        {
          publicKey: process.env.EXPO_PUBLIC_EMAILJS_PUBLIC_KEY
        }
      )

      toast.success('Message sent successfully!')
      setForm({
        name: '',
        email: '',
        message: '',
        subject: ''
      })
    } catch (error) {
      console.error(
        'EmailJS Error:',
        error instanceof EmailJSResponseStatus ? error : 'Unknown error'
      )
      toast.error('Failed to send message. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <View className="flex h-auto w-full px-2 pt-12">
      <Header className="justify-center" heading="Contact Us" />

      <View className="flex w-full flex-col gap-7 rounded-2xl bg-box-light p-4 dark:bg-box-dark">
        <Input
          placeholder="Your name"
          value={form.name}
          handleChangeText={(e) => setForm({ ...form, name: e })}
        />

        <Input
          placeholder="Your email address"
          value={form.email}
          handleChangeText={(e) => setForm({ ...form, email: e })}
          keyboardType="email-address"
        />

        <Input
          placeholder="The subject"
          value={form.subject}
          handleChangeText={(e) => setForm({ ...form, subject: e })}
        />

        <Input
          placeholder="Your message"
          value={form.message}
          multiline
          className="h-28"
          style={{ textAlignVertical: 'top' }}
          handleChangeText={(e) => setForm({ ...form, message: e })}
          numberOfLines={3}
        />

        <View className="flex flex-row justify-between gap-2 pt-5">
          <Button
            title="Cancel"
            className="w-[47%] bg-red-600"
            onPress={() =>
              setForm({
                name: '',
                email: '',
                message: '',
                subject: ''
              })
            }
          />
          <Button
            title={loading ? 'Sending...' : 'Send'}
            className="w-[47%]"
            onPress={handleSubmit}
            disabled={loading}
          />
        </View>
      </View>
    </View>
  )
}

export default ContactUs
