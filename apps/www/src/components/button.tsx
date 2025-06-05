import type React from "react";

interface ButtonProps {
  title: string | React.ReactNode;
  onClick?: () => void;
}
const Button: React.FC<ButtonProps> = ({ title }) => {
  return (
    <div className='flex justify-center items-center gap-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full text-light text-sm cursor-pointer'>
      <button className='px-4 py-2 cursor-pointer'>{title}</button>
    </div>
  );
};

export default Button;
