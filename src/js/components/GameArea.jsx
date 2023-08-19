import { useSelector } from 'react-redux';
import { Actions } from './Actions';
import { Bank } from './Bank';
import { PlayerCards } from './PlayerCards';
import { ReactComponent as Cards } from '../../assets/images/cards.svg';
import '../../assets/style/cmps/Game.scss';

export const GameArea = () => {
  const { gameInfo, deck } = useSelector((state) => state);
  const { playerPlay } = gameInfo;
  return (
    <div className="game-area">
      <div className="cards-count">
        {deck?.remaining}
        <Cards />
      </div>
      {playerPlay && <PlayerCards isDealer={true} />}
      <Actions />
      {playerPlay && <PlayerCards />}
      <Bank />
    </div>
  );
};
