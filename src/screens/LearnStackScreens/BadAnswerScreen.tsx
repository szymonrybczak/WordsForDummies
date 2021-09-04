import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import APP_COLORS from '../../common/colors'
import i18n from '../../common/i18n/i18n'
import QuizType from '../../models/QuizType'
import Item from '../../models/Item'

interface BadAnswerScreenProps {
    item: Item
    quizType: QuizType
    badAnswer: string
    onNextButtonPress: () => void
}

const BadAnswerScreen: React.FC<BadAnswerScreenProps> = ({
    item,
    quizType,
    badAnswer,
    onNextButtonPress,
}) => {
    const areNativeAnswers = quizType === 'nativeAnswers'

    const renderCorrectAnswer = (): JSX.Element => (
        <View style={styles.centeredView}>
            <Text style={styles.goodAnswerLabel}>
                {areNativeAnswers ? item.wordToTranslate : item.answer}
            </Text>

            <Text style={styles.isLabel}>{i18n.t('is')}</Text>

            <Text style={styles.goodAnswerLabel}>
                {areNativeAnswers ? item.answer : item.wordToTranslate}
            </Text>
        </View>
    )

    const renderBadAnswer = (): JSX.Element => (
        <View style={styles.centeredView}>
            <Text style={styles.yourChoiceLabel}>
                {i18n.t('you_have_chosen')}
            </Text>

            <Text style={styles.badAnswerLabel}>{badAnswer}</Text>
        </View>
    )

    const renderNextButton = (): JSX.Element => (
        <View style={styles.nextButtonContainer}>
            <View style={styles.nextButton}>
                <TouchableOpacity onPress={onNextButtonPress}>
                    <Text style={styles.nextButtonTitle}>{i18n.t('next')}</Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <View style={styles.container}>
            {renderCorrectAnswer()}
            {renderBadAnswer()}
            {renderNextButton()}
        </View>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        backgroundColor: APP_COLORS.lightBlue,
        alignItems: 'center',
    },
    centeredView: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    badAnswerLabel: {
        color: APP_COLORS.darkRed,
        marginVertical: '8@ms',
    },
    goodAnswerLabel: {
        color: APP_COLORS.white,
        fontSize: '18@ms',
    },
    isLabel: {
        color: APP_COLORS.white,
        marginVertical: '8@ms',
    },
    yourChoiceLabel: {
        color: APP_COLORS.white,
    },
    nextButtonContainer: {
        flex: 1,
    },
    nextButton: {
        borderWidth: '2@ms',
        borderColor: APP_COLORS.white,
    },
    nextButtonTitle: {
        color: APP_COLORS.white,
        fontSize: '32@ms',
        padding: '8@ms',
        paddingHorizontal: '32@ms',
    },
})

export default BadAnswerScreen
