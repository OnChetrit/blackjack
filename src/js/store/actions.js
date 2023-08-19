import { getCard, getDeck, reshuffleDeck } from "../services/deck.service";
import { calculateCardsSum, addCardSum, getCardValue } from "../services/utlis";

export const setGame = (isGameOn) => {
  return (dispatch) => {
    dispatch({
      type: "SET_GAME_ON",
      isGameOn,
    });
  };
};

export const updateStatus = (status) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_STATUS",
      status,
    });
  };
};

export const updateInvoice = (invoice) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_INVOICE",
      invoice,
    });
  };
};

export const updateBet = (bet) => {
  return (dispatch) => {
    dispatch({
      type: "UPDATE_BET",
      bet,
    });
  };
};

export const setDeck = () => {
  return async (dispatch) => {
    const deck = await getDeck();
    dispatch({
      type: "SET_DECK",
      deck,
    });
  };
};

export const shuffleDeck = (deckId) => {
  return async (dispatch) => {
    const deck = await reshuffleDeck(deckId);
    dispatch({
      type: "SET_DECK",
      deck,
    });
  };
};

export const resetCards = () => {
  return async (dispatch) => {
    dispatch({
      type: "SET_PLAYER_CARDS",
      cards: [],
      sum: 0
    });
    dispatch({
      type: "SET_DEALER_CARDS",
      cards: [],
      sum: 0,
      hiddenSum: 0
    });
  };
};

export const setCards = (count) => {
  return async (dispatch, getState) => {
    const { deck } = getState();
    const { cards, remaining } = await getCard(deck?.deck_id, count);

    const dealerCards = cards.filter((card, idx) => idx === 1 || idx === 3)
    const dealerSum = calculateCardsSum(dealerCards)
    const hiddenSum = getCardValue(dealerCards[1])

    const playerCards = cards.filter((card, idx) => idx === 0 || idx === 2)
    const playerSum = calculateCardsSum(playerCards)

    dispatch({
      type: "SET_PLAYER_CARDS",
      cards: playerCards,
      sum: playerSum
    });
    dispatch({
      type: "SET_DEALER_CARDS",
      cards: dealerCards,
      sum: dealerSum,
      hiddenSum
    });
    dispatch({ type: "UPDATE_DECK", remaining })
  };
};

export const hitOneCard = (count, isDealer) => {
  return async (dispatch, getState) => {
    const { deck, player, dealer } = getState();
    const { cards, remaining } = await getCard(deck?.deck_id, count);
    const card = cards[0]
    const sum = addCardSum(isDealer ? dealer.sum : player.sum, card)
    dispatch({ type: "UPDATE_DECK", remaining })
    if (isDealer) {
      dispatch({
        type: "ADD_DEALER_CARD",
        card,
        sum
      });
      return
    }
    dispatch({
      type: "ADD_PLAYER_CARD",
      card,
      sum
    });
  };
};

export const setPlayerMove = (playerPlay) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_PLAYER_MOVE",
      playerPlay,
    });
  };
};

export const setDealerMove = (isDealerPlay) => {
  return async (dispatch) => {
    dispatch({
      type: "SET_DEALER_MOVE",
      isDealerPlay,
    });
  };
};