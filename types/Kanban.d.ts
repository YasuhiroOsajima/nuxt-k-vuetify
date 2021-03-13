import Category from '~/types/Category'
import Task from '~/types/Task'
import Form from '~/types/Form'

export default interface Kanban {
  task: Task
  category: Category
  type: string
  category_name: string
  show_category_input: boolean
  modal: boolean
  categories: Category[]
  tasks: Task[]
  form: Form
}
