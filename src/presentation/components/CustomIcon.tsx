import { Icon, useTheme } from '@ui-kitten/components';
import { StyleSheet } from 'react-native';


interface Props {
    name: string;
    color?: string;
    white?: boolean;
}

export const CustomIcon = ({name, color, white  = false}: Props) => {
    const theme = useTheme();
    if (white) {
        color = theme['color-info-100'];
    } else if(!color) {
        color = theme['text-basic-color'];
    } else {
        color = theme[color]
    }
   return <Icon style={style.icon} name={name} fill={color}/>
};
const style = StyleSheet.create({
    icon: {
        width: 20,
        height: 20,
    },
});