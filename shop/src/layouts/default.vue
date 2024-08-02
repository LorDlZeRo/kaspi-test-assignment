<script lang="ts">
import { HeaderWidget } from "~/widgets/header";
import { MenuFeature } from "~/features/menu";
import { SearchBarWidget } from "~/widgets/searchBar";

export default {
  name: "DefaultLayout",
  components: {
    HeaderWidget,
    MenuFeature,
    SearchBarWidget,
  },
};
</script>
<template>
  <div class="main-wrapper-container">
    <header class="main-header-container">
      <div class="header-wrapper">
        <HeaderWidget />
      </div>
    </header>
    <div class="SearchBarWidget-wrapper">
      <SearchBarWidget />
    </div>
    <div class="main-divider">

    </div>
    <div class="main-wrapper">
      <section class="main-menu-container">
        <MenuFeature />
      </section>
      <main class="main-content-container">
        <nuxt />
      </main>
    </div>
    <footer class="main-footer">
      <p>My Footer</p>
    </footer>
  </div>
</template>
<style>
.main-header-container {
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center;
  box-shadow: rgba(0, 0, 0, 0.08) 0px 4px 20px 0px;
}
.header-wrapper {
  width: 960px;
  height: 100%;
}
.main-wrapper-container {
  min-height: 100vh;
  max-height: max-content;
}
.SearchBarWidget-wrapper {
  max-width: 960px;
  margin: 0 auto;
  margin-top: 20px;
}
.main-wrapper {
  margin: 0 auto;
  margin-top: 20px;
  display: flex;
  max-width: 960px;
}
.SearchBarWidget-container {
  display: flex;
  justify-content: center;
  background-color: aqua;
}
.main-divider {
  width: 100%;
  margin-top: 20px;
  border-top: 1px solid #e5e5e5;
}
.main-menu-container {
  width: 20%;
  height: 100%;
}
.main-content-container {
  width: 80%;
}
</style>
