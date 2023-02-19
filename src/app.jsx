import * as React from 'react';
import {createRoot} from 'react-dom/client';
import {getAnswerFromChatGpt, getPhotoUrlFromDalle2} from './openAiApi'
import {addImageRightOfStickyNote, addSticky, connectTwoItems, zoomTo} from "./assets/miroApi";

async function run() {
    const answer = await getAnswerFromChatGpt("Can you respond me with an empty JSON?")
    const photoUrl = await getPhotoUrlFromDalle2("A photo of the andromeda galaxy.")

    const stickyNote = await addSticky(answer)
    const image = await addImageRightOfStickyNote(photoUrl, stickyNote)
    await connectTwoItems(stickyNote, image)
    await zoomTo(image)
}

const App = () => {
    React.useEffect(() => {
        run();
    }, []);

    return (
        <div className="grid wrapper">
            <div className="cs1 ce12">
                <img src="/src/assets/congratulations.png" alt=""/>
            </div>
            <div className="cs1 ce12">
                <h1>Congratulations!</h1>
                <p>You've just created your first Miro app!</p>
                <p>
                    What is the main issue you have faced (or facing)?
                </p>
            </div>
            <div className="cs1 ce12">
                <input className="input input-primary"/>
                <a
                    className="button button-primary"
                    target="_blank"
                    href="https://developers.miro.com"
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