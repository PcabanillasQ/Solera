
export type CategoryService = 'auto' | 'salud' | 'hogar'

export type Service = {
  id: string
  title: string
  description?: string
  category: CategoryService

}