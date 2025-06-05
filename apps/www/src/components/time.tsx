import { Clock } from "lucide-react";
import type React from "react";

interface TimeProps {
  time?: string;
}

const Time: React.FC<TimeProps> = ({ time }) => {
  return (
    <div className='flex items-center gap-4 bg-primary rounded-full text-white text-sm cursor-pointer'>
      <div className='flex justify-between items-center gap-2 px-2 py-1 cursor-pointer'>
        <div>
          <Clock className='w-4 h-4' />
        </div>
        <div>
          <p>{time} min</p>
        </div>
      </div>
    </div>
  );
};

export default Time;
