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
                <q-icon v-if="nav.icon" :name="nav.icon" :class="[nav.name]" />
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
import { ref, computed } from "vue";
import { useQuasar } from "quasar";
import { useI18n } from "vue-i18n";
import { useMainStore } from "stores/main";
const mainStore = useMainStore();
const $q = useQuasar();
const { t } = useI18n();
const leftDrawerOpen = ref(false);

const menu = ref([
  {
    title: "dashboard",
    to: "/",
    icon: "dashboard",
    name: "dashboard",
  },
  {
    title: "orders",
    to: "/orders",
    icon: "assignment",
    name: "orders.list",
  },
  {
    title: "contracts",
    to: "/contracts",
    icon: "work_history",
    name: "contracts.list",
  },

  {
    title: "Reconciliation_acts",
    icon: "content_copy",
    name: "act",
    items: [
      {
        title: "All",
        to: "/act",
        name: "act.list",
      },
      {
        title: "confirmed",
        to: "/act/confirmed?status=14",
        name: "act.confirmed.list",
      },
    ],
  },
  {
    title: "users",
    icon: "people",
    name: "products",
    items: [
      {
        title: "Sellers",
        to: "/sellers",
        icon: "receipt",
        name: "sellers.list",
      },
      {
        title: "Clients2",
        to: "/clients",
        icon: "receipt",
        name: "clients.list",
      },
      {
        title: "Admins",
        to: "/admins",
        icon: "account_circle",
        name: "admins.list",
      },
    ],
  },
  {
    title: "Moderation",
    icon: "app_registration",
    name: "products",
    items: [
      {
        title: "Organizations",
        to: "/organizations",
        icon: "receipt",
        name: "organizations.list",
      },

      // {
      //   title: "goods",
      //   to: "/products",
      //   icon: "shopping_cart",
      //   name: "products",
      // },
      {
        title: "goods",
        to: "/products2",
        icon: "shopping_cart",
        name: "products2.list",
      },
    ],
  },
  {
    title: "Finance",
    icon: "account_balance_wallet",
    name: "finance",
    items: [
      {
        title: "Claim_contracts",
        to: { name: "finances.contracts.list" },
      },

      {
        title: "Claims",
        to: { name: "finances.claims.list" },
      },
      {
        title: "Payment_schedule",
        to: { name: "finances.payments.list" },
      },
    ],
  },

  {
    title: "Reports",
    icon: "summarize",
    name: "reports",
    items: [
      {
        title: "Applications_by_region",
        to: { name: "reports.region.orders.list" },
      },
      {
        title: "Applications_by_organization",
        to: { name: "reports.organization.orders.list" },
      },
      {
        title: "Transactions_by_organization",
        to: { name: "reports.organization.contracts.list" },
      },
      {
        title: "Request_report",
        to: { name: "reports.orders.list" },
      },
    ],
  },

  {
    title: "Payments",
    icon: "summarize",
    name: "payments",
    items: [
      {
        title: "Payments_to_the_fund",
        to: { name: "payments.fund.list" },
      },
      {
        title: "Customer_payments",
        to: { name: "payments.clients.list" },
      },
    ],
  },

  {
    title: "settings",
    icon: "settings",
    name: "settings",
    items: [
      {
        title: "Categories",
        to: { name: "settings.category.list" },
      },
      {
        title: "filters",
        to: { name: "settings.filter.list" },
      },
      // {
      //   title: "Brands",
      //   to: { name: "settings.brand.list" },
      // },
      // {
      //   title: "Languages",
      //   to: { name: "settings.language.list" },
      // },
      {
        title: "Group_attributes",
        to: { name: "settings.attribute.list" },
      },
      // {
      //   title: "Attributes_to_the_group",
      //   to: { name: "settings.attribute-group.list" },
      // },
    ],
  },
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
