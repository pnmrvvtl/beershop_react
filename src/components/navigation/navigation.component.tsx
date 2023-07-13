//libs
import {Link, Outlet} from 'react-router-dom';
//meterial components
import MenuIcon from '@mui/icons-material/Menu';
import SportsBarIcon from '@mui/icons-material/SportsBar';
import {AppBar, Box, Button, Container, IconButton, Menu, Toolbar, Typography,} from '@mui/material';
//components
import React, {ReactNode} from "react";


interface Props {
    children?: ReactNode;
}
function Navigation({ children }: Props) {
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const colorHeader =  '#37664E';
    const hoverHeader =  '#05AA58';

    // const navigate = useNavigate();

    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };


    return (
        <>
            <AppBar position='sticky' sx={{ backgroundColor: `${colorHeader}`, color: '#ffff', height: '12vh'}}>
                <Container maxWidth='xl'>
                    <Toolbar disableGutters>
                        <SportsBarIcon sx={{display: {xs: 'none', md: 'flex'}, mr: 1}}/>
                        <Typography
                            variant='h6'
                            noWrap
                            component='a'
                            href='/'
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'Ubuntu',
                                fontWeight: 700,
                                fontSize: '3rem',
                                letterSpacing: '.3rem',
                                color: 'white',
                                '&:hover': { color: `${hoverHeader}` },
                                textDecoration: 'none',
                            }}
                        >
                            Beer Recipes
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size='large'
                                aria-label='account of current user'
                                aria-controls='menu-appbar'
                                aria-haspopup='true'
                                onClick={handleOpenNavMenu}
                                color='inherit'
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id='menu-appbar'
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                000000000
                            </Menu>
                        </Box>
                        <SportsBarIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                        <Typography
                            variant='h5'
                            noWrap
                            component='a'
                            href='/'
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'Ubuntu',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: '#ffff',
                                textDecoration: 'none',
                            }}
                        >
                            RS-Healthy
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                                <Link
                                    to={`/11111111111`}
                                    style={{
                                        textDecoration: 'none',
                                        color: 'white',
                                        fontFamily: 'Ubuntu',
                                        fontSize: '1.1rem',
                                    }}
                                >
                                    <Button
                                        style={{
                                            textDecoration: 'none',
                                            color: 'white',
                                            fontFamily: 'Ubuntu',
                                            fontSize: '1.1rem',
                                        }}
                                        onClick={handleCloseNavMenu}
                                    >
                                        1111111111111
                                    </Button>
                                </Link>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {children || <Outlet />}
        </>
    );
}

export default Navigation;