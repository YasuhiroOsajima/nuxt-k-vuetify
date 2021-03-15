<template>
  <div>
    <v-card class="mx-auto" outlined>
      <v-card-title class="headline grey lighten-2">
        {{ form.name }} in カテゴリー {{ category_name }}
      </v-card-title>

      <v-card-text>
        <v-text-field label="担当者" v-model="form.incharge_user">
        </v-text-field>
        <v-text-field label="開始日" v-model="form.start_date"> </v-text-field>
        <v-text-field label="終了締切日" v-model="form.end_date">
        </v-text-field>
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
        <v-btn
          depressed
          color="deep-purple lighten-1"
          class="px-4 py-2 white--text mr-2 font-weight-bold"
          @click="checkDelete"
        >
          タスクを削除
        </v-btn>
      </v-card-actions>
    </v-card>
    <v-dialog v-model="check_modal" width="500">
      <v-card class="mx-auto" outlined>
        <v-card-text class="text-h6">
          {{ form.name }} を削除しますか？
        </v-card-text>
        <v-btn
          depressed
          color="deep-purple lighten-1"
          class="px-4 py-2 white--text mr-2 font-weight-bold"
          @click="deleteTask"
        >
          削除
        </v-btn>
        <v-btn
          depressed
          color="red accent-2"
          class="px-4 py-2 white--text mr-2 font-weight-bold"
          @click="check_modal = false"
        >
          キャンセル
        </v-btn>
      </v-card>
    </v-dialog>
  </div>
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
      check_modal: false,
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
    checkDelete() {
      this.check_modal = true
    },
    deleteTask() {
      this.$emit('delete-task', this.form.id)
    },
  },
})
</script>

<style></style>
