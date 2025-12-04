import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout.jsx";

import InstrutorForm from "../componentes/cadastrainstrutor/InstrutorForm.jsx";
import ListaInstrutores from "../componentes/listainstrutor/ListaInstrutores.jsx";
import VisualizarInstrutor from "../componentes/visualizainstrutor/VisualizarInstrutor.jsx";

import CursoForm from "../componentes/cadastracurso/CursoForm.jsx";
import ListaCursos from "../componentes/listacurso/ListaCursos.jsx";
import VisualizarCurso from "../componentes/visualizacurso/VisualizarCurso.jsx";

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
      </Route>
    </Routes>
  );
}

export default AppRoutes;
