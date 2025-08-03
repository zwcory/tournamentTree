import {Bracket} from "react-brackets";
import buildInitialRounds from "./buildInitialRounds.jsx";
const RandomizedBracket = ({players}) => {
    console.log("list of players" , players);
    const rounds = buildInitialRounds(players);


    console.log("Rounds:", JSON.stringify(rounds, null, 2));

    return(
        <div>
            <Bracket rounds={rounds}></Bracket>
        </div>
    )
};
export default RandomizedBracket