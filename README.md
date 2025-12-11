# Sistema de Gerenciamento de Cursos, Instrutores e Alunos

Sistema completo para gerenciamento de instrutores, cursos, alunos e inscrições, desenvolvido com React, Vite, Ant Design e LocalStorage.

## Funcionalidades

### Instrutores
- Cadastro completo de instrutores com:
  - Dados pessoais (nome, email, CPF, data de nascimento)
  - Múltiplas especialidades
  - Endereço completo com busca automática por CEP
  - Múltiplos telefones
- Listagem com filtro por nome
- Visualização detalhada
- Edição de dados
- Exclusão de registros

### Cursos
- Cadastro de cursos com:
  - Título e descrição
  - Carga horária
  - Vinculação com instrutor
- Listagem com filtro por título
- Visualização detalhada
- Edição de dados
- Exclusão de registros

### Alunos
- Cadastro completo de alunos com:
  - Dados pessoais (nome, email, CPF, data de nascimento)
  - Endereço completo com busca automática por CEP
  - Múltiplos telefones
  - Data de cadastro
- Listagem com filtro por nome
- Visualização detalhada
- Edição de dados
- Exclusão de registros

### Inscrições
- Sistema de inscrição de alunos em cursos
- Matrícula única gerada automaticamente para cada curso
  - Formato: ANO + CÓDIGO DO CURSO + NÚMERO SEQUENCIAL
  - Cada aluno recebe uma matrícula diferente em cada curso
- Validação para evitar inscrições duplicadas
- Listagem de todas as inscrições com matrícula do curso
- Visualização de aluno, curso, instrutor e matrícula
- Exclusão de inscrições

### Relatórios
- Relatório completo de inscrições por curso e instrutor
- Filtros avançados:
  - Filtrar por curso específico
  - Filtrar por nome de aluno
  - Estatísticas atualizadas dinamicamente conforme filtros
- Estatísticas gerais:
  - Total de inscrições
  - Total de cursos com inscrições
  - Média de inscrições por curso
- Visualização expandida com lista de alunos por curso
- Dados de matrícula do curso e data de inscrição

## Tecnologias Utilizadas

- **React 18** - Framework frontend
- **Vite** - Build tool e dev server
- **Ant Design** - Biblioteca de componentes UI
- **React Router DOM** - Roteamento
- **LocalStorage** - Persistência de dados no navegador
- **Day.js** - Manipulação de datas

## Responsividade

O sistema é totalmente responsivo e adaptado para funcionar em:
- **Desktop** - Layout completo com todas as funcionalidades
- **Tablet** - Adaptação de layout com menu colapsável
- **Mobile** - Interface otimizada com:
  - Menu lateral em drawer
  - Tabelas com scroll horizontal
  - Formulários adaptados para toque
  - Cards e estatísticas responsivos

## Armazenamento de Dados

O sistema utiliza **LocalStorage** do navegador para armazenar todos os dados:
- Todos os dados ficam salvos no navegador
- Não requer configuração de banco de dados externo
- Dados persistem entre sessões do navegador
- DAOs encapsulam todas as operações de acesso aos dados

## Instalação e Execução

### 1. Instalar Dependências
```bash
npm install
```

### 2. Executar o Projeto

#### Modo Desenvolvimento
```bash
npm run dev
```
Acesse: `http://localhost:5173`

#### Build para Produção
```bash
npm run build
```

#### Preview da Build
```bash
npm run preview
```

## Estrutura de Pastas

```
src/
├── componentes/
│   ├── cadastrainstrutor/    # Formulário de instrutor
│   ├── cadastracurso/         # Formulário de curso
│   ├── cadastraaluno/         # Formulário de aluno
│   ├── cadastrainscricao/     # Formulário de inscrição
│   ├── listainstrutor/        # Listagem de instrutores
│   ├── listacurso/            # Listagem de cursos
│   ├── listaaluno/            # Listagem de alunos
│   ├── listainscricao/        # Listagem de inscrições
│   ├── visualizainstrutor/    # Detalhes do instrutor
│   ├── visualizacurso/        # Detalhes do curso
│   ├── visualizaaluno/        # Detalhes do aluno
│   └── relatorio/             # Relatório de inscrições
├── layout/
│   └── MainLayout.jsx        # Layout principal
├── objetos/
│   ├── dao/                  # Data Access Objects (LocalStorage)
│   │   ├── InstrutorDAO.mjs
│   │   ├── CursoDAO.mjs
│   │   ├── AlunoDAO.mjs
│   │   └── InscricaoDAO.mjs
│   └── pessoas/              # Classes de modelo
│       ├── Pessoa.mjs
│       ├── Instrutor.mjs
│       ├── Aluno.mjs
│       ├── Curso.mjs
│       ├── Endereco.mjs
│       └── Telefone.mjs
└── routes/
    └── AppRoutes.jsx         # Configuração de rotas
```

