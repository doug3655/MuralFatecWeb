import "./style.css"
import { useState,useEffect,useContext } from 'react';
import { Button,TextField,Select,MenuItem,FormControl,InputLabel,FormGroup,FormControlLabel,Checkbox,FormLabel,Stack,Typography,List,ListItem,ListItemText,Modal,Box,Paper,InputBase,IconButton,FormHelperText  } from "@mui/material";
import { Search,Cancel } from "@mui/icons-material";
import { toast } from 'react-toastify';
import { ContextoToastConfig } from "../../../context";
import { useNavigate } from "react-router-dom"

export default function GrupoCadastro(){
    const [grupoCurso, setGrupoCurso] = useState('');
    const [grupoCursoErro,setGrupoCursoErro] = useState('');
    const [grupoPeriodo, setGrupoPeriodo] = useState('');
    const [grupoPeriodoErro, setGrupoPeriodoErro] = useState('');
    const [grupoOrientador, setGrupoOrientador] = useState('');
    const [grupoOrientadorErro, setGrupoOrientadorErro] = useState('');
    const [tema,setTema] = useState('');
    const [temaErro,setTemaErro] = useState('');
    const [cursos,setCursos] = useState([{nm_curso:" ",id_tp_curso:0}]);
    const [periodos,setPeriodos] = useState([{nm_periodo:" ",id_tp_periodo:0}]);
    const [orientadores,setOrientadores] = useState([{nm_usuario:" ",id_usuario:0}]);
    const [checked, setChecked] = useState([false, false]);
    const [checkedErro,setCheckedErro] = useState('');
    const [isVisualizar,setIsVisualizar] = useState(false);
    const [listaDados,setListaDados] = useState([{nm_usuario:"",id_usuario:0}]);
    const [perfilUsuario,setPerfilUsuario] = useState(0);
    const [idGrupo, setIdGrupo] = useState('');
    const [idUsuario,setIdUsuario] = useState('');
    const [idUsuarioRemover,setIdUsuarioRemover] = useState('');
    const [nomeUsuario,setNomeUsuario] = useState('');
    const [usuariosEncontrados,setUsuariosEncontrados] = useState([]);
    const [open,setOpen] = useState(false);
    const [openVinculo,setOpenVinculo] = useState(false);
    const [openModalUsuario,setOpenModalUsuario] = useState(false);
    const [openModalRemoverUsuario,setOpenModalRemoverUsuario] = useState(false);
    const [statusVinculo,setStatusVinculo] = useState('');
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
            console.log(error);
            toast.error("Erro ao realizar a busca dos Cursos",{toastProps});
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
            toast.error("Erro ao realizar a busca dos Periodos",{toastProps});
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

    function validarCampos(){
        let validacao = true;
        if(!tema){
            validacao = false;
            setTemaErro("Digite o tema!");
        }else{
            setTemaErro("");
        }
        if(!grupoCurso){
            validacao = false;
            setGrupoCursoErro("Selecione o grupo!");
        }else{
            setGrupoCursoErro("");
        }
        if(!grupoPeriodo){
            validacao = false;
            setGrupoPeriodoErro("Selecione o periodo!");
        }else{
            setGrupoPeriodoErro("");
        }
        if(!grupoOrientador){
            validacao = false;
            setGrupoOrientadorErro("Selecione o orientador!");
        }else{
            setGrupoOrientadorErro("");
        }
        if(!checked[0] && !checked[1]){
            validacao = false;
            setCheckedErro("Selecione ao menos 1 disciplina!");
        }else{
            setCheckedErro("");
        }
        return validacao;
    }

    async function cadastrarGrupo(){
        if(validarCampos()){
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
                    alunos:[{
                        id_usuario:usuario.id_usuario,
                        nm_usuario:usuario.nm_usuario,
                        nr_ra:usuario.nr_ra
                    }]
                };
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+"registrar-grupo", {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    toast.success("Grupo cadastrado com sucesso",{toastProps});
                    navegate('/Home');
                }else{
                    toast.error("Erro ao cadastrar grupo",{toastProps});
                }
            } catch (error) {
                console.log(error)
                toast.error("Erro ao realizar o cadastro do grupo",{toastProps});
            }
        }
    };

    async function alterarDadosGrupo(){
        if(validarCampos()){
            try {
                let payload = {
                    id_grupo:idGrupo,
                    nm_tema:tema,
                    id_orientador:grupoOrientador,
                    id_tp_curso:grupoCurso,
                    id_tp_periodo:grupoPeriodo,
                    id_tp_status:3,
                    id_tp_status_vinculo:4,
                    fl_tg1:checked[0],
                    fl_tg2:checked[1]
                };
                console.log(JSON.stringify(payload));
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+"alterar-grupo", {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    toast.success("Grupo alterado com sucesso",{toastProps});
                }else{
                    toast.error("Erro ao alterar o grupo",{toastProps});
                }
            } catch (error) {
                console.log(error);
                toast.error("Erro ao realizar a alteração dos dados do grupo",{toastProps});
            }
        }
    };

    async function recuperarDadosGrupo(){
        let isVisualizarGrupo = JSON.parse(sessionStorage.getItem("isVisualizarGrupo"));
        setIsVisualizar(isVisualizarGrupo);
        if(!isVisualizarGrupo){
            sessionStorage.removeItem("dadosGrupo");
        }else{
            let dadosUsuario = JSON.parse(sessionStorage.getItem("usuario"));
            let dadosGrupo = JSON.parse(sessionStorage.getItem("dadosGrupo"));
            setPerfilUsuario(dadosUsuario.id_tp_perfil_usuario);
            if(dadosGrupo !== null){
                setIdUsuario(dadosUsuario.id_usuario);
                setIdGrupo(dadosGrupo.id_grupo);
                setTema(dadosGrupo.nm_tema);
                setGrupoCurso(dadosGrupo.id_tp_curso);
                setGrupoPeriodo(dadosGrupo.id_tp_curso);
                setGrupoOrientador(dadosGrupo.id_orientador);
                let status = dadosGrupo.id_tp_status_vinculo;
                switch (status){
                    case 1:
                        setStatusVinculo("Aprovado");
                        break;
                    case 2:
                        setStatusVinculo("Recusado");
                        break;
                    case 3:
                        setStatusVinculo("Pendente");
                        break;
                    default:
                        break;
                }
                // eslint-disable-next-line
                setChecked({...checked,[0]:dadosGrupo.fl_tg1,[1]:dadosGrupo.fl_tg2});
                setListaDados(dadosGrupo.alunos);
            }else{
                toast.error("Voce não esta em um grupo",{toastProps});
            }
        }
    };

    async function sairAlunoGrupo(){
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"aluno-sair-grupo/"+idUsuario+"/"+idGrupo, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                toast.success("Voce saiu do grupo",{toastProps});
                navegate('/Home');
            }else{
                toast.error("Erro ao alterar o grupo",{toastProps});
            }
        } catch (error) {
            console.log(error);
            toast.error("Erro ao realizar a alteração dos dados do grupo",{toastProps});
        }
    };

    async function gerarPdfVinculo(isPrimeiroVinculo){
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"pdf-vinculo-tg-i-ii/"+idGrupo+"/"+isPrimeiroVinculo, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if(response.ok){
                var pdf = await response.blob();
                var link=document.createElement('a');
                link.href=window.URL.createObjectURL(pdf);
                link.download="Vinculo.pdf";
                link.click();
                setOpenVinculo(false);
                setStatusVinculo("Pendente");
                let dadosGrupo = JSON.parse(sessionStorage.getItem("dadosGrupo"));
                dadosGrupo.id_tp_status_vinculo = 3;
                sessionStorage.setItem("dadosGrupo",JSON.stringify(dadosGrupo));
            }else{
                toast.error("Erro ao gerar PDF",{toastProps})
            }
        }catch(error){
            console.log(error);
            toast.error("Erro ao gerar PDF",{toastProps});
        }
    };

    async function buscaAlunoPorNome(){
        let usuarios = null;
        try{
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"busca-aluno-nome/"+nomeUsuario, {
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
    };

    function handleBuscaUsuarioNome(event){
        if(event.key === 'Enter'){
            buscaAlunoPorNome();
        }
    }

    async function cadastrarAlunoGrupo(id_usuario,nm_usuario){
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"registrar-aluno-grupo/"+id_usuario+"/"+idGrupo, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                setListaDados(listaDados => [...listaDados,{nm_usuario:nm_usuario,id_usuario:id_usuario}]);
                setOpenModalUsuario(false);
                toast.success("Aluno adicionado ao grupo",{toastProps});
            }else{
                toast.error("Não foi possivel adicionar o aluno no grupo",{toastProps});
            }
        } catch (error) {
            console.log(error);
            toast.error("Erro ao adicionar o aluno no grupo",{toastProps});
        }
    };

    async function removerAlunoGrupo(){
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"remover-aluno-grupo/"+idUsuarioRemover+"/"+idGrupo, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const alunosRestantes = await response.json();
                toast.success("Aluno removido com sucesso",{toastProps});
                setListaDados(listaDados.filter(item => item.id_usuario !== idUsuarioRemover));
                setOpenModalRemoverUsuario(false);
                let dadosGrupo = JSON.parse(sessionStorage.getItem("dadosGrupo"));
                dadosGrupo.alunos = dadosGrupo.alunos.filter(item => item.id_usuario !== idUsuarioRemover);
                sessionStorage.setItem("dadosGrupo",JSON.stringify(dadosGrupo));
                if(alunosRestantes<1){
                    toast.warning("Grupo encerrado por não possuir nenhum aluno",{toastProps});
                    navegate('/Home');
                }
            }else{
                setOpenModalRemoverUsuario(false);
                toast.error("Erro ao remover aluno do grupo",{toastProps});
            }
        } catch (error) {
            console.log(error);
            setOpenModalRemoverUsuario(false);
            toast.error("Erro durante a removeção do aluno do grupo",{toastProps});
        }
    }

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
                    helperText={temaErro}
                    error={!!temaErro}
                    {...(isVisualizar && perfilUsuario===1 ) && {disabled:true}}
                    onChange={(e) => {setTema(e.target.value)}}
                />
            <FormControl error={!!grupoCursoErro}>
                <InputLabel id="CursoLabel" required>Curso</InputLabel>
                    <Select
                    labelId="CursoLabel"
                    label="Curso"
                    onChange={(e) => {setGrupoCurso(e.target.value)}}
                    color="dark"
                    sx={{ width:500 }}
                    value={grupoCurso}
                    {...(isVisualizar && perfilUsuario===1 ) && {disabled:true}}
                    required>
                    {cursos.map((item)=>{
                        return (
                         <MenuItem key={item.id_tp_curso} value={item.id_tp_curso}>{item.nm_curso}</MenuItem>
                    )})}
                    </Select>
                    <FormHelperText>{grupoCursoErro}</FormHelperText>
            </FormControl>
            <FormGroup sx={{marginTop:2,marginBottom:1}}>
                <FormLabel component="legend">Selecione a disciplina matriculada:</FormLabel>
            </FormGroup>
            <FormControl error={!!checkedErro} sx={{alignItems:"center"}}>
            <FormGroup row sx={{width:500,justifyContent:"center"} } >
                <FormControlLabel {...(isVisualizar && perfilUsuario===1 ) && {disabled:true}} control={<Checkbox checked={checked[0]} onChange={(e)=>{setChecked(
                    // eslint-disable-next-line
                    {...checked,[0]:e.target.checked})}}/>} label="TG I" sx={{width:100}}/>
                <FormControlLabel {...(isVisualizar && perfilUsuario===1 ) && {disabled:true}} control={<Checkbox checked={checked[1]} onChange={(e)=>{setChecked(
                    // eslint-disable-next-line
                    {...checked,[1]:e.target.checked})}}/>} label="TG II" sx={{width:100}}/>
            </FormGroup>
            <FormHelperText>{checkedErro}</FormHelperText>
            </FormControl>
            <FormControl {...(isVisualizar && perfilUsuario===1 ) && {disabled:true}} sx={{marginTop:2}} error={!!grupoPeriodoErro}>
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
                <FormHelperText>{grupoPeriodoErro}</FormHelperText>
            </FormControl>
            <FormControl {...(isVisualizar && perfilUsuario===1 ) && {disabled:true}} sx={{marginTop:2}} error={!!grupoOrientadorErro}>
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
                <FormHelperText>{grupoOrientadorErro}</FormHelperText>
            </FormControl>
            {isVisualizar && <TextField
                    size="small"
                    id="Vinculo"
                    label="Vinculo"
                    name="Vinculo"
                    autoComplete="Vinculo"
                    color="dark"
                    sx={{ margin:2,width:500,
                        "& .MuiInputBase-input.Mui-disabled": {
                          WebkitTextFillColor: "#121212",
                        }
                    }}
                    value={statusVinculo}
                    onChange={(e) => {setStatusVinculo(e.target.value)}}
                    disabled
                />}
            <Typography variant="h6" sx={{marginTop:2,marginBottom:2}}>{isVisualizar?'Membros do Grupo':''}</Typography>
            {isVisualizar && 
            <List sx={{width:500}}>
                {listaDados.map(({nm_usuario,id_usuario}) =>(
                    <ListItem sx={{borderRadius:2,border:"solid #bbbbbb",borderWidth:1,marginBottom:1,paddingLeft:1,width:500}}
                    key={id_usuario}
                    disableGutters>
                        <ListItemText primary={nm_usuario} />
                        {(isVisualizar && perfilUsuario !== 1) &&
                            <IconButton onClick={() => { setIdUsuarioRemover(id_usuario);setOpenModalRemoverUsuario(true); }}>
                                <Cancel color="cancel" />
                            </IconButton>
                        }
                    </ListItem>
                ))}
            </List>}
            <Stack direction="row" spacing={2} sx={{marginTop:2,marginBottom:3}}>
                {perfilUsuario !== 1 && <Button variant="contained" color="success" onClick={isVisualizar?alterarDadosGrupo:cadastrarGrupo}>
                    {isVisualizar?'Alterar Grupo':'Criar Grupo'}
                </Button>
                }
                {isVisualizar && <Button variant="contained" color="success" onClick={()=>{setOpenVinculo(true)}}>
                    Gerar Vinculo
                </Button>}
                {(isVisualizar && perfilUsuario !== 1) && <Button variant="contained" color="success" onClick={()=>{setOpenModalUsuario(true)}}>
                    Adicionar Aluno
                </Button>}
                {(isVisualizar && perfilUsuario === 1) && 
                <Button variant="contained" color="cancel" onClick={()=>{setOpen(true)}}>
                    Sair do Grupo
                </Button>}
            </Stack>
            <Modal open={open} onClose={()=>{setOpen(false)}} >
                <Box sx={{position:"absolute",top:"50%",left:"50%",width:400,backgroundColor:"background.paper",border:"2px solid #000",borderRadius:3,boxShadow:24,transform:"translate(-50%, -50%)",p:4}}>
                    <Typography variant="h5" sx={{textAlign:"center",marginBottom:2,marginTop:2}}>Deseja realmente sair do grupo?</Typography>
                    <Stack direction="row" spacing={2} sx={{marginTop:3,marginBottom:3,display:"flex",flexDirection:"column",flexWrap:"wrap",alignContent:"center"}}>
                        <Button variant="contained" color="error" sx={{width:190}} onClick={sairAlunoGrupo}>
                            Sair
                        </Button>
                    </Stack>
                </Box>
            </Modal>
            <Modal open={openVinculo} onClose={()=>{setOpenVinculo(false)}} >
                <Box sx={{position:"absolute",top:"50%",left:"50%",width:400,backgroundColor:"background.paper",border:"2px solid #000",borderRadius:3,boxShadow:24,transform:"translate(-50%, -50%)",p:4}}>
                    <Typography variant="h5" sx={{textAlign:"center",marginBottom:2,marginTop:2}}>Qual o tipo de vinculo?</Typography>
                    <Stack direction="row" spacing={2} sx={{marginTop:3,marginBottom:3,display:"flex",flexDirection:"row",flexWrap:"wrap",alignContent:"center"}}>
                        <Button variant="contained" color="success" sx={{width:190}} onClick={()=>{gerarPdfVinculo(true)}}>
                            Primeiro Vinculo
                        </Button>
                        <Button variant="contained" color="primary" sx={{width:190}} onClick={()=>{gerarPdfVinculo(false)}}>
                            Renovação do Vínculo 
                        </Button>
                    </Stack>
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
                        <IconButton type="button" sx={{ p: '10px' }} aria-label="search" onClick={buscaAlunoPorNome}>
                            <Search />
                        </IconButton>
                    </Paper>
                    <List sx={{ width:490, maxHeight:350, alignContent: "center", justifyContent: "center", flexGrow:1, overflow: "auto", paddingRight:2,marginTop:2 }}>
                        { !(usuariosEncontrados.length === 0) && usuariosEncontrados.map(({id_usuario,nm_usuario}) => (
                            <ListItem sx={{ borderRadius: 2, border: "solid #bbbbbb", borderWidth: 1, marginBottom: 1, paddingLeft: 1,width:470,maxWidth:470, maxHeight:75,overflow:"auto","&:hover":{cursor:"pointer"}}}
                                key={id_usuario}
                                onClick={()=>{cadastrarAlunoGrupo(id_usuario,nm_usuario)}}
                                disableGutters>
                                <ListItemText primary={nm_usuario} />
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Modal>
            <Modal open={openModalRemoverUsuario} onClose={()=>{setOpenModalRemoverUsuario(false)}}>
                <Box sx={{position:"absolute",top:"50%",left:"50%",width:400,backgroundColor:"background.paper",border:"2px solid #000",borderRadius:3,boxShadow:24,transform:"translate(-50%, -50%)",p:4}}>
                    <Typography variant="h5" sx={{textAlign:"center",marginBottom:2,marginTop:2}}>Deseja remover o aluno do grupo?</Typography>
                    <Stack direction="row" spacing={2} sx={{marginTop:3,marginBottom:3,display:"flex",flexDirection:"column",flexWrap:"wrap",alignContent:"center"}}>
                        <Button variant="contained" color="error" sx={{width:190}} onClick={removerAlunoGrupo}>
                            Remover
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </div>
    );
}