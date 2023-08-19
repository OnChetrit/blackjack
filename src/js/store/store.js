import { applyMiddleware, createStore } from "redux";
import thunk from "redux-thunk";
import { deckReducer } from "./reducer";

const store = createStore(deckReducer, applyMiddleware(thunk));

export default store;
