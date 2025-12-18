Projeto FrontEnd — Sistema de Gerenciamento de Cursos, Instrutores e Alunos

Aplicação FrontEnd desenvolvida em React 18, utilizando Vite e Ant Design, para gerenciamento completo de instrutores, cursos, alunos e inscrições. O sistema implementa CRUDs completos, relacionamentos entre entidades, geração automática de matrículas, relatórios e persistência de dados via LocalStorage, seguindo boas práticas de organização e arquitetura, conforme os desafios propostos no contexto do Bolsa Futuro Digital (BFD).

🌐 Deploy da Aplicação
🔗 FrontEnd (produção):
https://plataforma-de-cursos-online.vercel.app/

📦 Repositórios do Projeto
🔗 FrontEnd:
https://github.com/fabiulabrandao-154/Plataforma_de_Cursos_Online

🌐 Execução da Aplicação
▶️ Execução Local
npm install
npm run dev

Acesse: http://localhost:5173

📦 Build para Produção
npm run build
npm run preview
🧭 Visão Geral do Projeto

Domínio: Gerenciamento Educacional

Entidades Principais: Instrutor, Curso, Aluno, Inscrição, Endereço e Telefone

Objetivo: Desenvolver uma aplicação FrontEnd completa, com CRUDs funcionais, relacionamentos entre entidades, geração de relatórios e aplicação de boas práticas de arquitetura.

Persistência: LocalStorage do navegador (via padrão DAO)

🧰 Tecnologias Utilizadas
FrontEnd

React 18

Vite

JavaScript (ES6+)

Ant Design (AntD)

React Router DOM

Day.js

Persistência de Dados

LocalStorage

Arquitetura DAO (Data Access Object)

🎯 Funcionalidades do Sistema
👨‍🏫 Instrutores

Cadastro completo com:

Dados pessoais (nome, e-mail, CPF, data de nascimento)

Múltiplas especialidades

Endereço completo com busca automática por CEP (ViaCEP)

Múltiplos telefones

Listagem com filtro por nome

Visualização detalhada

Edição de dados

Exclusão de registros

📚 Cursos

Cadastro de cursos com:

Título e descrição

Carga horária

Vinculação com instrutor

Listagem com filtro por título

Visualização detalhada

Edição de dados

Exclusão de registros

👩‍🎓 Alunos

Cadastro completo com:

Dados pessoais (nome, e-mail, CPF, data de nascimento)

Endereço completo com busca automática por CEP

Múltiplos telefones

Data de cadastro

Listagem com filtro por nome

Visualização detalhada

Edição de dados

Exclusão de registros

📝 Inscrições

Inscrição de alunos em cursos

Geração automática de matrícula única por curso

Formato: ANO + CÓDIGO DO CURSO + NÚMERO SEQUENCIAL

Cada aluno possui uma matrícula diferente para cada curso

Validação para evitar inscrições duplicadas

Listagem de inscrições com:

Aluno

Curso

Instrutor

Matrícula

Exclusão de inscrições

📊 Relatórios

Relatório completo de inscrições por curso e instrutor

Filtros avançados:

Por curso

Por nome do aluno

Estatísticas dinâmicas:

Total de inscrições

Total de cursos com inscrições

Média de inscrições por curso

Visualização expandida com:

Lista de alunos por curso

Matrícula e data de inscrição

⚙️ Requisitos Funcionais (RF)
Instrutores

RF01 — Cadastrar instrutor

RF02 — Listar instrutores

RF03 — Visualizar instrutor

RF04 — Editar instrutor

RF05 — Remover instrutor

Cursos

RF06 — Cadastrar curso

RF07 — Listar cursos

RF08 — Visualizar curso

RF09 — Editar curso

RF10 — Remover curso

Alunos

RF11 — Cadastrar aluno

RF12 — Listar alunos

RF13 — Visualizar aluno

RF14 — Editar aluno

RF15 — Remover aluno

Inscrições

RF16 — Realizar inscrição em curso

RF17 — Gerar matrícula automaticamente

RF18 — Listar inscrições

RF19 — Excluir inscrição

Relatórios

RF20 — Gerar relatório de inscrições por curso e instrutor

⚙️ Requisitos Não Funcionais (RNF)

RNF01 — Aplicação desenvolvida em React 18

RNF02 — Interface construída com Ant Design

RNF03 — Persistência de dados via LocalStorage

RNF04 — Uso do padrão DAO para acesso aos dados

RNF05 — Interface totalmente responsiva

RNF06 — Validação de formulários

RNF07 — Código organizado por componentes e responsabilidades

📱 Responsividade

O sistema é totalmente responsivo e adaptado para:

Desktop: Layout completo

Tablet: Menu colapsável

Mobile:

Menu lateral em drawer

Tabelas com scroll horizontal

Formulários adaptados para toque

Cards e estatísticas responsivos

📂 Estrutura do Projeto
src/
├── componentes/
│   ├── cadastrainstrutor/
│   ├── cadastracurso/
│   ├── cadastraaluno/
│   ├── cadastrainscricao/
│   ├── listainstrutor/
│   ├── listacurso/
│   ├── listaaluno/
│   ├── listainscricao/
│   ├── visualizainstrutor/
│   ├── visualizacurso/
│   ├── visualizaaluno/
│   └── relatorio/
├── layout/
│   └── MainLayout.jsx
├── objetos/
│   ├── dao/
│   │   ├── InstrutorDAO.mjs
│   │   ├── CursoDAO.mjs
│   │   ├── AlunoDAO.mjs
│   │   └── InscricaoDAO.mjs
│   └── pessoas/
│       ├── Pessoa.mjs
│       ├── Instrutor.mjs
│       ├── Aluno.mjs
│       ├── Curso.mjs
│       ├── Endereco.mjs
│       └── Telefone.mjs
└── routes/
    └── AppRoutes.jsx
🧠 Arquitetura DAO

O sistema utiliza o padrão DAO (Data Access Object) para encapsular todas as operações de acesso aos dados no LocalStorage.

InstrutorDAO

listar()

buscarPorId(id)

buscarPorNome(nome)

salvar(instrutor)

atualizar(id, instrutor)

excluir(id)

CursoDAO

listar()

buscarPorId(id)

buscarPorTitulo(titulo)

buscarPorInstrutor(instrutorId)

salvar(curso)

atualizar(id, curso)

excluir(id)

AlunoDAO

listar()

buscarPorId(id)

buscarPorNome(nome)

salvar(aluno)

atualizar(id, aluno)

excluir(id)

InscricaoDAO

listar()

buscarPorId(id)

buscarPorAluno(alunoId)

buscarPorCurso(cursoId)

salvar(inscricao)

excluir(id)

gerarRelatorio()

🌐 Funcionalidades Especiais
🔍 Busca Automática de CEP

Integração com a API ViaCEP:

Digite o CEP (8 números)

Campos de endereço preenchidos automaticamente

Detecção automática da região por UF

🧩 Especialidades dos Instrutores

Programação

Design

Marketing Digital

Gestão de Projetos

Banco de Dados

Redes

Segurança da Informação

Inteligência Artificial

DevOps

UX/UI

👥 Autoria

Autoras: Alanís Leal de Deus | Fabíula de Araujo Brandão

Projeto: Bolsa Futuro Digital (BFD)

Área: Desenvolvimento FrontEnd

Instituição: Instituto Federal de Brasília (IFB)
