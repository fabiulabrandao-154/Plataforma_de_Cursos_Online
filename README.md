# 🎓 Sistema de Gerenciamento de Cursos — FrontEnd

Aplicação **FrontEnd** desenvolvida em **React 18**, utilizando **Vite** e **Ant Design**, para o gerenciamento de **instrutores, cursos, alunos e inscrições**.

O sistema implementa **CRUDs completos**, **relacionamentos entre entidades**, **geração automática de matrículas**, **relatórios** e **persistência de dados via LocalStorage**, seguindo boas práticas de arquitetura com o padrão **DAO (Data Access Object)**.

---

## 🌐 Deploy

🔗 https://plataforma-de-cursos-online.vercel.app/

---

## 📦 Repositório

🔗 https://github.com/fabiulabrandao-154/Plataforma_de_Cursos_Online

---

## ▶️ Execução da Aplicação

### ▶️ Execução Local

```bash
npm install
npm run dev
Acesse no navegador:
👉 http://localhost:5173

📦 Produção
bash
Copiar código
npm run build
npm run preview

🧭 Visão Geral
Domínio: Gerenciamento Educacional

Persistência: LocalStorage

Arquitetura: DAO (Data Access Object)

📌 Entidades
Instrutor · Curso · Aluno · Inscrição · Endereço · Telefone

🧰 Tecnologias Utilizadas
React 18

Vite

JavaScript (ES6+)

Ant Design

React Router DOM

Day.js

🎯 Funcionalidades

👨‍🏫 Instrutores

CRUD completo

Gerenciamento de especialidades

Endereço com busca automática por CEP (ViaCEP)

Múltiplos telefones

📚 Cursos

CRUD completo

Vínculo com instrutor

👩‍🎓 Alunos
CRUD completo

Endereço com busca automática por CEP

Múltiplos telefones

📝 Inscrições
Inscrição de alunos em cursos

Geração automática de matrícula por curso

Validação para evitar duplicidade

📊 Relatórios
Relatório de inscrições por curso e instrutor

Filtros por curso e aluno

Estatísticas automáticas

⚙️ Requisitos

✔️ Requisitos Funcionais
Cadastro, listagem, visualização, edição e exclusão de:

Instrutores

Cursos

Alunos

Inscrição em cursos com matrícula automática

Geração de relatórios de inscrições

✔️ Requisitos Não Funcionais

Aplicação desenvolvida em React 18

Interface construída com Ant Design

Persistência de dados via LocalStorage

Uso do padrão DAO

Interface responsiva

Validação de formulários

📂 Estrutura Principal do Projeto
src/
├── componentes/
│   ├── cadastrainstrutor/     # Formulário de instrutor
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
│   └── MainLayout.jsx         # Layout principal
├── objetos/
│   ├── dao/                   # Data Access Objects (LocalStorage)
│   │   ├── InstrutorDAO.mjs
│   │   ├── CursoDAO.mjs
│   │   ├── AlunoDAO.mjs
│   │   └── InscricaoDAO.mjs
│   └── pessoas/               # Classes de modelo
│       ├── Pessoa.mjs
│       ├── Instrutor.mjs
│       ├── Aluno.mjs
│       ├── Curso.mjs
│       ├── Endereco.mjs
│       └── Telefone.mjs
└── routes/
    └── AppRoutes.jsx          # Configuração de rotas

👥 Autoria
Autoras:

Alanís Leal de Deus

Fabíula de Araujo Brandão

Projeto: Bolsa Futuro Digital (BFD)
Instituição: Instituto Federal de Brasília (IFB)
