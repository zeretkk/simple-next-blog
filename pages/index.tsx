import Link from 'next/link'
import Meta from '../components/Meta'
import { Button, Container, Typography, Link as MuiLink, Grid, Stack } from '@mui/material'

export default function Home() {
    return (
        <>
            <Stack
                sx={{ backgroundImage: 'url(/bg.jpg)', minHeight: '100vh', mt: -2 }}
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
            >
                <Meta title={'Главная'} description={'Главная страница лучшего блока в интернете'} />
                <Typography variant={'h3'} align={'center'} sx={{ pt: 5 }} color={'white'}>
                    Добро пожаловать на страницу лучшего блога в интернете
                </Typography>
                <Typography variant={'h4'} align={'center'} color={'white'}>
                    Тут можно найти{' '}
                    <Typography variant='h4' textTransform='uppercase' component={'span'} fontWeight={'bold'}>
                        ничего
                    </Typography>
                    !
                </Typography>
                <MuiLink component={Link} href='/posts'>
                    <Button sx={{ mx: 'auto', display: 'block', my: 2 }} variant='contained' color='success'>
                        Читать
                    </Button>
                </MuiLink>
            </Stack>
            <Container>
                <Stack>
                    <Typography variant='h3' align='center'>
                        О нас
                    </Typography>
                    <Typography>Тут тоже должна быть невероятно важная инфомрация.</Typography>
                    <Typography>Возможно она даже тут появится.</Typography>
                    <Typography>Но острой необходимости пока нет.</Typography>
                </Stack>
            </Container>
        </>
    )
}
