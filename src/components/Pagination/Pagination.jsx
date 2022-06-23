import ReactPaginate from 'react-paginate'

import styles from './Pagination.module.scss'

function Pagination({ value, onChangePage }) {
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
        renderOnZeroPageCount={null}
      />
    </div>
  )
}

export default Pagination
