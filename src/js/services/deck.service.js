import API from '../api';
const DECK_COUNT = 2;

export const getDeck = async () => {
  const res = await API.get(`/new/shuffle/?deck_count=${DECK_COUNT}`);
  return res.data;
};

export const reshuffleDeck = async (deckId) => {
  const res = await API.get(`/${deckId}/shuffle/`);
  return res.data;
};

export const getCard = async (deckId, count) => {
  const res = await API.get(`/${deckId}/draw/?count=${count}`);
  return res.data;
};
