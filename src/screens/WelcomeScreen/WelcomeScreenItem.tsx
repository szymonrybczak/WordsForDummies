import React from 'react'
import {
    Text,
    ImageSourcePropType,
    ImageBackground,
    TouchableOpacity,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import APP_COLORS from '../../common/colors'

interface WelcomeScreenItemProps {
    image: ImageSourcePropType
    title: string
    onPress: () => void
}

const WelcomeScreenItem: React.FC<WelcomeScreenItemProps> = ({
    image,
    title,
    onPress,
}) => (
    <ImageBackground source={image} style={styles.image}>
        <TouchableOpacity onPress={onPress} style={styles.button}>
            <Text style={styles.title}>{title}</Text>
        </TouchableOpacity>
    </ImageBackground>
)

const styles = ScaledSheet.create({
    image: {
        flex: 1,
    },
    button: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: APP_COLORS.white,
        fontSize: '18@ms',
    },
})

export default WelcomeScreenItem
