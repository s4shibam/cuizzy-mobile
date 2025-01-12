import { colors } from '@/utils/colors'
import { cn } from '@/utils/functions'
import React from 'react'
import {
  Modal as DefaultModal,
  Pressable,
  View,
  type ModalProps,
  type PressableProps
} from 'react-native'

type Props = {
  children?: React.ReactNode
  isOpen: boolean
  close: () => void
  className?: string
  maskClosable?: boolean
  modalProps?: Omit<ModalProps, 'visible' | 'onRequestClose'>
  maskProps?: PressableProps
}
const Modal = ({
  children,
  className,
  isOpen,
  close,
  maskClosable,
  modalProps,
  maskProps
}: Props) => {
  return (
    <DefaultModal
      visible={isOpen}
      animationType="slide"
      transparent
      onRequestClose={close}
      {...modalProps}
    >
      <Pressable
        {...maskProps}
        {...(maskClosable && { onPress: close })}
        className="flex-1 items-center bg-bg-light/75 p-8 dark:bg-bg-darker/75"
      >
        <View
          className={cn(
            'w-full flex-col gap-4 rounded-md border-2 bg-bg-light p-4 dark:bg-bg-darker',
            className
          )}
          style={{ borderColor: colors.bg.gray }}
        >
          {children}
        </View>
      </Pressable>
    </DefaultModal>
  )
}

export default Modal
