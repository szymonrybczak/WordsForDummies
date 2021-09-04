import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { StackNavigationProp } from '@react-navigation/stack'
import { APP_IMAGE } from '../../../common/assets'
import APP_COLORS from '../../../common/colors'
import i18n from '../../../common/i18n/i18n'
import AppParams from '../../../navigation/AppParams'

type SuccessExamScreenNavigationProp = StackNavigationProp<
    AppParams,
    'SuccessExamScreen'
>

interface SuccessExamScreenProps {
    navigation: SuccessExamScreenNavigationProp
}

const SuccessExamScreen: React.FC<SuccessExamScreenProps> = ({
    navigation,
}) => {
    /* ------------------------- Handlers ------------------------- */

    const handleNavigateToWelcomeScreen = () =>
        navigation.navigate('WelcomeScreen')

    /* ------------------------- Rendering ------------------------- */

    const renderDescription = (): JSX.Element => (
        <View style={styles.titleSubtitleContainer}>
            <Text style={styles.title}>{i18n.t('congrats')}</Text>

            <Text style={styles.subtitle}>{i18n.t('chill_out')}</Text>
        </View>
    )

    const renderButtons = (): JSX.Element => (
        <View style={styles.runOutButtonContainer}>
            <View style={styles.runOutButton}>
                <TouchableOpacity onPress={handleNavigateToWelcomeScreen}>
                    <Text style={styles.runOutButtonTitle}>
                        {i18n.t('run_out')}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <ImageBackground
            style={styles.container}
            source={APP_IMAGE.greenBlueWaterfall}>
            {renderDescription()}
            {renderButtons()}
        </ImageBackground>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    titleSubtitleContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        textAlign: 'center',
        fontSize: '32@ms',
        color: APP_COLORS.white,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: '16@ms',
        color: APP_COLORS.white,
    },
    runOutButtonContainer: {
        flex: 1,
    },
    runOutButton: {
        borderWidth: '2@ms',
        borderColor: APP_COLORS.white,
        margin: '16@ms',
        alignItems: 'center',
    },
    runOutButtonTitle: {
        color: APP_COLORS.white,
        fontSize: '32@ms',
        padding: '16@ms',
    },
})

export default SuccessExamScreen
