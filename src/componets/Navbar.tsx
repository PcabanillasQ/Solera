import { FC } from "react"
import { Filters } from "../models/"
import { useService } from "../context/services"

type NavbarProps = {
  items: Filters[]
}

const Navbar: FC<NavbarProps> = ({ items }) => {
  const { setTagFilter } = useService()
  return (
    <nav className='navbar navbar-expand navbar-light bg-light'>
      <div className='container-fluid'>
        <ul className='navbar-nav'>
          {items.length > 0 ? (
            items.map((item) => (
              <li
                key={item.id}
                className='nav-item'
                onClick={() => setTagFilter(item.category)}
              >
                <a className='nav-link ' aria-current='page' href='#!'>
                  {item.name}
                </a>
              </li>
            ))
          ) : (
            <li className='nav-item'>
              <a className='nav-link ' aria-current='page' href='#!'>
                Home
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  )
}

export default Navbar
