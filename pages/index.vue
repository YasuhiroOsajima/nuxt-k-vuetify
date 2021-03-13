<template>
  <v-app>
    <div class="text-h7 ma-2">Kanban sample</div>

    <v-main class="overflow-x-auto">
      <Kanban></Kanban>
    </v-main>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import Kanban from '~/components/Kanban.vue'

export default Vue.extend({
  components: {
    Kanban,
  },
})
</script>

<style></style>
