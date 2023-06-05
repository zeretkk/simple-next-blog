import { FC } from 'react'
import { Html, Head, Main, NextScript } from 'next/document'

const Document: FC = () => {
    return (
        <Html>
            <Head>
                <link rel="preconnect" href="https://fonts.googleapis.com" />
                <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="" />
                <link
                    href="https://fonts.googleapis.com/css2?family=Nunito+Sans:wght@400;600;700&family=Poppins:wght@300;400;500&display=swap"
                    rel="stylesheet"
                ></link>
            </Head>
            <Main />
            <NextScript />
        </Html>
    )
}

export default Document
