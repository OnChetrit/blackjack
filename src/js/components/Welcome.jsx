import { useDispatch } from 'react-redux';
import { setDeck, setGame } from '../store/actions';
import '../../assets/style/pages/Welcome.scss';

export const Welcome = () => {
  const dispatch = useDispatch();

  const onPlay = () => {
    dispatch(setGame(true));
    dispatch(setDeck());
  };

  return (
    <div className="welcome">
      <button onClick={onPlay}>Play</button>
    </div>
  );
};
