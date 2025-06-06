import Coin from "../assets/coin.png";

interface PriceProps {
  price?: string;
}

const Price: React.FC<PriceProps> = ({ price }) => {
  return (
    <div className='flex items-center gap-4 bg-gradient-to-r from-accent to-secondary rounded-full text-black text-sm cursor-pointer'>
      <div className='flex justify-between items-center gap-4 px-2 py-1 cursor-pointer'>
        <div>
          <img src={Coin} alt='Coin' className='w-4 h-4' />
        </div>
        <div>
          <p>{price}</p>
        </div>
      </div>
    </div>
  );
};

export default Price;
