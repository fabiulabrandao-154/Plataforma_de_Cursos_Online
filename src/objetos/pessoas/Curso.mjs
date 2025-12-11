export default class Curso {
  #id;
  #titulo;
  #descricao;
  #cargaHoraria;
  #instrutorId;

  setId(id) {
    if (id) {
      this.#id = id;
      return true;
    }
    return false;
  }

  getId() {
    return this.#id;
  }

  setTitulo(titulo) {
    if (titulo) {
      this.#titulo = titulo;
      return true;
    }
    return false;
  }

  getTitulo() {
    return this.#titulo;
  }

  setDescricao(descricao) {
    if (descricao) {
      this.#descricao = descricao;
      return true;
    }
    return false;
  }

  getDescricao() {
    return this.#descricao;
  }

  setCargaHoraria(cargaHoraria) {
    if (cargaHoraria >= 0) {
      this.#cargaHoraria = cargaHoraria;
      return true;
    }
    return false;
  }

  getCargaHoraria() {
    return this.#cargaHoraria;
  }

  setInstrutorId(instrutorId) {
    if (instrutorId) {
      this.#instrutorId = instrutorId;
      return true;
    }
    return false;
  }

  getInstrutorId() {
    return this.#instrutorId;
  }
}
