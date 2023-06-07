import Link from 'next/link'
import { LinkBaseProps, Link as MuiLink } from '@mui/material'
import { AnchorHTMLAttributes, FC } from 'react'

type StyledLinkProps = LinkBaseProps & AnchorHTMLAttributes<any>

const StyledLink: FC<StyledLinkProps> = ({ href, target, rel, children, sx, ...props }) => {
    return (
        <Link href={href} target={target} rel={rel} style={{ cursor: 'pointer' }}>
            <MuiLink {...props} sx={{ cursor: 'pointer' }}>
                {children}
            </MuiLink>
        </Link>
    )
}

export default StyledLink
