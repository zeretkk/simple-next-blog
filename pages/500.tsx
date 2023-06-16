import { Button, Container, Stack, Typography } from '@mui/material'
import UndoIcon from '@mui/icons-material/Undo'

import Link from 'next/link'
import { FC } from 'react'

const Error500Page: FC = () => {
    return (
        <Container>
            <Stack justifyContent={'center'} alignItems={'center'}>
                <Typography variant='h3' align='center' fontWeight='bold'>
                    500
                </Typography>
                <Typography variant='subtitle1' align='center'>
                    Ошибка сервера
                </Typography>
                <Link href='/'>
                    <Button fullWidth>
                        <UndoIcon /> Вернуться на главную
                    </Button>
                </Link>
            </Stack>
        </Container>
    )
}
export default Error500Page
