import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, Select, message, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import locale from "antd/locale/pt_BR";
import EnderecoForm from "./EnderecoForm.jsx";
import TelefoneList from "./TelefoneList.jsx";
import InstrutorDAO from "../../objetos/dao/InstrutorDAO.mjs";
import Instrutor from "../../objetos/pessoas/Instrutor.mjs";
import Endereco from "../../objetos/pessoas/Endereco.mjs";
import Telefone from "../../objetos/pessoas/Telefone.mjs";

dayjs.locale("pt-br");

const ESPECIALIDADES_OPCOES = [
  "Programação",
  "Design",
  "Marketing Digital",
  "Gestão de Projetos",
  "Banco de Dados",
  "Redes",
  "Segurança da Informação",
  "Inteligência Artificial",
  "DevOps",
  "UX/UI",
];

export default function InstrutorForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editando, setEditando] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const instrutorDAO = new InstrutorDAO();

  useEffect(() => {
    async function carregarInstrutor() {
      if (id) {
        setLoading(true);
        setEditando(true);

        try {
          const instrutor = await instrutorDAO.buscarPorId(id);

          if (!instrutor) {
            message.error("Instrutor não encontrado!");
            navigate("/instrutores/listar");
            return;
          }

          form.setFieldsValue({
            nome: instrutor.nome,
            email: instrutor.email,
            cpf: instrutor.cpf,
            dataNascimento: instrutor.data_nascimento
              ? dayjs(instrutor.data_nascimento)
              : null,
            especialidades: instrutor.especialidades || [],
            endereco: instrutor.endereco || {},
            telefones: instrutor.telefones || [],
          });
        } catch (error) {
          message.error("Erro ao carregar instrutor!");
        } finally {
          setLoading(false);
        }
      }
    }

    carregarInstrutor();
  }, [id]);

  async function onFinish(values) {
    setLoading(true);

    try {
      const end = new Endereco();
      if (values.endereco) {
        end.setCep(values.endereco.cep);
        end.setLogradouro(values.endereco.logradouro);
        end.setBairro(values.endereco.bairro);
        end.setCidade(values.endereco.cidade);
        end.setUf(values.endereco.uf);
        end.setRegiao(values.endereco.regiao);
      }

      const instrutor = new Instrutor();
      instrutor.setNome(values.nome);
      instrutor.setEmail(values.email);
      instrutor.setCPF(values.cpf);
      instrutor.setEndereco(end);
      instrutor.setEspecialidades(values.especialidades || []);

      if (values.dataNascimento) {
        const dataNascimento =
          typeof values.dataNascimento.format === "function"
            ? values.dataNascimento.format("YYYY-MM-DD")
            : values.dataNascimento;
        instrutor.setDataNascimento(dataNascimento);
      }

      if (values.telefones?.length > 0) {
        values.telefones.forEach((tel) => {
          const fone = new Telefone();
          fone.setDdd(tel.ddd);
          fone.setNumero(tel.numero);
          instrutor.addTelefone(fone);
        });
      }

      const instrutorData = {
        nome: instrutor.getNome(),
        email: instrutor.getEmail(),
        cpf: instrutor.getCPF(),
        dataNascimento: instrutor.getDataNascimento(),
        especialidades: instrutor.getEspecialidades(),
        endereco: {
          cep: end.getCep(),
          logradouro: end.getLogradouro(),
          bairro: end.getBairro(),
          cidade: end.getCidade(),
          uf: end.getUf(),
          regiao: end.getRegiao(),
        },
        telefones: instrutor.getTelefones().map((t) => ({
          ddd: t.getDdd(),
          numero: t.getNumero(),
        })),
      };

      if (editando) {
        await instrutorDAO.atualizar(id, instrutorData);
        message.success("Instrutor atualizado com sucesso!");
      } else {
        await instrutorDAO.salvar(instrutorData);
        message.success("Instrutor cadastrado com sucesso!");
      }

      form.resetFields();
      navigate("/instrutores/listar");
    } catch (error) {
      console.error("Erro ao salvar instrutor:", error);
      message.error("Erro ao salvar instrutor!");
    } finally {
      setLoading(false);
    }
  }

  if (loading && editando) {
    return (
      <div style={{ textAlign: "center", marginTop: 20 }}>
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
        padding: 24,
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.05)",
      }}
    >
      <h2 style={{ textAlign: "center", marginBottom: 20 }}>
        {editando ? "Editar Instrutor" : "Cadastrar Instrutor"}
      </h2>

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Nome"
          name="nome"
          rules={[{ required: true, message: "Informe o nome!" }]}
        >
          <Input placeholder="Nome completo" />
        </Form.Item>

        <Form.Item
          label="Email"
          name="email"
          rules={[
            { required: true, message: "Informe o email!" },
            { type: "email", message: "Email inválido!" },
          ]}
        >
          <Input placeholder="exemplo@email.com" />
        </Form.Item>

        <Form.Item
          label="CPF"
          name="cpf"
          rules={[{ required: true, message: "Informe o CPF!" }]}
        >
          <Input placeholder="Somente números" maxLength={11} />
        </Form.Item>

        <Form.Item label="Data de Nascimento" name="dataNascimento">
          <DatePicker
            format="DD/MM/YYYY"
            style={{ width: "100%" }}
            placeholder="Selecione a data"
            locale={locale.DatePicker}
          />
        </Form.Item>

        <Form.Item label="Especialidades" name="especialidades">
          <Select
            mode="multiple"
            placeholder="Selecione as especialidades"
            options={ESPECIALIDADES_OPCOES.map((esp) => ({
              value: esp,
              label: esp,
            }))}
          />
        </Form.Item>

        <EnderecoForm />
        <TelefoneList form={form} />

        <Form.Item style={{ marginTop: 20 }}>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {editando ? "Salvar Alterações" : "Cadastrar"}
          </Button>
        </Form.Item>

        {editando && (
          <Form.Item>
            <Button block onClick={() => navigate("/instrutores/listar")}>
              Cancelar
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
}

