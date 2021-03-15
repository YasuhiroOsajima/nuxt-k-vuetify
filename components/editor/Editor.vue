<template>
  <div>
    <div v-if="show_editor">
      <v-row no-gutters>
        <div class="mb-1">
          <v-btn
            depressed
            color="teal darken-3"
            class="px-4 py-2 white--text mr-2 font-weight-bold"
            @click="saveText"
          >
            保存
          </v-btn>
          <v-btn
            depressed
            color="red accent-2"
            class="px-4 py-2 white--text mr-2 font-weight-bold"
            @click="trashText"
          >
            キャンセル
          </v-btn>
        </div>
      </v-row>

      <v-row no-gutters>
        <v-textarea
          class="form-control"
          background-color="grey lighten-4"
          :rows="rows"
          auto-grow
          outlined
          v-model="tmp_text"
        ></v-textarea>
      </v-row>
    </div>

    <div v-else>
      <v-row no-gutters>
        <v-btn
          depressed
          color="light-blue darken-4"
          class="mb-1 white--text font-weight-bold"
          @click="openEditor"
        >
          編集
        </v-btn>
      </v-row>
      <v-row no-gutters>
        <v-col>
          <v-card flat v-html="parsedMarkdown" class="grey lighten-4 mb-4">
          </v-card>
        </v-col>
      </v-row>
    </div>
  </div>
</template>

<script lang="ts">
import Vue from 'vue'
import marked from 'marked'

export default Vue.extend({
  props: {
    rows: Number,
  },
  data() {
    return {
      target_text: 'aaaaa',
      tmp_text: '',
      show_editor: false,
    }
  },
  computed: {
    parsedMarkdown() {
      let target: string = this.target_text
      return marked(target)
    },
  },
  methods: {
    openEditor() {
      this.tmp_text = this.target_text
      this.show_editor = true
    },
    saveText() {
      this.target_text = this.tmp_text
      this.show_editor = false
    },
    trashText() {
      this.show_editor = false
    },
  },
})
</script>

<style></style>
