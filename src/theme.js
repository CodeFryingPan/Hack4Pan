
import { createTheme, ThemeProvider} from '@mui/material/styles';
import { grey } from "@mui/material/colors";

const theme = createTheme({
    palette: {
      primary: {
        main: "#0F0E0E"
      },
      secondary: {
        main: grey[50]
      }
    }
});

export default theme;