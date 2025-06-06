"use client";

import { useModal } from "@/context/ModalContext";
import type React from "react";
import RewardModal from "./modal/reward";

const ModalContainer = (): React.ReactElement | null => {
  const { isOpen, modalType, modalProps, closeModal } = useModal();

  switch (modalType) {
    case "reward":
      return (
        <RewardModal
          isOpen={isOpen}
          onClose={closeModal}
          title={modalProps.title}
          message={modalProps.message || "You've earned a reward!"}
          rewardAmount={modalProps.rewardAmount}
          rewardType={modalProps.rewardType}
          image={modalProps.image}
        />
      );

    default:
      return null;
  }
};

export default ModalContainer;
