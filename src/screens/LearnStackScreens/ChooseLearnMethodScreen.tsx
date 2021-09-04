import React, { useEffect, useState, useRef } from 'react'
import { Text, ImageBackground, TouchableOpacity, Animated } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { StackNavigationProp } from '@react-navigation/stack'
import APP_COLORS from '../../common/colors'
import i18n from '../../common/i18n/i18n'
import AppParams from '../../navigation/AppParams'
import { APP_IMAGE } from '../../common/assets'
import { getLists } from '../../helpers/deviceStorage'
import { handleError } from '../../helpers/AppAlertManager'
import AppActivityIndicator from '../../components/AppActivityIndicator'
import WarningView from '../../components/WarningView'
import List from '../../models/List'

type ChooseLearnMethodScreenNavigationProp = StackNavigationProp<
    AppParams,
    'ChooseLearnMethodScreen'
>

interface ChooseLearnMethodScreenProps {
    navigation: ChooseLearnMethodScreenNavigationProp
}

const ChooseLearnMethodScreen: React.FC<ChooseLearnMethodScreenProps> = ({
    navigation,
}) => {
    const [warningVisible, setWarningVisible] = useState<boolean>(false)
    const [didUserCreatedList, setDidUserCreatedList] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(true)

    const warningFadeValue = useRef(new Animated.Value(0)).current

    useEffect(() => {
        checkDidUserCreatedList()
    }, [])

    /* ------------------------- Utils ------------------------- */

    const checkDidUserCreatedList = () => {
        setLoading(true)

        getLists()
            .then(filterLists)
            .catch(handleError)
            .finally(() => setLoading(false))
    }

    const filterLists = (lists: List[]) => {
        const didUserCreatedList = lists.length !== 0
        setDidUserCreatedList(didUserCreatedList)
    }

    const showWarning = () => {
        setWarningVisible(true)
        warningFadeValue.setValue(0)

        Animated.timing(warningFadeValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }

    /* ------------------------- Handlers ------------------------- */

    const handleNavigateToCreateNewListScreens = () => {
        setWarningVisible(false)
        navigation.navigate('AddListNameScreen')
    }

    const handleNavigateToQuizScreens = () => {
        if (!didUserCreatedList) {
            showWarning()
            return
        }

        navigation.navigate('ChooseQuizTypeScreen')
    }

    const handleNavigateToExamScreens = () => {
        if (!didUserCreatedList) {
            showWarning()
            return
        }

        navigation.navigate('ChooseListScreen', {
            learnMethod: 'exam',
        })
    }

    /* ------------------------- Rendering ------------------------- */

    const renderActivityIndicator = (): JSX.Element => <AppActivityIndicator />

    const renderQuizButton = (): JSX.Element => (
        <TouchableOpacity
            style={styles.button}
            onPress={handleNavigateToQuizScreens}>
            <Text style={styles.text}>{i18n.t('quiz')}</Text>
        </TouchableOpacity>
    )

    const renderExamButton = (): JSX.Element => (
        <TouchableOpacity
            style={[styles.button, { backgroundColor: APP_COLORS.lightGray }]}
            onPress={handleNavigateToExamScreens}>
            <Text style={styles.text}>{i18n.t('exam')}</Text>
        </TouchableOpacity>
    )

    const renderWarning = (): JSX.Element => (
        <Animated.View
            style={[
                styles.warningComponentContainer,
                { opacity: warningFadeValue },
            ]}>
            <WarningView
                title={i18n.t('oops')}
                description={i18n.t('no_lists_warning_description')}
                doneButtonTitle={i18n.t('add')}
                gradientColors={[APP_COLORS.lightBlue, APP_COLORS.green]}
                onDoneButtonPress={handleNavigateToCreateNewListScreens}
            />
        </Animated.View>
    )

    return (
        <ImageBackground
            style={styles.container}
            source={APP_IMAGE.greenBlueNotebook}>
            {renderQuizButton()}
            {renderExamButton()}
            {loading && renderActivityIndicator()}
            {warningVisible && renderWarning()}
        </ImageBackground>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        flexDirection: 'row',
    },
    text: {
        fontSize: '24@ms',
        color: APP_COLORS.white,
    },
    button: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    warningComponentContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
        backgroundColor: APP_COLORS.lightBlue,
    },
})

export default ChooseLearnMethodScreen
