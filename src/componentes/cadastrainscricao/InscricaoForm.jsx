import React, { useState, useEffect } from "react";
import { Form, Select, Button, message, Spin, Card, Alert } from "antd";
import { useNavigate } from "react-router-dom";
import InscricaoDAO from "../../objetos/dao/InscricaoDAO.mjs";
import AlunoDAO from "../../objetos/dao/AlunoDAO.mjs";
import CursoDAO from "../../objetos/dao/CursoDAO.mjs";

export default function InscricaoForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [alunos, setAlunos] = useState([]);
  const [cursos, setCursos] = useState([]);
  const navigate = useNavigate();

  const inscricaoDAO = new InscricaoDAO();
  const alunoDAO = new AlunoDAO();
  const cursoDAO = new CursoDAO();

  useEffect(() => {
    carregarDados();
  }, []);

  async function carregarDados() {
    setLoading(true);
    try {
      const [listaAlunos, listaCursos] = await Promise.all([
        alunoDAO.listar(),
        cursoDAO.listar(),
      ]);
      setAlunos(listaAlunos);
      setCursos(listaCursos);
    } catch (error) {
      message.error("Erro ao carregar dados!");
    } finally {
      setLoading(false);
    }
  }

  async function onFinish(values) {
    setLoading(true);

    try {
      await inscricaoDAO.salvar({
        alunoId: values.alunoId,
        cursoId: values.cursoId,
      });

      message.success("Inscrição realizada com sucesso!");
      form.resetFields();
      navigate("/inscricoes/listar");
    } catch (error) {
      console.error("Erro ao salvar inscrição:", error);
      message.error(error.message || "Erro ao realizar inscrição!");
    } finally {
      setLoading(false);
    }
  }

  if (loading && alunos.length === 0) {
    return (
      <div style={{ textAlign: "center", marginTop: 50 }}>
        <Spin size="large" />
      </div>
    );
  }

  return (
    <div
      style={{
        maxWidth: 800,
        margin: "24px auto",
        background: "#fff",
        padding: 32,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 24 }}>
        Nova Inscrição
      </h2>

      <Alert
        message="Matrícula do Curso"
        description="Ao inscrever o aluno em um curso, uma matrícula única será gerada automaticamente para esta inscrição específica."
        type="info"
        showIcon
        style={{ marginBottom: 24 }}
      />

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Aluno"
          name="alunoId"
          rules={[{ required: true, message: "Selecione o aluno!" }]}
        >
          <Select
            placeholder="Selecione o aluno"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={alunos.map((aluno) => ({
              value: aluno.id,
              label: `${aluno.nome} - ${aluno.email}`,
            }))}
          />
        </Form.Item>

        <Form.Item
          label="Curso"
          name="cursoId"
          rules={[{ required: true, message: "Selecione o curso!" }]}
        >
          <Select
            placeholder="Selecione o curso"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={cursos.map((curso) => ({
              value: curso.id,
              label: `${curso.titulo} - ${curso.instrutor?.nome || "Sem instrutor"}`,
            }))}
          />
        </Form.Item>

        <Form.Item style={{ marginTop: 20 }}>
          <Button type="primary" htmlType="submit" block loading={loading}>
            Realizar Inscrição
          </Button>
        </Form.Item>

        <Form.Item>
          <Button block onClick={() => navigate("/inscricoes/listar")}>
            Cancelar
          </Button>
        </Form.Item>
      </Form>
    </div>
  );
}
