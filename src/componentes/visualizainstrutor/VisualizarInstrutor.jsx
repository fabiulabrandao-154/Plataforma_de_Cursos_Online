import React, { useEffect, useState } from "react";
import { Card, Descriptions, Button, Tag, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import InstrutorDAO from "../../objetos/dao/InstrutorDAO.mjs";

export default function VisualizarInstrutor() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [instrutor, setInstrutor] = useState(null);
  const [loading, setLoading] = useState(true);
  const instrutorDAO = new InstrutorDAO();

  useEffect(() => {
    carregarInstrutor();
  }, [id]);

  async function carregarInstrutor() {
    setLoading(true);
    try {
      const data = await instrutorDAO.buscarPorId(id);
      setInstrutor(data);
    } catch (error) {
      console.error("Erro ao carregar instrutor:", error);
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

  if (!instrutor) {
    return (
      <div style={{ textAlign: "center", marginTop: 40 }}>
        <h3>Instrutor não encontrado.</h3>
        <Button type="primary" onClick={() => navigate("/instrutores/listar")}>
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
      <Card title="Detalhes do Instrutor" bordered={false}>
        <Descriptions bordered column={1}>
          <Descriptions.Item label="Nome">{instrutor.nome}</Descriptions.Item>
          <Descriptions.Item label="Email">{instrutor.email}</Descriptions.Item>
          <Descriptions.Item label="CPF">{instrutor.cpf}</Descriptions.Item>

          <Descriptions.Item label="Data de Nascimento">
            {instrutor.data_nascimento
              ? new Date(instrutor.data_nascimento).toLocaleDateString("pt-BR")
              : "Não informado"}
          </Descriptions.Item>

          <Descriptions.Item label="Especialidades">
            {instrutor.especialidades?.length > 0 ? (
              <>
                {instrutor.especialidades.map((esp) => (
                  <Tag key={esp} color="blue" style={{ marginBottom: 4 }}>
                    {esp}
                  </Tag>
                ))}
              </>
            ) : (
              "Nenhuma especialidade cadastrada"
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Endereço">
            {instrutor.endereco ? (
              <>
                {instrutor.endereco.logradouro}, {instrutor.endereco.bairro}
                <br />
                {instrutor.endereco.cidade}/{instrutor.endereco.uf}
                <br />
                CEP: {instrutor.endereco.cep} | Região: {instrutor.endereco.regiao}
              </>
            ) : (
              "Não informado"
            )}
          </Descriptions.Item>

          <Descriptions.Item label="Telefones">
            {instrutor.telefones?.length > 0
              ? instrutor.telefones
                  .map((t) => `(${t.ddd}) ${t.numero}`)
                  .join(" | ")
              : "Não informado"}
          </Descriptions.Item>
        </Descriptions>

        <div style={{ textAlign: "center", marginTop: 24 }}>
          <Button
            type="primary"
            onClick={() => navigate(`/instrutores/editar/${instrutor.id}`)}
            style={{ marginRight: 12 }}
          >
            Editar
          </Button>
          <Button onClick={() => navigate("/instrutores/listar")}>
            Voltar
          </Button>
        </div>
      </Card>
    </div>
  );
}
