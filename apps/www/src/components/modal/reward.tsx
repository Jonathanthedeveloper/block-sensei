"use client";

import Modal from "../modal";

interface RewardModalProps {
  isOpen: boolean;
  onClose: () => void;
  title?: string;
  message: string;
  rewardAmount?: number;
  rewardType?: string;
  image?: string;
}

const RewardModal = ({
  isOpen,
  onClose,
  title = "Congratulations!",
  message,
  rewardAmount,
  rewardType = "tokens",
  image,
}: RewardModalProps) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} title={title}>
      <div className='text-center'>
        {/* {image ? (
          <img
            src={image || "/placeholder.svg"}
            alt='Reward'
            className='mx-auto mb-6 w-24 h-24'
          />
        ) : (
          <div className='flex justify-center items-center bg-yellow-500 mx-auto mb-6 rounded-full w-24 h-24'>
            <span className='text-4xl'>🏆</span>
          </div>
        )} */}

        <p className='mb-6 text-gray-300 text-lg'>{message}</p>

        {rewardAmount && (
          <div className='mb-8 p-4 border border-gray-800 rounded-lg'>
            <div className='flex justify-center items-center gap-3'>
              <div>
                {image ? (
                  <img
                    src={image || "/placeholder.svg"}
                    alt='Reward'
                    className='mx-auto w-24 h-24'
                  />
                ) : (
                  <div className='flex justify-center items-center bg-yellow-500 mx-auto mb-6 rounded-full w-24 h-24'>
                    <span className='text-4xl'>$</span>
                  </div>
                )}
              </div>
              {/* <div className="flex justify-center items-center bg-yellow-500 mr-4 rounded-full w-12 h-12">
                <span className="font-bold text-black text-lg">$</span>
              </div> */}
              <div>
                <div className='font-bold text-white text-4xl'>
                  +{rewardAmount}
                </div>
                <div className='text-gray-400 text-sm'>{rewardType}</div>
              </div>
            </div>
          </div>
        )}

        <button
          onClick={onClose}
          className='bg-gradient-to-r from-primary to-secondary mb-4 px-8 py-3 rounded-full font-medium text-white transition-colors'
        >
          Awesome!
        </button>
      </div>
    </Modal>
  );
};

export default RewardModal;
