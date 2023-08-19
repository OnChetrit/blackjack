import { useSelector } from "react-redux";
import { GameArea } from "./js/components/GameArea";
import "./assets/style/Base.scss";
import { Welcome } from "./js/components/Welcome";
import { Modal } from "./js/components/Modal";

const App = () => {
  const gameInfo = useSelector(state => state.gameInfo)


  return (
    <>
      {gameInfo.isGameOn ?
        <GameArea /> : <Welcome />
      }
      {gameInfo.roundStatus && <Modal roundStatus={gameInfo.roundStatus} />}
    </>
  );
}

export default App;
