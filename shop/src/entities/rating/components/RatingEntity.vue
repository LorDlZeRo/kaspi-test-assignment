<script>
export default {
  props: {
    size: {
      type: String,
      default: "medium",
    },
  },
};
</script>

<template>
  <div :class="`item-card-rating-${size}`">
    <font-awesome-icon :class="`icon-star-${size}`" icon="star" />
    <font-awesome-icon :class="`icon-star-${size}`" icon="star" />
    <font-awesome-icon :class="`icon-star-${size}`" icon="star" />
    <font-awesome-icon :class="`icon-star-${size}`" icon="star" />
    <font-awesome-icon :class="`icon-star-${size}`" icon="star" />
    <a :class="`info-text-name-${size}`" as="script"> (27851 отзывов) </a>
  </div>
</template>
<style scoped>
/* Общие стили для размера medium */
.item-card-rating-medium {
  width: 100%;
}

.icon-star-medium {
  width: 16px;
  color: rgb(217, 60, 60);
}

.info-text-name-medium {
  color: #0089d0;
  font-size: 17px;
}

.info-text-name-medium:hover {
  cursor: pointer;
  text-decoration: underline;
}

/* Общие стили для размера small */
.item-card-rating-small {
  width: 100%;
}

.icon-star-small {
  width: 11px;
  color: rgb(217, 60, 60);
}

.info-text-name-small {
  color: #0089d0;
  font-size: 13px;
}

.info-text-name-small:hover {
  cursor: pointer;
  text-decoration: underline;
}
</style>
