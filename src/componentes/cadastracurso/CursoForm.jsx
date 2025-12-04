import React, { useState, useEffect } from "react";
import { Form, Input, InputNumber, Button, Select, message, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import CursoDAO from "../../objetos/dao/CursoDAO.mjs";
import InstrutorDAO from "../../objetos/dao/InstrutorDAO.mjs";
import Curso from "../../objetos/pessoas/Curso.mjs";

const { TextArea } = Input;

export default function CursoForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editando, setEditando] = useState(false);
  const [instrutores, setInstrutores] = useState([]);
  const navigate = useNavigate();
  const { id } = useParams();

  const cursoDAO = new CursoDAO();
  const instrutorDAO = new InstrutorDAO();

  useEffect(() => {
    carregarInstrutores();

    if (id) {
      carregarCurso();
    }
  }, [id]);

  async function carregarInstrutores() {
    try {
      const lista = await instrutorDAO.listar();
      setInstrutores(lista);
    } catch (error) {
      message.error("Erro ao carregar instrutores!");
    }
  }

  async function carregarCurso() {
    setLoading(true);
    setEditando(true);

    try {
      const curso = await cursoDAO.buscarPorId(id);

      if (!curso) {
        message.error("Curso não encontrado!");
        navigate("/cursos/listar");
        return;
      }

      form.setFieldsValue({
        titulo: curso.titulo,
        descricao: curso.descricao,
        cargaHoraria: curso.carga_horaria,
        instrutorId: curso.instrutor_id,
      });
    } catch (error) {
      message.error("Erro ao carregar curso!");
    } finally {
      setLoading(false);
    }
  }

  async function onFinish(values) {
    setLoading(true);

    try {
      const curso = new Curso();
      curso.setTitulo(values.titulo);
      curso.setDescricao(values.descricao);
      curso.setCargaHoraria(values.cargaHoraria);
      curso.setInstrutorId(values.instrutorId);

      const cursoData = {
        titulo: curso.getTitulo(),
        descricao: curso.getDescricao(),
        cargaHoraria: curso.getCargaHoraria(),
        instrutorId: curso.getInstrutorId(),
      };

      if (editando) {
        await cursoDAO.atualizar(id, cursoData);
        message.success("Curso atualizado com sucesso!");
      } else {
        await cursoDAO.salvar(cursoData);
        message.success("Curso cadastrado com sucesso!");
      }

      form.resetFields();
      navigate("/cursos/listar");
    } catch (error) {
      console.error("Erro ao salvar curso:", error);
      message.error("Erro ao salvar curso!");
    } finally {
      setLoading(false);
    }
  }

  if (loading && editando) {
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
        {editando ? "Editar Curso" : "Cadastrar Curso"}
      </h2>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Título do Curso"
          name="titulo"
          rules={[{ required: true, message: "Informe o título!" }]}
        >
          <Input placeholder="Ex: Desenvolvimento Web com React" />
        </Form.Item>

        <Form.Item
          label="Descrição"
          name="descricao"
          rules={[{ required: true, message: "Informe a descrição!" }]}
        >
          <TextArea
            rows={4}
            placeholder="Descreva o conteúdo e objetivos do curso"
          />
        </Form.Item>

        <Form.Item
          label="Carga Horária (horas)"
          name="cargaHoraria"
          rules={[
            { required: true, message: "Informe a carga horária!" },
            { type: "number", min: 1, message: "Mínimo 1 hora!" },
          ]}
        >
          <InputNumber
            style={{ width: "100%" }}
            placeholder="Ex: 40"
            min={1}
          />
        </Form.Item>

        <Form.Item
          label="Instrutor"
          name="instrutorId"
          rules={[{ required: true, message: "Selecione o instrutor!" }]}
        >
          <Select
            placeholder="Selecione o instrutor responsável"
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={instrutores.map((inst) => ({
              value: inst.id,
              label: `${inst.nome} - ${inst.email}`,
            }))}
          />
        </Form.Item>

        <Form.Item style={{ marginTop: 20 }}>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {editando ? "Salvar Alterações" : "Cadastrar"}
          </Button>
        </Form.Item>

        {editando && (
          <Form.Item>
            <Button block onClick={() => navigate("/cursos/listar")}>
              Cancelar
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
}
