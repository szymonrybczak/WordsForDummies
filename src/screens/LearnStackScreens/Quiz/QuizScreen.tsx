import React, { useEffect, useState, useRef } from 'react'
import {
    View,
    Text,
    TouchableWithoutFeedback,
    ImageBackground,
    Animated,
} from 'react-native'
import _ from 'lodash'
import { ScaledSheet } from 'react-native-size-matters'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import Item from '../../../models/Item'
import AppParams from '../../../navigation/AppParams'
import { APP_IMAGE } from '../../../common/assets'
import APP_COLORS from '../../../common/colors'
import BadAnswerScreen from '../BadAnswerScreen'
import Question from '../../../models/Question'
import AppActivityIndicator from '../../../components/AppActivityIndicator'

type QuizScreenRouteProp = RouteProp<AppParams, 'QuizScreen'>
type QuizScreenNavigationProp = StackNavigationProp<AppParams, 'QuizScreen'>

interface QuizScreenProps {
    route: QuizScreenRouteProp
    navigation: QuizScreenNavigationProp
}

const QuizScreen: React.FC<QuizScreenProps> = ({ route, navigation }) => {
    const { quizType, list } = route.params

    const [questions, setQuestions] = useState<Question[]>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
    const currentQuestion = questions[currentQuestionIndex]

    const [badAnswer, setBadAnswer] = useState<Item>()

    const [warningVisible, setWarningVisible] = useState<boolean>(false)
    const warningFadeValue = useRef(new Animated.Value(0)).current

    const [loading, setLoading] = useState<boolean>(true)

    const areNativeAnswers = quizType === 'nativeAnswers'

    useEffect(() => {
        generateRandomQuestions()
    }, [])

    /* ------------------------- Utils ------------------------- */

    const showWarning = () => {
        setWarningVisible(true)
        warningFadeValue.setValue(0)

        Animated.timing(warningFadeValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }

    const hideWarning = () => {
        generateNextQuestion()

        Animated.timing(warningFadeValue, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
        }).start()

        setTimeout(() => setWarningVisible(false), 250)
    }

    /* ------------------------- Handlers ------------------------- */

    const handleTestAnswer = (answer: Item) => {
        const isBadAnswer = currentQuestion.item !== answer

        if (isBadAnswer) {
            setBadAnswer(answer)
            showWarning()

            questions.push(currentQuestion)
            return
        }
        generateNextQuestion()
    }

    /* ------------------------- Quiz logic ------------------------- */

    const generateRandomQuestions = () => {
        const randomQuestions: Question[] = []
        const questions = generateQuestions()

        questions.forEach((question) => {
            for (let i = 0; i < 3; i += 1) {
                randomQuestions.push(question)
            }
        })

        setQuestions(_.shuffle(randomQuestions))
        setLoading(false)
    }

    const generateQuestions = (): Question[] => {
        const items = [...list.items]
        const questions: Question[] = []

        for (let i = 0; i < items.length; i += 1) {
            const currenItem = items[i]
            const currentItemIndex = items.indexOf(currenItem)

            const badAnswers = [...items]
            badAnswers.splice(currentItemIndex, 1)

            const answers = _.shuffle([...badAnswers.slice(0, 3), currenItem])

            questions.push({
                item: currenItem,
                answers,
            })
        }

        return questions
    }

    const generateNextQuestion = () => {
        const nextQuestionIndex = currentQuestionIndex + 1

        if (questions[nextQuestionIndex] === undefined) {
            navigation.navigate('SuccessQuizScreen', { list })
            return
        }

        setCurrentQuestionIndex(nextQuestionIndex)
    }

    /* ------------------------- Rendering ------------------------- */

    const renderActivityIndicator = (): JSX.Element => <AppActivityIndicator />

    const renderWordToTranslate = (): JSX.Element => {
        const { answer, wordToTranslate } = currentQuestion.item
        const title = areNativeAnswers ? wordToTranslate : answer

        return (
            <View style={styles.wordToTranslateContainer}>
                <Text style={styles.wordToTranslate}>{title}</Text>
            </View>
        )
    }

    const renderAnswers = (): JSX.Element => (
        <View style={styles.answersContainer}>
            {currentQuestion.answers.map((item) => (
                <TouchableWithoutFeedback
                    key={item.id}
                    onPress={() => handleTestAnswer(item)}>
                    <View style={styles.answerButton}>
                        <Text style={styles.answerTitle}>
                            {areNativeAnswers
                                ? item.answer
                                : item.wordToTranslate}
                        </Text>
                    </View>
                </TouchableWithoutFeedback>
            ))}
        </View>
    )

    const renderWarning = (): JSX.Element => {
        if (badAnswer === undefined) return <View />

        return (
            <Animated.View
                style={[
                    styles.warningComponentContainer,
                    { opacity: warningFadeValue },
                ]}>
                <BadAnswerScreen
                    item={currentQuestion.item}
                    badAnswer={
                        areNativeAnswers
                            ? badAnswer.answer
                            : badAnswer.wordToTranslate
                    }
                    quizType={quizType}
                    onNextButtonPress={hideWarning}
                />
            </Animated.View>
        )
    }

    if (loading) return renderActivityIndicator()

    return (
        <ImageBackground
            style={styles.container}
            source={APP_IMAGE.greenBluePopcorn}>
            {renderWordToTranslate()}
            {renderAnswers()}
            {warningVisible && renderWarning()}
        </ImageBackground>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    wordToTranslateContainer: {
        flex: 1,
        justifyContent: 'center',
    },
    wordToTranslate: {
        fontSize: '32@ms',
        color: APP_COLORS.white,
    },
    answersContainer: {
        flex: 1,
        justifyContent: 'flex-end',
        alignSelf: 'stretch',
        marginVertical: '16@ms',
    },
    answerButton: {
        borderRadius: '10@ms',
        padding: '16@ms',
        margin: '8@ms',
        marginHorizontal: '16@ms',
        alignItems: 'center',
        backgroundColor: APP_COLORS.arcticBlue,
    },
    answerTitle: {
        color: APP_COLORS.white,
        fontSize: '16@ms',
    },
    warningComponentContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
})

export default QuizScreen
