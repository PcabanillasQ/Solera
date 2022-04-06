import { FC, memo, useMemo } from "react"
import { useService } from "../context/services"
import { Service } from "../models"

type CardProps = { item: Service }
const Card: FC<CardProps> = ({ item }) => {
  const { editService, removeService } = useService()

  const colorBadge = useMemo(() => {
    const { category } = item
    if (category === "salud") return "bg-info"
    if (category === "hogar") return "bg-success"
    return "bg-secondary"
  }, [item])

  return (
    <div className='card d-flex h-100'>
      <div className='card-body'>
        <h5 className='card-title'>{item.title}</h5>
        <span className={`badge ${colorBadge}`}>{item.category}</span>
        <p className='card-text'>{item.description}</p>
      </div>
      <div className='card-footer'>
        <button
          type='button'
          className='btn btn-link text-decoration-none'
          onClick={() => editService(item)}
        >
          Editar
        </button>
        <button
          type='button'
          className='btn btn-link text-decoration-none'
          onClick={() => removeService(item.id)}
        >
          Eliminar
        </button>
      </div>
    </div>
  )
}

export default memo(Card)
