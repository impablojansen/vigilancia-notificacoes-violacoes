import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";

import AppLayout from "@/layouts/AppLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

import LoginView from "@/modules/auth/views/LoginView.vue";
import NotificacaoCreateView from "@/modules/notificacoes/views/NotificacaoCreateView.vue";
import PessoasListView from "@/modules/pessoas/views/PessoasListView.vue";
import PessoaFormView from "@/modules/pessoas/components/form/PessoaForm.vue";
import NotFoundView from "@/views/NotFoundView.vue";

function emConstrucao(titulo: string, descricao: string) {
  return {
    template: `
      <div class="rounded-2xl border bg-white p-6">
        <h2 class="mb-2 text-xl font-semibold">${titulo}</h2>
        <p class="text-surface-600">${descricao}</p>
      </div>
    `,
  };
}

const routes: RouteRecordRaw[] = [
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
        path: "",
        redirect: { name: "notificacao-create" },
      },
      {
        path: "notificacoes",
        children: [
          {
            path: "",
            name: "notificacao-list",
            component: emConstrucao(
              "Notificações",
              "Tela de listagem em construção."
            ),
          },
          {
            path: "nova",
            name: "notificacao-create",
            component: NotificacaoCreateView,
          },
        ],
      },
      {
        path: "pessoas",
        children: [
          {
            path: "",
            name: "pessoas-list",
            component: PessoasListView,
          },
          {
            path: "nova",
            name: "pessoas-create",
            component: PessoaFormView,            
          },
          {
            path: ":id/editar",
            name: "pessoas-edit",
            component: PessoasListView,
          },
        ],
      },
      {
        path: "dashboard",
        name: "dashboard",
        component: emConstrucao(
          "Dashboard",
          "Dashboard em construção."
        ),
      },
    ],
  },
  {
    path: "/:pathMatch(.*)*",
    name: "not-found",
    component: NotFoundView,
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

export default router;
