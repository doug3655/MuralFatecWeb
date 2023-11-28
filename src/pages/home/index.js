import "./style.css"
import { Typography,Box  } from "@mui/material";

export default function Home(){
    return (   
        <div className="fundo-home">        
            <Typography variant="h5" sx={{marginBottom:2}}>Bem Vindo ao Mural Fatec</Typography>
        </div>
    );
}