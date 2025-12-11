import React, { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, message, Input, Tag, Spin } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import InstrutorDAO from "../../objetos/dao/InstrutorDAO.mjs";

export default function ListaInstrutores() {
  const navigate = useNavigate();
  const [dados, setDados] = useState([]);
  const [filtroNome, setFiltroNome] = useState("");
  const [loading, setLoading] = useState(false);
  const instrutorDAO = new InstrutorDAO();

  useEffect(() => {
    carregarLista();
  }, [filtroNome]);

  async function carregarLista() {
    setLoading(true);
    try {
      let lista;
      if (filtroNome.trim()) {
        lista = await instrutorDAO.buscarPorNome(filtroNome);
      } else {
        lista = await instrutorDAO.listar();
      }
      setDados(lista);
    } catch (error) {
      message.error("Erro ao carregar instrutores!");
    } finally {
      setLoading(false);
    }
  }

  async function excluirInstrutor(id) {
    try {
      await instrutorDAO.excluir(id);
      message.success("Instrutor excluído com sucesso!");
      carregarLista();
    } catch (error) {
      message.error("Erro ao excluir instrutor!");
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
      title: "Especialidades",
      dataIndex: "especialidades",
      key: "especialidades",
      render: (especialidades) => (
        <>
          {especialidades?.slice(0, 2).map((esp) => (
            <Tag key={esp} color="blue">
              {esp}
            </Tag>
          ))}
          {especialidades?.length > 2 && (
            <Tag>+{especialidades.length - 2}</Tag>
          )}
        </>
      ),
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/instrutores/visualizar/${record.id}`)}
            title="Visualizar"
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/instrutores/editar/${record.id}`)}
            title="Editar"
          />
          <Popconfirm
            title="Deseja realmente excluir?"
            description="Esta ação não pode ser desfeita."
            onConfirm={() => excluirInstrutor(record.id)}
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
        <h2>Instrutores</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/instrutores/cadastrar")}
        >
          Novo Instrutor
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
          scroll={{ x: 900 }}
        />
      )}
    </div>
  );
}
