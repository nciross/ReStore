import { ShoppingCart } from "@mui/icons-material";
import { AppBar, Badge, Box, IconButton, List, ListItem, Toolbar, Typography } from "@mui/material";
import Switch from "@mui/material/Switch";
import { Link , NavLink } from "react-router-dom";
import { useStoreContext } from "../context/StoreContext";
interface IProp {
    darkMode: boolean;
    hundleThemeChange: () => void;
}
const midLinks = [
    { title: 'catalog', path: '/catalog' },
    { title: 'about', path: '/about' },
    { title: 'contact', path: '/contact' },

];
const rightLinks = [
    { title: 'login', path: '/login' },
    { title: 'register', path: '/register' },
];
const navStyles = {
    color: 'inherit',
    textDecoration: 'none',
    typography: 'h6',
    '&:hover': {
        color: 'grey.500'
    },
    '&.active': {
        color: 'text.secondary'
    }
}
export default function Header({ darkMode, hundleThemeChange }: IProp) {
    const {basket}  = useStoreContext();
    const itemCount =  basket?.items.reduce((sum,item)=>sum+item.quantity,0);
    
    return (
        <AppBar position="static" sx={{ mb: 4 }}>
            <Toolbar sx={{
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center'
            }}>
                <Box display='flex' alignItems='center'>
                    <Typography variant="h6" component={NavLink}
                        to='/' sx={navStyles} >RE-STORE</Typography>
                    <Switch checked={darkMode} onChange={hundleThemeChange} />
                </Box>
                <Box>
                    <List sx={{ display: 'flex' }}>
                        {midLinks.map(({ title, path }) => (
                            <ListItem
                                component={NavLink}
                                to={path}
                                key={path}
                                sx={navStyles} >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
                <Box display='flex' alignItems='center'>
                    <IconButton size='large' color='inherit'  component={Link} to={'/basket'}>
                        <Badge badgeContent={itemCount} color='secondary'>
                            <ShoppingCart />
                        </Badge>
                    </IconButton>
                    <List sx={{ display: 'flex' }}>
                        {rightLinks.map(({ title, path }) => (
                            <ListItem component={NavLink} to={path} key={path}
                                sx={navStyles} >
                                {title.toUpperCase()}
                            </ListItem>
                        ))}
                    </List>
                </Box>
            </Toolbar>
        </AppBar>
    )
}