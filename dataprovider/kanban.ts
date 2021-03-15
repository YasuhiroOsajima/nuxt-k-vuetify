import categoriesProvider1 from '~/dataprovider/categories1'
import tasksProvider1 from '~/dataprovider/tasks1'
import categoriesProvider2 from '~/dataprovider/categories2'
import tasksProvider2 from '~/dataprovider/tasks2'

export default {
  kanban: [
    {
      id: '027e4a0c-dc08-409f-b50b-d6148927a732',
      user: '佐藤',
      categories: categoriesProvider1.categories,
      tasks: tasksProvider1.tasks,
    },
    {
      id: 'a0442a9a-e252-4bc9-bdcb-6c45b8ebd2eb',
      user: '鈴木',
      categories: categoriesProvider2.categories,
      tasks: tasksProvider2.tasks,
    },
  ],
}
