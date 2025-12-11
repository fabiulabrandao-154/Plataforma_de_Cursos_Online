import Pessoa from "./Pessoa.mjs";

export default class Instrutor extends Pessoa {
  #cpf;
  #dataNascimento;
  #especialidades = [];

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

  addEspecialidade(especialidade) {
    if (especialidade && !this.#especialidades.includes(especialidade)) {
      this.#especialidades.push(especialidade);
      return true;
    }
    return false;
  }

  setEspecialidades(especialidades) {
    if (Array.isArray(especialidades)) {
      this.#especialidades = especialidades;
      return true;
    }
    return false;
  }

  getEspecialidades() {
    return this.#especialidades;
  }
}
