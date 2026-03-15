import { createRouter, createWebHistory } from "vue-router";

import AppLayout from "@/layouts/AppLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

import LoginView from "@/modules/auth/views/LoginView.vue";
import NotificacaoCreateView from "@/modules/notificacoes/views/NotificacaoCreateView.vue";
import NotFoundView from "@/views/NotFoundView.vue";

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: "/",
      redirect: "/notificacoes/nova",
    },
    {
      path: "/login",
      component: AuthLayout,
      children: [
        {
          path: "",
          name: "login",
          component: LoginView,
        },
      ],
    },
    {
      path: "/",
      component: AppLayout,
      children: [
        {
          path: "notificacoes/nova",
          name: "notificacao-create",
          component: NotificacaoCreateView,
        },
        {
          path: "notificacoes",
          name: "notificacao-list",
          component: {
            template: `<div class="rounded-2xl border bg-white p-6">
                              <h2 class="text-xl font-semibold mb-2">Notificações</h2>
                              <p class="text-surface-600">Tela de listagem em construção.</p>
                              </div>`,
          },
        },
        {
          path: "dashboard",
          name: "dashboard",
          component: {
            template: `<div class="rounded-2xl border bg-white p-6">
                              <h2 class="text-xl font-semibold mb-2">Dashboard</h2>
                              <p class="text-surface-600">Dashboard em construção.</p>
                              </div>`,
          },
        },
      ],
    },
    {
      path: "/:pathMatch(.*)*",
      name: "not-found",
      component: NotFoundView,
    },
  ],
});

export default router;
