import "./style.css"
import { Button,TextField } from "@mui/material";

export default function Login(){
    return (
        <div className="fundo-login" color="modal">
            <h3>Bem Vindo ao Mural Fatec</h3>
            <div id="divUsuarioLogin">
                <TextField
                    required
                    size="small"
                    id="Usuario"
                    label="Usuario"
                    name="Usuario"
                    autoComplete="Usuario"
                    color="dark"
                    autoFocus
                    sx={{ margin: 2 }}
                />
            </div>
            <div id="divSenhaLogin">
                <TextField
                    required
                    size="small"
                    id="Senha"
                    label="Senha"
                    name="Senha"
                    autoComplete="Senha"
                    color="dark"
                    type="password"
                    sx={{ margin: 2 }}
                />
            </div>
            <div id="divButtonsLogin">
            <Button variant="contained" color="success" sx={{ margin: 2 }}>
                Entrar
            </Button>
            <Button variant="contained" color="primary">
                Cadastrar
            </Button>
            </div>
        </div>
    );
}