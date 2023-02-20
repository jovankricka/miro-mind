import * as React from 'react';
import {useState} from 'react';
import {getAnswerFromChatGpt} from "../apis/openAiApi";
import marvinImage from '../assets/marvin.png'

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
            conversation: state.conversation
        })
    };

    const handleMarvinSend = async () => {
        const chatGptAnswer = await getAnswerFromChatGpt(state.input, import.meta.env.OPEN_AI_API_KEY)
        const lastKey = state.conversation.length === 0 ? 0 : state.conversation[state.conversation.length - 1].key;
        setState({
            input: '',
            conversation: state.conversation.concat([
                {author: 'You', key: lastKey + 1, text: state.input},
                {author: 'Marvin', key: lastKey + 2, text: chatGptAnswer}])
        })
    }

    const renderChatHistory = () => {
        const conversationCopy = structuredClone(state.conversation);
        return <div id='marvinChatHistory' className='marvinChatHistory'>
            {conversationCopy
                .sort((a, b) => b.key - a.key)
                .map(message => <p key={message.key}> <b>{message.author} ></b> {message.text}</p>)}
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