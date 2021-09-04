import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    Animated,
    Easing,
    Keyboard,
} from 'react-native'
import _ from 'lodash'
import { ScaledSheet } from 'react-native-size-matters'
import { StackNavigationProp } from '@react-navigation/stack'
import { RouteProp } from '@react-navigation/native'
import { TextInput } from 'react-native-gesture-handler'
import BadAnswerScreen from '../BadAnswerScreen'
import APP_COLORS from '../../../common/colors'
import AppParams from '../../../navigation/AppParams'
import Item from '../../../models/Item'
import i18n from '../../../common/i18n/i18n'
import { APP_IMAGE } from '../../../common/assets'
import DismissKeyboardView from '../../../components/DismissKeyboardView'
import AppActivityIndicator from '../../../components/AppActivityIndicator'
import { getFromAsyncStorage } from '../../../helpers/deviceStorage'
import { handleError } from '../../../helpers/AppAlertManager'

type ExamScreenRouteProp = RouteProp<AppParams, 'ExamScreen'>
type ExamScreenNavigationProp = StackNavigationProp<AppParams, 'ExamScreen'>

interface ExamScreenProps {
    route: ExamScreenRouteProp
    navigation: ExamScreenNavigationProp
}

const ExamScreen: React.FC<ExamScreenProps> = ({ route, navigation }) => {
    const [questions, setQuestions] = useState<Item[]>([])
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)
    const currentQuestion = questions[currentQuestionIndex]

    const [badAnswer, setBadAnswer] = useState<string>()

    const [warningVisible, setWarningVisible] = useState<boolean>(false)
    const warningFadeValue = useRef(new Animated.Value(0)).current

    const [answer, setAnswer] = useState<string>('')
    const [loading, setLoading] = useState<boolean>(true)

    const answerTextInputAnimatedValue = useRef(new Animated.Value(0)).current
    const [autoCorrectionEnabled, setAutoCorrectionEnabled] =
        useState<boolean>(false)

    useEffect(() => {
        generateRandomItems()
        fetchSettings()
    }, [])

    /* ------------------------- Fetching ------------------------- */

    const fetchSettings = () => {
        setLoading(true)

        getFromAsyncStorage('takingExamAutoCorrectionEnabled')
            .then(setAutoCorrectionEnabled)
            .catch(handleError)
            .finally(() => setLoading(false))
    }

    /* ------------------------- Helpers ------------------------- */

    const textInputAnimationStyle = {
        transform: [
            {
                translateX: answerTextInputAnimatedValue.interpolate({
                    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
                    outputRange: [0, -10, 0, 10, 0, -10, 0, -10, 0],
                }),
            },
        ],
    }

    /* ------------------------- Utils ------------------------- */

    const showWarning = () => {
        Keyboard.dismiss()
        setWarningVisible(true)
        warningFadeValue.setValue(0)

        Animated.timing(warningFadeValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: false,
        }).start()
    }

    const hideWarning = () => {
        generateNextQuestion()

        Animated.timing(warningFadeValue, {
            toValue: 0,
            duration: 250,
            useNativeDriver: false,
        }).start()

        setTimeout(() => setWarningVisible(false), 250)
    }

    const startTextInputAnimation = () => {
        answerTextInputAnimatedValue.setValue(0)

        Animated.timing(answerTextInputAnimatedValue, {
            toValue: 4,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start()
    }

    /* ------------------------- Handlers ------------------------- */

    const handleTestAnswer = () => {
        const isAnswerEmpty = answer.trim().length === 0
        if (isAnswerEmpty) {
            startTextInputAnimation()
            return
        }
        setAnswer('')

        const isBadAnswer = currentQuestion.answer !== answer.trim()
        if (isBadAnswer) {
            setBadAnswer(answer)
            showWarning()

            questions.push(currentQuestion)
            return
        }

        generateNextQuestion()
    }

    /* ------------------------- Exam logic ------------------------- */

    const generateRandomItems = () => {
        const randomQuestions: Item[] = []
        const questions = generateQuestions()

        questions.forEach((question) => {
            for (let i = 0; i < 3; i += 1) {
                randomQuestions.push(question)
            }
        })

        setQuestions(_.shuffle(randomQuestions))
        setLoading(false)
    }

    const generateQuestions = (): Item[] => {
        const items = [...route.params.list.items]
        const questions: Item[] = []

        for (let i = 0; i < items.length; i += 1) {
            questions.push(items[i])
        }

        return questions
    }

    const generateNextQuestion = () => {
        const nextQuestionIndex = currentQuestionIndex + 1

        if (questions[nextQuestionIndex] === undefined) {
            navigation.navigate('SuccessExamScreen')
            return
        }

        setCurrentQuestionIndex(nextQuestionIndex)
    }

    /* ------------------------- Rendering ------------------------- */

    const renderWarning = (): JSX.Element => {
        if (badAnswer === undefined) return <View />

        return (
            <Animated.View
                style={[
                    styles.warningComponentContainer,
                    { opacity: warningFadeValue },
                ]}>
                <BadAnswerScreen
                    item={currentQuestion}
                    quizType="nativeAnswers"
                    badAnswer={badAnswer}
                    onNextButtonPress={hideWarning}
                />
            </Animated.View>
        )
    }

    const renderTextInputs = (): JSX.Element => (
        <>
            <View style={styles.textInputContainer}>
                <TextInput
                    value={currentQuestion.wordToTranslate}
                    style={styles.textInput}
                    textAlign="center"
                />
            </View>

            <View style={styles.textInputContainer}>
                <Animated.View style={textInputAnimationStyle}>
                    <TextInput
                        value={answer}
                        onChangeText={(text) => setAnswer(text)}
                        placeholder={i18n.t('type_translation')}
                        autoCapitalize="none"
                        style={styles.textInput}
                        textAlign="center"
                        selectionColor={APP_COLORS.white}
                        autoCorrect={autoCorrectionEnabled}
                        returnKeyType="done"
                        returnKeyLabel={i18n.t('next')}
                        onSubmitEditing={handleTestAnswer}
                    />
                </Animated.View>
            </View>

            <View style={styles.nextButtonContainer}>
                <TouchableOpacity onPress={handleTestAnswer}>
                    <Text style={styles.nextButton}>
                        {i18n.t('next').toUpperCase()}
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    )

    if (loading) return <AppActivityIndicator />

    return (
        <ImageBackground
            style={{ flex: 1 }}
            source={APP_IMAGE.greenBlueMountains}>
            <DismissKeyboardView>
                <View style={styles.container}>
                    {renderTextInputs()}
                    {warningVisible && renderWarning()}
                </View>
            </DismissKeyboardView>
        </ImageBackground>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    textInputContainer: {
        borderRadius: '8@ms',
        marginHorizontal: '16@ms',
        marginTop: '16@ms',
        alignSelf: 'stretch',
        backgroundColor: APP_COLORS.lightBlue,
    },
    textInput: {
        color: APP_COLORS.white,
        padding: '16@ms',
    },
    nextButtonContainer: {
        borderRadius: '10@ms',
        margin: '16@ms',
        backgroundColor: APP_COLORS.arcticBlue,
    },
    nextButton: {
        color: APP_COLORS.white,
        fontSize: '18@ms',
        margin: '16@ms',
    },
    warningComponentContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
})

export default ExamScreen
