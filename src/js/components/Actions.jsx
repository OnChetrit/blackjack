import { useDispatch, useSelector } from 'react-redux';
import {
  hitOneCard,
  resetCards,
  setCards,
  setDealerMove,
  setPlayerMove,
  shuffleDeck,
  updateBet,
  updateInvoice,
  updateStatus,
} from '../store/actions';
import '../../assets/style/cmps/Actions.scss';
import { useEffect } from 'react';
import { formatMoney } from '../services/utlis';

const msgs = [
  {
    text: 'You Win!',
    color: '#d61b45',
  },
  {
    text: 'Busts!',
    color: '#1f2124',
  },
  {
    text: 'Shuffeling!',
    color: '#00b25f',
  },
  {
    text: 'Tie!',
    color: '#00b25f',
  },
  {
    text: 'Dealer wins!',
    color: '#1288ac',
  },
];

export const Actions = () => {
  const { gameInfo, player, dealer, deck } = useSelector((state) => state);
  const { playerPlay, isDealerPlay, lastBet } = gameInfo;
  const dispatch = useDispatch();

  useEffect(() => {
    if (player.sum > 21) {
      roundFinished('lose', 1);
      return;
    }
    if (player.sum === 21) {
      dispatch(setDealerMove(true));
      if (dealer.sum === 21) {
        roundFinished('tie', 3);
        return;
      }
      if (dealer.sum < 17) {
        dealerHitCard();
        return;
      }
      checkWinnerAndFinish();
    }
    if (isDealerPlay && dealer.sum < 17) {
      dealerHitCard();
      return;
    }
    if (isDealerPlay) {
      checkWinnerAndFinish();
    }
  }, [player.sum, dealer.sum]);

  const checkWinnerAndFinish = () => {
    if (player.sum > dealer.sum || dealer.sum > 21) {
      roundFinished('win', 0);
      return;
    }
    if (player.sum < dealer.sum) {
      roundFinished('lose', 4);
      return;
    }
    roundFinished('tie', 3);
  };

  const onHitCard = (count = 1, isDealer = false) => {
    return dispatch(hitOneCard(count, isDealer));
  };

  const dealerHitCard = () => {
    setTimeout(() => {
      onHitCard(1, true);
    }, 1000);
  };

  const onDrawCard = () => {
    dispatch(setCards(4));
    dispatch(setPlayerMove(true));
  };

  const onStand = () => {
    dispatch(setDealerMove(true));
    if (dealer.sum < 17) {
      dealerHitCard();
      return;
    }
    checkWinnerAndFinish();
  };

  const roundFinished = (roundStatus, modalIndex) => {
    dispatch(setDealerMove(true));
    setTimeout(() => {
      dispatch(updateStatus(msgs[modalIndex]));
      onUpdateInvoice(roundStatus);
      clearRound();
      if (roundStatus === 'lose') {
        if (lastBet > player.invoice - lastBet) {
          onResetBet();
        }
      }
    }, 1000);
  };

  const onUpdateInvoice = (roundStatus) => {
    let newInvoice;
    switch (roundStatus) {
      case 'lose':
        newInvoice = player.invoice - lastBet;
        break;
      case 'win':
        newInvoice = player.invoice + lastBet;
        break;
      default:
        return;
    }
    dispatch(updateInvoice(newInvoice));
  };

  const clearRound = () => {
    if (deck.remaining < 60) {
      setTimeout(() => {
        dispatch(updateStatus(msgs[2]));
        onShuffleDeck();
      }, 2000);
    }
    setTimeout(() => {
      dispatch(setDealerMove(false));
      dispatch(setPlayerMove(false));
      dispatch(updateStatus(null));
      dispatch(resetCards());
    }, 4000);
  };

  const onShuffleDeck = async () => {
    dispatch(shuffleDeck(deck.deck_id));
  };

  const onResetBet = () => {
    dispatch(updateBet(0));
  };

  return (
    <div className="actions">
      <div className="left">
        <button
          className={`hit ${(!playerPlay || isDealerPlay) && 'hide'}`}
          onClick={() => onHitCard()}
        >
          Hit
        </button>
        <button onClick={onResetBet} className={`${playerPlay && 'hide'}`}>
          Reset
        </button>
      </div>
      <div className="bet">{formatMoney(lastBet)}</div>
      <div className="right">
        <button
          className={`deal ${(playerPlay || !lastBet) && 'hide'}`}
          onClick={onDrawCard}
        >
          Deal
        </button>
        <button
          className={`stand ${(!playerPlay || isDealerPlay) && 'hide'}`}
          onClick={onStand}
        >
          Stand
        </button>
      </div>
    </div>
  );
};
