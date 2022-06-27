import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.scss'

type PaginationProps = {
  value: number
  onChangePage: (page: number) => void
}

function Pagination({ value, onChangePage }: PaginationProps) {
  return (
    <div className={styles.root}>
      <ReactPaginate
        className={styles.paginate}
        breakLabel='...'
        nextLabel='>'
        onPageChange={e => onChangePage(e.selected + 1)}
        pageRangeDisplayed={4}
        pageCount={3}
        forcePage={value - 1}
        previousLabel='<'
      />
    </div>
  )
}

export default Pagination
