
import { Button  } from "@mui/material";
import { styled } from "@mui/styles";
import { grey } from "@mui/material/colors";

const RetroButton = styled(Button)(({ theme, border ="2px solid" }) => ({
    ':hover': {
      color: grey[50],
      backgroundColor: grey[300],
      textDecoration: 'underline'
    },
    color: "white",
    fontFamily: [
        '"Press Start 2P", cursive',
    ],
    borderRadius: 0,
    padding: "1rem 2rem",
    textDecoration: 'underline',
    border: border
  }));

export default RetroButton;