const STORAGE_KEY = 'alunos';

export default class AlunoDAO {
  constructor() {
    this.inicializarStorage();
  }

  inicializarStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  }

  gerarId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  obterTodos() {
    try {
      const dados = localStorage.getItem(STORAGE_KEY);
      return JSON.parse(dados) || [];
    } catch (error) {
      console.error('Erro ao ler localStorage:', error);
      return [];
    }
  }

  salvarTodos(alunos) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(alunos));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
      throw error;
    }
  }

  async listar() {
    try {
      const alunos = this.obterTodos();
      return alunos.sort((a, b) => a.nome.localeCompare(b.nome));
    } catch (error) {
      console.error('Erro ao listar alunos:', error);
      return [];
    }
  }

  async buscarPorId(id) {
    try {
      const alunos = this.obterTodos();
      return alunos.find(aluno => aluno.id === id) || null;
    } catch (error) {
      console.error('Erro ao buscar aluno:', error);
      return null;
    }
  }

  async salvar(aluno) {
    try {
      const alunos = this.obterTodos();

      const novoAluno = {
        id: this.gerarId(),
        nome: aluno.nome,
        email: aluno.email,
        cpf: aluno.cpf,
        data_nascimento: aluno.dataNascimento,
        endereco: aluno.endereco || null,
        telefones: aluno.telefones || [],
        data_cadastro: new Date().toISOString(),
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      alunos.push(novoAluno);
      this.salvarTodos(alunos);

      return novoAluno;
    } catch (error) {
      console.error('Erro ao salvar aluno:', error);
      throw error;
    }
  }

  async atualizar(id, aluno) {
    try {
      const alunos = this.obterTodos();
      const indice = alunos.findIndex(a => a.id === id);

      if (indice === -1) {
        throw new Error('Aluno não encontrado');
      }

      alunos[indice] = {
        ...alunos[indice],
        nome: aluno.nome,
        email: aluno.email,
        cpf: aluno.cpf,
        data_nascimento: aluno.dataNascimento,
        endereco: aluno.endereco || null,
        telefones: aluno.telefones || [],
        updated_at: new Date().toISOString(),
      };

      this.salvarTodos(alunos);
      return alunos[indice];
    } catch (error) {
      console.error('Erro ao atualizar aluno:', error);
      throw error;
    }
  }

  async excluir(id) {
    try {
      const alunos = this.obterTodos();
      const novaLista = alunos.filter(a => a.id !== id);

      if (alunos.length === novaLista.length) {
        throw new Error('Aluno não encontrado');
      }

      this.salvarTodos(novaLista);
      return true;
    } catch (error) {
      console.error('Erro ao excluir aluno:', error);
      throw error;
    }
  }

  async buscarPorNome(nome) {
    try {
      const alunos = this.obterTodos();
      const nomeLower = nome.toLowerCase();
      return alunos
        .filter(a => a.nome.toLowerCase().includes(nomeLower))
        .sort((a, b) => a.nome.localeCompare(b.nome));
    } catch (error) {
      console.error('Erro ao buscar alunos por nome:', error);
      return [];
    }
  }
}
