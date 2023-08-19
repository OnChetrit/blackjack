const initialState = {
  deck: null,
  player: {
    invoice: 2000,
    cards: [],
    sum: 0
  },
  dealer: { cards: [], sum: 0, hiddenSum: 0 },
  gameInfo: {
    roundStatus: null, // bet, player  // win, lose, tie
    playerPlay: false,
    isDealerPlay: false,
    results: false,
    isGameOn: false,
    lastBet: 100,
    lastReduceBet: 100
  },
};

export const deckReducer = (state = initialState, action) => {
  switch (action.type) {

    //GAME STATE
    case "SET_GAME_ON":
      return {
        ...state,
        gameInfo: { ...state.gameInfo, isGameOn: action.isGameOn },
      };
    case "UPDATE_STATUS":
      return {
        ...state,
        gameInfo: { ...state.gameInfo, roundStatus: action.status },
      };
    case "UPDATE_BET":
      return {
        ...state,
        gameInfo: { ...state.gameInfo, lastBet: action.bet },
      };
    case "SET_PLAYER_MOVE":
      return {
        ...state,
        gameInfo: { ...state.gameInfo, playerPlay: action.playerPlay },
      };
    case "SET_DEALER_MOVE":
      return {
        ...state,
        gameInfo: { ...state.gameInfo, isDealerPlay: action.isDealerPlay },
      };

    // DECK
    case "SET_DECK":
      return {
        ...state,
        deck: action.deck,
      };
    case "UPDATE_DECK":
      return {
        ...state,
        deck: { ...state.deck, remaining: action.remaining },
      };

    //PLAYER
    case "SET_PLAYER_CARDS":
      return {
        ...state,
        player: { ...state.player, cards: action.cards, sum: action.sum },
      };
    case "ADD_PLAYER_CARD":
      return {
        ...state,
        player: { ...state.player, cards: [...state.player.cards, action.card], sum: action.sum },
      };
    case "UPDATE_INVOICE":
      return {
        ...state,
        player: { ...state.player, invoice: action.invoice },
      };

    //DEALER
    case "SET_DEALER_CARDS":
      return {
        ...state,
        dealer: { cards: action.cards, sum: action.sum, hiddenSum: action.hiddenSum },
      };
    case "ADD_DEALER_CARD":
      return {
        ...state,
        dealer: { ...state.dealer, cards: [...state.dealer.cards, action.card], sum: action.sum },
      };

    //BANK
    case "SET_BET":
      return {
        ...state,
        currentBet: action.bet,
      };
    default:
      return state;
  }
};
