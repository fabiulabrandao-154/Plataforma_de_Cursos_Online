import React, { useEffect, useState } from "react";
import { Card, Descriptions, Button, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import AlunoDAO from "../../objetos/dao/AlunoDAO.mjs";

export default function VisualizarAluno() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [aluno, setAluno] = useState(null);
  const [loading, setLoading] = useState(true);
  const alunoDAO = new AlunoDAO();

  useEffect(() => {
    carregarAluno();
  }, [id]);

  async function carregarAluno() {
    setLoading(true);
    try {
      const data = await alunoDAO.buscarPorId(id);
      setAluno(data);
    } catch (error) {
      console.error("Erro ao carregar aluno:", error);
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

  if (!aluno) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h3>Aluno não encontrado.</h3>
        <Button type="primary" onClick={() => navigate("/alunos/listar")}>
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
      <Card title="Detalhes do Aluno" bordered={false}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Nome">{aluno.nome}</Descriptions.Item>
          <Descriptions.Item label="Email">{aluno.email}</Descriptions.Item>
          <Descriptions.Item label="CPF">{aluno.cpf}</Descriptions.Item>

          <Descriptions.Item label="Data de Nascimento">
            {aluno.data_nascimento
              ? new Date(aluno.data_nascimento).toLocaleDateString("pt-BR")
              : "Não informado"}
          </Descriptions.Item>

          <Descriptions.Item label="Data de Cadastro">
            {new Date(aluno.data_cadastro).toLocaleDateString("pt-BR")}
          </Descriptions.Item>

          <Descriptions.Item label="Endereço">
            {aluno.endereco ? (
              <>
                {aluno.endereco.logradouro}, {aluno.endereco.bairro}
                <br />
                {aluno.endereco.cidade}/{aluno.endereco.uf}
                <br />
                CEP: {aluno.endereco.cep} | Região: {aluno.endereco.regiao}
              </>
            ) : (
              "Não informado"
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Telefones">
            {aluno.telefones?.length > 0
              ? aluno.telefones
                  .map((t) => `(${t.ddd}) ${t.numero}`)
                  .join(" | ")
              : "Não informado"}
          </Descriptions.Item>
        </Descriptions>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Button
            type="primary"
            onClick={() => navigate(`/alunos/editar/${aluno.id}`)}
            style={{ marginRight: 12 }}
          >
            Editar
          </Button>
          <Button onClick={() => navigate("/alunos/listar")}>Voltar</Button>
        </div>
      </Card>
    </div>
  );
}
