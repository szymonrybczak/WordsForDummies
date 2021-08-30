import React from 'react'
import {
    View,
    Text,
    Image,
    TouchableWithoutFeedback,
    ImageSourcePropType,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import APP_COLORS from '../../../common/colors'

interface MoreScreenItemProps {
    icon: ImageSourcePropType
    title: string
    onPress: () => void
}

const MoreScreenItem: React.FC<MoreScreenItemProps> = ({
    icon,
    title,
    onPress,
}) => (
    <TouchableWithoutFeedback onPress={onPress}>
        <View style={styles.container}>
            <Image style={styles.icon} source={icon} />
            <Text style={styles.title}>{title}</Text>
        </View>
    </TouchableWithoutFeedback>
)

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'space-evenly',
        backgroundColor: APP_COLORS.darkBlue,
        margin: '8@ms',
        padding: '8@ms',
        borderRadius: '15@ms',
    },
    icon: {
        width: '60%',
        height: '60%',
        tintColor: APP_COLORS.white,
    },
    title: {
        color: APP_COLORS.white,
        fontSize: '16@ms',
    },
})

export default MoreScreenItem
