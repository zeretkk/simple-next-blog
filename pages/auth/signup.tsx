import { FC, FormEvent, useState } from 'react'
import { useFormik } from 'formik'
import * as Yup from 'yup'
import { Button, Container, Grid, Stack, TextField, Typography } from '@mui/material'
import UserService from '../../services/userService'
import HowToRegIcon from '@mui/icons-material/HowToReg'
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
            firstName: '',
            secondName: '',
        },
        validationSchema: Yup.object({
            password: Yup.string()
                .required('Обязательно для заполнения')
                .min(6, 'Минимум 6 символов')
                .max(128, 'Максимум 128 символов'),
            email: Yup.string().required('Обязательно для заполнения').email('Не валидный адрес'),
            firstName: Yup.string().required('Обязательно для заполнения').max(65, 'Максимум 64 символа'),
            secondName: Yup.string().required('Обязательно для заполнения').max(65, 'Максимум 64 символа'),
        }),
        onSubmit: (values) => {
            UserService.signUp(values).then((data) => {
                if (!data.error) {
                    router.push('/auth/signin')
                    return
                }
                setError('Ошибка создания акаунта')
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
                <Meta title='Регистрация' description='' />
                <Stack sx={{ my: 20 }} component={'form'} onSubmit={handleSubmit}>
                    {error && <Typography color={'error'}>{error}</Typography>}
                    {/* TODO: Prettify form heading */}
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
                        label={'Имя'}
                        required
                        fullWidth
                        value={formik.values.firstName}
                        onChange={formik.handleChange}
                        name='firstName'
                        error={Boolean(formik.touched.firstName && formik.errors.firstName)}
                        helperText={formik.touched.firstName && formik.errors.firstName}
                    />
                    <TextField
                        margin={'dense'}
                        label={'Фамилия'}
                        required
                        fullWidth
                        value={formik.values.secondName}
                        onChange={formik.handleChange}
                        name='secondName'
                        error={Boolean(formik.touched.secondName && formik.errors.secondName)}
                        helperText={formik.touched.secondName && formik.errors.secondName}
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
                        <HowToRegIcon />
                        Зарегистрироваться
                    </Button>
                    <StyledLink href={'/auth/signin'} align='center' margin={1}>
                        Войти в существующий аккант
                    </StyledLink>
                </Stack>
            </Grid>
        </Container>
    )
}

export default Signin
