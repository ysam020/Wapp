import { createTheme } from "@mui/material/styles";

///////////////////////////////////////////////////////////////////
function useMuiTheme() {
  const muiTheme = createTheme({
    palette: {
      primary: { main: "#8696A0" },
      secondary: { main: "#fff" },
      warning: { main: "#FFD279" },
      info: { main: "#53bdeb" },
    },

    components: {
      MuiSwitch: {
        styleOverrides: {
          root: {
            "& .MuiSwitch-switchBase.Mui-checked": {
              color: "#015C4B",
              "&:hover": {
                backgroundColor: "#015C4B, theme.palette.action.hoverOpacity",
              },
            },
            "& .MuiSwitch-switchBase.Mui-checked + .MuiSwitch-track": {
              backgroundColor: "#015C4B",
            },
          },
        },
      },
      MuiCheckbox: {
        styleOverrides: {
          root: {
            color: "#8696A0",
            "&.Mui-checked": {
              color: "#04A784",
            },
          },
        },
      },
    },
  });
  return muiTheme;
}

export default useMuiTheme;
