<template>
  <q-select
    class="base-select"
    hide-bottom-space
    dropdown-icon="keyboard_arrow_down"
    transition-show="jump-up"
    transition-hide="jump-down"
    :transition-duration="50"
    lazy-rules="ondemand"
    v-bind="attrs"
    options-dense
    @update:model-value="change"
    :model-value="modelValue"
  >
    <template v-if="selected && modelValue" #selected>
      {{ t(modelValue?.label || "") }}
    </template>
    <template v-else-if="placeholder && !modelValue" #selected>
      <div class="placeholder">
        <span>{{ placeholder }}</span>
        <span v-if="required" class="text-red">*</span>
      </div>
    </template>
    <!-- <template v-if="!placeholder" #label>
      <span>{{ label }}</span>
    </template> -->
    <template v-if="append" #append>
      <slot name="append" />
    </template>
    <template v-if="prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="option" #option="item">
      <slot name="option" v-bind="item" />
    </template>
  </q-select>
</template>

<script setup>
import { useAttrs } from "vue-demi";
import { useI18n } from "vue-i18n";

const attrs = useAttrs();

// const props =
defineProps({
  modelValue: [Number, String, Object],
  placeholder: String,
  required: {
    type: Boolean,
    default: false,
  },
  append: {
    type: Boolean,
    default: false,
  },
  prepend: {
    type: Boolean,
    default: false,
  },
  option: {
    type: Boolean,
    default: false,
  },
  selected: {
    type: Boolean,
    default: false,
  },
});
const emit = defineEmits(["update:modelValue"]);

const { t } = useI18n();

function change(v) {
  emit("update:modelValue", v);
}
</script>

<style lang="scss">
.base-select {
  .q-field__control {
    border-radius: 12px;
    padding: 0px 16px;
  }
  .q-field__control:before {
    border: 1px solid $gray-1;
  }
  .q-field__native {
    font-size: 16px;
  }

  .q-field__label {
    font-size: 16px;
    font-weight: 400;
    letter-spacing: 0.2px;
    color: $gray-2;
  }

  .q-field--float .q-field__label {
    transform: translateY(-50%) scale(0.75);
  }
  .q-field--labeled .q-field__native {
    padding-bottom: 7px;
  }
  .q-field__bottom {
    padding: 6px 0px 0px 0px;
  }
}

.q-field--disabled .q-field__control {
  background-color: $gray-4;
}

.q-virtual-scroll__content {
  .q-item--dense {
    padding: 16px;
    .q-item__label {
      color: #000000;
    }
  }
}

.q-position-engine {
  transform: translateY(2px);
}
</style>
