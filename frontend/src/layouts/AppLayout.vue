<script setup lang="ts">
import { ref } from "vue";

const isMobileMenuOpen = ref(false);

const navItems = [
  {
    label: "Nova notificação",
    to: "/notificacoes/nova",
    icon: "pi pi-plus-circle",
  },
  { label: "Notificações", to: "/notificacoes", icon: "pi pi-file-edit" },
  { label: "Dashboard", to: "/dashboard", icon: "pi pi-chart-bar" },
];

function closeMobileMenu() {
  isMobileMenuOpen.value = false;
}

function toggleMobileMenu() {
  isMobileMenuOpen.value = !isMobileMenuOpen.value;
}

function handleMobileNavigate(navigate: () => void) {
  navigate();
  closeMobileMenu();
}
</script>

<template>
  <div class="min-h-screen bg-surface-50 text-surface-900">
    <!-- Topbar -->
    <header
      class="sticky top-0 z-40 flex h-16 items-center justify-between border-b bg-white px-4 shadow-sm lg:px-6"
    >
      <div class="flex items-center gap-3 min-w-0">
        <button
          type="button"
          class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-surface-200 bg-white text-surface-700 hover:bg-surface-100 lg:hidden"
          @click="toggleMobileMenu"
          aria-label="Abrir menu"
        >
          <i class="pi pi-bars text-lg" />
        </button>

        <!-- Espaço institucional para logo -->
        <div
          class="hidden sm:flex h-11 w-11 shrink-0 items-center justify-center rounded-xl border border-surface-200 bg-surface-100 text-[10px] font-semibold text-surface-500"
        >
          LOGO
        </div>

        <div class="flex min-w-0 flex-col">
          <span class="truncate text-sm font-semibold leading-none">
            Sistema de Notificações
          </span>
          <span class="truncate text-xs text-surface-500 leading-none mt-1">
            Vigilância Socioassistencial
          </span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <span class="hidden text-sm text-surface-600 sm:inline"
          >Usuário logado</span
        >

        <button
          type="button"
          class="inline-flex items-center gap-2 rounded-lg border border-surface-200 px-3 py-2 text-sm font-medium text-surface-700 hover:bg-surface-100"
        >
          <i class="pi pi-sign-out" />
          <span class="hidden sm:inline">Sair</span>
        </button>
      </div>
    </header>

    <div class="flex">
      <!-- Sidebar desktop -->
      <aside
        class="hidden min-h-[calc(100vh-4rem)] w-72 shrink-0 border-r bg-white lg:block"
      >
        <div class="p-4">
          <nav class="flex flex-col gap-2">
            <RouterLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              custom
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="navigate"
                class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition"
                :class="
                  isActive
                    ? 'bg-primary-50 text-primary-700 border border-primary-100'
                    : 'text-surface-700 hover:bg-surface-100'
                "
              >
                <i :class="item.icon" class="text-base" />
                <span>{{ item.label }}</span>
              </a>
            </RouterLink>
          </nav>
        </div>
      </aside>

      <!-- Conteúdo -->
      <main class="min-w-0 flex-1 p-4 lg:p-6">
        <div class="mx-auto w-full max-w-7xl">
          <RouterView />
        </div>
      </main>
    </div>

    <!-- Overlay mobile -->
    <transition name="fade">
      <div
        v-if="isMobileMenuOpen"
        class="fixed inset-0 z-40 bg-black/40 lg:hidden"
        @click="closeMobileMenu"
      />
    </transition>

    <!-- Drawer mobile -->
    <transition name="slide">
      <aside
        v-if="isMobileMenuOpen"
        class="fixed inset-y-0 left-0 z-50 w-72 max-w-[85vw] border-r bg-white shadow-xl lg:hidden"
      >
        <div class="flex h-16 items-center justify-between border-b px-4">
          <span class="text-sm font-semibold">Menu</span>

          <button
            type="button"
            class="inline-flex h-10 w-10 items-center justify-center rounded-lg border border-surface-200 bg-white text-surface-700 hover:bg-surface-100"
            @click="closeMobileMenu"
            aria-label="Fechar menu"
          >
            <i class="pi pi-times text-base" />
          </button>
        </div>

        <div class="p-4">
          <nav class="flex flex-col gap-2">
            <RouterLink
              v-for="item in navItems"
              :key="item.to"
              :to="item.to"
              custom
              v-slot="{ href, navigate, isActive }"
            >
              <a
                :href="href"
                @click="handleMobileNavigate(navigate)"
                class="flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition"
                :class="
                  isActive
                    ? 'bg-primary-50 text-primary-700 border border-primary-100'
                    : 'text-surface-700 hover:bg-surface-100'
                "
              >
                <i :class="item.icon" class="text-base" />
                <span>{{ item.label }}</span>
              </a>
            </RouterLink>
          </nav>

          <div class="mt-6 border-t pt-4">
            <button
              type="button"
              class="flex w-full items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium text-surface-700 hover:bg-surface-100"
            >
              <i class="pi pi-sign-out text-base" />
              <span>Sair</span>
            </button>
          </div>
        </div>
      </aside>
    </transition>
  </div>
</template>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
  transition: transform 0.22s ease;
}

.slide-enter-from,
.slide-leave-to {
  transform: translateX(-100%);
}
</style>
