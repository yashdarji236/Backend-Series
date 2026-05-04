import { tavily } from '@tavily/core'

const api = tavily({
    apiKey: process.env.TAVILY_API_KEY,
})

export const internetSearch = async ({ query }) => {
    try {
        // ✅ Append today's date so results are always fresh
        const today = new Date().toISOString().split('T')[0]
        const freshQuery = `${query} ${today}`

        const res = await api.search(freshQuery, {
            maxResults: 5,
            searchDepth: "advanced",  // ✅ was "basic" — advanced gives fresher results
            includeAnswer: true,      // ✅ Tavily gives a direct answer, saves LLM work
        })

        return JSON.stringify(res)   // ✅ was json.stringify (lowercase = broken!)

    } catch (error) {
        console.error('❌ Tavily search error:', error.message)
        return "Search failed, please try again."
    }
}