import React from 'react'
import { View, Text, ImageBackground, TouchableOpacity } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { APP_IMAGE } from '../../../common/assets'
import APP_COLORS from '../../../common/colors'
import i18n from '../../../common/i18n/i18n'
import AppParams from '../../../navigation/AppParams'

type SuccessQuizScreenRouteProp = RouteProp<AppParams, 'SuccessQuizScreen'>
type SuccessQuizScreenNavigationProp = StackNavigationProp<
    AppParams,
    'SuccessQuizScreen'
>

interface SuccessQuizScreenProps {
    route: SuccessQuizScreenRouteProp
    navigation: SuccessQuizScreenNavigationProp
}

const SuccessQuizScreen: React.FC<SuccessQuizScreenProps> = ({
    route,
    navigation,
}) => {
    const { list } = route.params

    /* ------------------------- Handlers ------------------------- */

    const handleNavigateToWelcomeScreen = () =>
        navigation.navigate('WelcomeScreen')

    const handleNavigateToExamScreen = () =>
        navigation.navigate('ExamScreen', { list })

    /* ------------------------- Rendering ------------------------- */

    const renderDescription = (): JSX.Element => (
        <View style={styles.titleSubtitleContainer}>
            <Text style={styles.title}>{i18n.t('well_done')}</Text>

            <Text style={styles.subtitle}>
                {i18n.t('it_is_time_to_decide')}
            </Text>
        </View>
    )

    const renderButtons = (): JSX.Element => (
        <View style={styles.buttonsContainer}>
            {renderExitButton()}
            {renderExamButton()}
        </View>
    )

    const renderExitButton = (): JSX.Element => (
        <View style={styles.buttonContainer}>
            <View style={styles.button}>
                <TouchableOpacity onPress={handleNavigateToWelcomeScreen}>
                    <Text style={styles.buttonTitle}>{i18n.t('exit')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    const renderExamButton = (): JSX.Element => (
        <View style={styles.buttonContainer}>
            <View style={styles.button}>
                <TouchableOpacity onPress={handleNavigateToExamScreen}>
                    <Text style={styles.buttonTitle}>{i18n.t('exam')}</Text>
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
        fontSize: '32@ms',
        color: APP_COLORS.white,
    },
    subtitle: {
        textAlign: 'center',
        fontSize: '16@ms',
        color: APP_COLORS.white,
    },
    buttonsContainer: {
        flex: 1,
        alignItems: 'center',
        flexDirection: 'row',
    },
    buttonContainer: {
        flex: 1,
    },
    button: {
        borderWidth: '2@ms',
        borderColor: APP_COLORS.white,
        margin: '16@ms',
        alignItems: 'center',
    },
    buttonTitle: {
        color: APP_COLORS.white,
        fontSize: '32@ms',
        padding: '16@ms',
    },
})

export default SuccessQuizScreen
