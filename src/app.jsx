import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {FiveWhys} from "./usecases/fivewhys";
import {useState} from "react";
import {Marvin} from "./usecases/marvin";
import brainImage from './assets/brain.png'



const App = () => {

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

    miro.board.ui.on('selection:update', async (event) => {
        console.log('Subscribed to selection update event', event);
        console.log(event.items);
        const selectedItems = event.items;

        // Filter sticky notes from the selected items
        const stickyNotes = selectedItems.filter((item) => item.type === 'sticky_note');

        // Change the fill color of the sticky notes
        for (const stickyNote of stickyNotes) {
            stickyNote.style.fillColor = 'cyan';
            await stickyNote.sync();
        }
    });

    if (state.currentUseCase === 'fivewhys') {
        return <FiveWhys/>
    } else if (state.currentUseCase === 'marvin') {
        return <Marvin/>
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
            </div>
        );
    }

};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);