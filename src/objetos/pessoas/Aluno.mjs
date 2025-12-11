import Pessoa from "./Pessoa.mjs";

export default class Aluno extends Pessoa {
  #cpf;
  #dataNascimento;
  #dataCadastro;

  setCPF(cpf) {
    if (cpf) {
      this.#cpf = cpf;
      return true;
    }
    return false;
  }

  getCPF() {
    return this.#cpf;
  }

  setDataNascimento(dataNascimento) {
    if (dataNascimento) {
      this.#dataNascimento = dataNascimento;
      return true;
    }
    return false;
  }

  getDataNascimento() {
    return this.#dataNascimento;
  }

  setDataCadastro(dataCadastro) {
    if (dataCadastro) {
      this.#dataCadastro = dataCadastro;
      return true;
    }
    return false;
  }

  getDataCadastro() {
    return this.#dataCadastro;
  }
}
