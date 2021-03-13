<template>
  <div>
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
              class="grey lighten-5 ma-2 pa-2"
              @dragstart="dragTask(task)"
              @dragover.prevent="dragOverTask(task)"
              draggable="true"
              @click="openModal(category, task)"
            >
              {{ task.name }}
            </div>

            <TaskAdd @task-added="addTask" :category_id="category.id"></TaskAdd>
          </div>
        </div>
      </div>
    </v-layout>

    <div class="grey lighten-3 mx-3 my-2 pa-2 text-sm-left">
      <div v-if="!show_category_input" @click="show_category_input = true">
        カテゴリーを追加
      </div>
      <div v-else>
        <input
          type="text"
          class="pa-2 white"
          placeholder="新しいカテゴリー名を追加してください"
          v-model="category_name"
          style="width: 100%"
        />
        <div class="ma-2">
          <v-btn
            depressed
            color="green accent-4"
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

    <portal to="modal">
      <div class="base" v-show="modal">
        <div class="overlay" v-show="modal" @click="modal = false"></div>
        <div class="content" v-show="modal">
          <div class="font-weight-bold">{{ form.name }}</div>
          <div class="text-xs-left">in カテゴリー{{ this.category.name }}</div>
          <div class="my-4">
            <label class="text-xs-left"> 担当者 </label>
            <input
              class="rounded-lg px-4 py-2 text-xs"
              v-model="form.incharge_user"
            />
          </div>
          <div class="my-4">
            <label class="text-xs"> 開始日 </label>
            <input
              class="rounded-lg px-4 py-2 text-xs"
              v-model="form.start_date"
            />
          </div>
          <div class="my-4">
            <label class="text-xs"> 終了締切日 </label>
            <input
              class="rounded-lg px-4 py-2 text-xs"
              v-model="form.end_date"
            />
          </div>
          <v-btn
            depressed
            color="green accent-4"
            class="px-4 py-2 white--text mr-2 font-weight-bold"
            @click="taskUpdate"
          >
            更新
          </v-btn>
        </div>
      </div>
    </portal>

    <portal-target name="modal"></portal-target>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import CategoryNameUpdate from '~/components/CategoryNameUpdate.vue'
import TaskAdd from '~/components/TaskAdd.vue'
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

const KanbanComponent = Vue.extend({
  components: {
    CategoryNameUpdate,
    TaskAdd,
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
      form: {
        id: '',
        category_id: '',
        name: '',
        start_date: '',
        end_date: '',
        incharge_user: '',
        percentage: '',
      },
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
    openModal(category: Category, task: Task) {
      this.category = category
      Object.assign(this.form, task)
      this.modal = true
    },
    taskUpdate() {
      let task = this.tasks.find((task) => task.id === this.form.id)
      Object.assign(task, this.form)
      this.modal = false
    },
  },
})

export default KanbanComponent
</script>

<style>
.base {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  margin-top: 50px;
}
.overlay {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: gray;
  opacity: 0.5;
}
.content {
  background-color: white;
  position: relative;
  border-radius: 10px;
  padding: 40px;
}
</style>
