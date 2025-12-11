import InstrutorDAO from './InstrutorDAO.mjs';

const STORAGE_KEY = 'cursos';

export default class CursoDAO {
  constructor() {
    this.inicializarStorage();
    this.instrutorDAO = new InstrutorDAO();
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

  salvarTodos(cursos) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(cursos));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
      throw error;
    }
  }

  async listar() {
    try {
      const cursos = this.obterTodos();
      const cursosComInstrutor = await Promise.all(
        cursos.map(async (curso) => {
          if (curso.instrutor_id) {
            const instrutor = await this.instrutorDAO.buscarPorId(curso.instrutor_id);
            return {
              ...curso,
              instrutor: instrutor ? {
                id: instrutor.id,
                nome: instrutor.nome,
                email: instrutor.email,
              } : null,
            };
          }
          return { ...curso, instrutor: null };
        })
      );
      return cursosComInstrutor.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } catch (error) {
      console.error('Erro ao listar cursos:', error);
      return [];
    }
  }

  async buscarPorId(id) {
    try {
      const cursos = this.obterTodos();
      const curso = cursos.find(c => c.id === id);

      if (!curso) return null;

      if (curso.instrutor_id) {
        const instrutor = await this.instrutorDAO.buscarPorId(curso.instrutor_id);
        return {
          ...curso,
          instrutor: instrutor ? {
            id: instrutor.id,
            nome: instrutor.nome,
            email: instrutor.email,
            cpf: instrutor.cpf,
          } : null,
        };
      }

      return { ...curso, instrutor: null };
    } catch (error) {
      console.error('Erro ao buscar curso:', error);
      return null;
    }
  }

  async salvar(curso) {
    try {
      const cursos = this.obterTodos();

      const novoCurso = {
        id: this.gerarId(),
        titulo: curso.titulo,
        descricao: curso.descricao,
        carga_horaria: curso.cargaHoraria,
        instrutor_id: curso.instrutorId,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      };

      cursos.push(novoCurso);
      this.salvarTodos(cursos);

      return await this.buscarPorId(novoCurso.id);
    } catch (error) {
      console.error('Erro ao salvar curso:', error);
      throw error;
    }
  }

  async atualizar(id, curso) {
    try {
      const cursos = this.obterTodos();
      const indice = cursos.findIndex(c => c.id === id);

      if (indice === -1) {
        throw new Error('Curso não encontrado');
      }

      cursos[indice] = {
        ...cursos[indice],
        titulo: curso.titulo,
        descricao: curso.descricao,
        carga_horaria: curso.cargaHoraria,
        instrutor_id: curso.instrutorId,
        updated_at: new Date().toISOString(),
      };

      this.salvarTodos(cursos);
      return await this.buscarPorId(id);
    } catch (error) {
      console.error('Erro ao atualizar curso:', error);
      throw error;
    }
  }

  async excluir(id) {
    try {
      const cursos = this.obterTodos();
      const novaLista = cursos.filter(c => c.id !== id);

      if (cursos.length === novaLista.length) {
        throw new Error('Curso não encontrado');
      }

      this.salvarTodos(novaLista);
      return true;
    } catch (error) {
      console.error('Erro ao excluir curso:', error);
      throw error;
    }
  }

  async buscarPorTitulo(titulo) {
    try {
      const cursos = this.obterTodos();
      const tituloLower = titulo.toLowerCase();
      const cursosFiltrados = cursos.filter(c =>
        c.titulo.toLowerCase().includes(tituloLower)
      );

      const cursosComInstrutor = await Promise.all(
        cursosFiltrados.map(async (curso) => {
          if (curso.instrutor_id) {
            const instrutor = await this.instrutorDAO.buscarPorId(curso.instrutor_id);
            return {
              ...curso,
              instrutor: instrutor ? {
                id: instrutor.id,
                nome: instrutor.nome,
                email: instrutor.email,
              } : null,
            };
          }
          return { ...curso, instrutor: null };
        })
      );

      return cursosComInstrutor.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } catch (error) {
      console.error('Erro ao buscar cursos por título:', error);
      return [];
    }
  }

  async buscarPorInstrutor(instrutorId) {
    try {
      const cursos = this.obterTodos();
      const cursosFiltrados = cursos.filter(c => c.instrutor_id === instrutorId);

      const cursosComInstrutor = await Promise.all(
        cursosFiltrados.map(async (curso) => {
          const instrutor = await this.instrutorDAO.buscarPorId(curso.instrutor_id);
          return {
            ...curso,
            instrutor: instrutor ? {
              id: instrutor.id,
              nome: instrutor.nome,
              email: instrutor.email,
            } : null,
          };
        })
      );

      return cursosComInstrutor.sort((a, b) => a.titulo.localeCompare(b.titulo));
    } catch (error) {
      console.error('Erro ao buscar cursos por instrutor:', error);
      return [];
    }
  }
}
