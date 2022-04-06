import { FC } from "react"
import { Service } from "../models"
import Card from "./Card"

type ListProps = {
  data: Service[]
}
const List: FC<ListProps> = ({ data }) => {
  return (
    <div className='row'>
      {data ? (
        data.map((serv) => (
          <div key={serv.id} className='col-sm-6 col-md-4 col-xl-3 mb-3'>
            <Card item={serv} />
          </div>
        ))
      ) : (
        <p className='h2 text-muted text-center'>
          No hay servicios disponibles
        </p>
      )}
    </div>
  )
}
export default List
