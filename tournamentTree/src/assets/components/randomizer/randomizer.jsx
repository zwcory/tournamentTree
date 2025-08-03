import {useState} from "react";
import RandomizedBracket from "./RandomizedBracket.jsx";

const Randomizer = ({players}) => {

    const [isRandomized,setIsRandomized] = useState(false);
    const [randomList, setRandomList] = useState([]);

    //TODO
    // make player list responsive
    // input 17 straight to new line
    // style
    // add winner system
    // download image of tree


    const randomize = (e) => {
        e.preventDefault();
        let hold = [...players];
        console.log("hold is " + hold);
        let x = 0;
        let player  = ""
        let tempRandom = []
        for (let i = 0; i<players.length; i++){
            let holdLength = hold.length;
            x  = Math.floor(Math.random() * holdLength);
            player = hold[x];

            tempRandom.push(player);
            hold.splice(x, 1);
        }
        setRandomList(tempRandom);
        setIsRandomized(true);
    }

    return (
        <div>
            <form onSubmit={randomize}>
                <button type="submit" className={'myBtn greenBtn mb-3'}>
                    Generate Bracket
                </button>
            </form>
            { isRandomized && (
                <RandomizedBracket className={"justify-content-center"} players={randomList}></RandomizedBracket>
            )}
        </div>
    )

}
export default Randomizer;