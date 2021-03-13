<template>
  <div>
    <div class="my-3 mx-2 rounded-lg" v-if="!show" @click="showInput">
      <span>タスクを追加</span>
    </div>
    <div class="mx-2" v-else>
      <div>
        <input
          type="text"
          class="pa-2 white"
          style="width: 100%"
          placeholder="新しいタスク名を入力してください"
          v-model="task_name"
          ref="input"
        />
      </div>
      <div class="ma-2">
        <v-btn
          depressed
          color="green accent-4"
          class="px-4 py-2 white--text mr-2 font-weight-bold"
          @click="addTask"
        >
          追加
        </v-btn>
        <v-btn
          depressed
          color="red accent-2"
          class="px-4 py-2 white--text mr-2 font-weight-bold"
          @click="closeInput"
        >
          キャンセル
        </v-btn>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['category_id'],
  data() {
    return {
      show: false,
      task_name: '',
    }
  },
  methods: {
    focusInput() {
      ;(this.$refs.input as HTMLInputElement).focus()
    },
    showInput() {
      this.show = true
      Vue.nextTick(() => {
        this.focusInput()
      })
    },
    closeInput() {
      this.show = false
      this.task_name = ''
    },
    addTask() {
      if (this.task_name != '') {
        this.$emit('task-added', this.task_name, this.category_id)
        this.show = false
        this.task_name = ''
      }
    },
  },
})
</script>

<style></style>
