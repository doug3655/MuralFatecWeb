import { createTheme } from '@mui/material/styles';
import { green, blue, red } from '@mui/material/colors';

const theme = createTheme({
    palette:{
      sucess:{
        main:green[500]
      },
      primary:{
        main:blue[500]
      },
      cancel:{
        main:red[900]
      },
      dark:{
        main:'#000000'
      },
      fundo:{
        main:'#bbbbbb'
      },
      modal:{
        main:'#f0f0f0'
      },
      titulo:{
        main:'#555555'
      }
    },
  });
  
export default theme;