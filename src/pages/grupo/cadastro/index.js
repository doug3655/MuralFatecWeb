import "./style.css"
import { useState } from 'react';
import { Button,TextField,Select,MenuItem,FormControl,InputLabel,FormGroup,FormControlLabel,Checkbox,FormLabel,Stack,Typography  } from "@mui/material";

export default function GrupoCadastro(){
    const [grupoCurso, setGrupoCurso] = useState();
    const [grupoPeriodo, setGrupoPeriodo] = useState();
    const [grupoOrientador, setGrupoOrientador] = useState();

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
                    autoFocus
                    sx={{ margin:2,width:500 }}
                />
            <FormControl>
                <InputLabel id="CursoLabel" required>Curso</InputLabel>
                <Select
                    labelId="CursoLabel"
                    value={grupoCurso}
                    label="Curso"
                    onChange={(e) => {setGrupoCurso(e.target.value)}}
                    color="dark"
                    sx={{ width:500 }}
                    required
                >
                    <MenuItem value={"ADS"}>Analise e Desenvolvimento de Sistemas</MenuItem>
                    <MenuItem value={"JD"}>Jogos Digitais</MenuItem>
                    <MenuItem value={"LOG"}>Logistica</MenuItem>
                    <MenuItem value={"SI"}>Sistemas para Internet</MenuItem>
                    <MenuItem value={"SEC"}>Secretariado</MenuItem>
                    <MenuItem value={"DMD"}>Design de Midias Digitais</MenuItem>
                    <MenuItem value={"GE"}>Gestao Empresarial – EAD</MenuItem>
                </Select>
            </FormControl>
            <FormGroup sx={{marginTop:2,marginBottom:1}}>
                <FormLabel component="legend">Selecione a disciplina matriculada:</FormLabel>
            </FormGroup>
            <FormGroup row sx={{width:500,justifyContent:"center"}}>
                <FormControlLabel control={<Checkbox/>} label="TG I" sx={{width:100}}/>
                <FormControlLabel control={<Checkbox/>} label="TG II" sx={{width:100}}/>
            </FormGroup>
            <FormControl sx={{marginTop:2}}>
                <InputLabel id="PeriodoLabel" required>Periodo</InputLabel>
                <Select
                    labelId="PeriodoLabel"
                    value={grupoPeriodo}
                    label="Periodo"
                    onChange={(e) => {setGrupoPeriodo(e.target.value)}}
                    color="dark"
                    sx={{ width:500 }}
                >
                    <MenuItem value={"Matutino"}>Matutino</MenuItem>
                    <MenuItem value={"Vespetino"}>Vespetino</MenuItem>
                    <MenuItem value={"Noturno"}>Noturno</MenuItem>
                </Select>
            </FormControl>
            <FormControl sx={{marginTop:2}}>
                <InputLabel id="OrientadorLabel" required sx={{width:100}}>Orientador</InputLabel>
                <Select
                    labelId="OrientadorLabel"
                    value={grupoOrientador}
                    label="Orientador"
                    onChange={(e) => {setGrupoOrientador(e.target.value)}}
                    color="dark"
                    sx={{ width:500 }}
                >
                    <MenuItem value={"Lobianco"}>Lobianco</MenuItem>
                    <MenuItem value={"Machion"}>Machion</MenuItem>
                    <MenuItem value={"Rita"}>Rita</MenuItem>
                    <MenuItem value={"Rosana"}>Rosana</MenuItem>
                </Select>
            </FormControl>
            <Stack direction="row" spacing={2} sx={{marginTop:2}}>
                <Button variant="contained" color="success">
                    Criar Grupo
                </Button>
                <Button variant="contained" color="primary">
                    Cancelar
                </Button>
            </Stack>
        </div>
    );
}