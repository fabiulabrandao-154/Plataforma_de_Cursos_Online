import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";

import InstrutorForm from "../componentes/cadastrainstrutor/InstrutorForm.jsx";
import ListaInstrutores from "../componentes/listainstrutor/ListaInstrutores.jsx";
import VisualizarInstrutor from "../componentes/visualizainstrutor/VisualizarInstrutor.jsx";

import CursoForm from "../componentes/cadastracurso/CursoForm.jsx";
import ListaCursos from "../componentes/listacurso/ListaCursos.jsx";
import VisualizarCurso from "../componentes/visualizacurso/VisualizarCurso.jsx";

import AlunoForm from "../componentes/cadastraaluno/AlunoForm.jsx";
import ListaAlunos from "../componentes/listaaluno/ListaAlunos.jsx";
import VisualizarAluno from "../componentes/visualizaaluno/VisualizarAluno.jsx";

import InscricaoForm from "../componentes/cadastrainscricao/InscricaoForm.jsx";
import ListaInscricoes from "../componentes/listainscricao/ListaInscricoes.jsx";

import RelatorioInscricoes from "../componentes/relatorio/RelatorioInscricoes.jsx";

function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<MainLayout />}>
        <Route index element={<Navigate to="/instrutores/listar" replace />} />

        <Route path="instrutores/cadastrar" element={<InstrutorForm />} />
        <Route path="instrutores/listar" element={<ListaInstrutores />} />
        <Route path="instrutores/visualizar/:id" element={<VisualizarInstrutor />} />
        <Route path="instrutores/editar/:id" element={<InstrutorForm />} />

        <Route path="cursos/cadastrar" element={<CursoForm />} />
        <Route path="cursos/listar" element={<ListaCursos />} />
        <Route path="cursos/visualizar/:id" element={<VisualizarCurso />} />
        <Route path="cursos/editar/:id" element={<CursoForm />} />

        <Route path="alunos/cadastrar" element={<AlunoForm />} />
        <Route path="alunos/listar" element={<ListaAlunos />} />
        <Route path="alunos/visualizar/:id" element={<VisualizarAluno />} />
        <Route path="alunos/editar/:id" element={<AlunoForm />} />

        <Route path="inscricoes/cadastrar" element={<InscricaoForm />} />
        <Route path="inscricoes/listar" element={<ListaInscricoes />} />

        <Route path="relatorio" element={<RelatorioInscricoes />} />
      </Route>
    </Routes>
  );
}

export default AppRoutes;
