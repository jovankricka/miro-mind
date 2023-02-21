import * as React from 'react';
import {useState} from 'react';
import {getAnswerFromAIModel} from "../apis/openAiApi";
import marvinImage from '../assets/marvin.png'
import {addSticky, addStickyRightOfAnotherSticky, connectTwoItems, zoomTo} from "../apis/miroApi";

const Assist = () => {

    const [state, setState] = useState({
        selectedStickies: []
    });

    miro.board.ui.on('selection:update', async (event) => {
        console.log('Subscribed to selection update event', event);
        console.log(event.items);
        const selectedItems = event.items;

        // Filter sticky notes from the selected items
        const stickyNotes = selectedItems.filter((item) => item.type === 'sticky_note');

        setState({
            selectedStickies: stickyNotes
        })
    });

    React.useEffect(() => {
    }, []);

    const ideateStickies = async () => {
        const content = state.selectedStickies.map(sticky => '[' + sticky.content + ']').join()
        const aiResponse = JSON.parse(await getAnswerFromAIModel(
            'Generate at least 10 ideas based on this input ' + content + '. ' +
            'Return ideas as a JSON with "ideas" array containing strings with ideas.',
            import.meta.env.VITE_OPEN_AI_API_KEY))
        const newStickies = []
        newStickies.push(await addStickyRightOfAnotherSticky(aiResponse.ideas[0], 'light_green', state.selectedStickies[0]));
        for (let i = 1; i < aiResponse.ideas.length;i++) {
            newStickies.push(
                await addStickyRightOfAnotherSticky(aiResponse.ideas[i], 'light_green', newStickies[newStickies.length - 1]));
        }
    }

    const refineStickies = async () => {
        const content = state.selectedStickies.map(sticky => '[' + sticky.content + ']').join()
        const aiResponse = JSON.parse(await getAnswerFromAIModel(
            'Generate at least 10 refinements and different formulations based on this input ' + content + '. ' +
            'Return refinements as a JSON with "refinements" array containing strings with refinements.',
            import.meta.env.VITE_OPEN_AI_API_KEY))
        const newStickies = []
        newStickies.push(await addStickyRightOfAnotherSticky(aiResponse.refinements[0], 'light_green', state.selectedStickies[0]));
        for (let i = 1; i < aiResponse.refinements.length;i++) {
            newStickies.push(
                await addStickyRightOfAnotherSticky(aiResponse.refinements[i], 'light_green', newStickies[newStickies.length - 1]));
        }
    }

    const reverseStickies = async () => {
        const content = state.selectedStickies.map(sticky => '[' + sticky.content + ']').join()
        const aiResponse = JSON.parse(await getAnswerFromAIModel(
            'Generate at least 10 reverse formulations based on this input ' + content + '. ' +
            'Return reversals as a JSON with "reversals" array containing strings with reversals.',
            import.meta.env.VITE_OPEN_AI_API_KEY))
        const newStickies = []
        newStickies.push(await addStickyRightOfAnotherSticky(aiResponse.reversals[0], 'light_green', state.selectedStickies[0]));
        for (let i = 1; i < aiResponse.reversals.length;i++) {
            newStickies.push(
                await addStickyRightOfAnotherSticky(aiResponse.reversals[i], 'light_green', newStickies[newStickies.length - 1]));
        }
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
        </div>
    );
};

export {Assist}