import "./style.css"
import { useEffect, useState, useContext } from 'react';
import { Typography,Tabs,Tab,Grid,List,ListItem,ListItemText,IconButton,Modal,Box,Button,Stack,CircularProgress  } from "@mui/material";
import { CheckCircle,Cancel } from "@mui/icons-material";
import { toast } from 'react-toastify';
import { ContextoToastConfig } from "../../context";

export default function CentralAprovacoes(){
    const [tabAtiva, setTabAtiva] = useState(1);
    const [open,setOpen] = useState(false);
    const [listaDados,setListaDados] = useState([{
		id_notificacao:0,
		id_tp_notificacao:0,
		id_tp_status:0,
		nr_entidade_alvo:0,
		nm_notificacao:""
	}]);
    const [isLoading,setIsLoading] = useState(false);
    const [usuario,setUsuario] = useState({
		id_notificacao:0,
		id_tp_notificacao:0,
		id_tp_status:0,
		nr_entidade_alvo:0
	});
    const toastProps = useContext(ContextoToastConfig);

    useEffect(() => {
        setIsLoading(false);
        buscaNotificacoes(1);
        // eslint-disable-next-line
    }, []);

    async function buscaNotificacoes(tpNotificacao){
        setIsLoading(true);
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"busca-notificacoes/"+tpNotificacao, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                const notificacoes = await response.json();
                setListaDados(notificacoes);
                setIsLoading(false);
            }else{
                toast.error("Erro ao realizar a busca de notificações",{toastProps});
                setIsLoading(false);
            }
        }catch(error){
            toast.error("Erro na busca de notificações",{toastProps});
            setIsLoading(false);
        }
    }

    function alterarAba(aba){
        setTabAtiva(aba);
        buscaNotificacoes(aba);
    }

    async function resolverNotifacao(idNotifcacao,idStatusNotificacao,idTpNotificacao,nrEntidadeAlvo,tpPerfil){
        try {
            let payload = {
                id_notificacao:idNotifcacao,
                id_tp_notificacao:idTpNotificacao,
                id_tp_status:idStatusNotificacao,
                nr_entidade_alvo:nrEntidadeAlvo
            };
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"resolver-notificacao/"+tpPerfil, {
                method: "POST",
                body: JSON.stringify(payload),
                headers: {
                    "Content-Type": "application/json"
                }
            });
            if (response.ok) {
                let removerNotificao = listaDados;
                let novaLista = removerNotificao.filter(object => {
                    return object.id_notificacao !== idNotifcacao;
                  });
                setListaDados(novaLista);
                toast.success("Notificao Resolvida",{toastProps});
                setOpen(false);
            }else{
                toast.error("Erro ao resolver a notificação",{toastProps});
                setOpen(false);
            }
        }catch(error){
            toast.error("Erro na resolução da notificação",{toastProps});
        }
    }

    function abrirModalAprovarUsuario(idNotifcacao,idStatusNotificacao,idTpNotificacao,nrEntidadeAlvo){
        setUsuario({
            id_notificacao:idNotifcacao,
            id_tp_notificacao:idStatusNotificacao,
            id_tp_status:idTpNotificacao,
            nr_entidade_alvo:nrEntidadeAlvo
        });
        setOpen(true);
    }

    async function gerarPdfVinculo(){
        try {
            const response = await fetch(process.env.REACT_APP_BACKEND_URL+"pdf-vinculo-tg-i-ii/49/true", {
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
            }else{
                toast.error("Erro ao gerar PDF",{toastProps})
            }
        }catch(error){
            console.log(error);
            toast.error("Erro ao gerar PDF",{toastProps});
        }
    }

    return (   
        <Grid sx={{display:"flex",flexDirection:"column",flexWrap:"wrap",alignContent:"center",marginTop:2,maxWidth:"700px",maxHeight:"700px",width:"100%",height:"100%",borderRadius:"10px",backgroundColor:"#f5f5f5"}}>
            <Button onClick={gerarPdfVinculo}>Gerar Vinculo</Button>
            <Typography variant="h5" sx={{textAlign:"center",marginBottom:2,marginTop:2}}>Central de Aprovações</Typography>
            <Tabs value={tabAtiva} onChange={(e,valor)=>{alterarAba(valor)}} centered sx={{marginBottom:2}}>
                <Tab label="Aprovar Cadastro" value={1} index={1}/>
                <Tab label="Aprovar Grupo" value={2} index={2}/>
                <Tab label="Aprovar Vinculo" value={3} index={3}/>
            </Tabs>
            <List sx={{width:"500px",maxHeight:"500px",alignContent:"center",justifyContent:"center",flexGrow:1,overflow:"auto",paddingRight:2}}>
                {isLoading?
                <Box sx={{ display:"flex",justifyContent:"center"}}>
                    <CircularProgress size={100} />
                </Box>:<>
                {listaDados.map(({nm_notificacao,id_notificacao,id_tp_notificacao,nr_entidade_alvo}) =>(
                    <ListItem sx={{borderRadius:5,border:"solid #bbbbbb",borderWidth:1,marginBottom:1,paddingLeft:1}}
                    key={id_notificacao}
                    disableGutters>
                        <ListItemText primary={nm_notificacao}/>
                        <IconButton onClick={()=>{tabAtiva===1?abrirModalAprovarUsuario(id_notificacao,1,id_tp_notificacao,nr_entidade_alvo):resolverNotifacao(id_notificacao,1,id_tp_notificacao,nr_entidade_alvo,1)}}>
                            <CheckCircle color="sucess"/>
                        </IconButton>
                        <IconButton onClick={()=>{resolverNotifacao(id_notificacao,2,id_tp_notificacao,nr_entidade_alvo,1)}}>
                            <Cancel color="cancel"/>
                        </IconButton>
                  </ListItem>
                ))}
                </>}
                
            </List>
            <Modal open={open} onClose={()=>{setOpen(false)}}>
                <Box sx={{position:"absolute",top:"50%",left:"50%",width:400,backgroundColor:"background.paper",border:"2px solid #000",borderRadius:3,boxShadow:24,transform:"translate(-50%, -50%)",p:4}}>
                    <Typography variant="h5" sx={{textAlign:"center",marginBottom:2,marginTop:2}}>Como Deseja Aprovar o cadastro?</Typography>
                    <Stack direction="row" spacing={2} sx={{marginTop:2,marginBottom:3}}>
                        <Button variant="contained" color="success" sx={{width:190}} onClick={()=>{resolverNotifacao(usuario.id_notificacao,usuario.id_tp_status,usuario.id_tp_notificacao,usuario.nr_entidade_alvo,1)}}>
                            Aprovar como aluno
                        </Button>
                        <Button variant="contained" color="success" sx={{width:190}} onClick={()=>{resolverNotifacao(usuario.id_notificacao,usuario.id_tp_status,usuario.id_tp_notificacao,usuario.nr_entidade_alvo,2)}}>
                            Aprovar como Orientador
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </Grid>
    )
}