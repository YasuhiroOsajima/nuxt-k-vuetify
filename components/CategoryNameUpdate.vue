<template>
  <div class="font-weight-bold" v-if="!show" @click="showInput">
    {{ category.name }}
  </div>
  <div v-else>
    <input
      v-model="category_name"
      @blur="updateName"
      @keyup.enter="updateName"
      ref="input"
    />
  </div>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
  props: ['category'],
  data() {
    return {
      show: false,
      category_name: '',
    }
  },
  methods: {
    showInput() {
      this.category_name = this.category.name
      this.show = true
      Vue.nextTick(() => {
        this.focusInput()
      })
    },
    focusInput() {
      ;(this.$refs.input as HTMLInputElement).focus()
    },
    updateName() {
      this.show = false
      this.$emit('category-name-updated', this.category_name, this.category.id)
    },
  },
})
</script>

<style></style>
