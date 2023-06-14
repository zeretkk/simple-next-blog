import { Button, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import { FC } from 'react'
import UndoIcon from '@mui/icons-material/Undo'
import Meta from '../components/Meta'

const Error404Page: FC = () => {
    return (
        <Grid container alignItems={'center'} justifyContent={'center'} sx={{ my: '10em' }}>
            <Meta title='Запрашиваемая страница не найдена' description='Страница остуствует по этому адресу' />
            <Grid item>
                <Typography variant='h3' align='center' fontWeight='bold'>
                    404
                </Typography>
                <Typography variant='subtitle1' align='center'>
                    Страница не найдена
                </Typography>
                <Link href='/'>
                    <Button fullWidth>
                        <UndoIcon /> Вернуться на главную
                    </Button>
                </Link>
            </Grid>
        </Grid>
    )
}
export default Error404Page
