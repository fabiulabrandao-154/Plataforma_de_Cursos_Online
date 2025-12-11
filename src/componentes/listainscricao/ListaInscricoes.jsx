import React, { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, message, Spin } from "antd";
import { DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import InscricaoDAO from "../../objetos/dao/InscricaoDAO.mjs";

export default function ListaInscricoes() {
  const navigate = useNavigate();
  const [dados, setDados] = useState([]);
  const [loading, setLoading] = useState(false);
  const inscricaoDAO = new InscricaoDAO();

  useEffect(() => {
    carregarLista();
  }, []);

  async function carregarLista() {
    setLoading(true);
    try {
      const lista = await inscricaoDAO.listar();
      setDados(lista);
    } catch (error) {
      message.error("Erro ao carregar inscrições!");
    } finally {
      setLoading(false);
    }
  }

  async function excluirInscricao(id) {
    try {
      await inscricaoDAO.excluir(id);
      message.success("Inscrição excluída com sucesso!");
      carregarLista();
    } catch (error) {
      message.error("Erro ao excluir inscrição!");
    }
  }

  const colunas = [
    {
      title: "Aluno",
      dataIndex: ["aluno", "nome"],
      key: "aluno",
      render: (_, record) => record.aluno?.nome || "Sem aluno",
      sorter: (a, b) => (a.aluno?.nome || "").localeCompare(b.aluno?.nome || ""),
    },
    {
      title: "Matrícula",
      dataIndex: "matricula",
      key: "matricula",
      render: (_, record) => record.matricula || "-",
    },
    {
      title: "Curso",
      dataIndex: ["curso", "titulo"],
      key: "curso",
      render: (_, record) => record.curso?.titulo || "Sem curso",
      sorter: (a, b) => (a.curso?.titulo || "").localeCompare(b.curso?.titulo || ""),
    },
    {
      title: "Instrutor",
      dataIndex: ["curso", "instrutor", "nome"],
      key: "instrutor",
      render: (_, record) => record.curso?.instrutor?.nome || "Sem instrutor",
    },
    {
      title: "Data Inscrição",
      dataIndex: "data_inscricao",
      key: "data_inscricao",
      render: (data) => new Date(data).toLocaleDateString("pt-BR"),
      sorter: (a, b) => new Date(a.data_inscricao) - new Date(b.data_inscricao),
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space>
          <Popconfirm
            title="Deseja realmente excluir?"
            description="Esta ação não pode ser desfeita."
            onConfirm={() => excluirInscricao(record.id)}
          >
            <Button danger icon={<DeleteOutlined />} title="Excluir" />
          </Popconfirm>
        </Space>
      ),
    },
  ];

  return (
    <div
      style={{
        maxWidth: 1000,
        margin: "24px auto",
        background: "#fff",
        padding: 24,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: 20,
        }}
      >
        <h2>Inscrições</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/inscricoes/cadastrar")}
        >
          Nova Inscrição
        </Button>
      </div>

      <Space style={{ marginBottom: 20 }}>
        <Button type="primary" onClick={carregarLista}>
          Atualizar
        </Button>
      </Space>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={dados}
          columns={colunas}
          rowKey="id"
          pagination={{ pageSize: 6 }}
        />
      )}
    </div>
  );
}

