import { Button, Grid, Typography } from '@mui/material'
import Link from 'next/link'
import { FC } from 'react'
import UndoIcon from '@mui/icons-material/Undo'

const Error404Page: FC = () => {
    return (
        <Grid container alignItems={'center'} justifyContent={'center'} sx={{ my: '10em' }}>
            <Grid item>
                <Typography variant="h3" align="center" fontWeight="bold">
                    404
                </Typography>
                <Typography variant="subtitle1" align="center">
                    Страница не найдена
                </Typography>
                <Link href="/">
                    <Button fullWidth>
                        <UndoIcon /> Вернуться назад
                    </Button>
                </Link>
            </Grid>
        </Grid>
    )
}
export default Error404Page
