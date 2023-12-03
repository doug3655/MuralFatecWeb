import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Home from './pages/home';
import Layout from './pages/layout';
import GrupoCadastro from './pages/grupo/cadastro';
import GrupoVisualizar from './pages/grupo/vizualizar';
import CentralAprovacoes from './pages/centralAprovacoes'
import { toast } from 'react-toastify';
import { ThemeProvider } from "@mui/material/styles";
import theme from './theme';
import { BrowserRouter, Routes, Route, Navigate} from 'react-router-dom';
import { useContext } from 'react';
import { ContextoToastConfig } from './context';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';



function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route element={<Layout />}>
            <Route path="/" element={
              <PrivateRoute perfil={1}>
                <Home />
              </PrivateRoute>
            } />
            <Route path="/Home" element={
              <PrivateRoute perfil={1}>
                 <Home />
              </PrivateRoute>
              } />
              <Route path="/DadosUsuario" element={
              <PrivateRoute perfil={1}>
                 <Cadastro />
              </PrivateRoute>
              } />
            <Route path="/GrupoCadastro" element={
              <PrivateRoute perfil={1}>
                <GrupoCadastro />
              </PrivateRoute>
            } />
            <Route path="/GrupoVisualizar" element={
              <PrivateRoute perfil={1}>
                <GrupoVisualizar />
              </PrivateRoute>
            } />
            <Route path="/CentralAprovacoes" element={
              <PrivateRoute perfil={3}>
                <CentralAprovacoes />
              </PrivateRoute>
            } />
          </Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/Cadastro" element={<Cadastro />} />
          <Route path="*" element={<Login />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

function PrivateRoute({ children,perfil }) {
  const toastProps = useContext(ContextoToastConfig);
  let usuarioSession = sessionStorage.getItem("usuario");
  if(usuarioSession === null){
    return <Navigate to="/Login" />
  }
  let usuario = JSON.parse(usuarioSession);
  let perfilUsuario = usuario.id_tp_perfil_usuario;
  if(typeof  perfilUsuario === "undefined"){
    toast.error("Perfil do usuario não encontrado",{toastProps});
    return <Navigate to="/Login" />
  }
  let auth = false;
  switch (perfil){
    case 1:
      if(perfilUsuario){
        auth=true;
      };
      break;
    case 2:
      if(perfilUsuario===2 || perfilUsuario===3){
        auth=true;
      };
      break;
    case 3:
      if(perfilUsuario===3){
        auth=true;
      };
      break;
    default:
        console.log("Perfil não mapeado");
  }
  return auth ? children : <Navigate to="/Login" />;
}

export default App;
