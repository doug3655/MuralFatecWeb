import "./style.css"
import { Link,useNavigate } from "react-router-dom"
import { Drawer, List, ListItemButton,ListItemText,Typography,Collapse} from "@mui/material"
import { useState,useEffect,useContext } from 'react';
import { toast } from 'react-toastify';
import { ContextoToastConfig } from "../../context";

export default function Menu(){
    const [grupoMenu, setGrupoMenu] = useState();
    const [usuarioMenu, setUsuarioMenu] = useState();
    const [perfilUsuario,setPerfilUsuario] = useState(0);
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

    async function setBuscarOuCriarGrupo(isBuscar){
        sessionStorage.setItem("isVisualizarGrupo",isBuscar);
        let grupo = await buscarDadosGrupo();
        console.log(grupo);
    };

    async function buscarDadosGrupo(){
        let grupo = null;
        try{
            let usuarioSession = sessionStorage.getItem("usuario");
            let usuario = JSON.parse(usuarioSession);
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"busca-dado-grupo/"+usuario.id_usuario, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                grupo = await response.json();
                sessionStorage.setItem("dadosGrupo",JSON.stringify(grupo));
            }else{
                toast.error("Erro durante a validacao de grupo",{toastProps});
            }
        }catch(error) {
            console.log(error)
            toast.error("Erro durante a validacao de grupo ",{toastProps});
        }
        return grupo;
    };

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
                        <ListItemButton component={Link} to="/DadosUsuario" sx={{ pl: 4 }}>
                            <ListItemText>
                                <Typography>
                                    Alterar dados
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                        {perfilUsuario===3 &&
                        <ListItemButton component={Link} to="/GrupoVisualizar" sx={{ pl: 4 }}>
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
                        {perfilUsuario===3 &&
                        <ListItemButton component={Link} to="/GrupoCadastro" sx={{ pl: 4 }} onClick={()=>{setBuscarOuCriarGrupo(false)}}>
                            <ListItemText>
                                <Typography>
                                    Criar Grupo
                                </Typography>
                            </ListItemText>
                        </ListItemButton>
                        }
                        <ListItemButton component={Link} to="/GrupoVisualizar" sx={{ pl: 4 }} onClick={()=>{setBuscarOuCriarGrupo(true)}}>
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
        </Drawer>
    );
}