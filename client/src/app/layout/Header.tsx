import { AppBar, Toolbar, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
interface IProp{
    darkMode: boolean;
    hundleThemeChange : ()=>void;
}
export default function Header({darkMode, hundleThemeChange}:IProp){

    return (
        <AppBar position="static" sx={{mb:4}}>
            <Toolbar>
                <Typography variant="h6">RE-STORE</Typography>
                <Switch  checked={darkMode} onChange={hundleThemeChange}/>
            </Toolbar>
        </AppBar>
    )
}