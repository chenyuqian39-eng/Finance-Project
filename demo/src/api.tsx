import axios from 'axios'
import type { CompanySearch } from './company'

export const searchCompanies = async (query: string) => {
    try {
        const response = await axios.get<CompanySearch[]>(
            'https://financialmodelingprep.com/stable/search-symbol',
            {
                params: {
                    query,
                    apikey: import.meta.env.VITE_API_KEY,
                },
            }
        )

        return response
    } catch (error) {
        if (axios.isAxiosError(error)) {
            console.error('Error message:', error.message)
            return error.message
        }

        console.error('Unexpected error:', error)
        return 'An unexpected error has occurred.'
    }
}