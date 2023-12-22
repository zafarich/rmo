<template>
  <q-drawer
    show-if-above
    v-model="mainStore.isDrawerOpen"
    side="left"
    :width="280"
    behavior="desktop"
    bordered
  >
    <div class="left-drawer">
      <div class="left-drawer-top top">
        <div class="top-logo">
          <img src="public/img/texnomart-logo.png" alt="" />
        </div>
        <div class="top-expand" v-if="mainStore.isDrawerOpen">
          <button @click="mainStore.toggleDrawer()" class="expand-btn">
            <img src="public/img/expand.png" alt="" />
          </button>
        </div>
      </div>

      <div class="left-drawer-wrap">
        <div>
          <q-list>
            <q-expansion-item
              v-for="nav in navList"
              :key="nav.title"
              v-model="nav.value"
              :to="nav.to"
              exact
              class="nav-item"
              :expand-icon-class="nav?.items ? '' : 'hide'"
              @click="handleClickExpansionItem(nav)"
            >
              <template #header>
                <img :src="getIcon(nav.icon)" alt="" />

                <span class="title">
                  {{ t(nav.title || "") }}
                </span>
              </template>
              <q-item
                clickable
                v-ripple
                v-for="item in nav?.items"
                :key="item.title"
                :to="item.to"
                class="nav-item-child"
              >
                <span class="title">
                  {{ t(item.title || "") }}
                </span>
              </q-item>
            </q-expansion-item>
          </q-list>
        </div>
        <div>2</div>
      </div>
    </div>
  </q-drawer>
</template>

<script setup>
import { ref, computed, defineAsyncComponent } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { useMainStore } from "stores/main";
const mainStore = useMainStore();
const $q = useQuasar();
const { t } = useI18n();
const leftDrawerOpen = ref(false);

const menu = ref([
  {
    title: "Dashboard",
    to: "/",
    icon: "dashboard",
    name: "dashboard",
  },
  //   {
  //     title: "Orders",
  //     to: "/orders",
  //     icon: "list-order",
  //     name: "orders.list",
  //   },
  //   {
  //     title: "Applications",
  //     to: "/applications",
  //     icon: "list-application",
  //     name: "applications.list",
  //   },

  //   {
  //     title: "Calls",
  //     icon: "call",
  //     name: "call",
  //     items: [
  //       {
  //         title: "All_calls",
  //         to: "/calls-all",
  //         name: "calls-all.list",
  //       },
  //       {
  //         title: "Missed_calls",
  //         to: "/calls-missed",
  //         name: "calls-missed.list",
  //       },
  //     ],
  //   },
  //   {
  //     title: "Clients",
  //     to: "/clients",
  //     icon: "clients",
  //     name: "clients.list",
  //   },
]);
const navList = computed(() => {
  return menu.value;
});

function handleClickExpansionItem(v) {
  if (!v?.items) {
    menu.value.forEach((el) => {
      if (el.items) el.value = false;
    });
  }
}

function GetIcon(icon) {
  return defineAsyncComponent(() => import(`./left-icons/${icon}.vue`));
}

defineExpose({
  closeAllExpansions() {
    menu.value.forEach((el) => {
      el.value = false;
    });
  },
});
</script>

<style lang="scss">
.q-drawer--bordered {
  border-right: 1px solid $gray-6 !important;
}

.left-drawer {
  height: 100%;
  &-top {
    height: 72px;
    display: flex;
    align-items: flex-end;
    justify-content: space-between;
    padding: 20px 20px 0px 20px;
  }
  .top {
    &-logo {
    }

    &-expand {
      .expand-btn {
        padding: 5px 0px;
        display: block;
      }
    }
  }

  .left-drawer-wrap {
    height: calc(100% - 72px);
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    padding: 24px 12px 24px 12px;
  }
}
</style>
