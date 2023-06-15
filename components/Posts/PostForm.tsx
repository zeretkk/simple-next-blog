import { Button, Typography, Grid, TextField } from '@mui/material'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { useFormik } from 'formik'
import { FC } from 'react'
import * as Yup from 'yup'
import PostService from '../../services/PostService'
import { IPost } from '../../types/posts'

const PostForm: FC = () => {
    const queryClient = useQueryClient()
    const mutation = useMutation({
        mutationFn: (values: Partial<IPost>) => {
            return PostService.addOne(values)
        },
        onSuccess: () => {
            queryClient.invalidateQueries(['posts'])
            formik.resetForm()
        },
    })
    const formik = useFormik({
        initialValues: {
            title: '',
            body: '',
            tags: '',
            poster_url: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .min(5, 'Не менее 5 символов')
                .max(120, 'Не более 120 символов')
                .required('Обязательно для заполнения'),
            tags: Yup.string()
                .min(5, 'Не менее 5 символов')
                .max(120, 'Не более 120 символов')
                .required('Обязательно для заполнения'),
            poster_url: Yup.string().url('Должно содержать валидную ссылку').required('Обязательно для заполнения'),
            body: Yup.string().min(10, 'Не менее 10 символов').max(1024, 'Не более 1024 символов'),
        }),
        onSubmit: (values) => {
            mutation.mutate(values)
        },
    })
    return (
        <Grid item>
            {mutation.isError && <Typography color={'error'}>Ошибка при добавлении записи</Typography>}
            <TextField
                margin='dense'
                error={Boolean(formik.errors.title)}
                required
                label='Название'
                name='title'
                value={formik.values.title}
                onChange={formik.handleChange}
                helperText={formik.touched.title && formik.errors.title ? formik.errors.title : ''}
                fullWidth
            />
            <TextField
                margin='dense'
                error={Boolean(formik.errors.tags)}
                required
                label='Тэги'
                name='tags'
                value={formik.values.tags}
                onChange={formik.handleChange}
                helperText={formik.touched.tags && formik.errors.tags ? formik.errors.tags : ''}
                fullWidth
            />
            <TextField
                margin='dense'
                required
                error={Boolean(formik.errors.poster_url)}
                label='Постер'
                name='poster_url'
                value={formik.values.poster_url}
                helperText={formik.touched.poster_url && formik.errors.poster_url ? formik.errors.poster_url : ''}
                onChange={formik.handleChange}
                fullWidth
            />
            <TextField
                margin='dense'
                // required
                label='Текст'
                name='body'
                error={Boolean(formik.errors.body)}
                value={formik.values.body}
                helperText={formik.touched.body && formik.errors.body ? formik.errors.body : ''}
                onChange={formik.handleChange}
                minRows={3}
                fullWidth
                multiline
            />
            <Button color='success' variant='contained' fullWidth onClick={formik.submitForm}>
                Добавить
            </Button>
        </Grid>
    )
}

export default PostForm
