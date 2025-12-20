# 🚀 Sistema de Gerenciamento de Cursos — FrontEnd

Aplicação FrontEnd desenvolvida em **ReactJS** para gerenciamento de **Instrutores**, **Cursos**, **Alunos** e **Inscrições**, implementando **CRUDs completos**, **relacionamentos entre entidades** e **geração automática de matrículas**, conforme desafios propostos no contexto do **Bolsa Futuro Digital (BFD)**.

---

## 🌐 Deploy da Aplicação

- 🔗 **FrontEnd (produção):**
  https://plataforma-de-cursos-online.vercel.app/

---

## 📦 Repositórios do Projeto

- 🔗 **FrontEnd (ReactJS):**
  https://github.com/fabiulabrandao-154/Plataforma_de_Cursos_Online

---

## 🧭 Visão Geral do Projeto

- **Domínio:** Gerenciamento de Cursos Online
- **Entidades principais:** Instrutor, Curso, Aluno, Inscrição, Endereço e Telefone
- **Objetivo:** Desenvolver uma aplicação FrontEnd completa, com CRUDs funcionais, geração automática de matrículas e relatórios de inscrições, aplicando boas práticas de organização e arquitetura.
- **Persistência:** Realizada via **LocalStorage** com padrão **DAO (Data Access Object)**.

---

## 🧰 Tecnologias Utilizadas

### FrontEnd
- ReactJS
- JavaScript (ES6+)
- Ant Design (AntD)
- React Router
- LocalStorage API
- ViaCEP API
- Vite

### Arquitetura
- Padrão DAO (Data Access Object)
- Programação Orientada a Objetos
- Componentes reutilizáveis
- Rotas dinâmicas

---

# 🎯 Desafio Atendido (CRUDs + Relacionamentos + Relatórios)

O projeto atende integralmente ao desafio proposto, contemplando:

- ✅ CRUD de Instrutores
- ✅ CRUD de Cursos
- ✅ CRUD de Alunos
- ✅ Gerenciamento de Inscrições
- ✅ Relacionamentos entre Pessoa, Endereço e Telefone
- ✅ Geração automática de matrículas
- ✅ Relatórios de inscrições por curso e instrutor
- ✅ Uso do padrão DAO para persistência

---

## 📋 Requisitos Funcionais (RF)

### Instrutores
- RF01 — Cadastrar Instrutor
- RF02 — Listar Instrutores
- RF03 — Visualizar detalhes do Instrutor
- RF04 — Editar Instrutor
- RF05 — Remover Instrutor
- RF06 — Associar Especialidades, Endereço e Telefones

### Cursos
- RF07 — Cadastrar Curso
- RF08 — Listar Cursos
- RF09 — Visualizar detalhes do Curso
- RF10 — Editar Curso
- RF11 — Remover Curso
- RF12 — Associar Curso a Instrutor

### Alunos
- RF13 — Cadastrar Aluno
- RF14 — Listar Alunos
- RF15 — Visualizar detalhes do Aluno
- RF16 — Editar Aluno
- RF17 — Remover Aluno
- RF18 — Associar Endereço e Telefones

### Inscrições
- RF19 — Inscrever Aluno em Curso
- RF20 — Listar Inscrições
- RF21 — Remover Inscrição
- RF22 — Gerar Matrícula Automaticamente
- RF23 — Validar Duplicidade de Inscrições

### Relatórios
- RF24 — Gerar Relatório de Inscrições por Curso
- RF25 — Filtrar Relatório por Curso
- RF26 — Filtrar Relatório por Aluno
- RF27 — Exibir Estatísticas (Total, Média)

---

## ⚙️ Requisitos Não Funcionais (RNF)

- RNF01 — Aplicação desenvolvida em ReactJS
- RNF02 — Interface construída com Ant Design
- RNF03 — Persistência via LocalStorage
- RNF04 — Uso do padrão DAO para acesso aos dados
- RNF05 — Interface responsiva (mobile e desktop)
- RNF06 — Validação de formulários
- RNF07 — Código organizado por componentes e responsabilidades
- RNF08 — Busca automática de CEP via API ViaCEP
- RNF09 — Geração automática de IDs únicos
- RNF10 — Mensagens de feedback para ações do usuário

---

