import React, { useEffect, useState } from "react";
import { Card, Table, Spin, message, Button, Tag, Select, Space } from "antd";
import { ReloadOutlined, BarChartOutlined, ClearOutlined } from "@ant-design/icons";
import InscricaoDAO from "../../objetos/dao/InscricaoDAO.mjs";
import CursoDAO from "../../objetos/dao/CursoDAO.mjs";
import AlunoDAO from "../../objetos/dao/AlunoDAO.mjs";

export default function RelatorioInscricoes() {
  const [loading, setLoading] = useState(false);
  const [dados, setDados] = useState([]);
  const [dadosFiltrados, setDadosFiltrados] = useState([]);
  const [cursos, setCursos] = useState([]);
  const [alunos, setAlunos] = useState([]);
  const [filtroCurso, setFiltroCurso] = useState(null);
  const [filtroAluno, setFiltroAluno] = useState(null);
  const [estatisticas, setEstatisticas] = useState({
    totalInscricoes: 0,
    totalCursos: 0,
    mediaInscricoesPorCurso: 0,
  });
  const inscricaoDAO = new InscricaoDAO();
  const cursoDAO = new CursoDAO();
  const alunoDAO = new AlunoDAO();

  useEffect(() => {
    carregarRelatorio();
  }, []);

  useEffect(() => {
    aplicarFiltros();
  }, [filtroCurso, filtroAluno, dados]);

  async function carregarRelatorio() {
    setLoading(true);
    try {
      const [relatorio, listaCursos, listaAlunos] = await Promise.all([
        inscricaoDAO.gerarRelatorio(),
        cursoDAO.listar(),
        alunoDAO.listar(),
      ]);

      setDados(relatorio);
      setCursos(listaCursos);
      setAlunos(listaAlunos);
      setDadosFiltrados(relatorio);

      const totalInscricoes = relatorio.reduce(
        (acc, item) => acc + item.total_inscricoes,
        0
      );
      const totalCursos = relatorio.length;
      const mediaInscricoesPorCurso =
        totalCursos > 0 ? (totalInscricoes / totalCursos).toFixed(2) : 0;

      setEstatisticas({
        totalInscricoes,
        totalCursos,
        mediaInscricoesPorCurso,
      });
    } catch (error) {
      console.error("Erro ao carregar relatório:", error);
      message.error("Erro ao carregar relatório!");
    } finally {
      setLoading(false);
    }
  }

  function aplicarFiltros() {
    let dadosTemp = [...dados];

    if (filtroCurso) {
      dadosTemp = dadosTemp.filter(item => item.curso_id === filtroCurso);
    }

    if (filtroAluno) {
      dadosTemp = dadosTemp.map(item => ({
        ...item,
        alunos: item.alunos.filter(aluno =>
          aluno.nome.toLowerCase().includes(filtroAluno.toLowerCase())
        ),
        total_inscricoes: item.alunos.filter(aluno =>
          aluno.nome.toLowerCase().includes(filtroAluno.toLowerCase())
        ).length
      })).filter(item => item.total_inscricoes > 0);
    }

    setDadosFiltrados(dadosTemp);

    const totalInscricoes = dadosTemp.reduce(
      (acc, item) => acc + item.total_inscricoes,
      0
    );
    const totalCursos = dadosTemp.length;
    const mediaInscricoesPorCurso =
      totalCursos > 0 ? (totalInscricoes / totalCursos).toFixed(2) : 0;

    setEstatisticas({
      totalInscricoes,
      totalCursos,
      mediaInscricoesPorCurso,
    });
  }

  function limparFiltros() {
    setFiltroCurso(null);
    setFiltroAluno(null);
  }

  const colunasAlunos = [
    {
      title: "Aluno",
      dataIndex: "nome",
      key: "nome",
    },
    {
      title: "Matrícula",
      dataIndex: "matricula",
      key: "matricula",
    },
    {
      title: "Data Inscrição",
      dataIndex: "data_inscricao",
      key: "data_inscricao",
      render: (data) => new Date(data).toLocaleDateString("pt-BR"),
    },
  ];

  const colunasCursos = [
    {
      title: "Curso",
      dataIndex: "curso_titulo",
      key: "curso_titulo",
      render: (titulo, record) => (
        <div>
          <strong>{titulo}</strong>
          <br />
          <small style={{ color: "#666" }}>
            Instrutor: {record.instrutor_nome}
          </small>
        </div>
      ),
    },
    {
      title: "Total de Inscrições",
      dataIndex: "total_inscricoes",
      key: "total_inscricoes",
      align: "center",
      render: (total) => <Tag color="blue">{total}</Tag>,
      sorter: (a, b) => a.total_inscricoes - b.total_inscricoes,
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
          marginBottom: 24,
          flexWrap: "wrap",
          gap: 16,
        }}
      >
        <h2 style={{ margin: 0 }}>
          <BarChartOutlined style={{ marginRight: 8 }} />
          Relatório de Inscrições por Curso e Instrutor
        </h2>
        <Button
          type="primary"
          icon={<ReloadOutlined />}
          onClick={carregarRelatorio}
          loading={loading}
        >
          Atualizar
        </Button>
      </div>

      <div
        style={{
          marginBottom: 24,
          padding: 16,
          background: "#f7f7f7",
          borderRadius: 8,
        }}
      >
        <h4 style={{ marginTop: 0, marginBottom: 12 }}>Filtros</h4>
        <Space wrap style={{ width: "100%" }}>
          <Select
            placeholder="Filtrar por curso"
            style={{ width: 250 }}
            value={filtroCurso}
            onChange={setFiltroCurso}
            allowClear
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={cursos.map(curso => ({
              value: curso.id,
              label: curso.titulo,
            }))}
          />
          <Select
            placeholder="Filtrar por aluno"
            style={{ width: 250 }}
            value={filtroAluno}
            onChange={setFiltroAluno}
            allowClear
            showSearch
            optionFilterProp="children"
            filterOption={(input, option) =>
              (option?.label ?? "").toLowerCase().includes(input.toLowerCase())
            }
            options={alunos.map(aluno => ({
              value: aluno.nome,
              label: aluno.nome,
            }))}
          />
          <Button
            icon={<ClearOutlined />}
            onClick={limparFiltros}
          >
            Limpar Filtros
          </Button>
        </Space>
      </div>

      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
          gap: 16,
          marginBottom: 24,
        }}
      >
        <Card>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: "bold", color: "#1890ff" }}>
              {estatisticas.totalInscricoes}
            </div>
            <div style={{ color: "#666" }}>Total de Inscrições</div>
          </div>
        </Card>

        <Card>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: "bold", color: "#52c41a" }}>
              {estatisticas.totalCursos}
            </div>
            <div style={{ color: "#666" }}>Cursos com Inscrições</div>
          </div>
        </Card>

        <Card>
          <div style={{ textAlign: "center" }}>
            <div style={{ fontSize: 32, fontWeight: "bold", color: "#faad14" }}>
              {estatisticas.mediaInscricoesPorCurso}
            </div>
            <div style={{ color: "#666" }}>Média por Curso</div>
          </div>
        </Card>
      </div>

      {loading ? (
        <div style={{ textAlign: "center", marginTop: 40 }}>
          <Spin size="large" />
        </div>
      ) : (
        <Table
          dataSource={dadosFiltrados}
          columns={colunasCursos}
          rowKey="curso_id"
          pagination={{ pageSize: 10 }}
          scroll={{ x: 600 }}
          expandable={{
            expandedRowRender: (record) => (
              <div style={{ padding: "16px", background: "#fafafa" }}>
                <h4>Alunos Inscritos:</h4>
                {record.alunos.length > 0 ? (
                  <Table
                    dataSource={record.alunos}
                    columns={colunasAlunos}
                    rowKey="matricula"
                    pagination={false}
                    size="small"
                  />
                ) : (
                  <p>Nenhum aluno inscrito</p>
                )}
              </div>
            ),
            rowExpandable: (record) => record.alunos.length > 0,
          }}
        />
      )}

      {!loading && dadosFiltrados.length === 0 && dados.length > 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#999" }}>
          <p>Nenhum resultado encontrado com os filtros aplicados.</p>
        </div>
      )}

      {!loading && dados.length === 0 && (
        <div style={{ textAlign: "center", padding: "40px 0", color: "#999" }}>
          <p>Nenhuma inscrição encontrada.</p>
          <p>Cadastre alunos e cursos, depois realize inscrições para visualizar o relatório.</p>
        </div>
      )}
    </div>
  );
}
