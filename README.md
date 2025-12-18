# 🎓 Sistema de Gerenciamento de Cursos — FrontEnd

Aplicação **FrontEnd** desenvolvida em **React 18** com **Vite** e **Ant Design** para gerenciamento de **instrutores, cursos, alunos e inscrições**.  
O sistema possui **CRUDs completos**, **relacionamentos entre entidades**, **geração automática de matrículas**, **relatórios** e **persistência via LocalStorage**, seguindo boas práticas de arquitetura (**DAO**).

---

## 🌐 Deploy
🔗 https://plataforma-de-cursos-online.vercel.app/

## 📦 Repositório
🔗 https://github.com/fabiulabrandao-154/Plataforma_de_Cursos_Online

---

## ▶️ Execução

### Local
```bash
npm install
npm run dev


Acesse: http://localhost:5173

Produção
npm run build
npm run preview

🧭 Visão Geral

Domínio: Gerenciamento Educacional

Persistência: LocalStorage

Arquitetura: DAO (Data Access Object)

Entidades

Instrutor · Curso · Aluno · Inscrição · Endereço · Telefone

🧰 Tecnologias

React 18

Vite

JavaScript (ES6+)

Ant Design

React Router DOM

Day.js

🎯 Funcionalidades
Instrutores

CRUD completo

Especialidades

Endereço com busca por CEP (ViaCEP)

Múltiplos telefones

Cursos

CRUD completo

Vínculo com instrutor

Alunos

CRUD completo

Endereço com busca por CEP

Múltiplos telefones

Inscrições

Inscrição de alunos em cursos

Matrícula automática por curso

Validação de duplicidade

Relatórios

Inscrições por curso e instrutor

Filtros por curso e aluno

Estatísticas automáticas

⚙️ Requisitos
Funcionais

Cadastro, listagem, visualização, edição e exclusão de instrutores, cursos e alunos

Inscrição em cursos com matrícula automática

Relatórios de inscrições

Não Funcionais

React 18

Ant Design

LocalStorage

Arquitetura DAO

Interface responsiva

Validação de formulários

📂 Estrutura Principal
src/
├── componentes/
├── layout/
├── objetos/
│   ├── dao/
│   └── pessoas/
└── routes/

👥 Autoria

Autoras: Alanís Leal de Deus | Fabíula de Araujo Brandão

Projeto: Bolsa Futuro Digital (BFD)

Instituição: Instituto Federal de Brasília (IFB)