# 📦 Implementação da Arquitetura DAO

O sistema utiliza o padrão **DAO (Data Access Object)** para encapsular todas as operações de acesso aos dados armazenados no **LocalStorage**.

### **InstrutorDAO.mjs**
- Cadastro, listagem, busca, atualização e exclusão de instrutores
- Persistência dos dados pessoais, especialidades, endereço e telefones
- Busca por nome com filtros

### **CursoDAO.mjs**
- Cadastro e gerenciamento de cursos
- Vinculação de cursos a instrutores
- Filtros por título e instrutor
- Carregamento automático de dados do instrutor

### **AlunoDAO.mjs**
- Cadastro e gerenciamento de alunos
- Persistência de dados pessoais, endereço, telefones e data de cadastro
- Busca por nome com filtros

### **InscricaoDAO.mjs**
- Gerenciamento das inscrições
- Validação para evitar duplicidade
- Geração automática de matrícula por curso
- Geração de relatórios com estatísticas
- Busca por aluno e por curso

---

# 🖼️ Funcionalidades Implementadas

## Instrutores
- CRUD completo (Criar, Ler, Atualizar, Deletar)
- Múltiplas especialidades (seleção múltipla)
- Endereço com busca automática por CEP (ViaCEP)
- Múltiplos telefones (DDD + Número)
- Filtro de busca por nome
- Visualização detalhada de dados

## Cursos
- CRUD completo
- Título, descrição e carga horária
- Vínculo obrigatório com instrutor
- Filtro de busca por título
- Listagem com informações do instrutor

## Alunos
- CRUD completo
- Dados pessoais (Nome, Email, CPF, Data de Nascimento)
- Endereço com busca automática por CEP
- Múltiplos telefones
- Data de cadastro automática
- Filtro de busca por nome

## Inscrições
- Inscrição de alunos em cursos
- Geração automática de matrícula única por curso
- Validação de duplicidade (aluno já inscrito no curso)
- Listagem com dados do aluno, curso e instrutor
- Exclusão de inscrições

## Relatórios
- Relatório de inscrições por curso e instrutor
- Filtros por curso e aluno
- Estatísticas automáticas:
  - Total de inscrições
  - Total de cursos com inscrições
  - Média de inscrições por curso
- Expansão de linhas para visualizar alunos inscritos
- Limpeza de filtros

---

## 📂 Estrutura do Projeto FrontEnd

```bash
src/
├── componentes/
│   ├── cadastrainstrutor/     # Formulário de cadastro e edição de instrutores
│   │   ├── InstrutorForm.jsx
│   │   ├── EnderecoForm.jsx
│   │   └── TelefoneList.jsx
│   ├── cadastracurso/         # Formulário de cadastro e edição de cursos
│   │   └── CursoForm.jsx
│   ├── cadastraaluno/         # Formulário de cadastro e edição de alunos
│   │   └── AlunoForm.jsx
│   ├── cadastrainscricao/     # Formulário de inscrição
│   │   └── InscricaoForm.jsx
│   ├── listainstrutor/        # Listagem de instrutores
│   │   └── ListaInstrutores.jsx
│   ├── listacurso/            # Listagem de cursos
│   │   └── ListaCursos.jsx
│   ├── listaaluno/            # Listagem de alunos
│   │   └── ListaAlunos.jsx
│   ├── listainscricao/        # Listagem de inscrições
│   │   └── ListaInscricoes.jsx
│   ├── visualizainstrutor/    # Visualização detalhada do instrutor
│   │   └── VisualizarInstrutor.jsx
│   ├── visualizacurso/        # Visualização detalhada do curso
│   │   └── VisualizarCurso.jsx
│   ├── visualizaaluno/        # Visualização detalhada do aluno
│   │   └── VisualizarAluno.jsx
│   └── relatorio/             # Relatório de inscrições
│       └── RelatorioInscricoes.jsx
├── layout/
│   └── MainLayout.jsx         # Layout principal com menu responsivo
├── objetos/
│   ├── dao/                   # Data Access Objects (LocalStorage)
│   │   ├── InstrutorDAO.mjs
│   │   ├── CursoDAO.mjs
│   │   ├── AlunoDAO.mjs
│   │   └── InscricaoDAO.mjs
│   └── pessoas/               # Classes de modelo (POO)
│       ├── Pessoa.mjs
│       ├── Instrutor.mjs
│       ├── Aluno.mjs
│       ├── Curso.mjs
│       ├── Endereco.mjs
│       └── Telefone.mjs
├── routes/
│   └── AppRoutes.jsx          # Configuração de rotas
├── App.jsx                    # Componente principal
└── main.jsx                   # Ponto de entrada
```

