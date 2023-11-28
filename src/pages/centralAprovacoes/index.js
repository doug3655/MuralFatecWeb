import "./style.css"
import { useState } from 'react';
import {Typography,Tabs,Tab,Grid,List,ListItem,ListItemText,ListItemIcon,ListItemButton,IconButton } from "@mui/material";
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';

export default function CentralAprovacoes(){
    const [tabAtiva, setTabAtiva] = useState(0);
    const [listaDados,setListaDados] = useState([{textoLinha:"Lucas Souza",idLinha:1},{textoLinha:"João Silva",idLinha:2},{textoLinha:"Rosa Maria",idLinha:3}]);
 

    return (   
        <Grid sx={{justifyContent:"center",alignContent:"flex-start",flexGrow:1,marginTop:2}}>
           <Typography variant="h5" sx={{textAlign:"center",marginBottom:2}}>Central de Aprovações</Typography>
           <Tabs value={tabAtiva} onChange={(e,valor)=>{setTabAtiva(valor)}} centered>
                <Tab label="Aprovar Cadastro" />
                <Tab label="Aprovar Grupo" />
                <Tab label="Aprovar Vinculo" />
            </Tabs>
            <List>
                {listaDados.map(({textoLinha,idLinha}) =>(
                    <ListItem sx={{borderRadius:5,border:"solid #bbbbbb",borderWidth:1,marginBottom:1,paddingLeft:1}}
                    key={idLinha}
                    disableGutters>
                        <ListItemText primary={textoLinha}/>
                        <IconButton onClick={()=>{console.log("Usuario: "+ textoLinha + " Aprovado,id: "+idLinha)}}>
                            <CheckCircleIcon color="sucess"/>
                        </IconButton>
                        <IconButton onClick={()=>{console.log("Usuario: "+ textoLinha + " Recusado,id: "+idLinha)}}>
                            <CancelIcon color="cancel"/>
                        </IconButton>
                  </ListItem>
                ))}
            </List>
        </Grid>
    )
}