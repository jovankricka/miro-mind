async function getAnswerFromChatGpt(question, apiKey) {console.log('Calling OpenAI')
    const chatGptResponse = await (await fetch('https://api.openai.com/v1/completions', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify({
            "model": "text-davinci-003",
            "prompt": question,
            "max_tokens": 1000,
            "temperature": 0
        })
    })).json();console.log(chatGptResponse)
    return chatGptResponse.choices[0].text
}

async function getPhotoUrlFromDalle2(description, apiKey) {
    const dalle2Response = await (await fetch('https://api.openai.com/v1/images/generations', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
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