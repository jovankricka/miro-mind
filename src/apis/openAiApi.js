async function getAnswerFromAIModel(question, apiKey) {console.log('Calling OpenAI')
    const aiResponse = await (await fetch('https://api.openai.com/v1/completions', {
        method: 'post',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': 'Bearer ' + apiKey
        },
        body: JSON.stringify({
            "model": "text-davinci-003",
            "prompt": question,
            "max_tokens": 3000,
            "temperature": 0.5
        })
    })).json();console.log(aiResponse)
    return aiResponse.choices[0].text
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

export { getAnswerFromAIModel, getPhotoUrlFromDalle2 };