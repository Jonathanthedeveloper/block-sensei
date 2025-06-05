import type React from "react";
import Button from "./button";
import Price from "./price";
import Time from "./time";
import Logo from "../assets/Logo.png";

interface CardProps {
  imageUrl: string;
  btn: string | React.ReactNode;
  title?: string;
  content?: string;
  time?: string | "0";
  price?: string | "0";
  lessonId?: string;
  onStartLesson?: (lessonId: string) => void;
  onContinueLesson?: (lessonId: string) => void;
  isLessonStarted?: boolean;
}

const Card: React.FC<CardProps> = ({
  imageUrl,
  btn,
  title,
  content,
  time,
  price,
}) => {
  return (
    <div className='relative bg-gradient-to-r from-primary-500/30 to-secondary-500/30 p-[2px] rounded-2xl max-w-[252px] h-full'>
      <div className='flex flex-col justify-between bg-bg shadow-md p-6 rounded-2xl h-full'>
        {/* Time & Price */}
        <div className='flex justify-between items-center mb-3 w-full text-sm'>
          {time && <Time time={time} />}
          {price && <Price price={price} />}
        </div>

        {/* Image */}
        <div className='flex justify-center mb-4 w-full'>
          <img src={imageUrl} alt='icon' className='w-24 h-24 object-contain' />
        </div>

        {/* Title & Description */}
        <div className='flex flex-col gap-1 mb-4 text-center'>
          <h3 className='font-Sora font-semibold text-base leading-snug'>
            {title || "What Even Is Web3?"}
          </h3>
          <p className='text-muted-foreground text-sm'>
            {content ||
              "What’s All the Hype About? Web1 to Web3 - How we got here."}
          </p>
        </div>

        {/* Footer */}
        <div className='flex justify-between items-center gap-3 mt-auto'>
          <img
            src={Logo}
            alt='Logo'
            className='w-1/3 max-w-[80px] object-contain'
          />
          <div className='flex-1'>
            <Button title={btn} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Card;
