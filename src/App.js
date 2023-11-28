import Login from './pages/login';
import Cadastro from './pages/cadastro';
import Home from './pages/home';
import Layout from './pages/layout';
import GrupoCadastro from './pages/grupo/cadastro';
import GrupoVisualizar from './pages/grupo/vizualizar';
import CentralAprovacoes from './pages/centralAprovacoes'

import { ThemeProvider } from "@mui/material/styles";
import theme from './theme';
import { BrowserRouter, Routes, Route} from 'react-router-dom';

import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';


function App() {
  return (
    <ThemeProvider theme={theme}>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Layout />}>
            <Route path="/Home" element={<Home />} />
            <Route path="/GrupoCadastro" element={<GrupoCadastro />} />
            <Route path="/GrupoVisualizar" element={<GrupoVisualizar />} />
            <Route path="/CentralAprovacoes" element={<CentralAprovacoes />} />
          </Route>
          <Route path="/Login" element={<Login />} />
          <Route path="/Cadastro" element={<Cadastro />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
