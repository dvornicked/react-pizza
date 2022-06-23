import { useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import Categories from '../components/Categories'
import Sort, { list } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination/Pagination'
import { useDispatch, useSelector } from 'react-redux'
import {
  setCategory,
  setPageCount,
  setFilters,
} from '../redux/slices/filterSlice'
import { fetchPizzas } from '../redux/slices/pizzasSlice'

function Home() {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { category, sort, pageCount, searchValue } = useSelector(state => state.filter)
  const { items, status } = useSelector(state => state.pizza)
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const getPizzas = useCallback(async () => {
    dispatch(fetchPizzas({pageCount, category, sort: sort.property}))
  }, [category, pageCount, sort.property, dispatch])

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = list.find(item => item.property === params.sortProperty)
      dispatch(setFilters({ ...params, sort }))
      isSearch.current = true
    }
  }, [dispatch])

  useEffect(() => {
    if (!isSearch.current) {
      getPizzas()
    }

    isSearch.current = false

    window.scrollTo(0, 0)
  }, [getPizzas])

  useEffect(() => {
    if (isMounted.current) {
      const queryString = qs.stringify({
        sortProperty: sort.property,
        category,
        pageCount,
      })

      navigate(`?${queryString}`)
    }
    isMounted.current = true
  }, [category, sort.property, pageCount, navigate])

  const pizzas = [
    items
      .filter(item =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map(item => <PizzaBlock key={item.id} {...item} />),
  ]

  const pizzasSkeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ))

  return (
    <>
      <div className='content__top'>
        <Categories
          value={category}
          onClickCategory={id => dispatch(setCategory(id))}
        />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {status === 'loading' ? pizzasSkeletons : pizzas}
      </div>
      <Pagination
        value={pageCount}
        onChangePage={value => dispatch(setPageCount(value))}
      />
    </>
  )
}

export default Home
