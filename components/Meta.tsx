import Head from 'next/head'
import { FC } from 'react'

export interface MetaProps {
    title: string
    description: string
}

const Meta: FC<MetaProps> = ({ title, description = '' }) => {
    return (
        <Head>
            <title>{`Sychtest | ${title}`}</title>
            <meta name='description' content={description} />
        </Head>
    )
}

export default Meta
