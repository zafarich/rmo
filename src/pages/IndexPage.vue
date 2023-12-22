<template>
  <q-page>
    {{ t("Login") }}
    <q-btn
      @click="mainStore.toggleDrawer()"
      color="primary"
      outlined
      label="Toggle"
    />
    <div class="px-10">
      <q-select outlined v-model="model" :options="options" label="Outlined" />
      <BaseInput outlined v-model="input_test" />
    </div>

    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-input
          filled
          v-model="name"
          label="Your name *"
          :rules="[(val) => (val && val.length > 0) || 'Please type something']"
        >
        </q-input>

        <q-input
          filled
          type="number"
          v-model="age"
          label="Your age *"
          lazy-rules
          :rules="[
            (val) => (val !== null && val !== '') || 'Please type your age',
            (val) => (val > 0 && val < 100) || 'Please type a real age',
          ]"
        />

        <q-toggle v-model="accept" label="I accept the license and terms" />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn
            label="Reset"
            type="reset"
            color="primary"
            flat
            class="q-ml-sm"
          />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue-demi";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
import BaseInput from "src/components/base/BaseInput.vue";
import { useMainStore } from "stores/main";
const mainStore = useMainStore();
const { t, locale } = useI18n();
const model = ref(null);
const options = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

const $q = useQuasar();

const name = ref(null);
const age = ref(null);
const accept = ref(false);
const input_test = ref("");
function onSubmit() {
  if (accept.value !== true) {
    $q.notify({
      color: "red-5",
      textColor: "white",
      icon: "warning",
      message: "You need to accept the license and terms first",
    });
  } else {
    $q.notify({
      color: "green-4",
      textColor: "white",
      icon: "cloud_done",
      message: "Submitted",
    });
  }
}

function onReset() {
  name.value = null;
  age.value = null;
  accept.value = false;
}
</script>

<style></style>
