import * as React from 'react';
import {useState} from 'react';
import {getAnswerFromAIModel} from "../apis/openAiApi";
import marvinImage from '../assets/marvin.png'
import {addSticky, addStickyRightOfAnotherSticky, connectTwoItems, zoomTo} from "../apis/miroApi";

const Assist = () => {

    const [state, setState] = useState({
        selectedStickies: [],
        generatedStickies: []
    });

    miro.board.ui.on('selection:update', async (event) => {
        console.log('Subscribed to selection update event', event);
        console.log(event.items);
        const selectedItems = event.items;

        // Filter sticky notes from the selected items
        const stickyNotes = selectedItems.filter((item) => item.type === 'sticky_note');

        setState({
            selectedStickies: stickyNotes,
            generatedStickies: state.generatedStickies
        })
    });

    React.useEffect(() => {
    }, []);

    const ideateStickies = async () => {
        const content = state.selectedStickies.map(sticky => '[' + sticky.content + ']').join()
        const aiResponse = JSON.parse(await getAnswerFromAIModel(
            'Generate at least 10 ideas based on this input ' + content + '. ' +
            'Respond with a JSON object with "ideas" array containing strings with ideas.',
            import.meta.env.VITE_OPEN_AI_API_KEY))
        setState({
            selectedStickies: state.selectedStickies,
            generatedStickies: aiResponse.ideas
        })
    }

    const refineStickies = async () => {
        const content = state.selectedStickies.map(sticky => '[' + sticky.content + ']').join()
        const aiResponse = JSON.parse(await getAnswerFromAIModel(
            'Generate at least 10 refinements and different formulations based on this input ' + content + '. ' +
            'Respond with a JSON object with "refinements" array containing strings with refinements.',
            import.meta.env.VITE_OPEN_AI_API_KEY))
        setState({
            selectedStickies: state.selectedStickies,
            generatedStickies: aiResponse.refinements
        })
    }

    const reverseStickies = async () => {
        const content = state.selectedStickies.map(sticky => '[' + sticky.content + ']').join()
        const aiResponse = JSON.parse(await getAnswerFromAIModel(
            'Generate at least 10 reverse formulations based on this input ' + content + '. ' +
            'Respond with a JSON object with "reversals" array containing strings with reversals.',
            import.meta.env.VITE_OPEN_AI_API_KEY))
        setState({
            selectedStickies: state.selectedStickies,
            generatedStickies: aiResponse.reversals
        })
    }

    const renderGeneratedStickies = () => {
        return state.generatedStickies.map(sticky => <div className="miro-draggable">{sticky}</div>)
    }

    return (
        <div className="grid wrapper usecase">
            <div className="cs3 ce12">
                <img src={marvinImage} alt=""/>
            </div>
            <div className="cs1 ce12">
                <a className="button button-primary" onClick={ideateStickies}>
                    Ideate
                </a>
                <a className="button button-primary" onClick={refineStickies}>
                    Refine
                </a>
                <a className="button button-primary" onClick={reverseStickies}>
                    Reverse
                </a>
            </div>
            <div>
                {renderGeneratedStickies()}
            </div>
        </div>
    );
};

export {Assist}