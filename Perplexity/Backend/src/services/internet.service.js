import { tavily } from '@tavily/core'

export const internetSearch = async (input) => {
    try {
        const query = (typeof input === 'object' && input !== null) ? input.query : input;
        if (!query || typeof query !== 'string' || !query.trim()) {
            return "No valid query provided for search.";
        }

        const apiKey = process.env.TAVILY_API_KEY;
        if (!apiKey) {
            console.warn("⚠️ TAVILY_API_KEY is not configured.");
            return "Search unavailable (missing API key).";
        }

        const api = tavily({ apiKey });
        const today = new Date().toISOString().split('T')[0];
        const freshQuery = `${query.trim()} ${today}`;

        console.log(`🌐 Performing Tavily search for: "${freshQuery}"`);

        const res = await api.search(freshQuery, {
            maxResults: 3,
            searchDepth: "basic",
            includeAnswer: true,
        });

        return JSON.stringify(res);

    } catch (error) {
        console.error('❌ Tavily search error:', error.message);
        return "Search failed, please try again.";
    }
}