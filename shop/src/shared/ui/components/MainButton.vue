<script lang="ts">
export default {
  name: 'CustomButton',
  props: {
    color: {
      type: String,
      default: 'red',
    },
  },
  computed: {
    buttonClass() {
      return `button-${this.color}`;
    },
  },
  methods: {
    handleClick(event: MouseEvent) {
      this.$emit('click', event);
    },
  }
};
</script>
<template>
  <button :class="buttonClass" v-bind="$attrs"  @click="handleClick">
    <slot>Название кнопки</slot>
  </button>
</template>
<style>
.button-red,
.button-blue,
.button-gray {
  width: 100%;
  height: 35px;
  padding: 7px 21px;
  font-size: 14px;
  border-radius: 2px;
  color: #fff;
  border: 1px solid;
  cursor: pointer;
}

.button-red {
  background: #f14635;
  border-color: #f14635;
}

.button-red:hover {
  background: #e03528;
  border-color: #e03528;
}

.button-blue {
  background: #1398db;
  border-color: #1398db;
}

.button-blue:hover {
  background: #0089d0;
  border-color: #0089d0;
}

.button-gray {
  background: #6c757d;
  border-color: #6c757d;
}

.button-gray:hover {
  background: #5a6268;
  border-color: #5a6268;
}
button:disabled {
  background-color: gray;
  border-color: #6c757d;
  cursor: not-allowed;
}
button:disabled:hover {
  background-color: gray;
  border-color: #6c757d;
  cursor: not-allowed;
}
</style>
