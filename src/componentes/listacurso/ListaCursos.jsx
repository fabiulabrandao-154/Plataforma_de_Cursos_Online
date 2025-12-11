import React, { useEffect, useState } from "react";
import { Table, Button, Space, Popconfirm, message, Input, Spin } from "antd";
import { EyeOutlined, EditOutlined, DeleteOutlined, PlusOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router-dom";
import CursoDAO from "../../objetos/dao/CursoDAO.mjs";

export default function ListaCursos() {
  const navigate = useNavigate();
  const [dados, setDados] = useState([]);
  const [filtroTitulo, setFiltroTitulo] = useState("");
  const [loading, setLoading] = useState(false);
  const cursoDAO = new CursoDAO();

  useEffect(() => {
    carregarLista();
  }, [filtroTitulo]);

  async function carregarLista() {
    setLoading(true);
    try {
      let lista;
      if (filtroTitulo.trim()) {
        lista = await cursoDAO.buscarPorTitulo(filtroTitulo);
      } else {
        lista = await cursoDAO.listar();
      }
      setDados(lista);
    } catch (error) {
      message.error("Erro ao carregar cursos!");
    } finally {
      setLoading(false);
    }
  }

  async function excluirCurso(id) {
    try {
      await cursoDAO.excluir(id);
      message.success("Curso excluído com sucesso!");
      carregarLista();
    } catch (error) {
      message.error("Erro ao excluir curso!");
    }
  }

  const colunas = [
    {
      title: "Título",
      dataIndex: "titulo",
      key: "titulo",
      sorter: (a, b) => a.titulo.localeCompare(b.titulo),
    },
    {
      title: "Instrutor",
      dataIndex: ["instrutor", "nome"],
      key: "instrutor",
      render: (_, record) => record.instrutor?.nome || "Sem instrutor",
    },
    {
      title: "Carga Horária",
      dataIndex: "carga_horaria",
      key: "carga_horaria",
      render: (horas) => `${horas}h`,
      sorter: (a, b) => a.carga_horaria - b.carga_horaria,
    },
    {
      title: "Ações",
      key: "acoes",
      render: (_, record) => (
        <Space>
          <Button
            icon={<EyeOutlined />}
            onClick={() => navigate(`/cursos/visualizar/${record.id}`)}
            title="Visualizar"
          />
          <Button
            icon={<EditOutlined />}
            onClick={() => navigate(`/cursos/editar/${record.id}`)}
            title="Editar"
          />
          <Popconfirm
            title="Deseja realmente excluir?"
            description="Esta ação não pode ser desfeita."
            onConfirm={() => excluirCurso(record.id)}
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
        <h2>Cursos</h2>
        <Button
          type="primary"
          icon={<PlusOutlined />}
          onClick={() => navigate("/cursos/cadastrar")}
        >
          Novo Curso
        </Button>
      </div>

      <Space style={{ marginBottom: 20, width: "100%" }}>
        <Input
          placeholder="Filtrar por título"
          value={filtroTitulo}
          onChange={(e) => setFiltroTitulo(e.target.value)}
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
