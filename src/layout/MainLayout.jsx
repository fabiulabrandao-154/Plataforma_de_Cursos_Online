import React, { useState, useEffect } from "react";
import { Outlet, Link, useLocation } from "react-router-dom";
import { Layout, Menu, Drawer, Button } from "antd";
import {
  UserAddOutlined,
  UnorderedListOutlined,
  MenuOutlined,
  BookOutlined,
  TeamOutlined,
  UserOutlined,
  FileTextOutlined,
  BarChartOutlined,
} from "@ant-design/icons";

const { Header, Content, Footer } = Layout;

function MainLayout() {
  const location = useLocation();
  const [isMobile, setIsMobile] = useState(false);
  const [drawerVisible, setDrawerVisible] = useState(false);

  // Detecta tamanho da tela
  useEffect(() => {
    function handleResize() {
      setIsMobile(window.innerWidth < 768);
    }
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  function getCurrentKey() {
    if (location.pathname.includes("/instrutores")) {
      return "/instrutores";
    }
    if (location.pathname.includes("/cursos")) {
      return "/cursos";
    }
    if (location.pathname.includes("/alunos")) {
      return "/alunos";
    }
    if (location.pathname.includes("/inscricoes")) {
      return "/inscricoes";
    }
    if (location.pathname.includes("/relatorio")) {
      return "/relatorio";
    }
    return "/instrutores";
  }

  const currentKey = getCurrentKey();

  const menuItems = [
    {
      key: "/instrutores",
      icon: <TeamOutlined />,
      label: "Instrutores",
      children: [
        {
          key: "/instrutores/cadastrar",
          icon: <UserAddOutlined />,
          label: <Link to="/instrutores/cadastrar">Cadastrar</Link>,
        },
        {
          key: "/instrutores/listar",
          icon: <UnorderedListOutlined />,
          label: <Link to="/instrutores/listar">Listar</Link>,
        },
      ],
    },
    {
      key: "/cursos",
      icon: <BookOutlined />,
      label: "Cursos",
      children: [
        {
          key: "/cursos/cadastrar",
          icon: <UserAddOutlined />,
          label: <Link to="/cursos/cadastrar">Cadastrar</Link>,
        },
        {
          key: "/cursos/listar",
          icon: <UnorderedListOutlined />,
          label: <Link to="/cursos/listar">Listar</Link>,
        },
      ],
    },
    {
      key: "/alunos",
      icon: <UserOutlined />,
      label: "Alunos",
      children: [
        {
          key: "/alunos/cadastrar",
          icon: <UserAddOutlined />,
          label: <Link to="/alunos/cadastrar">Cadastrar</Link>,
        },
        {
          key: "/alunos/listar",
          icon: <UnorderedListOutlined />,
          label: <Link to="/alunos/listar">Listar</Link>,
        },
      ],
    },
    {
      key: "/inscricoes",
      icon: <FileTextOutlined />,
      label: "Inscrições",
      children: [
        {
          key: "/inscricoes/cadastrar",
          icon: <UserAddOutlined />,
          label: <Link to="/inscricoes/cadastrar">Cadastrar</Link>,
        },
        {
          key: "/inscricoes/listar",
          icon: <UnorderedListOutlined />,
          label: <Link to="/inscricoes/listar">Listar</Link>,
        },
      ],
    },
    {
      key: "/relatorio",
      icon: <BarChartOutlined />,
      label: <Link to="/relatorio">Relatório</Link>,
    },
  ];

  return (
    <Layout style={{ height: "100vh", background: "#f7f7f7" }}>
      {/* ===== Cabeçalho ===== */}
      <Header
        style={{
          position: "sticky",
          top: 0,
          zIndex: 1000,
          width: "100%",
          background: "#fff",
          boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          paddingInline: 16,
        }}
      >
        {/* Logo / Título */}
        <div
          style={{
            fontSize: "1.2rem",
            fontWeight: "600",
            color: "#333",
          }}
        >
          Sistema de Cursos
        </div>

        {/* Menu Desktop */}
        {!isMobile && (
          <Menu
            mode="horizontal"
            selectedKeys={[currentKey]}
            items={menuItems}
            style={{
              background: "transparent",
              borderBottom: "none",
              fontWeight: 500,
              flex: 1,
              justifyContent: "flex-end",
            }}
          />
        )}

        {/* Botão Mobile */}
        {isMobile && (
          <Button
            type="text"
            icon={<MenuOutlined style={{ fontSize: 22 }} />}
            onClick={() => setDrawerVisible(true)}
          />
        )}
      </Header>

      {/* ===== Drawer (menu lateral mobile) ===== */}
      <Drawer
        title="Menu"
        placement="right"
        onClose={() => setDrawerVisible(false)}
        open={drawerVisible}
        bodyStyle={{ padding: 0 }}
      >
        <Menu
          mode="inline"
          selectedKeys={[currentKey]}
          items={menuItems}
          onClick={() => setDrawerVisible(false)}
        />
      </Drawer>

      {/* ===== Conteúdo principal ===== */}
      <Content
  style={{
    flex: 1,
    overflowY: "auto",        // ✅ ativa rolagem
    padding: 24,
  }}
>
  <div
    style={{
      background: "#ffffff",
      borderRadius: 8,
      boxShadow: "0 1px 4px rgba(0,0,0,0.08)",
      padding: 24,
      minHeight: "100%",
    }}
  >
    <Outlet />
  </div>
</Content>

      {/* ===== Rodapé ===== */}
      <Footer
        style={{
          textAlign: "center",
          background: "#f7f7f7",
          color: "#555",
        }}
      >
        Sistema de Gerenciamento de Cursos e Instrutores ©2025
      </Footer>
    </Layout>
  );
}

export default MainLayout;
