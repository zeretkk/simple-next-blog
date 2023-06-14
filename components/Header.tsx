import { FC, useState, MouseEvent } from 'react'
import {
    AppBar,
    Avatar,
    Box,
    Button,
    Container,
    Divider,
    IconButton,
    Menu,
    MenuItem,
    Toolbar,
    Tooltip,
    Typography,
} from '@mui/material'
import SupervisorAccountIcon from '@mui/icons-material/SupervisorAccount'
import FlutterDash from '@mui/icons-material/FlutterDash'
import MenuIcon from '@mui/icons-material/Menu'
import Link from 'next/link'
import { useAuth } from '../supabase/authProvider'
import UserService from '../services/userService'

const pages = [
    { path: '/', title: 'Главная' },
    { path: '/posts ', title: 'Публикации' },
]
const Header: FC = () => {
    const { profile, group } = useAuth()
    const [anchorElNav, setAnchorElNav] = useState<null | HTMLElement>(null)
    const [anchorProfileMenu, setProfileMenu] = useState<null | HTMLElement>(null)
    const handleOpenNavMenu = (event: MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget)
    }

    const handleCloseNavMenu = () => {
        setAnchorElNav(null)
    }
    const handleOpenProfileMenu = (event: MouseEvent<HTMLElement>) => {
        setProfileMenu(event.currentTarget)
    }

    const handleCloseProfileMenu = () => {
        setProfileMenu(null)
    }

    return (
        <AppBar position='static'>
            <Container maxWidth='xl'>
                <Toolbar disableGutters>
                    <FlutterDash sx={{ display: { xs: 'none', md: 'flex' }, mr: 1 }} />
                    <Typography
                        variant='h6'
                        noWrap
                        sx={{
                            display: { xs: 'none', md: 'flex' },
                        }}
                    >
                        SychTest
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
                            {pages.map((page, i) => (
                                <MenuItem key={i} onClick={handleCloseNavMenu}>
                                    <Link href={page.path}>{page.title}</Link>
                                </MenuItem>
                            ))}
                        </Menu>
                    </Box>
                    <FlutterDash sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
                    <Typography
                        variant='h5'
                        noWrap
                        sx={{
                            mr: 2,
                            display: { xs: 'flex', md: 'none' },
                            flexGrow: 1,
                            fontFamily: 'monospace',
                            color: 'inherit',
                            textDecoration: 'none',
                        }}
                    >
                        SychTest
                    </Typography>
                    <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
                        {pages.map((page, i) => (
                            <Link href={page.path} key={i}>
                                <Button onClick={handleCloseNavMenu} sx={{ my: 2, color: 'white', display: 'block' }}>
                                    {page.title}
                                </Button>
                            </Link>
                        ))}
                    </Box>
                    {profile ? (
                        <>
                            <Tooltip title='Профиль'>
                                <IconButton onClick={handleOpenProfileMenu}>
                                    <Avatar>{profile?.full_name?.[0]}</Avatar>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                open={Boolean(anchorProfileMenu)}
                                anchorEl={anchorProfileMenu}
                                onClick={handleCloseProfileMenu}
                                onClose={handleCloseProfileMenu}
                            >
                                <MenuItem>{profile?.full_name}</MenuItem>
                                <MenuItem>
                                    <SupervisorAccountIcon />

                                    <Typography>{group?.name}</Typography>
                                </MenuItem>
                                <Divider />
                                <MenuItem>Настройки</MenuItem>
                                <MenuItem onClick={UserService.signOut}>
                                    <Typography color='error'>Выход</Typography>
                                </MenuItem>
                            </Menu>
                        </>
                    ) : (
                        <Link href='/auth/signin'>
                            <Button color='secondary'>Войти</Button>
                        </Link>
                    )}
                </Toolbar>
            </Container>
        </AppBar>
    )
}

export default Header
