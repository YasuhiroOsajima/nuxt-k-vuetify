<template>
  <v-app>
    <v-container>
      <div v-if="show_editor">
        <div class="grey lighten-3">
          <v-row no-gutters>
            <v-btn
              depressed
              color="blue accent-4"
              class="px-4 py-2 white--text mr-2 font-weight-bold"
              @click="saveText"
            >
              保存
            </v-btn>
          </v-row>

          <v-row no-gutters>
            <v-col>
              <v-textarea
                class="form-control"
                background-color="green lighten-3"
                rows="15"
                auto-grow
                outlined
                v-model="target_text"
              ></v-textarea>
            </v-col>
          </v-row>
        </div>
      </div>
      <div v-else>
        <div class="grey lighten-2">
          <v-row no-gutters>
            <v-btn
              depressed
              color="blue accent-4"
              class="px-4 py-2 white--text mr-2 font-weight-bold"
              @click="show_editor = true"
            >
              編集
            </v-btn>
          </v-row>
          <v-row no-gutters>
            <v-col>
              <v-card
                flat
                min-height="371px"
                v-html="parsedMarkdown"
                class="green lighten-3"
              >
              </v-card>
            </v-col>
          </v-row>
        </div>
      </div>
    </v-container>
  </v-app>
</template>

<script lang="ts">
import Vue from 'vue'
import marked from 'marked'

export default Vue.extend({
  data() {
    return {
      target_text: 'aaaaa',
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
    saveText() {
      this.show_editor = false
    },
  },
})
</script>

<style></style>
