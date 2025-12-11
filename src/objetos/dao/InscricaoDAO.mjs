import AlunoDAO from './AlunoDAO.mjs';
import CursoDAO from './CursoDAO.mjs';

const STORAGE_KEY = 'inscricoes';

export default class InscricaoDAO {
  constructor() {
    this.inicializarStorage();
    this.alunoDAO = new AlunoDAO();
    this.cursoDAO = new CursoDAO();
  }

  inicializarStorage() {
    if (!localStorage.getItem(STORAGE_KEY)) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify([]));
    }
  }

  gerarId() {
    return Date.now().toString() + Math.random().toString(36).substr(2, 9);
  }

  gerarMatricula(cursoTitulo) {
    const ano = new Date().getFullYear();
    const codigoCurso = cursoTitulo.substring(0, 2).toUpperCase();
    const numero = Math.floor(Math.random() * 10000).toString().padStart(4, '0');
    return `${ano}${codigoCurso}${numero}`;
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

  salvarTodos(inscricoes) {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(inscricoes));
    } catch (error) {
      console.error('Erro ao salvar no localStorage:', error);
      throw error;
    }
  }

  async listar() {
    try {
      const inscricoes = this.obterTodos();
      const inscricoesCompletas = await Promise.all(
        inscricoes.map(async (insc) => {
          const aluno = await this.alunoDAO.buscarPorId(insc.aluno_id);
          const curso = await this.cursoDAO.buscarPorId(insc.curso_id);

          return {
            ...insc,
            aluno: aluno ? {
              id: aluno.id,
              nome: aluno.nome,
              email: aluno.email,
            } : null,
            curso: curso ? {
              id: curso.id,
              titulo: curso.titulo,
              instrutor: curso.instrutor,
            } : null,
          };
        })
      );

      return inscricoesCompletas.sort((a, b) =>
        new Date(b.data_inscricao) - new Date(a.data_inscricao)
      );
    } catch (error) {
      console.error('Erro ao listar inscrições:', error);
      return [];
    }
  }

  async buscarPorId(id) {
    try {
      const inscricoes = this.obterTodos();
      const inscricao = inscricoes.find(i => i.id === id);

      if (!inscricao) return null;

      const aluno = await this.alunoDAO.buscarPorId(inscricao.aluno_id);
      const curso = await this.cursoDAO.buscarPorId(inscricao.curso_id);

      return {
        ...inscricao,
        aluno: aluno ? {
          id: aluno.id,
          nome: aluno.nome,
          email: aluno.email,
        } : null,
        curso: curso ? {
          id: curso.id,
          titulo: curso.titulo,
          instrutor: curso.instrutor,
        } : null,
      };
    } catch (error) {
      console.error('Erro ao buscar inscrição:', error);
      return null;
    }
  }

  async salvar(inscricao) {
    try {
      const inscricoes = this.obterTodos();

      const jaInscrito = inscricoes.some(
        i => i.aluno_id === inscricao.alunoId && i.curso_id === inscricao.cursoId
      );

      if (jaInscrito) {
        throw new Error('Aluno já inscrito neste curso!');
      }

      const curso = await this.cursoDAO.buscarPorId(inscricao.cursoId);
      if (!curso) {
        throw new Error('Curso não encontrado!');
      }

      const matricula = this.gerarMatricula(curso.titulo);

      const novaInscricao = {
        id: this.gerarId(),
        aluno_id: inscricao.alunoId,
        curso_id: inscricao.cursoId,
        matricula: matricula,
        data_inscricao: new Date().toISOString(),
        created_at: new Date().toISOString(),
      };

      inscricoes.push(novaInscricao);
      this.salvarTodos(inscricoes);

      return await this.buscarPorId(novaInscricao.id);
    } catch (error) {
      console.error('Erro ao salvar inscrição:', error);
      throw error;
    }
  }

  async excluir(id) {
    try {
      const inscricoes = this.obterTodos();
      const novaLista = inscricoes.filter(i => i.id !== id);

      if (inscricoes.length === novaLista.length) {
        throw new Error('Inscrição não encontrada');
      }

      this.salvarTodos(novaLista);
      return true;
    } catch (error) {
      console.error('Erro ao excluir inscrição:', error);
      throw error;
    }
  }

  async buscarPorAluno(alunoId) {
    try {
      const inscricoes = this.obterTodos();
      const inscricoesFiltradas = inscricoes.filter(i => i.aluno_id === alunoId);

      const inscricoesCompletas = await Promise.all(
        inscricoesFiltradas.map(async (insc) => {
          const curso = await this.cursoDAO.buscarPorId(insc.curso_id);
          return {
            ...insc,
            curso: curso ? {
              id: curso.id,
              titulo: curso.titulo,
              instrutor: curso.instrutor,
            } : null,
          };
        })
      );

      return inscricoesCompletas;
    } catch (error) {
      console.error('Erro ao buscar inscrições por aluno:', error);
      return [];
    }
  }

  async buscarPorCurso(cursoId) {
    try {
      const inscricoes = this.obterTodos();
      const inscricoesFiltradas = inscricoes.filter(i => i.curso_id === cursoId);

      const inscricoesCompletas = await Promise.all(
        inscricoesFiltradas.map(async (insc) => {
          const aluno = await this.alunoDAO.buscarPorId(insc.aluno_id);
          return {
            ...insc,
            aluno: aluno ? {
              id: aluno.id,
              nome: aluno.nome,
              email: aluno.email,
            } : null,
          };
        })
      );

      return inscricoesCompletas;
    } catch (error) {
      console.error('Erro ao buscar inscrições por curso:', error);
      return [];
    }
  }

  async gerarRelatorio() {
    try {
      const inscricoes = await this.listar();

      const relatorioPorCurso = {};

      inscricoes.forEach(inscricao => {
        if (!inscricao.curso) return;

        const cursoId = inscricao.curso.id;
        const cursoTitulo = inscricao.curso.titulo;
        const instrutorNome = inscricao.curso.instrutor?.nome || 'Sem instrutor';

        if (!relatorioPorCurso[cursoId]) {
          relatorioPorCurso[cursoId] = {
            curso_id: cursoId,
            curso_titulo: cursoTitulo,
            instrutor_nome: instrutorNome,
            total_inscricoes: 0,
            alunos: [],
          };
        }

        relatorioPorCurso[cursoId].total_inscricoes++;
        if (inscricao.aluno) {
          relatorioPorCurso[cursoId].alunos.push({
            nome: inscricao.aluno.nome,
            matricula: inscricao.matricula,
            data_inscricao: inscricao.data_inscricao,
          });
        }
      });

      return Object.values(relatorioPorCurso).sort((a, b) =>
        b.total_inscricoes - a.total_inscricoes
      );
    } catch (error) {
      console.error('Erro ao gerar relatório:', error);
      return [];
    }
  }
}
