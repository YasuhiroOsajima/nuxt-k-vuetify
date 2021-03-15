import Category from '~/types/Category'
import Task from '~/types/Task'

export default interface Kanban {
  id: string
  user: string
  categories: Category[]
  tasks: Task[]
}
