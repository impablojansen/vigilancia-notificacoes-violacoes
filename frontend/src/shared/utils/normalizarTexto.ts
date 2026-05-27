import type { Directive, DirectiveBinding } from "vue";

export type NormalizeMode = "ALPHA" | "ALPHANUM" | "FREE";

function removerAcentosEMaiusculo(valor: string): string {
  return valor
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .toUpperCase();
}

function normalizarDuranteDigitacao(valor: string, mode: NormalizeMode): string {
  let resultado = removerAcentosEMaiusculo(valor);

  if (mode === "ALPHA") {
    return resultado
      .replace(/[^\p{L}\s]/gu, "")
      .replace(/\s{2,}/g, " ");
  }

  if (mode === "ALPHANUM") {
    return resultado
      .replace(/[^\p{L}\p{N}\s]/gu, "")
      .replace(/\s{2,}/g, " ");
  }

  // FREE
  return resultado
    .replace(/[^\p{L}\p{N}\p{P}\s]/gu, "")
    .replace(/\r\n?/g, "\n")
    .replace(/[ \t]{2,}/g, " ");
}

function normalizarFinal(valor: string, mode: NormalizeMode): string {
  const resultado = normalizarDuranteDigitacao(valor, mode);

  if (mode === "FREE") {
    return resultado
      .split("\n")
      .map((linha) => linha.trim())
      .join("\n")
      .replace(/\n{3,}/g, "\n\n")
      .trim();
  }

  return resultado.trim();
}

function obterModo(binding: DirectiveBinding<NormalizeMode | { mode?: NormalizeMode }>): NormalizeMode {
  const valor = binding.value;

  if (typeof valor === "string") {
    return valor;
  }

  if (valor && typeof valor === "object" && valor.mode) {
    return valor.mode;
  }

  return "ALPHA";
}

type NormalizeHost = HTMLElement & {
  __normalizeTextCleanup__?: () => void;
};

export const vNormalizeText: Directive = {
  mounted(el, binding) {
    const host = el as NormalizeHost;
    const input = (el.querySelector("input, textarea") as HTMLInputElement | HTMLTextAreaElement | null) || (el as HTMLInputElement | HTMLTextAreaElement);

    const handleInput = (event: Event) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      const mode = obterModo(binding);
      const valorNormalizado = normalizarDuranteDigitacao(target.value, mode);

      if (target.value !== valorNormalizado) {
        target.value = valorNormalizado;
        target.dispatchEvent(new Event("input", { bubbles: true }));
      }
    };

    const handleBlur = (event: Event) => {
      const target = event.target as HTMLInputElement | HTMLTextAreaElement;
      const mode = obterModo(binding);
      const valorNormalizado = normalizarFinal(target.value, mode);

      if (target.value !== valorNormalizado) {
        target.value = valorNormalizado;
        target.dispatchEvent(new Event("input", { bubbles: true }));
      }
    };

    input.addEventListener("input", handleInput);
    input.addEventListener("blur", handleBlur);

    host.__normalizeTextCleanup__ = () => {
      input.removeEventListener("input", handleInput);
      input.removeEventListener("blur", handleBlur);
    };
  },

  unmounted(el) {
    (el as NormalizeHost).__normalizeTextCleanup__?.();
  },
};