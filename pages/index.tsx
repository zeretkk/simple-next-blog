import { CircularProgress, Grid, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import PostService from '../services/PostService'
import { useEffect } from 'react'
import PostItem from '../components/Posts/PostItem'

export default function Home() {
    const { isLoading, isError, data } = useQuery({
        queryKey: ['todos'],
        queryFn: PostService.getAll,
    })

    useEffect(() => {
        console.log(data)
    }, [isLoading, data])
    if (isLoading) {
        return (
            <Grid
                container
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{ height: '100dvh' }}
            >
                <Grid item>
                    <CircularProgress />
                </Grid>
            </Grid>
        )
    }
    if (isError) {
        return (
            <Grid
                container
                direction={'column'}
                justifyContent={'center'}
                alignItems={'center'}
                sx={{ height: '100dvh' }}
            >
                <Grid item>
                    <Typography color={'red'}>Все сломалось</Typography>
                </Grid>
            </Grid>
        )
    }

    return (
        <Grid container direction={'column'} gap={2}>
            {data.map((post, i) => {
                return (
                    <Grid item key={i}>
                        <PostItem post={post} />
                    </Grid>
                )
            })}
        </Grid>
    )
}
