<template>
  <v-app>
    <div class="text-h7 ma-2">Kanban sample</div>

    <v-main class="overflow-x-auto">
      <Kanban></Kanban>
      <Editor></Editor>
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
