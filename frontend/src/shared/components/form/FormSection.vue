<script setup lang="ts">
defineProps<{
  legend: string;
}>();
</script>

<template>
  <Fieldset :legend="legend">
    <slot />
  </Fieldset>
</template>
