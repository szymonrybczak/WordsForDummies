import React from 'react'
import { Text, TouchableOpacity, ImageBackground, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { StackNavigationProp } from '@react-navigation/stack'
import { APP_IMAGE } from '../../common/assets'
import APP_COLORS from '../../common/colors'
import i18n from '../../common/i18n/i18n'
import AppParams from '../../navigation/AppParams'

type ChooseQuizTypeScreenNavigationProp = StackNavigationProp<
    AppParams,
    'ChooseQuizTypeScreen'
>

interface ChooseQuizTypeScreenProps {
    navigation: ChooseQuizTypeScreenNavigationProp
}

const ChooseQuizTypeScreen: React.FC<ChooseQuizTypeScreenProps> = ({
    navigation,
}) => {
    /* ------------------------- Handlers ------------------------- */

    const handleChooseNotNativeAnswers = () => {
        navigation.navigate('ChooseListScreen', {
            learnMethod: 'quiz',
            quizType: 'notNativeAnswers',
        })
    }

    const handleChooseNativeAnswer = () => {
        navigation.navigate('ChooseListScreen', {
            learnMethod: 'quiz',
            quizType: 'nativeAnswers',
        })
    }

    /* ------------------------- Rendering ------------------------- */

    const renderNotNativeAnswersSection = (): JSX.Element => (
        <View
            style={[styles.button, { backgroundColor: APP_COLORS.lightGray }]}>
            <TouchableOpacity
                style={styles.titleDescriptionContainer}
                onPress={handleChooseNotNativeAnswers}>
                <Text style={styles.title}>{i18n.t('first_type')}</Text>

                <Text style={styles.descriptionText}>
                    {i18n.t('instruction_word_in_native_answer_in_second')}
                </Text>
            </TouchableOpacity>
        </View>
    )

    const renderNativeAnswersSection = (): JSX.Element => (
        <View style={[styles.button, { backgroundColor: APP_COLORS.darkGray }]}>
            <TouchableOpacity
                style={styles.titleDescriptionContainer}
                onPress={handleChooseNativeAnswer}>
                <Text style={styles.title}>{i18n.t('second_type')}</Text>

                <Text style={styles.descriptionText}>
                    {i18n.t('instruction_word_in_second_answer_in_native')}
                </Text>
            </TouchableOpacity>
        </View>
    )

    return (
        <ImageBackground
            style={styles.container}
            source={APP_IMAGE.greenBlueToys}>
            {renderNotNativeAnswersSection()}
            {renderNativeAnswersSection()}
        </ImageBackground>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: APP_COLORS.arcticBlue,
    },
    button: {
        flex: 1,
        paddingHorizontal: '32@ms',
    },
    titleDescriptionContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    title: {
        fontSize: '24@ms',
        color: APP_COLORS.white,
    },
    descriptionText: {
        color: APP_COLORS.white,
        lineHeight: '40@ms',
        marginVertical: '24@ms',
        fontSize: '18@ms',
    },
})

export default ChooseQuizTypeScreen
