import { useEffect, useState } from "react";
import 'bootstrap/dist/css/bootstrap.min.css';


const PlayerInput = () => {
    const [list,setList] = useState(
        []
    );
    const [blankList,setBlankList] = useState(Boolean);
    const [inputText, setInputText] = useState(''); // State for input text


    useEffect(() => {
    }, []);

    useEffect(() => {
        getList().then();
        console.log('is blank list? ' , blankList);
        console.log('list is ' , list);
    }, []);

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
                <div className={'myCard d-flex align-self-center flex-column'}>
                    <div>
                        <h3 id={'header'}>Enter your players</h3>
                    </div>

                    <form onSubmit={handleSubmit}>
                        <div className={'d-flex gap-5'}>
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

                    {/*sdsds*/}


                    {/*<form onSubmit={handleSubmit}>*/}
                    {/*    <ol>*/}
                    {/*        {list.map((item, index) => (*/}
                    {/*            <li key={index}*/}
                    {/*                className={`item align-content-lg-start`}*/}
                    {/*            >{item}</li>*/}
                    {/*        ))}*/}

                    {/*        <li className={`item align-content-lg-start`}>*/}
                    {/*            <div className={'input'}>*/}
                    {/*                <input required=""*/}
                    {/*                       className="customInput"*/}
                    {/*                       type="text"*/}
                    {/*                       placeholder={'Enter Text'}*/}
                    {/*                       value={inputText}*/}
                    {/*                       onChange={handleChange}/>*/}
                    {/*            </div>*/}
                    {/*            <button*/}
                    {/*                type="submit"*/}
                    {/*                className={'myBtn greenBtn'}*/}
                    {/*            >*/}
                    {/*                ADD*/}
                    {/*            </button>*/}
                    {/*        </li>*/}
                    {/*    </ol>*/}
                    {/*</form>*/}

                    {/*    sdsdsd*/}
                </div>
            </div>
        </div>

    );
};

export default PlayerInput;
