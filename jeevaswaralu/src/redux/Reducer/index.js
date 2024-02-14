
import { combineReducers } from "redux";
import Cart from "./Cart";
import MainScreenReducer from "./MainScreenReducer";
import Auth from "./Auth";
import Song from "./Song";

const Reducers = combineReducers({
    mainScreenInit: MainScreenReducer,
    cart: Cart,
    auth: Auth,
    song: Song
})

export default Reducers;


