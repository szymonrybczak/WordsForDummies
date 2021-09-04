import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    TouchableOpacity,
    ImageBackground,
    Platform,
} from 'react-native'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ScaledSheet } from 'react-native-size-matters'
import { Picker } from '@react-native-picker/picker'
import AppParams from '../../navigation/AppParams'
import APP_COLORS from '../../common/colors'
import List from '../../models/List'
import { getLists } from '../../helpers/deviceStorage'
import { handleError } from '../../helpers/AppAlertManager'
import i18n from '../../common/i18n/i18n'
import { APP_IMAGE } from '../../common/assets'
import AppActivityIndicator from '../../components/AppActivityIndicator'

type ChooseListScreenRouteProp = RouteProp<AppParams, 'ChooseListScreen'>

type ChooseListScreenNavigationProp = StackNavigationProp<
    AppParams,
    'ChooseListScreen'
>

interface ChooseListScreenProps {
    route: ChooseListScreenRouteProp
    navigation: ChooseListScreenNavigationProp
}

const ChooseListScreen: React.FC<ChooseListScreenProps> = ({
    route,
    navigation,
}) => {
    const { quizType, learnMethod } = route.params

    const [lists, setLists] = useState<List[]>([])
    const [listIndex, setListIndex] = useState<number>(0)
    const [loading, setLoading] = useState<boolean>(true)

    const currentList = lists[listIndex]

    useEffect(() => {
        fetchLists()
    }, [])

    /* ------------------------- Fetching ------------------------- */

    const fetchLists = () => {
        setLoading(true)

        getLists()
            .then(setLists)
            .catch(handleError)
            .finally(() => setLoading(false))
    }

    /* ------------------------- Handlers ------------------------- */

    const handleNavigateToQuizScreen = () => {
        if (quizType === undefined) return

        navigation.navigate('QuizScreen', {
            list: currentList,
            quizType,
        })
    }

    const handleNavigateToExamScreen = () => {
        navigation.navigate('ExamScreen', {
            list: currentList,
        })
    }

    /* ------------------------- Rendering ------------------------- */

    const renderActivityIndicator = (): JSX.Element => <AppActivityIndicator />

    const renderStartButton = (): JSX.Element => {
        const isQuiz = learnMethod === 'quiz'

        const buttonTitle = isQuiz ? i18n.t('start_quiz') : i18n.t('start_exam')
        const onPress = isQuiz
            ? handleNavigateToQuizScreen
            : handleNavigateToExamScreen

        return (
            <TouchableOpacity
                style={styles.startButtonContainer}
                onPress={onPress}>
                <Text style={styles.startButtonText}>{buttonTitle}</Text>
            </TouchableOpacity>
        )
    }

    const renderPicker = (): JSX.Element => {
        const currentListIsEmpty = currentList === undefined
        if (currentListIsEmpty) return <View />

        const pickerColor =
            Platform.OS === 'ios' ? APP_COLORS.white : APP_COLORS.black

        return (
            <View style={styles.pickerContainer}>
                <Picker
                    selectedValue={currentList.name}
                    onValueChange={(_, index) => setListIndex(index)}>
                    {lists.map((list) => (
                        <Picker.Item
                            color={pickerColor}
                            label={list.name}
                            value={list.name}
                            key={list.id}
                        />
                    ))}
                </Picker>
            </View>
        )
    }

    return (
        <ImageBackground
            style={styles.container}
            source={APP_IMAGE.greenBluePeopleSitting}>
            {renderPicker()}
            {renderStartButton()}
            {loading && renderActivityIndicator()}
        </ImageBackground>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: APP_COLORS.darkBlue,
    },
    pickerContainer: {
        backgroundColor:
            Platform.OS === 'ios' ? 'transparent' : APP_COLORS.darkGray,
    },
    startButtonContainer: {
        position: 'absolute',
        bottom: 0,
        width: '100%',
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: APP_COLORS.darkBlue,
    },
    startButtonText: {
        color: APP_COLORS.white,
        padding: '32@ms',
        fontSize: '24@ms',
    },
})

export default ChooseListScreen
