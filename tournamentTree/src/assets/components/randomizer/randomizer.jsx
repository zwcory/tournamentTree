import {useState} from "react";

const Randomizer = ({players}) => {

    const [isRandomized,setIsRandomized] = useState(false);
    const [randomList, setRandomList] = useState([]);

    //TODO
    // make player list responsive
    // install brackets
    // generate the tree
    // generate all branches
    // input 17 straight to new line
    // style


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

            console.log(`Iteration ${i}: Chose "${player}" at index ${x}`);
            console.log("Remaining:", hold);
            console.log("Temp random so far:", tempRandom);


        }
        setRandomList(tempRandom);
        setIsRandomized(true);
    }



    return (
        <div>
            <form onSubmit={randomize}>
                <button type="submit" className={'myBtn greenBtn'}>
                    Generate Bracket
                </button>
            </form>
            { isRandomized && (
                <ol>
                {randomList.map((item, index) => (
                        <li key={index} className={'item align-content-lg-start'}>
                            {item}
                        </li>

                     ))}
                </ol>
                )}
        </div>
    )

}
export default Randomizer;