import axios from "axios";

export const apiLetters = axios.create({
    baseURL: "https://random-words-api.kushcreates.com/api",
})

export async function getRandomWord(language: string, length: number) {
    try {
        const lang = language || 'pt-br';
        const len = length || 5;

        const response = await apiLetters.get("", {
            params: {
                language: lang,
                length: len
            }
        });

        return response
    } catch (error) {
        console.error("Error fetching random word:", error);
        return null;
    }
}