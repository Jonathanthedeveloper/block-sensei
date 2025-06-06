"use client";

import { type ReactNode } from "react";
import * as Dialog from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";
import { motion } from "framer-motion";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  children: ReactNode;
  size?: "sm" | "md" | "lg";
  showCloseButton?: boolean;
}

const Modal = ({
  isOpen,
  onClose,
  title,
  children,
  size = "md",
  showCloseButton = true,
}: ModalProps) => {
  // Radix UI handles `createPortal` and keyboard events (Escape) automatically.
  // We no longer need the useEffect for `handleEscape` or `document.body.style.overflow`.

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  // Framer Motion variants
  const overlayVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  const contentVariants = {
    hidden: { y: "-100vh", opacity: 0, scale: 0.5 },
    visible: {
      y: "0",
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring",
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh",
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return (
    <Dialog.Root open={isOpen} onOpenChange={onClose}>
      <Dialog.Portal>
        <motion.div
          className='z-50 fixed inset-0 bg-[#333333E0] backdrop-blur-sm'
          variants={overlayVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <Dialog.Overlay className='absolute inset-0' />
        </motion.div>
        <motion.div
          className='z-50 fixed inset-0 flex justify-center items-center p-4'
          variants={contentVariants}
          initial='hidden'
          animate='visible'
          exit='exit'
          onClick={(e) => e.stopPropagation()}
        >
          <Dialog.Content
            className={`
              dark:bg-primary-100 bg-primary-900 rounded-2xl shadow-2xl
              ${sizeClasses[size]} w-full border border-gray-800
              focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-blue-500
              relative
            `}
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className='flex justify-between items-center p-6 border-gray-800 border-b'>
                {title && (
                  <Dialog.Title className='font-semibold text-gray-400 dark:text-gray-600 text-lg'>
                    {title}
                  </Dialog.Title>
                )}
                {showCloseButton && (
                  <Dialog.Close asChild>
                    <button
                      className='font-light text-gray-400 dark:text-gray-600 text-xl'
                      aria-label='Close'
                    >
                      <Cross2Icon />
                    </button>
                  </Dialog.Close>
                )}
              </div>
            )}

            {/* Content */}
            <div className='p-6'>{children}</div>
          </Dialog.Content>
        </motion.div>
      </Dialog.Portal>
    </Dialog.Root>
  );
};

export default Modal;
