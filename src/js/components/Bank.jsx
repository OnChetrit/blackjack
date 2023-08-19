import { useEffect, useRef, useState } from 'react';
import { useSelector } from 'react-redux';
import { Chip } from './Chip';
import { formatMoney } from '../services/utlis';
import '../../assets/style/cmps/Bank.scss';

export const Bank = () => {
  const ref = useRef(null);
  const { player, gameInfo } = useSelector((state) => state);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(ref.current.clientHeight);
  });

  const { playerPlay, lastBet } = gameInfo;
  const chips = [
    {
      value: 1,
      color: '#ffffff',
    },
    {
      value: 5,
      color: '#bf142f',
    },
    {
      value: 25,
      color: '#00a935',
    },
    {
      value: 50,
      color: '#3a78b7',
    },
    {
      value: 100,
      color: '#253442',
    },
    {
      value: 500,
      color: '#8755ab',
    },
    {
      value: 1000,
      color: '#f7c903',
    },
  ];

  const playerSum =
    lastBet > player.invoice ? player.invoice : player.invoice - lastBet;

  return (
    <div
      className="bank"
      style={{ bottom: playerPlay ? -height : 0 }}
      ref={ref}
    >
      <div className="total">Bank: {formatMoney(playerSum)}</div>
      <div className="chip-list">
        {chips.map((chip) => {
          if (chip.value > player.invoice - lastBet) return;
          return <Chip key={chip.value} chip={chip} lastBet={lastBet} />;
        })}
      </div>
    </div>
  );
};
