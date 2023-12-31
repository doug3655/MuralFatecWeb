import "./style.css"
import { useState,useEffect,useContext,forwardRef } from 'react';
import { useNavigate } from "react-router-dom"
import { Button,TextField,Stack,Typography  } from "@mui/material";
import { toast } from 'react-toastify';
import { ContextoToastConfig } from "../../context";
import { IMaskInput } from 'react-imask';

const MaskTelefone = forwardRef(function MaskTelefone(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="(00)00000-0000"
        onAccept={(value) => onChange({ target: { name: props.name, value } })}
        inputRef={ref}
        overwrite
      />
    );
  });

export default function CadastroUsuario(){
    const [telefoneFiltrado,setTelefoneFiltrado] = useState("");
    const [Nome, setNome] = useState("");
    const [NomeErro, setNomeErro] = useState("");
    const [RA, setRA] = useState("");
    const [RAErro, setRAErro] = useState("");
    const [Telefone, setTelefone] = useState("");
    const [TelefoneErro, setTelefoneErro] = useState("");
    const [Email, setEmail] = useState("");
    const [EmailErro, setEmailErro] = useState("");
    const [Senha, setSenha] = useState("");
    const [SenhaErro, setSenhaErro] = useState("");
    const [ConfirmaSenha, setConfirmaSenha] = useState("");
    const [ConfirmaSenhaErro, setConfirmaSenhaErro] = useState("");
    const [logado, setLogado] = useState(false);
    const [perfilUsuario,setPerfilUsuario] = useState(0);

    const toastProps = useContext(ContextoToastConfig);
    const navegate = useNavigate();
    var usuarioSession;
    var usuarioPesquisado;
    var validacao = true;

    const handleChangeTelefone = (event) => {
        if(event.target.value === "("){
            setTelefone("");
        }else{
            setTelefone(event.target.value);
            setTelefoneFiltrado(event.target.value.replace(/\D/g,''));
        }
      };

    function verificaLogin(){
        usuarioSession = sessionStorage.getItem("usuario");
        if(usuarioSession){
            usuarioPesquisado = sessionStorage.getItem("dadosUsuarioPesquisado");
            let sessao = JSON.parse(usuarioSession);
            if(usuarioPesquisado){
                let usuario = JSON.parse(usuarioPesquisado);
                setNome(usuario.nm_usuario);
                setRA(usuario.nr_ra);
                setTelefone(usuario.nm_telefone);
                setEmail(usuario.nm_email);
                setPerfilUsuario(sessao.id_tp_perfil_usuario);
                setLogado(true);
            }else{
                setNome(sessao.nm_usuario);
                setRA(sessao.nr_ra);
                setTelefone(sessao.nm_telefone);
                setEmail(sessao.nm_email);
                setPerfilUsuario(sessao.id_tp_perfil_usuario);
                setLogado(true);
            }
        }
    }

    useEffect(() => {
        verificaLogin();
        // eslint-disable-next-line
    }, []);

    function redirecionarAoSair(){
        if(logado){
            navegate('/Home');
        }else{
            navegate('/Login');
        }
    }

    function alterarDados(){
        if(perfilUsuario!==3){
            alterarSenha();
        }else{
            editarCadastro();
        }
    }

    async function alterarSenha(){
        validacao = true;
        validaSenha();
        if(validacao){
            try{
                usuarioSession = sessionStorage.getItem("usuario");
                let usuario = JSON.parse(usuarioSession);
                let payload = {
                    id_usuario:usuario.id_usuario,
                    nm_senha:Senha
                }
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+"alterar-usuario/"+1, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json"
                    }
                });
                if (response.ok) {
                    toast.success("Senha alterada com sucesso",{toastProps});
                }else{
                    toast.error("Erro ao alterar a senha",{toastProps});
                }
            }catch(error) {
                console.log(error);
                toast.error("Erro ao alterar a senha do usuario",{toastProps});
            }
        }
    }

    async function editarCadastro(){
        if(validarDadaos()){
            let idUsuario;
            usuarioPesquisado = sessionStorage.getItem("dadosUsuarioPesquisado");
            if(usuarioPesquisado){
                let usuario = JSON.parse(usuarioPesquisado);
                idUsuario = usuario.id_usuario;
            }else{
                usuarioSession = sessionStorage.getItem("usuario");
                let usuario = JSON.parse(usuarioSession);
                idUsuario = usuario.id_usuario;
            }
            let payload = {
                id_usuario:idUsuario,
                nm_usuario:Nome,
                nr_ra:RA,
                nm_email:Email,
                nm_telefone:telefoneFiltrado,
                nm_senha:Senha
            }
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+"alterar-usuario/"+2, {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (response.ok) {
                    toast.success("Dados alterados com sucesso",{toastProps})
                }else{
                    toast.error("Erro ao alterar os dados",{toastProps})
                }
            }catch(error) {
                console.log(error);
                toast.error("Erro ao alterar dados do usuario",{toastProps})
            }
        }
    }

    function validaSenha(){
        if(!Senha){
            setSenhaErro("Digite a Senha!");
            validacao = false;
        }else{
            setSenhaErro("");
        }
        if(!ConfirmaSenha){
            setConfirmaSenhaErro("Digite a Confirmação da senha!");
            validacao = false;
        }else{
            setConfirmaSenhaErro("");
        }
        if(Senha !== ConfirmaSenha && Senha && ConfirmaSenha){
            toast.error('As senhas estão diferentes', {toastProps});
            validacao = false;
        }
        return validacao;
    }

    async function gerarCadastro() {
        if (validarDadaos()) {
            let payload = {
                nm_usuario:Nome,
                nr_ra:RA,
                nm_email:Email,
                nm_telefone:telefoneFiltrado,
                nm_senha:Senha
            }
            try {
                const response = await fetch(process.env.REACT_APP_BACKEND_URL+"registrar-usuario", {
                    method: "POST",
                    body: JSON.stringify(payload),
                    headers: {
                        "Content-Type": "application/json"
                    }
                })
                if (response.ok) {
                    toast.success("Usuario cadastrado com sucesso",{toastProps})
                    navegate('/Login');
                }else{
                    toast.error("Erro ao executar o cadastro o usuario",{toastProps})
                }
            } catch (error) {
                toast.error("Erro ao registra o usuario",{toastProps})
            }
        }
    }

    function validarEmail() {
        if (!Email) {
            setEmailErro("Digite o Email!");
            return false
        } else {
            let antes = Email.indexOf("@");
            let depois = Email.split("@")[1];

            if (antes < 1 || depois !== 'fatec.sp.gov.br') {
                toast.warning("Email invalido, use o institucional", { toastProps })
                return false
            }
        }
        return true;
    }

    function validarDadaos(){
        validacao = true;
        if(!Nome){
            setNomeErro("Digite o nome!");
            validacao = false;
        }else{
            setNomeErro("");
        }
        if(!RA){
            setRAErro("Digite o RA!");
            validacao = false;
        }else{
            setRAErro("");
        }
        if(!Telefone){
            setTelefoneErro("Digite o Telefone!");
            validacao = false;
        }else{
            setTelefoneErro("");
        }
        if(!validarEmail()){
            validacao = false;
        }else{
            setEmailErro("");
        }
        validaSenha();
        return validacao;
    }

    return (
        <div className="fundo-cadastro">
            <Typography variant="h5" sx={{marginBottom:2}}>{logado?'Dados do Usuario':'Bem Vindo ao Mural Fatec'}</Typography>
            <Typography variant="h6">{logado?'':'Preencha os dados para se cadastrar'}</Typography>
                <TextField
                    required
                    size="small"
                    id="Nome"
                    label="Nome"
                    name="Nome"
                    autoComplete="Nome"
                    color="dark"
                    sx={{ margin: 2,width:500 }}
                    onChange={e => setNome(e.target.value)}
                    value={Nome}
                    helperText={NomeErro}
                    error={!!NomeErro}
                    {...(logado && perfilUsuario!==3) && {disabled:true}}
                />
                <TextField
                    required
                    size="small"
                    id="RA"
                    label="RA"
                    name="RA"
                    autoComplete="RA"
                    color="dark"
                    sx={{ margin: 2,width:500  }}
                    onChange={e => setRA(e.target.value)}
                    value={RA}
                    helperText={RAErro}
                    error={!!RAErro}
                    {...(logado && perfilUsuario!==3) && {disabled:true}}
                />
                <TextField
                    required
                    size="small"
                    id="Telefone"
                    label="Telefone"
                    name="Telefone"
                    autoComplete="Telefone"
                    color="dark"
                    sx={{ margin: 2,width:500  }}
                    onChange={handleChangeTelefone}
                    value={Telefone}
                    helperText={TelefoneErro}
                    error={!!TelefoneErro}
                    InputProps={{
                        inputComponent: MaskTelefone,
                      }}
                    {...(logado && perfilUsuario!==3) && {disabled:true}}
                />
                <TextField
                    required
                    size="small"
                    id="Email"
                    label="Email"
                    name="Email"
                    autoComplete="Email"
                    color="dark"
                    sx={{ margin: 2,width:500  }}
                    onChange={e => setEmail(e.target.value)}
                    value={Email}
                    helperText={EmailErro}
                    error={!!EmailErro}
                    {...(logado && perfilUsuario!==3) && {disabled:true}}
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
                    onChange={e => setConfirmaSenha(e.target.value)}
                    helperText={ConfirmaSenhaErro}
                    error={!!ConfirmaSenhaErro}
                    InputLabelProps={{sx:{width:140}}}
                />
            <Stack direction="row" spacing={2}>
                <Button variant="contained" color="success" sx={{ margin: 2 }}  onClick={()=>{logado?alterarDados():gerarCadastro()}}>
                    {logado?'Alterar':'Cadastrar'}
                </Button>
                <Button variant="contained" color="primary" onClick={redirecionarAoSair}>
                    Cancelar
                </Button>
            </Stack>
        </div>
    );
}