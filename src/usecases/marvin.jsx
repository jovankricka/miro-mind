import * as React from 'react';
import {useState} from 'react';
import {getAnswerFromChatGpt} from "../apis/openAiApi";
import marvinImage from '../assets/marvin.png'
import {addSticky, zoomTo} from "../apis/miroApi";

const SAMPLE_WHITEBOARD_JSON = '{\'stickies\':[{\'id\':\'A\',\'text\':\'StickyA\'},{\'id\':\'B\',\'text\':\'StickyB\'},...],\'connectors\':[{\'from\':\'A\',\'to\':\'B\'},...]}'

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

    const handleMarvinSend = async () => {console.log('Sending to ChatGPT...')
        const chatGptResponse = JSON.parse(sanitize(await getAnswerFromChatGpt(wrapUserInput(state.input), import.meta.env.VITE_OPEN_AI_API_KEY)))
        const feedback = chatGptResponse.feedback;
        console.log(feedback)
        const lastKey = state.conversation.length === 0 ? 0 : state.conversation[state.conversation.length - 1].key;
        await updateBoard(chatGptResponse.stickies, chatGptResponse.connectors, state.conversation.concat([
            {author: 'You', key: lastKey + 1, text: state.input},
            {author: 'Marvin', key: lastKey + 2, text: feedback}]))
    }

    const updateBoard = async (stickies, connectors, conversation) => {
        const newStickies = []
        for (const sticky of stickies) {
            newStickies.push(await addSticky(sticky.text))
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
        return text.replaceAll('\n', '').replaceAll('\'', '"')
    }

    const wrapUserInput = (userInput) => {
        const openingLine = state.conversation.length === 0 ?
            'This is the sample whiteboard description in JSON format ' :
            'This is the whiteboard description in JSON format ';
        return openingLine + SAMPLE_WHITEBOARD_JSON + '. This is users input ' +
            '\'' + userInput + '\'. Brainstorm with the user so that you return the updated version of the whiteboard ' +
            'JSON and your feedback in a natural language as \'feedback\' field in that JSON. ' +
            'Make sure to escape single quotes in your `feedback` field with backslashes. Prompt user for follow ups.'
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