import "./style.css"
import { useState } from 'react';
import { Button,TextField,Select,MenuItem,FormControl,InputLabel,FormGroup,FormControlLabel,Checkbox,FormLabel,Stack,Typography  } from "@mui/material";

export default function GrupoVisualizar(){
    const [grupoCurso, setGrupoCurso] = useState("ADS");
    const [grupoPeriodo, setGrupoPeriodo] = useState("Matutino");
    const [grupoOrientador, setGrupoOrientador] = useState("Lobianco");

    return (   
        <div className="fundo-cadastro">
            <Typography variant="h5">Dados do grupo</Typography>
            <TextField
                    required
                    size="small"
                    id="Tema"
                    label="Tema"
                    name="Tema"
                    autoComplete="Tema"
                    color="dark"
                    defaultValue={"MURAL: Sistema de gerenciamento de TG"}
                    sx={{ margin:2,width:500 }}
                />
            <FormControl disabled>
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
                <FormControlLabel control={<Checkbox defaultChecked />} label="TG I" sx={{width:100}} disabled/>
                <FormControlLabel control={<Checkbox defaultChecked />} label="TG II" sx={{width:100}} disabled/>
            </FormGroup>
            <FormControl sx={{marginTop:2}} disabled>
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
            <FormControl sx={{marginTop:2}} disabled>
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
                <Button variant="contained" color="success" sx={{width:100}}>
                    Salvar
                </Button>
                <Button variant="contained" color="primary" sx={{width:100}}>
                    Cancelar
                </Button>
            </Stack>
        </div>
    );
}