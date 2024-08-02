<script>
export default {
  props: {
    size: {
      type: String,
      default: '50px'
    },
    color: {
      type: String,
      default: '#f73535'
    }
  }
}
</script>

<template>
  <div class="spinner-wrapper">
    <div class="spinner"
         :style="{ width: size, height: size, borderLeftColor: color }">
    </div>
  </div>
</template>

<style scoped>
.spinner-wrapper {
  width: 100%;
  padding: 5px;
  display: flex;
  justify-content: center;
  align-items: center;
}

.spinner {
  border-radius: 50%;
  border: 2px solid #ccc;
  border-left-color: #f73535;
  animation: spin 1s linear infinite;
}

@keyframes spin {
  100% { transform: rotate(360deg); }
}
</style>
