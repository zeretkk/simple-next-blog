import { FC, FormEvent, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import UserService from '../../services/userService'
import KeyIcon from '@mui/icons-material/Key'
import { useRouter } from 'next/router'
import StyledLink from '../../components/StyledLink'
import Meta from '../../components/Meta'
const Signin: FC = () => {
    const router = useRouter()
    const [error, setError] = useState('')
    const formik = useFormik({
        initialValues: {
            password: '',
            email: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Обязательно для заполнения')
                .min(6, 'Минимум 6 символов')
                .max(128, 'Максимум 128 символов'),
            email: Yup.string().required('Обязательно для заполнения').email('Не валидный адрес'),
        }),
        onSubmit: (values) => {
            UserService.signIn(values).then((data) => {
                if (!data.error) {
                    router.back()
                    return
                }
                switch (data.error.message) {
                    case 'Email not confirmed':
                        setError('Адрес почты не подтвержден')
                        return
                    case 'Invalid login credentials':
                        setError('Неверный адрес или пароль')
                        return
                }
                setError('Неизвестная ошибка')
            })
        },
    })
    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault()
        formik.handleSubmit(event)
    }
    return (
        <Container>
            <Grid container justifyContent={'center'}>
                <Meta title='Авторизация' description='' />

                <Stack sx={{ my: 20 }} component={'form'} onSubmit={handleSubmit}>
                    <Typography variant={'h3'}>Вход</Typography>
                    {error && <Typography color={'error'}>{error}</Typography>}
                    <TextField
                        margin={'dense'}
                        label={'E-mail'}
                        required
                        fullWidth
                        value={formik.values.email}
                        onChange={formik.handleChange}
                        name='email'
                        error={Boolean(formik.touched.email && formik.errors.email)}
                        helperText={formik.touched.email && formik.errors.email}
                    />
                    <TextField
                        margin={'dense'}
                        label={'Пароль'}
                        type={'password'}
                        required
                        fullWidth
                        value={formik.values.password}
                        onChange={formik.handleChange}
                        name='password'
                        error={Boolean(formik.touched.password && formik.errors.password)}
                        helperText={formik.touched.password && formik.errors.password}
                    />
                    <Button onClick={formik.submitForm} variant={'contained'} size={'large'} type='submit'>
                        <KeyIcon />
                        Войти
                    </Button>
                    <StyledLink href={'/auth/signup'} align='center' margin={1}>
                        Зарегистрироваться
                    </StyledLink>
                </Stack>
            </Grid>
        </Container>
    )
}

export default Signin
