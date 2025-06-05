"use client";

import { createContext, useContext, useState, type ReactNode } from "react";

// Define modal types
export type ModalType =
  | "confirmation"
  | "reward"
  | "balance"
  | "transfer"
  | null;

// Define modal props interfaces
interface ConfirmationModalProps {
  title?: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  onConfirm: () => void;
}

interface RewardModalProps {
  title?: string;
  message: string;
  rewardAmount?: number;
  rewardType?: string;
  image?: string;
  onCloseCallback?: () => void;
}

interface BalanceModalProps {
  balance: number;
  walletAddress?: string;
  currency?: string;
  image?: string;
}

interface TransferModalProps {
  balance: number;
  currency?: string;
  onTransfer: (
    address: string,
    amount: number
  ) => Promise<{ success: boolean; error?: string }>;
  image?: string;
}

// Union type for all modal props
export type ModalProps =
  | ConfirmationModalProps
  | RewardModalProps
  | BalanceModalProps
  | TransferModalProps;

// Define modal context state
interface ModalContextType {
  isOpen: boolean;
  modalType: ModalType;
  modalProps: any;
  openModal: (type: ModalType, props?: any) => void;
  closeModal: () => void;
}

// Create context with default values
const ModalContext = createContext<ModalContextType | undefined>(undefined);

// Create provider component
interface ModalProviderProps {
  children: ReactNode;
}

export const ModalProvider = ({ children }: ModalProviderProps) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [modalType, setModalType] = useState<ModalType>(null);
  const [modalProps, setModalProps] = useState<any>({});

  const openModal = (type: ModalType, props: any = {}) => {
    setModalType(type);
    setModalProps(props);
    setIsOpen(true);
  };

  const closeModal = () => {
    setIsOpen(false);

    if (
      modalProps.onCloseCallback &&
      typeof modalProps.onCloseCallback === "function"
    ) {
      modalProps.onCloseCallback();
    }

    setTimeout(() => {
      setModalType(null);
      setModalProps({});
    }, 300);
  };

  return (
    <ModalContext.Provider
      value={{
        isOpen,
        modalType,
        modalProps,
        openModal,
        closeModal,
      }}
    >
      {children}
    </ModalContext.Provider>
  );
};

// Custom hook for using the modal context
export const useModal = (): ModalContextType => {
  const context = useContext(ModalContext);
  if (!context) {
    throw new Error("useModal must be used within a ModalProvider");
  }
  return context;
};
