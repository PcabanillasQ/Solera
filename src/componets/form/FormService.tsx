import { ChangeEvent, SyntheticEvent, useState, useEffect } from "react"
import { useService } from "../../context/services"
import { OptionSelect } from "../../db/data"
import { Service } from "../../models"
import InputCustom from "./Input"
import { v4 as uuid } from "uuid"

const initalForm = {
  title: "",
  category: "",
  description: "",
} as unknown as Service

const FormService = () => {
  const [service, setService] = useState<Service>(initalForm)
  const [error, setError] = useState<boolean>(false)
  const {
    addService,
    isEdit,
    currentService,
    setCurrentService,
    updateService,
  } = useService()

  const handleChange = ({
    currentTarget: { name, value },
  }: ChangeEvent<
    HTMLSelectElement | HTMLTextAreaElement | HTMLInputElement
  >) => {
    setService({ ...service, [name]: value })
  }

  useEffect(() => {
    if (isEdit && currentService !== null) {
      setService(currentService)
    }
  }, [isEdit, currentService])

  const handleSubmit = (e: SyntheticEvent) => {
    e.preventDefault()
    if (service.title.trim() === "" && service.category.trim() === "") {
      setError(true)
      return
    }
    if (isEdit && currentService !== null) {
      updateService({ ...service, id: currentService!.id })
    } else if (service.title.trim() !== "" && service.category.trim() !== "") {
      addService({ ...service, id: uuid() })
    }

    setService(initalForm)
    setError(false)
  }

  return (
    <div className='card'>
      <div className='card-body'>
        <h5 className='card-title'>Servicio</h5>
        <form onSubmit={handleSubmit}>
          <div className='mb-3'>
            <InputCustom
              label='Nombre'
              required
              value={service.title}
              name='title'
              onChange={handleChange}
              onFocus={() => setError(false)}
              placeholder='Ej: Lavar'
            />
          </div>
          <div className='mb-3'>
            <InputCustom
              as='select'
              label='Categoría'
              required
              value={service.category}
              name='category'
              onFocus={() => setError(false)}
              onChange={handleChange}
              options={OptionSelect}
            />
          </div>
          <div className='mb-3'>
            <InputCustom
              label='Descripción'
              as='textarea'
              value={service.description}
              name='description'
              placeholder='Ingrese una descripcion'
              onChange={handleChange}
            />
          </div>
          {error && (
            <small className='text-danger'>
              Debe completar los campos requeridos
            </small>
          )}
        </form>
      </div>
      <div className='card-footer d-flex justify-content-between'>
        <button
          type='submit'
          className='btn btn-outline-success'
          onClick={handleSubmit}
        >
          {isEdit ? "Editar" : "Grabar"}
        </button>
        <button
          className='btn btn-outline-danger'
          onClick={() => {
            setService(initalForm)
            setError(false)
            setCurrentService(null)
          }}
        >
          Cancelar
        </button>
      </div>
    </div>
  )
}

export default FormService
