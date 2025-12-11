import React, { useState, useEffect } from "react";
import { Form, Input, Button, DatePicker, message, Spin } from "antd";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import "dayjs/locale/pt-br";
import locale from "antd/locale/pt_BR";
import EnderecoForm from "../cadastrainstrutor/EnderecoForm.jsx";
import TelefoneList from "../cadastrainstrutor/TelefoneList.jsx";
import AlunoDAO from "../../objetos/dao/AlunoDAO.mjs";
import Aluno from "../../objetos/pessoas/Aluno.mjs";
import Endereco from "../../objetos/pessoas/Endereco.mjs";
import Telefone from "../../objetos/pessoas/Telefone.mjs";

dayjs.locale("pt-br");

export default function AlunoForm() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [editando, setEditando] = useState(false);
  const navigate = useNavigate();
  const { id } = useParams();
  const alunoDAO = new AlunoDAO();

  useEffect(() => {
    async function carregarAluno() {
      if (id) {
        setLoading(true);
        setEditando(true);

        try {
          const aluno = await alunoDAO.buscarPorId(id);

          if (!aluno) {
            message.error("Aluno não encontrado!");
            navigate("/alunos/listar");
            return;
          }

          form.setFieldsValue({
            nome: aluno.nome,
            email: aluno.email,
            cpf: aluno.cpf,
            dataNascimento: aluno.data_nascimento
              ? dayjs(aluno.data_nascimento)
              : null,
            endereco: aluno.endereco || {},
            telefones: aluno.telefones || [],
          });
        } catch (error) {
          message.error("Erro ao carregar aluno!");
        } finally {
          setLoading(false);
        }
      }
    }

    carregarAluno();
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

      const aluno = new Aluno();
      aluno.setNome(values.nome);
      aluno.setEmail(values.email);
      aluno.setCPF(values.cpf);
      aluno.setEndereco(end);

      if (values.dataNascimento) {
        const dataNascimento =
          typeof values.dataNascimento.format === "function"
            ? values.dataNascimento.format("YYYY-MM-DD")
            : values.dataNascimento;
        aluno.setDataNascimento(dataNascimento);
      }

      if (values.telefones?.length > 0) {
        values.telefones.forEach((tel) => {
          const fone = new Telefone();
          fone.setDdd(tel.ddd);
          fone.setNumero(tel.numero);
          aluno.addTelefone(fone);
        });
      }

      const alunoData = {
        nome: aluno.getNome(),
        email: aluno.getEmail(),
        cpf: aluno.getCPF(),
        dataNascimento: aluno.getDataNascimento(),
        endereco: {
          cep: end.getCep(),
          logradouro: end.getLogradouro(),
          bairro: end.getBairro(),
          cidade: end.getCidade(),
          uf: end.getUf(),
          regiao: end.getRegiao(),
        },
        telefones: aluno.getTelefones().map((t) => ({
          ddd: t.getDdd(),
          numero: t.getNumero(),
        })),
      };

      if (editando) {
        await alunoDAO.atualizar(id, alunoData);
        message.success("Aluno atualizado com sucesso!");
      } else {
        await alunoDAO.salvar(alunoData);
        message.success("Aluno cadastrado com sucesso!");
      }

      form.resetFields();
      navigate("/alunos/listar");
    } catch (error) {
      console.error("Erro ao salvar aluno:", error);
      message.error("Erro ao salvar aluno!");
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
        {editando ? "Editar Aluno" : "Cadastrar Aluno"}
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

        <EnderecoForm />
        <TelefoneList form={form} />

        <Form.Item style={{ marginTop: 20 }}>
          <Button type="primary" htmlType="submit" block loading={loading}>
            {editando ? "Salvar Alterações" : "Cadastrar"}
          </Button>
        </Form.Item>

        {editando && (
          <Form.Item>
            <Button block onClick={() => navigate("/alunos/listar")}>
              Cancelar
            </Button>
          </Form.Item>
        )}
      </Form>
    </div>
  );
}

