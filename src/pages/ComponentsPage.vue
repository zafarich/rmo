<template>
  <q-page>
    <div class="my-10">
      <div class="p-6 max-w-[420px] m-auto border border-e7f7ef rounded">
        <div class="mb-6">
          <BaseInput disable v-model="input_test" label="Name" outlined />
        </div>

        <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md mb-6">
          <BaseInput
            v-model="name"
            label="Your name *"
            :rules="[
              (val) => (val && val.length > 0) || 'Please type something',
            ]"
            outlined
          />

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
        <div class="mb-6">
          <BaseSelect
            v-model="select_model"
            label="Tuman"
            outlined
            emit-value
            map-options
            option-label="label"
            option-value="id"
            :options="[
              { label: 'Toshkent', id: 1 },
              { label: 'Andijon', id: 2 },
            ]"
          />
        </div>
        <div class="mb-6">
          <FilterInput placeholder="Ism bo'yicha" outlined v-model="name" />
        </div>

        <div class="mb-6">
          <BaseInput
            v-model="password"
            placeholder="Pasword"
            name="current-pasword"
            :type="isPwd ? 'password' : 'text'"
            append
            outlined
          >
            <template v-slot:append>
              <q-icon
                :name="isPwd ? 'visibility_off' : 'visibility'"
                class="cursor-pointer"
                @click="isPwd = !isPwd"
              />
            </template>
          </BaseInput>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script setup>
import { ref } from "vue-demi";
import { useI18n } from "vue-i18n";
import { useQuasar } from "quasar";
import BaseInput from "src/components/base/BaseInput.vue";
import BaseSelect from "src/components/base/BaseSelect.vue";
import FilterInput from "src/components/base/FilterInput.vue";
const { t, locale } = useI18n();
const model = ref(null);
const select_model = ref(null);
const options = ["Google", "Facebook", "Twitter", "Apple", "Oracle"];

const $q = useQuasar();
const name = ref(null);
const input_test = ref("");
const isPwd = ref(true);
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

<style lang="scss"></style>
