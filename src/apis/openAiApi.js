const OPEN_AI_API_KEY = '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'

async function getAnswerFromChatGpt(question) {
    const chatGptResponse = await (await fetch('https://api.openai.com/v1/completions', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + OPEN_AI_API_KEY
        },
        body: JSON.stringify({
            "model": "text-davinci-003",
            "prompt": question,
            "max_tokens": 1000,
            "temperature": 0
        })
    })).json();
    return chatGptResponse.choices[0].text
}

async function getPhotoUrlFromDalle2(description) {
    const dalle2Response = await (await fetch('https://api.openai.com/v1/images/generations', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + OPEN_AI_API_KEY
        },
        body: JSON.stringify({
            "prompt": description,
            "n": 1,
            "size": "1024x1024"
        })
    })).json();
    return dalle2Response.data[0].url
}

export { getAnswerFromChatGpt, getPhotoUrlFromDalle2 };