---

## ▶️ Execução Local

### Instalação das Dependências

```bash
npm install
```

### Execução em Modo de Desenvolvimento

```bash
npm run dev
```

Acesse no navegador:
👉 http://localhost:5173

### Build para Produção

```bash
npm run build
npm run preview
```

---

## 🔗 Integração com APIs Externas

### ViaCEP
- **Endpoint:** https://viacep.com.br/ws/{cep}/json/
- **Uso:** Busca automática de endereço pelo CEP
- **Campos preenchidos:** Logradouro, Bairro, Cidade, UF, Região

---

## 🧠 Modelagem dos Dados

### Estrutura de Dados

#### Instrutor
```json
{
  "id": "string",
  "nome": "string",
  "email": "string",
  "cpf": "string",
  "data_nascimento": "date",
  "especialidades": ["string"],
  "endereco": {
    "cep": "string",
    "logradouro": "string",
    "bairro": "string",
    "cidade": "string",
    "uf": "string",
    "regiao": "string"
  },
  "telefones": [
    {
      "ddd": "string",
      "numero": "string"
    }
  ],
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

#### Curso
```json
{
  "id": "string",
  "titulo": "string",
  "descricao": "string",
  "carga_horaria": "number",
  "instrutor_id": "string",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

#### Aluno
```json
{
  "id": "string",
  "nome": "string",
  "email": "string",
  "cpf": "string",
  "data_nascimento": "date",
  "endereco": {
    "cep": "string",
    "logradouro": "string",
    "bairro": "string",
    "cidade": "string",
    "uf": "string",
    "regiao": "string"
  },
  "telefones": [
    {
      "ddd": "string",
      "numero": "string"
    }
  ],
  "data_cadastro": "timestamp",
  "created_at": "timestamp",
  "updated_at": "timestamp"
}
```

#### Inscrição
```json
{
  "id": "string",
  "aluno_id": "string",
  "curso_id": "string",
  "matricula": "string",
  "data_inscricao": "timestamp",
  "created_at": "timestamp"
}
```

---

## 🎨 Interface do Usuário

### Layout Responsivo
- Menu horizontal em desktop
- Menu drawer lateral em mobile
- Cards e tabelas adaptáveis
- Botões e ações otimizados para touch

### Componentes Ant Design Utilizados
- Layout, Header, Content, Footer
- Menu, Drawer
- Form, Input, Select, DatePicker, InputNumber
- Table, Button, Space, Card, Descriptions
- Popconfirm, message, Spin, Alert, Tag

---

## 📌 Resultado Final

O sistema atende integralmente aos objetivos da atividade, apresentando:

- ✅ CRUDs completos e funcionais
- ✅ Relacionamentos entre entidades
- ✅ Persistência de dados via LocalStorage
- ✅ Arquitetura baseada no padrão DAO
- ✅ Interface responsiva e organizada
- ✅ Relatórios com filtros e estatísticas
- ✅ Geração automática de matrículas
- ✅ Validação de formulários e duplicidade
- ✅ Integração com API externa (ViaCEP)
- ✅ Feedback visual para todas as ações

---

## 👥 Autoria

**Autoras:**
- Alanís Leal de Deus
- Fabíula de Araujo Brandão

**Projeto:** Bolsa Futuro Digital (BFD)

**Área:** Desenvolvimento FrontEnd

**Instituição:** Instituto Federal de Brasília (IFB)


---

## 📌 Considerações Finais

Este projeto demonstra:
- Domínio dos conceitos de CRUD e relacionamentos entre entidades
- Aplicação do padrão DAO para organização de código
- Utilização de Programação Orientada a Objetos em JavaScript
- Desenvolvimento de interface responsiva e moderna
- Implementação de funcionalidades complexas (relatórios, validações, geração automática)
- Aplicação publicada em ambiente de produção (Vercel)
- Código organizado, modular e escalável
