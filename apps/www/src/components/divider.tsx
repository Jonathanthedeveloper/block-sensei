const Divider = () => {
  return (
    <div className='flex justify-center items-center my-4 w-8'>
      {/* Left line */}
      <div className='flex-1 bg-accent h-[2px]' />

      {/* Center circle */}
      <div className='bg-accent shadow-md border-[2px] rounded-full w-1 h-1' />

      {/* Right line */}
      <div className='flex-1 bg-accent h-[2px]' />
    </div>
  );
};

export default Divider;
