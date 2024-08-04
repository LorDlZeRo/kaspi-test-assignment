<script>
import Vue from "vue";
import { SortFeature } from "~/features/sort";

export default Vue.extend({
  name: "SearchBarWidget",
  components: {
    SortFeature
  },
  data() {
    return {
      searchTerm: ""
    };
  },
  watch: {
    searchTerm(newTerm) {
      this.$store.commit('setSearchQuery', newTerm);
    }
  }
});
</script>
<template>
  <div class="search-bar-wrapper">
    <div class="search-bar">
      <div class="search-bar-shop">
        <span class="search-bar-shop-text">Магазин</span>
      </div>
      <div class="search-bar-input-block">
        <input type="text" class="search-bar-input" placeholder="test" v-model="searchTerm" />
      </div>
      <div class="search-bar-button-block">
        <div class="search-bar-button-icon"></div>
      </div>
    </div>
    <div class="choose-your-city-block">
      <div class="choose-your-city-child-block">
        <span class="my-city-text"> Мой город: </span>
        <span class="my-city-name"> Алматы </span>
      </div>
    </div>
    <SortFeature />
  </div>
</template>

<style scoped>
.search-bar-wrapper {
  display: flex;
  
}
.search-bar {
  display: flex;
}

.search-bar-shop {
  width: 100px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  border-left: 1px solid #e5e5e5;
  border-top: 1px solid #e5e5e5;
  border-bottom: 1px solid #e5e5e5;
  background-color: #f5f5f5;
}

.search-bar-shop-text {
  color: #0089d0;
  text-align: center;
  font-size: 13px;
  cursor: pointer;
}

.search-bar-input-block {
  width: 500px;
  height: 35px;
  border: 1px solid #e5e5e5;
}

.search-bar-input {
  width: 100%;
  height: 100%;
  border: none;
  outline: none;
  padding: 0 20px 0 10px;
}

.search-bar-input:hover {
  border: 1px solid #007aff;
}

.search-bar-input:focus {
  border: 1px solid #007aff;
}

.search-bar-button-block {
  width: 46px;
  height: 35px;
  background-color: #0089d0;
  border: 1px solid #0089d0;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
}

.search-bar-button-block:active .search-bar-button-icon {
  transform: translateY(1px);
}

.search-bar-button-icon {
  background-image: url("~/shared/assets/img/icons/small-search.png");
  width: 18px;
  height: 17px;
}

.choose-your-city-block {
    flex-grow: 1;
    height: 100%;
    display: flex;
    align-items: center;
}

.choose-your-city-child-block {
    margin-left: 20px;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
}

.my-city-text {
    cursor: default;
    font-family: "Roboto",Helvetica,Arial,sans-serif;
    font-size: 14px;
    line-height: 1.2;
    letter-spacing: normal
}

.my-city-name {
    display: inline-block;
    color: #008bd0c5;
    text-align: center;
    font-size: 13px;
    border-bottom: 1px dashed;
    cursor: pointer;
}

.my-city-name:hover {
    border-bottom: 1px dashed rgba(0, 0, 0, 0)
}
</style>
