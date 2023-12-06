import "./style.css"
import { Link,useNavigate } from "react-router-dom"
import { Drawer, List, ListItemButton,ListItemText,Typography,Collapse,Modal,Box,ListItem,InputBase,IconButton,Paper } from "@mui/material"
import { Search } from "@mui/icons-material";
import { useState,useEffect,useContext } from 'react';
import { toast } from 'react-toastify';
import { ContextoToastConfig } from "../../context";

export default function Menu(){
    const [grupoMenu, setGrupoMenu] = useState();
    const [usuarioMenu, setUsuarioMenu] = useState();
    const [perfilUsuario,setPerfilUsuario] = useState(0);
    const [gruposEncontrados,setGruposEncontrados] = useState([]);
    const [usuariosEncontrados,setUsuariosEncontrados] = useState([{id_usuario:1,nm_usuario:"Teste"}]);
    const [openModalGrupo,setOpenModalGrupo] = useState(false);
    const [openModalUsuario,setOpenModalUsuario] = useState(false);
    const [nomeTema,setNomeTema] = useState('');
    const [nomeUsuario,setNomeUsuario] = useState('');
    const toastProps = useContext(ContextoToastConfig);
    const navegate = useNavigate();

    useEffect(() => {
        let usuarioSession = sessionStorage.getItem("usuario");
        if(usuarioSession === null){
            navegate('/Login');
        }else{
            let usuarioParse = JSON.parse(usuarioSession);
            setPerfilUsuario(usuarioParse.id_tp_perfil_usuario);
            if(typeof  perfilUsuario === "undefined"){
                navegate('/Login');
            }
        }
        // eslint-disable-next-line
    }, []); 

    function handleAlterarEstadoMenu(menu){
        switch (menu) {
            case 'grupoMenu':
                setGrupoMenu(!grupoMenu);
                break;
            case 'usuarioMenu':
                setUsuarioMenu(!usuarioMenu);
                break;
            default:
              console.log("Menu não encontrado");
          }
       
    };

    async function acessoGrupoCadastro(){
        sessionStorage.setItem("isVisualizarGrupo",false);
        let grupo = await buscarDadosGrupoAluno();
        if(grupo===null){
            navegate('/GrupoCadastro');
        }else{
            toast.warning("Voce ja pertence a um grupo",{toastProps});
        }
    };

    async function acessoVisualizarGrupo() {
        sessionStorage.setItem("isVisualizarGrupo",true);
        if (perfilUsuario === 1) {
            let grupo = await buscarDadosGrupoAluno();
            if (grupo !== null) {
                navegate('/GrupoVisualizar');
            } else {
                toast.warning("Voce não pertence a um grupo ou o grupo ainda não foi aprovado", { toastProps });
            }
        }else{
            setOpenModalGrupo(true);
            setNomeTema('');
            setGruposEncontrados([]);
        }
    }

    async function buscarDadosGrupoAluno(){
        let grupo = null;
        try{
            let usuarioSession = sessionStorage.getItem("usuario");
            let usuario = JSON.parse(usuarioSession);
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"busca-dado-grupo-aluno/"+usuario.id_usuario, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                grupo = await response.json();
                sessionStorage.setItem("dadosGrupo",JSON.stringify(grupo));
            }
        }catch(error) {
            console.log(error)
            toast.error("Erro durante a validacao de grupo ",{toastProps});
        }
        return grupo;
    };

    async function buscarDadosGrupoPorNome(){
        let grupo = null;
        try{
            let usuarioSession = sessionStorage.getItem("usuario");
            let usuario = JSON.parse(usuarioSession);
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"busca-dado-grupo-por-nome/"+perfilUsuario+"/"+usuario.id_usuario+"/"+nomeTema, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                grupo = await response.json();
                setGruposEncontrados(grupo);
            }else{
                setGruposEncontrados([]);
                toast.warning("Não foi encondrado um grupo com esse nome",{toastProps});
            }
        }catch(error) {
            console.log(error);
            toast.error("Erro durante a validacao de grupo ",{toastProps});
        }
    };

    async function buscaDadosGrupoId(idGrupo){
        let grupo = null;
        try{
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"busca-dado-grupo-id/"+idGrupo, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                grupo = await response.json();
                sessionStorage.setItem("dadosGrupo",JSON.stringify(grupo));
                setOpenModalGrupo(false);
                navegate('/GrupoVisualizar');
            }else{
                toast.error("Grupo não encontrado",{toastProps});
            }
        }catch(error) {
            console.log(error);
            toast.error("Erro durante a busca por dados desse grupo",{toastProps});
        }
    }

    async function buscaUsuarioPorNome(){
        let usuarios = null;
        try{
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"busca-usuario-nome/"+nomeUsuario, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                usuarios = await response.json();
                setUsuariosEncontrados(usuarios);
            }else{
                toast.warning("Usuario não encontrado",{toastProps});
            }
        }catch(error) {
            console.log(error);
            toast.error("Erro ao buscar usuario",{toastProps});
        }
    }

    async function buscaDadosUsuarioId(idUsuario){
        try{
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"busca-dado-usuario-id/"+idUsuario, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                let usuario =  await response.json();
                sessionStorage.setItem("dadosUsuarioPesquisado",JSON.stringify(usuario));
                setOpenModalUsuario(false);
                navegate('/DadosUsuarioPesquisado');
            }else{
                toast.error("Usuario não encontrado",{toastProps});
            }
        }catch(error) {
            console.log(error);
            toast.error("Erro durante a busca por dados desse Usuario",{toastProps});
        }
    }

    function handleBuscaNome(event){
        if(event.key === 'Enter'){
            buscarDadosGrupoPorNome();
        }
    }

    function handleBuscaUsuarioNome(event){
        if(event.key === 'Enter'){
            buscaUsuarioPorNome();
        }
    }

    return (
        <Drawer
            variant="permanent"
            sx={{
                width: "200px",
                flexShrink: 0,
                "& .MuiDrawer-paper": {
                    width: "200px",
                    boxSizing: "border-box",
                    borderRight: "0px",
                    backgroundColor: "modal",
                }
            }}
        >
            <List>
                <ListItemButton component={Link} to="/Home">
                    <ListItemText>
                        <Typography>
                            Home
                        </Typography>
                    </ListItemText>
                </ListItemButton>
                <ListItemButton onClick={() => handleAlterarEstadoMenu("usuarioMenu")}>
                    <ListItemText primary="Usuario" />
                </ListItemButton>
                <Collapse in={usuarioMenu} timeout="auto">
                    <List>
                        <ListItemButton sx={{ pl: 4 }} onClick={()=>{sessionStorage.removeItem("dadosUsuarioPesquisado");navegate('/DadosUsuario');}}>
                            <ListItemText>
                                <Typography>
                                    Alterar dados
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                        {perfilUsuario===3 &&
                        <ListItemButton sx={{ pl: 4 }} onClick={()=>{setOpenModalUsuario(true);setNomeUsuario('');setUsuariosEncontrados([]);}}>
                            <ListItemText>
                                <Typography>
                                   Buscar Usuario
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                        }
                    </List>
                </Collapse>
                <ListItemButton onClick={() => handleAlterarEstadoMenu("grupoMenu")}>
                    <ListItemText primary="Grupo" />
                </ListItemButton>
                <Collapse in={grupoMenu} timeout="auto">
                    <List>
                        {perfilUsuario===1 &&
                        <ListItemButton component={Link} to="/GrupoCadastro" sx={{ pl: 4 }} onClick={acessoGrupoCadastro}>
                            <ListItemText>
                                <Typography>
                                    Criar Grupo
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                        }
                        <ListItemButton sx={{ pl: 4 }} onClick={acessoVisualizarGrupo}>
                            <ListItemText>
                                <Typography>
                                   Visualizar Grupo
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                    </List>
                </Collapse>
                {perfilUsuario===3 && 
                <ListItemButton component={Link} to="/CentralAprovacoes">
                    <ListItemText>
                        <Typography>
                            Central de Aprovacoes
                        </Typography>
                    </ListItemText>
                </ListItemButton>
                }
                
                <ListItemButton component={Link} to="/Login">
                    <ListItemText>
                        <Typography>
                            Sair
                        </Typography>
                    </ListItemText>
                </ListItemButton>
            </List>
            <Modal open={openModalGrupo} onClose={()=>{setOpenModalGrupo(false)}}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", width: 500, height: 500, backgroundColor: "background.paper", border: "2px solid #000", borderRadius: 3, boxShadow: 24, transform: "translate(-50%, -50%)",p:4}}>
                    <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 2, marginTop: 2 }}>Digite o tema do grupo</Typography>
                    <Paper sx={{width:490,maxHeight:500,display:"flex", alignItems:"center"}}>
                        <InputBase
                            sx={{width:440,paddingLeft:1}}
                            placeholder="Digite o tema do grupo"
                            value={nomeTema}
                            onChange={(e)=>{setNomeTema(e.target.value)}}
                            onKeyUp={handleBuscaNome}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={buscarDadosGrupoPorNome}>
                            <Search />
                        </IconButton>
                    </Paper>
                    <List sx={{ width:490, maxHeight:350, alignContent: "center", justifyContent: "center", flexGrow:1, overflow: "auto", paddingRight:2,marginTop:2 }}>
                        { !(gruposEncontrados.length === 0) && gruposEncontrados.map(({id_grupo,nm_tema}) => (
                            <ListItem sx={{ borderRadius: 2, border: "solid #bbbbbb", borderWidth: 1, marginBottom: 1, paddingLeft: 1,width:470,maxWidth:470, maxHeight:75,overflow:"auto","&:hover":{cursor:"pointer"}}}
                                key={id_grupo}
                                onClick={()=>{buscaDadosGrupoId(id_grupo)}}
                                disableGutters>
                                <ListItemText primary={nm_tema} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Modal>
            <Modal open={openModalUsuario} onClose={()=>{setOpenModalUsuario(false)}}>
                <Box sx={{ position: "absolute", top: "50%", left: "50%", width: 500, height: 500, backgroundColor: "background.paper", border: "2px solid #000", borderRadius: 3, boxShadow: 24, transform: "translate(-50%, -50%)",p:4}}>
                    <Typography variant="h5" sx={{ textAlign: "center", marginBottom: 2, marginTop: 2 }}>Digite o nome do usuario</Typography>
                    <Paper sx={{width:490,maxHeight:500,display:"flex", alignItems:"center"}}>
                        <InputBase
                            sx={{width:440,paddingLeft:1}}
                            placeholder="Digite o nome do usuario"
                            value={nomeUsuario}
                            onChange={(e)=>{setNomeUsuario(e.target.value)}}
                            onKeyUp={handleBuscaUsuarioNome}
                        />
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={buscaUsuarioPorNome}>
                            <Search />
                        </IconButton>
                    </Paper>
                    <List sx={{ width:490, maxHeight:350, alignContent: "center", justifyContent: "center", flexGrow:1, overflow: "auto", paddingRight:2,marginTop:2 }}>
                        { !(usuariosEncontrados.length === 0) && usuariosEncontrados.map(({id_usuario,nm_usuario}) => (
                            <ListItem sx={{ borderRadius: 2, border: "solid #bbbbbb", borderWidth: 1, marginBottom: 1, paddingLeft: 1,width:470,maxWidth:470, maxHeight:75,overflow:"auto","&:hover":{cursor:"pointer"}}}
                                key={id_usuario}
                                onClick={()=>{buscaDadosUsuarioId(id_usuario)}}
                                disableGutters>
                                <ListItemText primary={nm_usuario} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Modal>
        </Drawer>
    );
}