export interface PessoaResumo {
  id: number;
  nome: string;
  cpf: string | null;
  data_nascimento: string | null;
}

export const pessoasMock: PessoaResumo[] = [
  {
    id: 1,
    nome: "Maria da Silva",
    cpf: null,
    data_nascimento: "2012-04-18",
  },
  {
    id: 2,
    nome: "João Pereira",
    cpf: "123.456.789-00",
    data_nascimento: "2009-11-02",
  },
  {
    id: 3,
    nome: "Ana Souza",
    cpf: null,
    data_nascimento: null,
  },
];

export function buscarPessoaPorId(id: number) {
  return pessoasMock.find((pessoa) => pessoa.id === id) ?? null;
}