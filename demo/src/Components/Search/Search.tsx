
import type { ChangeEvent, FormEvent } from 'react'

interface Props {
    onSubmit: (e: FormEvent<HTMLFormElement>) => void
    search: string
    handleChange: (e: ChangeEvent<HTMLInputElement>) => void
}

function Search({ onSubmit, search, handleChange }: Props) {
    return (
        <form onSubmit={onSubmit}>
            <input
                value={search}
                onChange={handleChange}
                aria-label="Company symbol"
                placeholder="Search a company"
            />
            <button type="submit">Search</button>
        </form>
    )
}

export default Search
