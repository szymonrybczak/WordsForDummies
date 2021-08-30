import { ScaledSheet } from 'react-native-size-matters'
import { SwitchProps } from 'react-native'
import APP_COLORS from '../../common/colors'

export const SectionStyles = ScaledSheet.create({
    container: {
        // Using RGBA here because, when using opacity prop children also receive this opacity
        backgroundColor: 'rgba(91, 182, 252, 0.95)',
        borderRadius: '30@ms',
        margin: '16@ms',
    },
    title: {
        color: APP_COLORS.white,
        fontSize: '18@ms',
    },
    description: {
        color: APP_COLORS.white,
        fontSize: '16@ms',
        margin: '32@ms',
        textAlign: 'center',
    },
})

export const SectionSwitchProps: SwitchProps = {
    trackColor: {
        false: APP_COLORS.darkBlue,
        true: APP_COLORS.white,
    },
    thumbColor: APP_COLORS.purpleBlue,
}
