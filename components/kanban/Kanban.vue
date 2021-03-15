<template>
  <div>
    <div class="mt-2">
      <v-btn
        depressed
        color="light-blue darken-4"
        class="mb-1 white--text font-weight-bold"
        v-if="!show_category_input"
        @click="show_category_input = true"
      >
        カテゴリーを追加
      </v-btn>
      <div v-else>
        <div class="mb-1">
          <v-text-field
            background-color="white"
            label="新しいカテゴリー名を追加してください"
            v-model="category_name"
          >
          </v-text-field>
          <v-btn
            depressed
            color="teal darken-3"
            class="px-4 py-2 white--text mr-2 font-weight-bold"
            @click="categoryAdd"
          >
            追加
          </v-btn>
          <v-btn
            depressed
            color="red accent-2"
            class="px-4 py-2 white--text mr-2 font-weight-bold"
            @click="closeCategoryInput"
          >
            キャンセル
          </v-btn>
        </div>
      </div>
    </div>

    <v-layout>
      <div class="grey lighten-1 d-flex">
        <div
          v-for="(category, index) in displayCategories"
          :key="index"
          style="min-width: 400px"
        >
          <div
            class="grey lighten-3 ma-4 pa-2 text-sm-left"
            @dragstart.self="dragCategory(category)"
            @dragover="dragOverCategory(category)"
            draggable="true"
          >
            <CategoryNameUpdate
              :category="category"
              @category-name-updated="categoryNameUpdate"
            >
            </CategoryNameUpdate>

            <div
              v-for="(task, index) in category.tasks"
              :key="index"
              @dragstart="dragTask(task)"
              @dragover.prevent="dragOverTask(task)"
              draggable="true"
              class="grey lighten-5 ma-2 pa-2"
              @click="openModal(task, category.name)"
            >
              {{ task.name }}
            </div>

            <TaskAdd @task-added="addTask" :category_id="category.id"></TaskAdd>
          </div>
        </div>
      </div>
    </v-layout>

    <v-dialog v-model="modal" width="500">
      <TaskModal
        @task-update="taskUpdate"
        @close-modal="closeModal"
        :formTask="modalFormTask"
        :category_name="modalCategoryName"
      ></TaskModal>
    </v-dialog>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CategoryNameUpdate from '~/components/kanban/CategoryNameUpdate.vue'
import TaskAdd from '~/components/kanban/TaskAdd.vue'
import TaskModal from '~/components/kanban/TaskModal.vue'
import categoriesProvider from '~/dataprovider/categories'
import tasksProvider from '~/dataprovider/tasks'
import Category from '~/types/Category'
import Task from '~/types/Task'
import { v4 as uuidv4 } from 'uuid'

interface CategoryDisplay {
  id: string
  name: string
  tasks: Task[]
}

export default Vue.extend({
  components: {
    CategoryNameUpdate,
    TaskAdd,
    TaskModal,
  },
  data() {
    return {
      task: {} as Task,
      category: {} as Category,
      type: '',
      category_name: '',
      show_category_input: false,
      modal: false,
      categories: [] as Category[],
      tasks: [] as Task[],
      modalFormTask: {} as Task,
      modalCategoryName: '',
    }
  },
  created() {
    this.categories = categoriesProvider.categories
    this.tasks = tasksProvider.tasks
  },
  computed: {
    displayCategories() {
      let categories: CategoryDisplay[] = []
      let tasks: Task[] = []
      this.categories.map((category) => {
        tasks = this.tasks.filter((task) => task.category_id === category.id)
        categories.push({
          id: category.id,
          name: category.name,
          tasks: tasks,
        })
      })
      return categories
    },
  },
  methods: {
    dragTask(task: Task) {
      this.task = task
      this.type = 'task'
    },
    dragCategory(category: Category) {
      this.category = category
      this.type = 'category'
    },
    dragOverTask(overTask: Task) {
      if (overTask.id !== this.task.id && this.type === 'task') {
        let deleteIndex
        let addIndex

        this.tasks.map((task, index) => {
          if (task.id === this.task.id) {
            deleteIndex = index
          }
        })

        this.tasks.map((task, index) => {
          if (task.id === overTask.id) {
            addIndex = index
          }
        })

        if (deleteIndex != null && addIndex != null) {
          this.tasks.splice(deleteIndex, 1)
          this.tasks.splice(addIndex, 0, this.task)
          this.task.category_id = overTask.category_id
        }
      }
    },
    dragOverCategory(overCategory: Category) {
      if (overCategory.id !== this.category.id && this.type === 'category') {
        let deleteIndex
        let addIndex

        this.categories.map((category, index) => {
          if (category.id === this.category.id) {
            deleteIndex = index
          }
        })

        this.categories.map((category, index) => {
          if (category.id === overCategory.id) {
            addIndex = index
          }
        })

        if (deleteIndex != null && addIndex != null) {
          this.categories.splice(deleteIndex, 1)
          this.categories.splice(addIndex, 0, this.category)
        }
      } else if (
        this.task.category_id !== overCategory.id &&
        this.type === 'task'
      ) {
        // Drag a task to empty category, there is no overTask.
        // So this.task has to get category_id by overCategory.
        let tasks = this.tasks.filter(
          (task) => task.category_id === overCategory.id
        )
        if (tasks.length === 0) this.task.category_id = overCategory.id
      }
    },
    categoryAdd() {
      if (this.category_name != '') {
        this.categories.push({
          id: uuidv4(),
          name: this.category_name,
          collapsed: false,
        })
        this.show_category_input = false
      }
    },
    closeCategoryInput() {
      this.category_name = ''
      this.show_category_input = false
    },
    categoryNameUpdate(category_name: string, category_id: string) {
      let update_category = this.categories.find(
        (cat) => cat.id === category_id
      )
      if (update_category != null) {
        update_category.name = category_name
      }
    },
    addTask(task_name: string, category_id: string) {
      this.tasks.push({
        id: uuidv4(),
        category_id: category_id,
        name: task_name,
        start_date: '',
        end_date: '',
        incharge_user: '',
        percentage: 0,
      })
    },
    taskUpdate(form: Task) {
      let task = this.tasks.find((task) => task.id === form.id)
      Object.assign(task, form)
      this.modal = false
    },
    openModal(task: Task, categoryName: string) {
      this.modalFormTask = task
      this.modalCategoryName = categoryName
      this.modal = true
    },
    closeModal() {
      this.modal = false
    },
  },
})
</script>

<style></style>
