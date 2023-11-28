import "./style.css"
import { Button,TextField,Stack,Typography  } from "@mui/material";

export default function Login(){
    return (
        <div className="fundo-cadastro">
            <Typography variant="h5" sx={{marginBottom:2}}>Bem Vindo ao Mural Fatec</Typography>
            <Typography variant="h6">Preencha os dados para se cadastrar</Typography>
                <TextField
                    required
                    size="small"
                    id="Nome"
                    label="Nome"
                    name="Nome"
                    autoComplete="Nome"
                    color="dark"
                    autoFocus
                    sx={{ margin: 2,width:500 }}
                />
                <TextField
                    required
                    size="small"
                    id="RA"
                    label="RA"
                    name="RA"
                    autoComplete="RA"
                    color="dark"
                    autoFocus
                    sx={{ margin: 2,width:500  }}
                />
                <TextField
                    required
                    size="small"
                    id="Telefone"
                    label="Telefone"
                    name="Telefone"
                    autoComplete="Telefone"
                    color="dark"
                    autoFocus
                    sx={{ margin: 2,width:500  }}
                />
                <TextField
                    required
                    size="small"
                    id="Email"
                    label="Email"
                    name="Email"
                    autoComplete="Email"
                    color="dark"
                    autoFocus
                    sx={{ margin: 2,width:500  }}
                />
                <TextField
                    required
                    size="small"
                    id="Senha"
                    label="Senha"
                    name="Senha"
                    autoComplete="Senha"
                    color="dark"
                    type="password"
                    sx={{ margin: 2,width:500  }}
                />
                <TextField
                    required
                    size="small"
                    id="ConfirmarSenha"
                    label="Confirmar Senha"
                    name="ConfirmarSenha"
                    autoComplete="Confirmar Senha"
                    color="dark"
                    type="password"
                    sx={{ margin: 2,width:500  }}
                />
            <Stack direction="row" spacing={2}>
                <Button variant="contained" color="success" sx={{ margin: 2 }}>
                    Cadastrar
                </Button>
                <Button variant="contained" color="primary">
                    Cancelar
                </Button>
            </Stack>
        </div>
    );
}