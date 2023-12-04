import "./style.css"
import { useState,useEffect,useContext } from 'react';
import { Button,TextField,Select,MenuItem,FormControl,InputLabel,FormGroup,FormControlLabel,Checkbox,FormLabel,Stack,Typography,List,ListItem,ListItemText,IconButton  } from "@mui/material";
import { toast } from 'react-toastify';
import { ContextoToastConfig } from "../../../context";
import { useNavigate } from "react-router-dom"

export default function GrupoCadastro(){
    const [grupoCurso, setGrupoCurso] = useState('');
    const [grupoPeriodo, setGrupoPeriodo] = useState('');
    const [grupoOrientador, setGrupoOrientador] = useState('');
    const [tema,setTema] = useState('');
    const [cursos,setCursos] = useState([{nm_curso:" ",id_tp_curso:0}]);
    const [periodos,setPeriodos] = useState([{nm_periodo:" ",id_tp_periodo:0}]);
    const [orientadores,setOrientadores] = useState([{nm_usuario:" ",id_usuario:0}]);
    const [checked, setChecked] = useState([false, false]);
    const [isVisualizar,setIsVisualizar] = useState(false);
    const [listaDados,setListaDados] = useState([{}]);
    const [perfilUsuario,setPerfilUsuario] = useState(0);
    const toastProps = useContext(ContextoToastConfig);
    const navegate = useNavigate();

    useEffect(() => {
        buscaCursos();
        buscaPeriodos();
        buscaOrientadores();
        recuperarDadosGrupo();
        // eslint-disable-next-line
    }, []);

    async function buscaCursos(){
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"busca-cursos", {
                method: "GET",
            });
            if (response.ok) {
                const cursosResult = await response.json();
                setCursos(cursosResult);
            }else{
                toast.error("Erro ao buscar os Cursos",{toastProps});
            }
        } catch (error) {
            console.log(error)
            toast.error("Erro ao realizar a busca dos Cursos",{toastProps})
        }
    };

    async function buscaPeriodos(){
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"busca-periodos", {
                method: "GET",
            });
            if (response.ok) {
                const periodoResult = await response.json();
                setPeriodos(periodoResult);
            }else{
                toast.error("Erro ao buscar os Periodos",{toastProps});
            }
        } catch (error) {
            console.log(error)
            toast.error("Erro ao realizar a busca dos Periodos",{toastProps})
        }
    };

    async function buscaOrientadores(){
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"busca-orientadores", {
                method: "GET",
            });
            if (response.ok) {
                const orientadoresResult = await response.json();
                setOrientadores(orientadoresResult);
            }else{
                toast.error("Erro ao buscas os Orientadores",{toastProps});
            }
        } catch (error) {
            console.log(error)
            toast.error("Erro ao realizar a busca dos Orientadores",{toastProps})
        }
    };

    async function cadastrarGrupo(){
        try {
            let usuario = JSON.parse(sessionStorage.getItem("usuario"));
            let payload = {
                nm_tema:tema,
                id_orientador:grupoOrientador,
                id_tp_curso:grupoCurso,
                id_tp_periodo:grupoPeriodo,
                id_tp_status:3,
                id_tp_status_vinculo:3,
                fl_tg1:checked[0],
                fl_tg2:checked[1],
                Alunos:[{
                    id_usuario:usuario.id_usuario,
                    nm_usuario:usuario.nm_usuario
                }]
            };
            console.log(JSON.stringify(payload));
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"registrar-grupo", {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                toast.success("Grupo cadastrado com sucesso",{toastProps});
                sessionStorage.setItem("isBuscarGrupo",true);
                sessionStorage.setItem("dadosGrupo",JSON.stringify(payload));
                navegate('/GrupoVisualizar');
            }else{
                toast.error("Erro ao cadastrar grupo",{toastProps});
            }
        } catch (error) {
            console.log(error)
            toast.error("Erro ao realizar o cadastro do grupo",{toastProps})
        }
    };

    async function recuperarDadosGrupo(){
        let isDadosgrupo = JSON.parse(sessionStorage.getItem("isBuscarGrupo"));
        setIsVisualizar(isDadosgrupo);
        if(!isDadosgrupo){
            sessionStorage.removeItem("dadosGrupo");
        }else{
            let dadosGrupo = sessionStorage.getItem("dadosGrupo");
            let dadosUsuario = JSON.parse(sessionStorage.getItem("usuario"));
            setPerfilUsuario(dadosUsuario.id_tp_perfil_usuario);
            if(dadosGrupo !== null){
                dadosGrupo = JSON.parse(dadosGrupo);
                setTema(dadosGrupo.nm_tema);
                setGrupoCurso(dadosGrupo.id_tp_curso);
                setGrupoPeriodo(dadosGrupo.id_tp_curso);
                setGrupoOrientador(dadosGrupo.id_orientador);
                // eslint-disable-next-line
                setChecked({...checked,[0]:dadosGrupo.fl_tg1,[1]:dadosGrupo.fl_tg2});
                setListaDados([{textoLinha:dadosUsuario.nm_usuario,idLinha:dadosUsuario.id_usuario}]);
            }else{
                //buscar Dados do grupo no banco
            }
        }
    };

    return (   
        <div className="fundo-cadastro-grupo">
            <Typography variant="h5" sx={{marginTop:3,marginBottom:2}}>{isVisualizar?'Dados do grupo':'Cadastro de Grupo'}</Typography>
            <Typography variant="h6">{isVisualizar?'':'Preencha os dados para criar o grupo'}</Typography>
            <TextField
                    required
                    size="small"
                    id="Tema"
                    label="Tema"
                    name="Tema"
                    autoComplete="Tema"
                    color="dark"
                    sx={{ margin:2,width:500 }}
                    value={tema}
                    onChange={(e) => {setTema(e.target.value)}}
                />
            <FormControl>
                <InputLabel id="CursoLabel" required>Curso</InputLabel>
                    <Select
                    labelId="CursoLabel"
                    label="Curso"
                    onChange={(e) => {setGrupoCurso(e.target.value)}}
                    color="dark"
                    sx={{ width:500 }}
                    value={grupoCurso}
                    required>
                    {cursos.map((item)=>{
                        return (
                         <MenuItem key={item.id_tp_curso} value={item.id_tp_curso}>{item.nm_curso}</MenuItem>
                    )})}
                    </Select>
            </FormControl>
            <FormGroup sx={{marginTop:2,marginBottom:1}}>
                <FormLabel component="legend">Selecione a disciplina matriculada:</FormLabel>
            </FormGroup>
            <FormGroup row sx={{width:500,justifyContent:"center"}}>
                <FormControlLabel control={<Checkbox checked={checked[0]} onChange={(e)=>{setChecked({...checked,[0]:e.target.checked})}}/>} label="TG I" sx={{width:100}}/>
                <FormControlLabel control={<Checkbox checked={checked[1]} onChange={(e)=>{setChecked({...checked,[1]:e.target.checked})}}/>} label="TG II" sx={{width:100}}/>
            </FormGroup>
            <FormControl sx={{marginTop:2}}>
                <InputLabel id="PeriodoLabel" required>Periodo</InputLabel>
                <Select
                    labelId="PeriodoLabel"
                    label="Periodo"
                    onChange={(e) => {setGrupoPeriodo(e.target.value)}}
                    color="dark"
                    sx={{ width:500 }}
                    value={grupoPeriodo}>
                    {periodos.map((item) => {
                        return (
                            <MenuItem key={item.id_tp_periodo} value={item.id_tp_periodo}>{item.nm_periodo}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <FormControl sx={{marginTop:2}}>
                <InputLabel id="OrientadorLabel" required sx={{width:100}}>Orientador</InputLabel>
                <Select
                    labelId="OrientadorLabel"
                    label="Orientador"
                    onChange={(e) => {setGrupoOrientador(e.target.value)}}
                    color="dark"
                    sx={{ width:500 }}
                    value={grupoOrientador}>
                    {orientadores.map((item) => {
                        return (
                            <MenuItem key={item.id_usuario} value={item.id_usuario}>{item.nm_usuario}</MenuItem>
                        )
                    })}
                </Select>
            </FormControl>
            <Typography variant="h6" sx={{marginTop:2,marginBottom:2}}>{isVisualizar?'Membros do Grupo':''}</Typography>
            {isVisualizar && 
            <List sx={{width:500}}>
                {listaDados.map(({textoLinha,idLinha}) =>(
                    <ListItem sx={{borderRadius:2,border:"solid #bbbbbb",borderWidth:1,marginBottom:1,paddingLeft:1,width:500}}
                    key={idLinha}
                    disableGutters>
                        <ListItemText primary={textoLinha}/>
                  </ListItem>
                ))}
            </List>}
 
            <Stack direction="row" spacing={2} sx={{marginTop:2,marginBottom:3}}>
                <Button variant="contained" color="success" onClick={cadastrarGrupo}>
                    {isVisualizar?'Alterar Grupo':'Criar Grupo'}
                </Button>
                {(isVisualizar && perfilUsuario === 1) && 
                <Button variant="contained" color="cancel">
                    Sair do Grupo
                </Button>}
                <Button variant="contained" color="primary">
                    Cancelar
                </Button>
            </Stack>
        </div>
    );
}