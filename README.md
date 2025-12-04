# Sistema de Gerenciamento de Cursos e Instrutores

Sistema completo para gerenciamento de instrutores e cursos, desenvolvido com React, Vite, Ant Design e LocalStorage.

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

## Tecnologias Utilizadas

- **React 18** - Framework frontend
- **Vite** - Build tool e dev server
- **Ant Design** - Biblioteca de componentes UI
- **React Router DOM** - Roteamento
- **LocalStorage** - Persistência de dados no navegador
- **Day.js** - Manipulação de datas

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
│   ├── listainstrutor/        # Listagem de instrutores
│   ├── listacurso/            # Listagem de cursos
│   ├── visualizainstrutor/    # Detalhes do instrutor
│   └── visualizacurso/        # Detalhes do curso
├── layout/
│   └── MainLayout.jsx        # Layout principal
├── objetos/
│   ├── dao/                  # Data Access Objects (LocalStorage)
│   └── pessoas/              # Classes de modelo
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

## Desenvolvido por

Sistema de Cursos - Bolsa Futuro Digital 2025
