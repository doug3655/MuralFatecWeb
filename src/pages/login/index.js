import "./style.css"
import { Link,useNavigate } from "react-router-dom"
import { useState,useEffect,useContext } from 'react';
import { Button,TextField,Stack,Typography } from "@mui/material";
import { toast } from 'react-toastify';
import { ContextoToastConfig } from "../../context";

export default function Login(){
    const [Email, setEmail] = useState("");
    const [EmailErro, setEmailErro] = useState("");
    const [Senha, setSenha] = useState("");
    const [SenhaErro, setSenhaErro] = useState("");
    const navegate = useNavigate();
    const toastProps = useContext(ContextoToastConfig);

    function limpaDados(){
        sessionStorage.removeItem("usuario");
    }

    useEffect(() => {
        limpaDados();
    }, []);

    async function realizarLogin(){
        if(validarDadaos()){
            let payload = {
                nm_email:Email,
                nm_senha:Senha
            } 
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+"realiza-login", {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    toast.success("Login Realizado com Sucesso",{toastProps});
                    const usuario = await response.json();
                    sessionStorage.setItem("usuario",JSON.stringify(usuario));
                    navegate('/Home');
                }else{
                    toast.error("Erro ao realizar a busca do usuario",{toastProps});
                }
            }catch(error){
                toast.error("Erro ao realizar o login",{toastProps});
            }
        }
    }

    function validarDadaos(){
        let validacao = true;
        if(!Email){
            setEmailErro("Digite o Email!");
            validacao = false;
        }else{
            setEmailErro("");
        }
        if(!Senha){
            setSenhaErro("Digite a Senha!");
            validacao = false;
        }else{
            setSenhaErro("");
        }
        return validacao;
    }
    return (
        <div className="fundo-login" color="modal">
            <Typography variant="h5">Bem Vindo ao Mural Fatec</Typography>
            <TextField
                required
                size="small"
                id="Usuario"
                label="Usuario"
                name="Usuario"
                autoComplete="Usuario"
                color="dark"
                autoFocus
                sx={{ margin: 2,width:500  }}
                onChange={e => setEmail(e.target.value)}
                helperText={EmailErro}
                error={!!EmailErro}
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
                onChange={e => setSenha(e.target.value)}
                helperText={SenhaErro}
                error={!!SenhaErro}
            />
            <Stack direction="row" spacing={2} marginTop={2}>
                <Button variant="contained" color="success" sx={{ margin: 2 }} onClick={realizarLogin}>
                    Entrar
                </Button>
                <Button variant="contained" color="primary" component={Link} to="/Cadastro">
                    Cadastrar
                </Button>
            </Stack>
        </div>
    );
}