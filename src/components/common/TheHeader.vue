<template>
  <q-header reveal bordered>
    <q-toolbar color="white">
      <q-btn
        v-if="!mainStore.isDrawerOpen"
        color="white"
        text-color="black"
        flat
        icon="menu"
        @click="mainStore.toggleDrawer()"
      />
    </q-toolbar>
  </q-header>
</template>

<script setup>
import { useMainStore } from "stores/main";
const mainStore = useMainStore();
</script>

<style lang="scss">
.q-layout__section--marginal {
  background-color: #fff;
}

.q-header--bordered {
  border-bottom: 1px solid $gray-6;
}

.q-toolbar {
  min-height: 76px;
}
</style>
