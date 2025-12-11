import React, { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, message, Input, Spin } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import AlunoDAO from "../../objetos/dao/AlunoDAO.mjs";

export default function ListaAlunos() {
  const navigate = useNavigate();
  const [dados, setDados] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [loading, setLoading] = useState(false);
  const alunoDAO = new AlunoDAO();

  useEffect(() => {
    carregarLista();
  }, [filtroNome]);

  async function carregarLista() {
    setLoading(true);
    try {
      let lista;
      if (filtroNome.trim()) {
        lista = await alunoDAO.buscarPorNome(filtroNome);
      } else {
        lista = await alunoDAO.listar();
      }
      setDados(lista);
    } catch (error) {
      message.error("Erro ao carregar alunos!");
    } finally {
      setLoading(false);
    }
  }

  async function excluirAluno(id) {
    try {
      await alunoDAO.excluir(id);
      message.success("Aluno excluído com sucesso!");
      carregarLista();
    } catch (error) {
      message.error("Erro ao excluir aluno!");
    }
  }

  const colunas = [
    {
      title: "Nome",
      dataIndex: "nome",
      key: "nome",
      sorter: (a, b) => a.nome.localeCompare(b.nome),
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
    },
    {
      title: "CPF",
      dataIndex: "cpf",
      key: "cpf",
    },
    {
      title: "Data Cadastro",
      dataIndex: "data_cadastro",
      key: "data_cadastro",
      render: (data) => new Date(data).toLocaleDateString("pt-BR"),
      sorter: (a, b) => new Date(a.data_cadastro) - new Date(b.data_cadastro),
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/alunos/visualizar/${record.id}`)}
            title="Visualizar"
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/alunos/editar/${record.id}`)}
            title="Editar"
          />
          <Popconfirm
            title="Deseja realmente excluir?"
            description="Esta ação não pode ser desfeita."
            onConfirm={() => excluirAluno(record.id)}
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
        maxWidth: 1200,
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
        <h2>Alunos</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/alunos/cadastrar")}
        >
          Novo Aluno
        </Button>
      </div>

      <Space style={{ marginBottom: 20, width: "100%" }}>
        <Input
          placeholder="Filtrar por nome"
          value={filtroNome}
          onChange={(e) => setFiltroNome(e.target.value)}
          allowClear
          style={{ width: 300 }}
        />
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
          pagination={{ pageSize: 10 }}
          scroll={{ x: 800 }}
        />
      )}
    </div>
  );
}
