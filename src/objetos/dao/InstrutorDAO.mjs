const STORAGE_KEY = 'instrutores';

export default class InstrutorDAO {
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

  salvarTodos(instrutores) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(instrutores));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
      throw error;
    }
  }

  async listar() {
    try {
      const instrutores = this.obterTodos();
      return instrutores.sort((a, b) => a.nome.localeCompare(b.nome));
    } catch (error) {
      console.error('Erro ao listar instrutores:', error);
      return [];
    }
  }

  async buscarPorId(id) {
    try {
      const instrutores = this.obterTodos();
      return instrutores.find(inst => inst.id === id) || null;
    } catch (error) {
      console.error('Erro ao buscar instrutor:', error);
      return null;
    }
  }

  async salvar(instrutor) {
    try {
      const instrutores = this.obterTodos();

      const novoInstrutor = {
        id: this.gerarId(),
        nome: instrutor.nome,
        email: instrutor.email,
        cpf: instrutor.cpf,
        data_nascimento: instrutor.dataNascimento,
        especialidades: instrutor.especialidades || [],
        endereco: instrutor.endereco || null,
        telefones: instrutor.telefones || [],
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      instrutores.push(novoInstrutor);
      this.salvarTodos(instrutores);

      return novoInstrutor;
    } catch (error) {
      console.error('Erro ao salvar instrutor:', error);
      throw error;
    }
  }

  async atualizar(id, instrutor) {
    try {
      const instrutores = this.obterTodos();
      const indice = instrutores.findIndex(inst => inst.id === id);

      if (indice === -1) {
        throw new Error('Instrutor não encontrado');
      }

      instrutores[indice] = {
        ...instrutores[indice],
        nome: instrutor.nome,
        email: instrutor.email,
        cpf: instrutor.cpf,
        data_nascimento: instrutor.dataNascimento,
        especialidades: instrutor.especialidades || [],
        endereco: instrutor.endereco || null,
        telefones: instrutor.telefones || [],
        updated_at: new Date().toISOString(),
      };

      this.salvarTodos(instrutores);
      return instrutores[indice];
    } catch (error) {
      console.error('Erro ao atualizar instrutor:', error);
      throw error;
    }
  }

  async excluir(id) {
    try {
      const instrutores = this.obterTodos();
      const novaLista = instrutores.filter(inst => inst.id !== id);

      if (instrutores.length === novaLista.length) {
        throw new Error('Instrutor não encontrado');
      }

      this.salvarTodos(novaLista);
      return true;
    } catch (error) {
      console.error('Erro ao excluir instrutor:', error);
      throw error;
    }
  }

  async buscarPorNome(nome) {
    try {
      const instrutores = this.obterTodos();
      const nomeLower = nome.toLowerCase();
      return instrutores
        .filter(inst => inst.nome.toLowerCase().includes(nomeLower))
        .sort((a, b) => a.nome.localeCompare(b.nome));
    } catch (error) {
      console.error('Erro ao buscar instrutores por nome:', error);
      return [];
    }
  }
}