## Rotas do Sistema

### Instrutores
- `/instrutores/cadastrar` - Cadastrar novo instrutor
- `/instrutores/listar` - Listar todos os instrutores
- `/instrutores/visualizar/:id` - Ver detalhes do instrutor
- `/instrutores/editar/:id` - Editar instrutor

### Cursos
- `/cursos/cadastrar` - Cadastrar novo curso
- `/cursos/listar` - Listar todos os cursos
- `/cursos/visualizar/:id` - Ver detalhes do curso
- `/cursos/editar/:id` - Editar curso

### Alunos
- `/alunos/cadastrar` - Cadastrar novo aluno
- `/alunos/listar` - Listar todos os alunos
- `/alunos/visualizar/:id` - Ver detalhes do aluno
- `/alunos/editar/:id` - Editar aluno

### Inscrições
- `/inscricoes/cadastrar` - Realizar nova inscrição
- `/inscricoes/listar` - Listar todas as inscrições

### Relatórios
- `/relatorio` - Visualizar relatório de inscrições por curso e instrutor

## Funcionalidades Especiais

### Busca de CEP
O formulário de endereço possui integração automática com a API ViaCEP:
- Digite o CEP (8 números)
- Os campos de endereço são preenchidos automaticamente
- A região é detectada automaticamente baseada na UF

### Especialidades
Sistema de múltiplas especialidades para instrutores:
- Programação
- Design
- Marketing Digital
- Gestão de Projetos
- Banco de Dados
- Redes
- Segurança da Informação
- Inteligência Artificial
- DevOps
- UX/UI

## Arquitetura DAO

O sistema utiliza o padrão DAO (Data Access Object) para encapsular todas as operações de dados:

### InstrutorDAO
- `listar()` - Lista todos os instrutores
- `buscarPorId(id)` - Busca instrutor por ID
- `buscarPorNome(nome)` - Filtra instrutores por nome
- `salvar(instrutor)` - Cadastra novo instrutor
- `atualizar(id, instrutor)` - Atualiza dados do instrutor
- `excluir(id)` - Remove instrutor

### CursoDAO
- `listar()` - Lista todos os cursos
- `buscarPorId(id)` - Busca curso por ID
- `buscarPorTitulo(titulo)` - Filtra cursos por título
- `buscarPorInstrutor(instrutorId)` - Lista cursos de um instrutor
- `salvar(curso)` - Cadastra novo curso
- `atualizar(id, curso)` - Atualiza dados do curso
- `excluir(id)` - Remove curso

### AlunoDAO
- `listar()` - Lista todos os alunos
- `buscarPorId(id)` - Busca aluno por ID
- `buscarPorNome(nome)` - Filtra alunos por nome
- `salvar(aluno)` - Cadastra novo aluno
- `atualizar(id, aluno)` - Atualiza dados do aluno
- `excluir(id)` - Remove aluno

### InscricaoDAO
- `listar()` - Lista todas as inscrições com dados de aluno, curso e matrícula
- `buscarPorId(id)` - Busca inscrição por ID
- `buscarPorAluno(alunoId)` - Lista inscrições de um aluno
- `buscarPorCurso(cursoId)` - Lista inscrições de um curso
- `salvar(inscricao)` - Realiza nova inscrição (gera matrícula única por curso e valida duplicatas)
- `excluir(id)` - Remove inscrição
- `gerarRelatorio()` - Gera relatório de inscrições por curso e instrutor com filtros

## Desenvolvido por

Sistema de Cursos - Bolsa Futuro Digital 2025
