import {tavily} from '@tavily/core'


const api = tavily({
    apiKey: process.env.TAVILY_API_KEY,
})


export const internetSearch = async ({query}) => {
    const res =  await api.search(query,{
            maxResults: 5,
            searchDepth: "basic",


    })
    return json.stringify(res);
}