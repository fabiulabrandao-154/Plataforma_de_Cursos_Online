# 🎓 Sistema de Gerenciamento de Cursos (FrontEnd)

Considere os arquivos e repositórios a seguir como base para a realização do Desafio:

1) Repositório do projeto FrontEnd  
👉 https://github.com/fabiulabrandao-154/Plataforma_de_Cursos_Online

2) Deploy da aplicação  
👉 https://plataforma-de-cursos-online.vercel.app/

---

## 🎯 Objetivo do Desafio

Desenvolver uma aplicação **FrontEnd** completa para o **Cursos Online**, permitindo:

- Cadastro, edição, listagem, visualização e exclusão de:
  - **Instrutores**
  - **Cursos**
  - **Alunos**
- Realização de **inscrições de alunos em cursos**
- Geração automática de **matrículas**
- Emissão de **relatórios**
- Persistência de dados utilizando **LocalStorage**, com aplicação do padrão **DAO (Data Access Object)**

---

# ✅ Implementação Concluída

As funcionalidades foram implementadas com sucesso, atendendo aos requisitos propostos, garantindo o correto funcionamento dos CRUDs, dos relacionamentos entre entidades e da persistência dos dados no navegador.

---

## 📦 Implementação da Arquitetura DAO

O sistema utiliza o padrão **DAO (Data Access Object)** para encapsular todas as operações de acesso aos dados armazenados no **LocalStorage**.

### **InstrutorDAO.mjs**
- Cadastro, listagem, busca, atualização e exclusão de instrutores
- Persistência dos dados pessoais, especialidades, endereço e telefones

### **CursoDAO.mjs**
- Cadastro e gerenciamento de cursos
- Vinculação de cursos a instrutores
- Filtros por título e instrutor

### **AlunoDAO.mjs**
- Cadastro e gerenciamento de alunos
- Persistência de dados pessoais, endereço, telefones e data de cadastro

### **InscricaoDAO.mjs**
- Gerenciamento das inscrições
- Validação para evitar duplicidade
- Geração automática de matrícula
- Geração de relatórios

---

## 📝 Funcionalidades Implementadas

### ✔ Instrutores
- CRUD completo
- Especialidades
- Endereço com busca automática por CEP (ViaCEP)
- Múltiplos telefones

### ✔ Cursos
- CRUD completo
- Vínculo com instrutor

### ✔ Alunos
- CRUD completo
- Endereço com busca automática por CEP
- Múltiplos telefones

### ✔ Inscrições
- Inscrição de alunos em cursos
- Geração automática de matrícula por curso
- Validação de duplicidade
- Exclusão de inscrições

---

## 📊 Relatórios

- Relatório de inscrições por curso e instrutor
- Filtros por curso e aluno
- Estatísticas automáticas, incluindo:
  - Total de inscrições
  - Cursos com inscrições
  - Média de inscrições por curso

---

## ▶️ Execução da Aplicação

### Execução Local

```bash
npm install
npm run dev

Acesse no navegador:
👉 http://localhost:5173

Produção

npm run build
npm run preview

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

📌 Resultado Final

O sistema atende integralmente aos objetivos da atividade, apresentando:

- CRUDs completos e funcionais

- Relacionamentos entre entidades

- Persistência de dados via LocalStorage

- Arquitetura baseada no padrão DAO

- Interface responsiva e organizada

- Relatórios e geração automática de matrículas

👥 Autoria

Autoras:

- Alanís Leal de Deus

- Fabíula de Araujo Brandão

Projeto: Bolsa Futuro Digital (BFD)
Instituição: Instituto Federal de Brasília (IFB)
