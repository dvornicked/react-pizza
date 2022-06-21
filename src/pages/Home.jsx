import { useState, useEffect, useContext } from 'react'

import Categories from '../components/Categories'
import Sort from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Search/Pagination/Pagination'
import { SearchContext } from '../App'

function Home() {
  const [items, setItems] = useState([])
  const [isLoading, setIsLoading] = useState(true)
  const [category, setCategory] = useState(0)
  const [currentPage, setCurrentPage] = useState(1)
  const [sortType, setSortType] = useState({
    name: 'популярности',
    property: 'rating',
  })

  useEffect(() => {
    setIsLoading(true)
    fetch(
      `https://62afa5f9b0a980a2ef428b6b.mockapi.io/items?page=${currentPage}&limit=4&category=${
        category ? category : ''
      }&sortBy=${sortType.property}`
    )
      .then(response => response.json())
      .then(json => {
        setItems(json)
        setIsLoading(false)
      })
    window.scrollTo(0, 0)
  }, [category, sortType.property, currentPage])

  const { searchValue } = useContext(SearchContext)
  
  const pizzas = [items.filter(item => item.name.toLowerCase().includes(searchValue.toLowerCase())).map(item => <PizzaBlock key={item.id} {...item} /> )]
  const pizzasSkeletons = [...new Array(6)].map((_, index) => <Skeleton key={index} /> )

  return (
    <>
      <div className='content__top'>
        <Categories value={category} onClickCategory={setCategory} />
        <Sort value={sortType} onClickSort={setSortType} />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {isLoading
          ? pizzasSkeletons
          : pizzas }
      </div>
      <Pagination onChangePage={setCurrentPage} />
    </>
  )
}

export default Home
