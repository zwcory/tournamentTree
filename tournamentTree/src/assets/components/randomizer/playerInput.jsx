import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import Randomizer from "./randomizer.jsx";


const PlayerInput = () => {
    const [list,setList] = useState(
        []
    );
    const [blankList,setBlankList] = useState(false);
    const [inputText, setInputText] = useState(''); // State for input text
    const [isFull, setIsFull] = useState(false);



    useEffect(() => {
        (async () => {
            await getList();
        })();
    }, []);

    useEffect(() => {
        console.log('Updated list:', list);
        console.log('Updated blankList:', blankList);
        if (list.length===32){
            setIsFull(true)
            console.log("Set is now full")
        } else {
            setIsFull(false)
        }

    }, [list, blankList]);

    const getList = async () => {
        const fetchedList = JSON.parse(localStorage.getItem('List')) || [];
        setList(fetchedList);
        setBlankList(fetchedList.length === 0);
    };

    const handleChange = (e) => {
        setInputText(e.target.value);
    };

    const chunkedList = [];
    for (let i = 0; i < list.length; i += 16) {
        chunkedList.push(list.slice(i, i + 16));
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (inputText.trim() === '') return; // Prevent adding empty items
            let updatedList;

            if (list === null || list.length === 0) {
                updatedList = [inputText];
                setBlankList(false);
            } else {
                updatedList = [...list, inputText]; // Prepare updated list
            }

            setList(updatedList); // Update state

            // Save the updated values to localStorage
            localStorage.setItem('List', JSON.stringify(updatedList));

            setInputText(''); // Clear the input field
        } catch (err) {
            console.error("Error:", err);
        }
    }
    // Update test description when test changes

    return (

        <div className={'container'}>
            <h1 id={'title'}>
                Tournament Players
            </h1>
            <div className={'d-flex justify-content-center'}>
                <div className={'myCard d-flex align-self-center flex-column '}>
                    <div>
                        <h3 id={'header'} className={"center-text"}>Enter your players</h3>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className={'d-flex gap-5 justify-content-center'}>
                            {chunkedList.map((group, colIndex) => (
                                <ol key={colIndex} className={'player-column'}  start={colIndex * 16 + 1}>
                                    {group.map((item, index) => (
                                        <li key={index} className={'item align-content-lg-start'}>
                                            {item}
                                        </li>
                                    ))}

                                    {/* Only add the input to the last column */}
                                    {colIndex === chunkedList.length - 1 && (
                                        <li className={'item align-content-lg-start'}>
                                            {!isFull && (
                                                <div className={'input'}>
                                                    <input
                                                        required=""
                                                        className={'customInput'}
                                                        type={'text'}
                                                        placeholder={'Enter Text'}
                                                        value={inputText}
                                                        onChange={handleChange}
                                                    />
                                                </div>
                                            )}

                                            {!isFull && (
                                                <button type="submit" className={'myBtn greenBtn'}>
                                                    ADD
                                                </button>
                                            )}

                                        </li>
                                    )}

                                </ol>
                            ))}

                            {/* If there are no players yet, still render a column */}
                            {chunkedList.length === 0 && (
                                <ol className={'player-column'}>
                                    <li className={'item align-content-lg-start'}>

                                        <div className={'input'}>
                                            <input
                                                required=""
                                                className={'customInput'}
                                                type={'text'}
                                                placeholder={'Enter Text'}
                                                value={inputText}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <button type="submit" className={'myBtn greenBtn'}>
                                            ADD
                                        </button>
                                    </li>
                                </ol>
                            )}
                        </div>
                    </form>
                    {isFull && (
                        <Randomizer players={list}/>
                    )}
                </div>
            </div>
        </div>

    );
};

export default PlayerInput;
