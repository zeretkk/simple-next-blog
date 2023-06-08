import { Button, CircularProgress, Collapse, Grid, Typography } from '@mui/material'
import { useQuery } from '@tanstack/react-query'
import PostService from '../services/PostService'

import { useEffect, useState } from 'react'
import PostItem from '../components/Posts/PostItem'
import PostForm from '../components/Posts/PostForm'
import Meta from '../components/Meta'
import PostList from '../components/Posts/PostList'

export default function Home() {
    return (
        <>
            <PostList />
        </>
    )
}
