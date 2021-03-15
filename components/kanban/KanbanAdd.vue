<template>
  <div>
    <v-btn
      depressed
      color="light-blue darken-4"
      class="white--text font-weight-bold"
      v-if="!show"
      @click="showInput"
    >
      カンバンを追加
    </v-btn>
    <div class="mx-2" v-else>
      <div>
        <input
          type="text"
          class="pa-2 white"
          style="width: 100%"
          placeholder="追加するユーザ名を入力してください"
          v-model="user_name"
          ref="input"
        />
      </div>
      <div class="ma-2">
        <v-btn
          depressed
          color="teal darken-3"
          class="px-4 py-2 white--text mr-2 font-weight-bold"
          @click="addUser"
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
import { v4 as uuidv4 } from 'uuid'

export default Vue.extend({
  data() {
    return {
      show: false,
      user_name: '',
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
      this.user_name = ''
    },
    addUser() {
      if (this.user_name != '') {
        let user_id = uuidv4()
        // Todo. send REST API with user_id and user_name.

        this.$emit('user-added', user_id)
        this.show = false
        this.user_name = ''
      }
    },
  },
})
</script>

<style></style>
