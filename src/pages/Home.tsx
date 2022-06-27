import { useEffect, useCallback, useRef } from 'react'
import { useNavigate } from 'react-router-dom'
import qs from 'qs'

import Categories from '../components/Categories'
import Sort, { list } from '../components/Sort'
import PizzaBlock from '../components/PizzaBlock'
import Skeleton from '../components/PizzaBlock/Skeleton'
import Pagination from '../components/Pagination/Pagination'
import { useSelector } from 'react-redux'
import {
  setCategory,
  setPageCount,
  setFilters,
  filterSelect,
} from '../redux/slices/filterSlice'
import { fetchPizzas, pizzaSelector } from '../redux/slices/pizzasSlice'
import { useAppDispatch } from '../redux/store'
function Home() {
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const { category, sort, pageCount, searchValue } = useSelector(filterSelect)

  const { items, status } = useSelector(pizzaSelector)
  const isSearch = useRef(false)
  const isMounted = useRef(false)

  const getPizzas = useCallback(async () => {
    dispatch(
      // @ts-ignore
      fetchPizzas({ pageCount, category, sort: sort.property })
    )
  }, [category, pageCount, sort.property, dispatch])

  useEffect(() => {
    if (window.location.search) {
      const params = qs.parse(window.location.search.substring(1))
      const sort = list.find(item => item.property === params.sortProperty)
      const filters = {
        pageCount: Number(params.pageCount),
        searchValue: String(params.searchValue),
        category: Number(params.category),
        sort: sort!
      }
      dispatch(setFilters(filters))
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
      .filter((item: any) =>
        item.name.toLowerCase().includes(searchValue.toLowerCase())
      )
      .map((item: any) => <PizzaBlock key={item.id} {...item} />),
  ]

  const pizzasSkeletons = [...new Array(6)].map((_, index) => (
    <Skeleton key={index} />
  ))

  return (
    <>
      <div className='content__top'>
        <Categories
          value={category}
          // eslint-disable-next-line
          onClickCategory={useCallback((id: number) => dispatch(setCategory(id)), [])}
        />
        <Sort />
      </div>
      <h2 className='content__title'>Все пиццы</h2>
      <div className='content__items'>
        {status === 'loading' ? pizzasSkeletons : pizzas}
      </div>
      <Pagination
        value={pageCount}
        onChangePage={(value: number) => dispatch(setPageCount(value))}
      />
    </>
  )
}

export default Home
