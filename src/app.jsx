import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {FiveWhys} from "./usecases/fivewhys";
import {useState} from "react";
import {addSticky, addStickyRightOfAnotherSticky, connectTwoItems, zoomTo} from "./apis/miroApi";
import {getAnswerFromChatGpt} from "./apis/openAiApi";

const App = () => {

    const [state, setState] = useState({
        currentUseCase: undefined
    });



    const handleFiveWhysClicked = async () => {
        setState({
            currentUseCase: 'fivewhys'
        })
    };

    if (state.currentUseCase === 'fivewhys') {
        return <FiveWhys/>
    } else {
        return (
            <div className="grid wrapper">
                <div className="cs1 ce5">
                    <img src="/src/assets/brain.png" alt=""/>
                </div>
                <div className="cs1 ce12">
                    <h1>Welcome to Miro's AI powered toolbox</h1>
                    <p>Select one of the apps below</p>
                </div>
                <div className="cs1 ce12">
                    <a className="button button-primary fiveWhysButton" onClick={handleFiveWhysClicked}>
                        Five whys
                    </a>
                </div>
            </div>
        );
    }

};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);