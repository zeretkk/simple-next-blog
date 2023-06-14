import Head from 'next/head'
import { FC } from 'react'

export interface IMetaProps {
    title: string
    description: string
}

const Meta: FC<IMetaProps> = ({ title, description = '' }) => {
    return (
        <Head>
            <title>{`Sychtest | ${title}`}</title>
            <meta name='description' content={description} />
        </Head>
    )
}

export default Meta
