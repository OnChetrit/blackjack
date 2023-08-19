import { useSelector } from 'react-redux';
import background from '../../assets/images/background-card.png';

export const PlayerCards = ({ isDealer }) => {
  const { player, dealer, gameInfo } = useSelector((state) => state);
  const { isDealerPlay } = gameInfo;

  const hand = isDealer ? dealer : player;

  return (
    <div className='player'>
      <div className='space' />
      <div className='cards'>
        {hand?.cards.map((card, idx) => {
          return (
            <img
              key={card.code + idx}
              className='card'
              src={!isDealer || isDealerPlay ? card.image : idx === 0 ? background : card.image}
            />
          );
        })}
      </div>
      <div className='info'>
        <div className='name'>{isDealer ? 'Dealer' : 'Player'}</div>
        <div className='sum'>{isDealer && !isDealerPlay ? hand.hiddenSum : hand.sum}</div>
      </div>
    </div>
  );
};
