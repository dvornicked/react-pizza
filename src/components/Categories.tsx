import { FC, memo } from 'react'

type CategoriesProps = {
  value: number
  onClickCategory: (i: number) => void
}

const Categories: FC<CategoriesProps> = memo(
  ({ value, onClickCategory }: CategoriesProps) => {
    const categories = [
      'Все',
      'Мясные',
      'Вегетарианская',
      'Гриль',
      'Острые',
      'Закрытые',
    ]
    return (
      <div className='categories'>
        <ul>
          {categories.map((item, index) => (
            <li
              key={index}
              onClick={() => {
                onClickCategory(index)
              }}
              className={value === index ? 'active' : ''}>
              {item}
            </li>
          ))}
        </ul>
      </div>
    )
  }
)

export default Categories
