<script setup lang="ts">
defineProps<{
  showBack?: boolean;
  nextLabel?: string;
}>();

const emit = defineEmits<{
  (e: "back"): void;
  (e: "next"): void;
}>();
</script>

<template>
  <div class="flex justify-between pt-4">
    <Button
      v-if="showBack"
      label="Voltar"
      severity="secondary"
      @click="emit('back')"
    />

    <div :class="{ 'ml-auto': !showBack }">
      <Button
        :label="nextLabel ?? 'Próximo'"
        icon="pi pi-arrow-right"
        iconPos="right"
        @click="emit('next')"
      />
    </div>
  </div>
</template>
