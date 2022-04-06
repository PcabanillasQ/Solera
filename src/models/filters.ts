import { CategoryService } from "./service"

export type Filters = {
  id: number
  name: string
  category: CategoryService | 'todo'
}