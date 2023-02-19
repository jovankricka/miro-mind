import * as React from 'react';
import {useState} from 'react';
import {createRoot} from 'react-dom/client';
import {getAnswerFromChatGpt, getPhotoUrlFromDalle2} from './openAiApi'
import {
    addImageRightOfStickyNote,
    addSticky,
    addStickyRightOfAnotherSticky,
    connectTwoItems,
    zoomTo
} from "./assets/miroApi";

async function run() {
    const answer = await getAnswerFromChatGpt("Can you respond me with an empty JSON?")
    const photoUrl = await getPhotoUrlFromDalle2("A photo of the andromeda galaxy.")

    const stickyNote = await addSticky(answer)
    const image = await addImageRightOfStickyNote(photoUrl, stickyNote)
    await connectTwoItems(stickyNote, image)
    await zoomTo(image)
}

const App = () => {
    const [state, setState] = useState({
        input: '',
        prompt: 'What is the issue?',
        stickyNotes: []
    });
    React.useEffect(() => {
    }, []);

    const handleChangedInput = (event) => {
        setState({
            input: event.target.value,
            prompt: state.prompt,
            stickyNotes: state.stickyNotes
        })
    };

    const handleSubmittedInput = async () => {
        const inputStickyNote = state.stickyNotes.length === 0 ?
            await addSticky(state.input, 'light_green') :
            await addStickyRightOfAnotherSticky(state.input, 'light_green', state.stickyNotes[state.stickyNotes.length - 1]);
        const question = sanitize(await getAnswerFromChatGpt("I want you to help me do 5 whys analysis. When I give you a statement of the " +
            "cause, you will return me only one question starting with 'Why' which is attempting to dig deeper into the " +
            "cause I provided. Here is the statement '" + state.input + "'."));
        const questionStickyNote = await addStickyRightOfAnotherSticky(question, 'light_blue', inputStickyNote);
        setState({
            input: '',
            prompt: question,
            stickyNotes: state.stickyNotes.concat([inputStickyNote, questionStickyNote])
        })
    };

    const sanitize = (text) => {
        return text.replaceAll('\n', '')
    }

    return (
        <div className="grid wrapper">
            <div className="cs1 ce12">
                <img src="/src/assets/congratulations.png" alt=""/>
            </div>
            <div className="cs1 ce12">
                <h1>Welcome to 5 whys!</h1>
                <p>Lets get to the bottom of the problem! {state.prompt}</p>
            </div>
            <div className="cs1 ce12">
                <input className="input fiveWhysInput" onChange={handleChangedInput} value={state.input}/>
                <a
                    className="button button-primary fiveWhysButton"
                    onClick={handleSubmittedInput}
                >
                    Submit
                </a>
            </div>
        </div>
    );
};

const container = document.getElementById('root');
const root = createRoot(container);
root.render(<App/>);