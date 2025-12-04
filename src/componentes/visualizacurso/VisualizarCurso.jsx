import React, { useEffect, useState } from "react";
import { Card, Descriptions, Button, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import CursoDAO from "../../objetos/dao/CursoDAO.mjs";

export default function VisualizarCurso() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [curso, setCurso] = useState(null);
  const [loading, setLoading] = useState(true);
  const cursoDAO = new CursoDAO();

  useEffect(() => {
    carregarCurso();
  }, [id]);

  async function carregarCurso() {
    setLoading(true);
    try {
      const data = await cursoDAO.buscarPorId(id);
      setCurso(data);
    } catch (error) {
      console.error("Erro ao carregar curso:", error);
    } finally {
      setLoading(false);
    }
  }

  if (loading) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  if (!curso) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h3>Curso não encontrado.</h3>
        <Button type="primary" onClick={() => navigate("/cursos/listar")}>
          Voltar à lista
        </Button>
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "24px auto",
        background: "#fff",
        padding: 24,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <Card title="Detalhes do Curso" bordered={false}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Título">{curso.titulo}</Descriptions.Item>

          <Descriptions.Item label="Descrição">
            {curso.descricao}
          </Descriptions.Item>

          <Descriptions.Item label="Carga Horária">
            {curso.carga_horaria} horas
          </Descriptions.Item>

          <Descriptions.Item label="Instrutor">
            {curso.instrutor ? (
              <div>
                <strong>{curso.instrutor.nome}</strong>
                <br />
                {curso.instrutor.email}
                <br />
                CPF: {curso.instrutor.cpf}
              </div>
            ) : (
              "Sem instrutor atribuído"
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Criado em">
            {new Date(curso.created_at).toLocaleDateString("pt-BR")}
          </Descriptions.Item>

          <Descriptions.Item label="Última atualização">
            {new Date(curso.updated_at).toLocaleDateString("pt-BR")}
          </Descriptions.Item>
        </Descriptions>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Button
            type="primary"
            onClick={() => navigate(`/cursos/editar/${curso.id}`)}
            style={{ marginRight: 12 }}
          >
            Editar
          </Button>
          <Button onClick={() => navigate("/cursos/listar")}>Voltar</Button>
        </div>
      </Card>
    </div>
  );
}
