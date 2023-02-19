import * as React from 'react';
import {useState} from 'react';
import {getAnswerFromChatGpt} from '../apis/openAiApi'
import {
    addSticky,
    addStickyRightOfAnotherSticky, connectTwoItems,
    createMiroMindTag,
    getAllBoardTags,
    zoomTo
} from "../apis/miroApi";

const FiveWhys = () => {

    const getMiroMindTag = async () => {
        const tags = (await getAllBoardTags()).data
        let miroMindTag = tags.find(tag => tag.title === 'Miro Mind')
        if (miroMindTag === undefined) {
            return await createMiroMindTag()
        } else {
            return miroMindTag
        }
    }

    const [state, setState] = useState({
        input: '',
        prompt: 'What is the issue?',
        stickyNotes: [],
        miroMindTag: undefined
    });

    React.useEffect(() => {
        getMiroMindTag().then(miroMindTag => setState({
            input: state.input,
            prompt: state.prompt,
            stickyNotes: state.stickyNotes,
            miroMindTag: miroMindTag
        }))

    }, []);

    const handleChangedInput = (event) => {
        setState({
            input: event.target.value,
            prompt: state.prompt,
            stickyNotes: state.stickyNotes,
            miroMindTag: state.miroMindTag
        })
    };

    const handleSubmittedInput = async () => {
        const lastStickyNote = state.stickyNotes[state.stickyNotes.length - 1]
        const inputStickyNote = lastStickyNote ?
            await addStickyRightOfAnotherSticky(state.input, 'light_green', lastStickyNote) :
            await addSticky(state.input, 'light_green');
        await connectTwoItems(lastStickyNote, inputStickyNote)
        let updatedStickyNotes = state.stickyNotes.concat([inputStickyNote])
        await zoomTo(updatedStickyNotes)
        const question = sanitize(await getAnswerFromChatGpt("I want you to help me do 5 whys analysis. When I give you a statement of the " +
            "cause, you will return me only one question starting with 'Why' which is attempting to dig deeper into the " +
            "cause I provided. Here is the statement '" + state.input + "'."));
        const questionStickyNote = await addStickyRightOfAnotherSticky(question, 'light_blue', inputStickyNote, state.miroMindTag);
        await connectTwoItems(inputStickyNote, questionStickyNote)
        updatedStickyNotes = updatedStickyNotes.concat([questionStickyNote])
        setState({
            input: '',
            prompt: question,
            stickyNotes: updatedStickyNotes,
            miroMindTag: state.miroMindTag
        })
        await zoomTo(updatedStickyNotes)
        console.log(updatedStickyNotes)
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
                <h1>5 (or more) whys</h1>
                <p>Lets get to the bottom of the problem! <ul><b>{state.prompt}</b></ul></p>
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

export {FiveWhys}