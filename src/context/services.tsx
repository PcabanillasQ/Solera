import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import { data } from "../db/data"
import { Service } from "../models"
import { STORE_SERVICES } from "../utils/constants"

interface Context {
  listServices: Service[]
  isEdit: boolean
  currentService: Service | null
  setIsEdit: (value: boolean) => void
  addService: (serv: Service) => void
  editService: (serv: Service) => void
  updateService: (serv: Service) => void
  removeService: (id: string) => void
  setCurrentService: (value: Service | null) => void
  tagFilter: string
  setTagFilter: (value: string) => void
}

const ServiceContext = createContext<Context>({} as Context)

export const ServiceProvider: React.FC = ({ children }) => {
  const [listServices, setListServices] = useState<Service[]>([])
  const [currentService, setCurrentService] = useState<Service | null>(null)
  const [tagFilter, setTagFilter] = useState<string>("todo")
  const [isEdit, setIsEdit] = useState<boolean>(false)

  const saveStorage = (data: unknown) =>
    localStorage.setItem(STORE_SERVICES, JSON.stringify(data))

  const getServices = useCallback(() => {
    if (localStorage.getItem(STORE_SERVICES)) {
      const data = localStorage.getItem(STORE_SERVICES)
      if (data !== null) setListServices(JSON.parse(data))
      return
    } else {
      localStorage.setItem(STORE_SERVICES, JSON.stringify(data))
    }
  }, [])

  const addService = useCallback(
    (service) => {
      const newList = [...listServices, service]
      saveStorage(newList)
      setListServices(newList)
    },
    [listServices]
  )

  const editService = useCallback((service) => {
    setIsEdit(true)
    setCurrentService(service)
  }, [])

  const updateService = useCallback(
    (service) => {
      const newList = listServices.map((servState) =>
        servState.id === service.id ? service : servState
      )
      saveStorage(newList)
      setListServices(newList)
      setIsEdit(false)
      setCurrentService(null)
    },
    [listServices]
  )

  const removeService = useCallback(
    (id: string) => {
      const newList = listServices.filter((_) => _.id !== id)
      saveStorage(newList)
      setListServices(newList)
    },
    [listServices]
  )

  useEffect(() => {
    getServices()
  }, [getServices])

  return (
    <ServiceContext.Provider
      value={{
        listServices,
        tagFilter,
        isEdit,
        currentService,
        setCurrentService,
        addService,
        editService,
        updateService,
        removeService,
        setIsEdit,
        setTagFilter,
      }}
    >
      {children}
    </ServiceContext.Provider>
  )
}

export const useService = () => useContext(ServiceContext)
