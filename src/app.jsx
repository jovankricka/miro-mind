import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {FiveWhys} from "./usecases/fivewhys";
import {useState} from "react";
import {WiseGuy} from "./usecases/wiseguy";

const App = () => {

    const [state, setState] = useState({
        currentUseCase: undefined
    });


    const handleFiveWhysClicked = async () => {
        setState({
            currentUseCase: 'fivewhys'
        })
    };

    const handleWiseGuyClicked = async () => {
        setState({
            currentUseCase: 'wiseguy'
        })
    };

    if (state.currentUseCase === 'fivewhys') {
        return <FiveWhys/>
    } else if (state.currentUseCase === 'wiseguy') {
        return <WiseGuy/>
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
                    <a className="button button-primary" onClick={handleFiveWhysClicked}>
                        Five whys
                    </a>
                </div>
                <div className="cs1 ce12">
                    <a className="button button-primary" onClick={handleWiseGuyClicked}>
                        Wise guy
                    </a>
                </div>
            </div>
        );
    }

};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);