import { Avatar } from '@mui/material'
import { ComponentProps, ElementType, FC } from 'react'

interface ColoredAvatarProps extends ComponentProps<typeof Avatar> {
    designator: string
    component: ElementType
}
const ColoredAvatar: FC<ColoredAvatarProps> = ({ designator, ...props }) => {
    const stringToColor = (string: string) => {
        let hash = 0
        let i

        for (i = 0; i < string.length; i += 1) {
            hash = string.charCodeAt(i) + ((hash << 5) - hash)
        }

        let color = '#'

        for (i = 0; i < 3; i += 1) {
            const value = (hash >> (i * 8)) & 0xff
            color += `00${value.toString(16)}`.slice(-2)
        }
        return color
    }
    return (
        <Avatar sx={{ bgcolor: stringToColor(designator) }} {...props}>
            {designator?.substring(0, 1)}
        </Avatar>
    )
}
export default ColoredAvatar
