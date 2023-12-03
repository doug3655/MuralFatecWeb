import "./style.css"
import { useState,useEffect,useContext } from 'react';
import { Button,TextField,Select,MenuItem,FormControl,InputLabel,FormGroup,FormControlLabel,Checkbox,FormLabel,Stack,Typography  } from "@mui/material";
import { toast } from 'react-toastify';
import { ContextoToastConfig } from "../../../context";

export default function GrupoCadastro(){
    const [grupoCurso, setGrupoCurso] = useState('');
    const [grupoPeriodo, setGrupoPeriodo] = useState('');
    const [grupoOrientador, setGrupoOrientador] = useState('');
    const [tema,setTema] = useState('');
    const [cursos,setCursos] = useState([{nm_curso:" ",id_tp_curso:0}]);
    const [periodos,setPeriodos] = useState([{nm_periodo:" ",id_tp_periodo:0}]);
    const [orientadores,setOrientadores] = useState([{nm_usuario:" ",id_usuario:0}]);
    const [checked, setChecked] = useState([false, false]);

    const toastProps = useContext(ContextoToastConfig);


    useEffect(() => {
        buscaCursos();
        buscaPeriodos();
        buscaOrientadores();
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
        
    }

    return (   
        <div className="fundo-cadastro">
            <Typography variant="h5" sx={{marginBottom:2}}>Cadastro de Grupo</Typography>
            <Typography variant="h6">Preencha os dados para criar o grupo</Typography>
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
            <Stack direction="row" spacing={2} sx={{marginTop:2}}>
                <Button variant="contained" color="success" onClick={cadastrarGrupo}>
                    Criar Grupo
                </Button>
                <Button variant="contained" color="primary">
                    Cancelar
                </Button>
            </Stack>
        </div>
    );
}