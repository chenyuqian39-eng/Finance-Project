import {
  useState,
  type ChangeEvent,
  type FormEvent,
  type MouseEvent,
} from 'react'
import './App.css'
import CardList from './Components/CardList/CardList'
import Search from './Components/Search/Search'
import type { CompanySearch } from './company'
import { searchCompanies } from './api'

function App() {
  const [search, setSearch] = useState('')
  const [portfolioVlues, setPortfolioValues] = useState<string[]>([])
  const [searchResult, setSearchResult] = useState<CompanySearch[]>([])
  const [serverError, setServerError] = useState('')

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setSearch(e.target.value)
  }

  const onPortfolioCreate = (e: any) => {
    e.preventDefault()
    const updatedPortfolio = [...portfolioVlues, e.target[0].value]
  }

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    const result = await searchCompanies(search)

    if (typeof result === 'string') {
      setServerError(result)
      setSearchResult([])
    } else if (Array.isArray(result.data)) {
      console.log(result.data)
      setSearchResult(result.data)
      setServerError('')
    }
  }

  return (
    <div className="App">
      <Search
        onSubmit={handleSubmit}
        search={search}
        handleChange={handleChange}
      />

      {serverError ? <p className="error">{serverError}</p> : null}

      <p>Found {searchResult.length} results</p>

      <CardList
        searchResult={searchResult}
        onPortfolioCreate={onPortfolioCreate}
      />
    </div>
  )
}
/*{条件 && 要显示的内容} 条件成立就显示，条件不成立就隐藏。*/
export default App
