<template>
  <div class="main-layout">
    <q-layout view="lHh lpR lFf">
      <TheHeader />
      <TheLeftDrawer />

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
  </div>
</template>

<script setup>
import TheHeader from "src/components/common/TheHeader.vue";
import TheLeftDrawer from "src/components/common/TheLeftDrawer.vue";
</script>

<style lang="scss">
.main-layout {
  .q-page {
    background-color: $gray-7;
  }
}
</style>
