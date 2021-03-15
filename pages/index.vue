<template>
  <v-app class="overflow-x-auto mb-2">
    <v-container fluid>
      <div class="text-h6">チームミーティングアプリ</div>
      <v-row class="mb-2">
        <v-col>
          <v-card flat>
            <v-card-title> 【共有事項】 </v-card-title>

            <div class="pl-2" style="max-width: 90%">
              <Editor :rows="1"></Editor>
            </div>
          </v-card>
        </v-col>
      </v-row>

      <v-divider></v-divider>

      <v-row>
        <v-col>
          <v-card flat>
            <v-card-title> 【タスク】 </v-card-title>
            <KanbanAdd @user-added="addKanban" class="mb-4 ml-2"></KanbanAdd>
            <div
              class="ml-2"
              v-for="(kanban, index) in kanban_list"
              :key="index"
              style="min-width: 400px"
            >
              <Kanban
                class="mb-4"
                :id="kanban.id"
                :user="kanban.user"
                :categoriesData="kanban.categories"
                :tasksData="kanban.tasks"
                @kanban-deleted="deleteKanban"
              ></Kanban>
            </div>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Kanban from '~/components/kanban/Kanban.vue'
import Editor from '~/components/editor/Editor.vue'
import KanbanAdd from '~/components/kanban/KanbanAdd.vue'
import KanbanType from '~/types/Kanban'
import kanbanProvider from '~/dataprovider/kanban'

export default Vue.extend({
  components: {
    Kanban,
    Editor,
    KanbanAdd,
  },
  data() {
    return {
      kanban_list: [] as KanbanType[],
    }
  },
  created() {
    this.kanban_list = kanbanProvider.kanban
  },
  methods: {
    addKanban(user_id: string) {
      // Todo. send REST API to get target User's kanban by user_id.
      this.kanban_list.push({
        id: user_id,
        user: '田中',
        categories: [],
        tasks: [],
      })
    },
    deleteKanban(user_id: string) {
      let deleteIndex
      this.kanban_list.map((kanban, index) => {
        if (kanban.id === user_id) {
          deleteIndex = index
        }
      })

      if (deleteIndex != null) {
        this.kanban_list.splice(deleteIndex, 1)
      }
    },
  },
})
</script>

<style></style>
