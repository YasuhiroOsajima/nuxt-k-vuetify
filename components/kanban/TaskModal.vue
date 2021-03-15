<template>
  <v-card class="mx-auto" outlined>
    <v-card-title class="headline grey lighten-2">
      {{ form.name }} in カテゴリー {{ category_name }}
    </v-card-title>

    <v-card-text>
      <v-text-field label="担当者" v-model="form.incharge_user"> </v-text-field>
      <v-text-field label="開始日" v-model="form.start_date"> </v-text-field>
      <v-text-field label="終了締切日" v-model="form.end_date"> </v-text-field>
      <Edior :rows="3"> </Edior>
    </v-card-text>

    <v-card-actions>
      <v-btn
        depressed
        color="green accent-4"
        class="px-4 py-2 white--text mr-2 font-weight-bold"
        @click="taskUpdate"
      >
        更新
      </v-btn>
      <v-btn
        depressed
        color="red accent-2"
        class="px-4 py-2 white--text mr-2 font-weight-bold"
        @click="closeModal"
      >
        キャンセル
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'
import Edior from '~/components/editor/Editor.vue'
import Task from '~/types/Task'

export default Vue.extend({
  components: {
    Edior,
  },
  props: {
    formTask: {
      type: Object as PropType<Task>,
      required: true,
    },
    category_name: {
      type: String,
      required: true,
    },
  },
  data() {
    return {
      form: {} as Task,
    }
  },
  created() {
    this.form = this.formTask
  },
  methods: {
    taskUpdate() {
      this.$emit('task-update', this.form)
    },
    closeModal() {
      this.$emit('close-modal')
    },
  },
})
</script>

<style></style>
