
<script setup lang="ts">
defineProps<{
  legend: string;
}>();
</script>

<template>
  <Fieldset
    :legend="legend"
    class="w-full min-w-0"
  >
    <slot />
  </Fieldset>
</template>
