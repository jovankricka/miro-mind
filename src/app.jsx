import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {FiveWhys} from "./usecases/fivewhys";
import {useState} from "react";
import {Marvin} from "./usecases/marvin";
import brainImage from './assets/brain.png'
import {Assist} from "./usecases/assist";

const App = () => {

    miro.board.ui.on("drop", async ({x, y, target}) => {
        await miro.board.createStickyNote({x, y, content: target.innerText});
    });

    const [state, setState] = useState({
        currentUseCase: undefined
    });


    const handleFiveWhysClicked = async () => {
        setState({
            currentUseCase: 'fivewhys'
        })
    };

    const handleMarvinClicked = async () => {
        setState({
            currentUseCase: 'marvin'
        })
    };

    const handleAssistClicked = async () => {
        setState({
            currentUseCase: 'assist'
        })
    };

    if (state.currentUseCase === 'fivewhys') {
        return <FiveWhys/>
    } else if (state.currentUseCase === 'marvin') {
        return <Marvin/>
    } else if (state.currentUseCase === 'assist') {
        return <Assist/>
    } else {
        return (
            <div className="grid wrapper">
                <div className="cs1 ce5">
                    <img src={brainImage} alt=""/>
                </div>
                <div className="cs1 ce12">
                    <h1>Welcome to Miro's AI powered toolbox</h1>
                    <p>Select one of the apps below</p>
                </div>
                <div className="cs1 ce12">
                    <a className="button button-primary" onClick={handleFiveWhysClicked}>
                        Five whys
                    </a>
                </div>
                <div className="cs1 ce12">
                    <a className="button button-primary" onClick={handleMarvinClicked}>
                        Marvin
                    </a>
                </div>
                <div className="cs1 ce12">
                    <a className="button button-primary" onClick={handleAssistClicked}>
                        Assist
                    </a>
                </div>
            </div>
        );
    }

};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);