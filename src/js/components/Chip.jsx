import { useDispatch } from 'react-redux';
import { updateBet } from '../store/actions';

export const Chip = ({ chip, lastBet }) => {
  const dispatch = useDispatch();

  const onRaiseBet = () => {
    dispatch(updateBet(lastBet + chip.value));
  };

  return (
    <div
      className="chip"
      style={{
        backgroundColor: chip.color,
        color: chip.color === '#ffffff' && '#3a78b7',
        border: chip.color === '#ffffff' && '4px solid #3a78b7',
      }}
      onClick={onRaiseBet}
    >
      {chip.value}
    </div>
  );
};
