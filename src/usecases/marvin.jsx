import * as React from 'react';
import {useState} from 'react';
import {getAnswerFromAIModel} from "../apis/openAiApi";
import marvinImage from '../assets/marvin.png'
import {addSticky, zoomTo} from "../apis/miroApi";

const SAMPLE_WHITEBOARD_JSON = '{"stickies":[{"id":"A","text":"StickyA","x":2,"y":2},{"id":"B","text":"StickyB","x":2,"y":2},...],"connectors":[{"from":"A","to":"B"},...]}'

const Marvin = () => {

    const [state, setState] = useState({
        input: '',
        conversation: []
    });

    React.useEffect(() => {
    }, []);

    const handleChangedInput = (event) => {
        setState({
            input: event.target.value,
            conversation: state.conversation,
            stickies: [],
            connectors: []
        })
    };

    const handleMarvinSend = async () => {
        console.log('Sending prompt to teh AI...')
        const aiResponse = JSON.parse(sanitize(await getAnswerFromAIModel(wrapUserInput(state.input), import.meta.env.VITE_OPEN_AI_API_KEY)))
        console.log(aiResponse)
        const feedback = aiResponse.feedback;
        console.log(feedback)
        const lastKey = state.conversation.length === 0 ? 0 : state.conversation[state.conversation.length - 1].key;
        await updateBoard(aiResponse.stickies, aiResponse.connectors, state.conversation.concat([
            {author: 'You', key: lastKey + 1, text: state.input},
            {author: 'Marvin', key: lastKey + 2, text: feedback}]))
    }

    const updateBoard = async (stickies, connectors, conversation) => {
        const newStickies = []
        for (const sticky of stickies) {
            newStickies.push(await addSticky(sticky.text, 'light_green', undefined, sticky.x, sticky.y))
        }
        setState({
            input: '',
            conversation: conversation,
            stickies: newStickies,
            connectors: state.connectors,
        })
        await zoomTo(newStickies)
    }

    const sanitize = (text) => {
        return text.replaceAll('\n', '')
    }

    const wrapUserInput = (userInput) => {
        const openingLine = state.conversation.length === 0 ?
            'This is the sample whiteboard description in JSON format ' + SAMPLE_WHITEBOARD_JSON + '.' :
            'This is the whiteboard description in JSON format ' + JSON.stringify({ stickies: state.stickies, connectors: state.connectors }) + '.';
        return openingLine + ' This is users input ' +
            '\'' + userInput + '\'. Brainstorm with the user so that you return the updated version of the whiteboard ' +
            'JSON and your feedback in a natural language as \'feedback\' field in that JSON. ' +
            'Use double quotes around all JSON fields and values. Use single quote inside the `feedback` field value. ' +
            'Do not use newlines at all in your response.' +
            'Prompt user for follow ups. ' +
            'Make sure stickies are at least 250 units apart. Do not leave trailing commas in JSON arrays.'
    }

    const renderChatHistory = () => {
        const conversationCopy = structuredClone(state.conversation);
        return <div id='marvinChatHistory' className='marvinChatHistory'>
            {conversationCopy
                .sort((a, b) => b.key - a.key)
                .map(message => <p key={message.key}><b>{message.author} ></b> {message.text}</p>)}
        </div>
    }

    return (
        <div className="grid wrapper usecase">
            <div className="cs1 ce12">
                <img src={marvinImage} alt=""/>
            </div>
            <div className="cs1 ce12">
                <h1>Brainstorm through chatting with Marvin</h1>
            </div>
            <div className="cs1 ce12">
                {renderChatHistory()}
                <input className="input marvinInput" value={state.input} onChange={handleChangedInput}/>
                <a className="button button-primary marvinSendButton" onClick={handleMarvinSend}>
                    Send
                </a>
            </div>
        </div>
    );
};

export {Marvin}