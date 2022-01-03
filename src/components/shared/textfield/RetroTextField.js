import { TextField  } from "@mui/material";
import withStyles from "@mui/styles/withStyles";

const RetroTextField = withStyles({
    root: {
        '& .MuiInputBase-root': {
            color: 'white',
            fontFamily: '"Press Start 2P", cursive',
        },
      '& label.Mui-focused': {
        color: 'white',
        borderWidth: 2,
        borderRadius: 0,
      },
      '& .MuiInput-underline:after': {
        borderBottomColor: 'white',
        borderWidth: 2,
        borderRadius: 0,
      },
      '& .MuiOutlinedInput-root': {
        '& fieldset': {
          borderColor: 'white',
          borderWidth: 2,
          borderRadius: 0,
        },
        '&:hover fieldset': {
          borderColor: 'white',
          borderWidth: 2,
          borderRadius: 0,
        },
        '&.Mui-focused fieldset': {
          borderColor: 'white',
          borderWidth: 2,
          borderRadius: 0,
        },
      },
    },
  })(TextField);

export default RetroTextField;