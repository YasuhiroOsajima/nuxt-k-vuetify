<template>
  <v-app>
    <div class="text-h7 ma-2">Kanban sample</div>

    <v-main class="overflow-x-auto">
      <v-container fluid>
        <v-row class="mb-2">
          <v-col>
            <v-card flat>
              <v-card-title> 共有事項 </v-card-title>

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
              <v-card-title> チームタスク </v-card-title>
              <div class="ml-2">
                <Kanban></Kanban>
              </div>
            </v-card>
          </v-col>
        </v-row>
        <v-row>
          <v-col>
            <v-card flat>
              <v-card-title> メンバータスク </v-card-title>
              <div class="ml-2">
                <Kanban></Kanban>
              </div>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Kanban from '~/components/kanban/Kanban.vue'
import Editor from '~/components/editor/Editor.vue'

export default Vue.extend({
  components: {
    Kanban,
    Editor,
  },
})
</script>

<style></style>
