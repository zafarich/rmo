<template>
  <q-input
    ref="inputRef"
    v-bind="$attrs"
    :model-value="modelValue"
    hide-bottom-space
    class="base-input"
    no-error-icon
    lazy-rules="ondemand"
    :type="innerType"
    @blur="onBlur"
    @focus="onFocus"
    @update:model-value="change"
  >
    <template v-if="append" #append>
      <slot name="append" />
    </template>
    <template v-if="prepend" #prepend>
      <slot name="prepend" />
    </template>
    <template v-if="after" #after>
      <slot name="after" />
    </template>
  </q-input>
</template>

<script setup>
import { prettify, trimBetween } from "src/utils/helpers";
import { ref, onBeforeUnmount, useAttrs, onMounted, watch } from "vue-demi";

const props = defineProps({
  modelValue: {
    type: [Number, String],
    default: null,
  },
  append: {
    type: Boolean,
    default: false,
  },
  prepend: {
    type: Boolean,
    default: false,
  },
  after: {
    type: Boolean,
    default: false,
  },
  type: {
    type: String,
    default: "text",
  },
});

const emit = defineEmits(["update:modelValue"]);

const attrs = useAttrs();

const inputRef = ref(null);
let inputEl = null;

onBeforeUnmount(() => {
  inputEl?.removeEventListener("keydown", fixCursorPosition);
});

onMounted(() => {
  init();
});

function init() {
  const $el = inputRef.value?.$el;
  if (attrs.mask && $el) {
    inputEl = $el.getElementsByTagName("input")[0];
    inputEl.addEventListener("keydown", fixCursorPosition);
  }
}

const fixCursorPosition = (e) => {
  let cursorPos = inputEl.selectionStart;
  if (e.code === "Backspace" || e.code === "Delete") {
    setTimeout(() => setCursorPosition(e.target, cursorPos));
  }

  if (!e?.code?.startsWith("Digit")) return;

  setTimeout(() => {
    const nextValue = e.target.value[++cursorPos];

    const characters = [" ", ".", "-", "_", "/"];

    if (characters.includes(nextValue)) cursorPos++;

    setCursorPosition(e.target, cursorPos);
  });
};

const setCursorPosition = (el, position) => {
  el.selectionStart = el.selectionEnd = position;
};
onMounted(() => {
  if (props.type === "number") {
    innerType.value = "string";
    emit("update:modelValue", prettify(props.modelValue));
  }
});

function change(v) {
  emit("update:modelValue", v?.trim());
}
const innerType = ref(props.type);
watch(
  () => props.type,
  () => {
    innerType.value = props.type;
  }
);

function focus() {
  inputRef.value.focus();
}
function resetValidation() {
  inputRef.value.resetValidation();
}
function onFocus(e) {
  if (props.type === "number") {
    innerType.value = props.type;
    emit("update:modelValue", trimBetween(e.target.value));
  }
}
function onBlur(e) {
  if (props.type === "number") {
    innerType.value = "string";
    emit("update:modelValue", prettify(e.target.value));
  }
}

defineExpose({
  focus,
  resetValidation,
});
</script>

<style lang="scss">
.base-input {
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
</style>
