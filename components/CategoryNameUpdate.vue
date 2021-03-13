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

<script lang="js">
import Vue from 'vue'
export default Vue.extend({
  props: ['category'],
  data(){
    return {
      show:false,
      category_name:'',
    }
  },
  methods:{
    showInput(){
      this.category_name = this.category.name
      this.show = true;
      Vue.nextTick(() => {
        this.focusInput();
      });
    },
    focusInput() {
      this.$refs.input.focus();
    },
    updateName(){
      this.show = false;
      this.$emit('category-name-updated', this.category_name, this.category.id)
    },
    openModal(category, task) {
      this.category = category;
      Object.assign(this.form, task);
      this.modal = true;
    },
  },
 })
</script>

<style></style>
