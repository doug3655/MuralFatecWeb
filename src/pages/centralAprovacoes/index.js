import "./style.css"
import { useEffect, useState } from 'react';
import { Typography,Tabs,Tab,Grid,List,ListItem,ListItemText,IconButton,Modal,Box,Button,Stack,CircularProgress  } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function CentralAprovacoes(){
    const [tabAtiva, setTabAtiva] = useState(0);
    const [open,setOpen] = useState(false);
    const [listaDados,setListaDados] = useState([{textoLinha:"Lucas Souza",idLinha:1},{textoLinha:"João Silva",idLinha:2},{textoLinha:"Rosa Maria",idLinha:3},{textoLinha:"Lucas Souza",idLinha:4},{textoLinha:"João Silva",idLinha:5},{textoLinha:"Rosa Maria",idLinha:6},
    {textoLinha:"Lucas Souza",idLinha:7}]);
    const [isLoading,setIsLoading] = useState(false);

    return (   
        <Grid sx={{display:"flex",flexDirection:"column",flexWrap:"wrap",alignContent:"center",marginTop:2,maxWidth:"700px",maxHeight:"700px",width:"100%",height:"100%",borderRadius:"10px",backgroundColor:"#f5f5f5"}}>
           <Typography variant="h5" sx={{textAlign:"center",marginBottom:2,marginTop:2}}>Central de Aprovações</Typography>
           <Tabs value={tabAtiva} onChange={(e,valor)=>{setTabAtiva(valor)}} centered sx={{marginBottom:2}}>
                <Tab label="Aprovar Cadastro" />
                <Tab label="Aprovar Grupo" />
                <Tab label="Aprovar Vinculo" />
            </Tabs>
            <List sx={{width:"500px",maxHeight:"500px",alignContent:"center",justifyContent:"center",flexGrow:1,overflow:"auto",paddingRight:2}}>
                {isLoading?
                <Box sx={{ display:"flex",justifyContent:"center"}}>
                    <CircularProgress size={100} />
                </Box>:<>
                {listaDados.map(({textoLinha,idLinha}) =>(
                    <ListItem sx={{borderRadius:5,border:"solid #bbbbbb",borderWidth:1,marginBottom:1,paddingLeft:1}}
                    key={idLinha}
                    disableGutters>
                        <ListItemText primary={textoLinha}/>
                        <IconButton onClick={()=>{console.log("Usuario: "+ textoLinha + " Aprovado,id: "+idLinha);setOpen(true)}}>
                            <CheckCircleIcon color="sucess"/>
                        </IconButton>
                        <IconButton onClick={()=>{console.log("Usuario: "+ textoLinha + " Recusado,id: "+idLinha)}}>
                            <CancelIcon color="cancel"/>
                        </IconButton>
                  </ListItem>
                ))}
                </>}
                
            </List>
            <Modal open={open} onClose={()=>{setOpen(false)}} >
                <Box sx={{position:"absolute",top:"50%",left:"50%",width:400,backgroundColor:"background.paper",border:"2px solid #000",borderRadius:3,boxShadow:24,transform:"translate(-50%, -50%)",p:4}}>
                    <Typography variant="h5" sx={{textAlign:"center",marginBottom:2,marginTop:2}}>Como Deseja Aprovar o cadastro?</Typography>
                    <Stack direction="row" spacing={2} sx={{marginTop:2,marginBottom:3}}>
                        <Button variant="contained" color="success" sx={{width:190}}>
                            Aprovar como aluno
                        </Button>
                        <Button variant="contained" color="success" sx={{width:190}}>
                            Aprovar como Orientador
                        </Button>
                    </Stack>
                </Box>
            </Modal>
        </Grid>
    )
}