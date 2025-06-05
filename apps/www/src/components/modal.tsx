"use client";

import type React from "react";
import { useEffect, type ReactNode } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion"; // Import motion and AnimatePresence

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
  useEffect(() => {
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "auto";
    };
  }, [isOpen, onClose]);

  const handleBackdropClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const sizeClasses = {
    sm: "max-w-sm",
    md: "max-w-md",
    lg: "max-w-lg",
  };

  // Define animation variants for the backdrop
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1 },
    exit: { opacity: 0 },
  };

  // Define animation variants for the modal content
  const modalVariants = {
    hidden: { y: "-100vh", opacity: 0, scale: 0.5 }, // Start from top, faded, smaller
    visible: {
      y: "0", // Come to center
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.3,
        type: "spring", // Spring for a bouncy feel
        damping: 25,
        stiffness: 500,
      },
    },
    exit: {
      y: "100vh", // Exit to bottom
      opacity: 0,
      scale: 0.5,
      transition: {
        duration: 0.2,
      },
    },
  };

  return createPortal(
    <AnimatePresence>
      {" "}
      {/* Wrap with AnimatePresence */}
      {isOpen && ( // Conditionally render the motion components based on isOpen
        <motion.div
          className='z-50 fixed inset-0 flex justify-center items-center bg-[#333333E0] backdrop-blur-sm p-4'
          onClick={handleBackdropClick}
          variants={backdropVariants} // Apply backdrop variants
          initial='hidden'
          animate='visible'
          exit='exit'
        >
          <motion.div
            className={`dark:bg-primary-100 bg-primary-900 rounded-2xl shadow-2xl ${sizeClasses[size]} w-full border border-gray-800`}
            onClick={(e) => e.stopPropagation()} // Prevent closing when clicking inside modal
            variants={modalVariants} // Apply modal content variants
            initial='hidden'
            animate='visible'
            exit='exit'
          >
            {/* Header */}
            {(title || showCloseButton) && (
              <div className='flex justify-between items-center p-6 border-gray-800 border-b'>
                {title && (
                  <h3 className='font-semibold text-gray-400 dark:text-gray-600 text-lg'>
                    {title}
                  </h3>
                )}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className='font-light text-gray-400 dark:text-gray-600 text-xl'
                  >
                    ×
                  </button>
                )}
              </div>
            )}

            {/* Content */}
            <div className='p-6'>{children}</div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Modal;
