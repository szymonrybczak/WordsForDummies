import React, { useEffect, useState } from 'react'
import {
    Text,
    TouchableOpacity,
    ImageBackground,
    TextInput,
    KeyboardAvoidingView,
    View,
    Animated,
    Easing,
    Platform,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { StackNavigationProp } from '@react-navigation/stack'
import { APP_IMAGE } from '../../common/assets'
import APP_COLORS from '../../common/colors'
import i18n from '../../common/i18n/i18n'
import DismissKeyboardView from '../../components/DismissKeyboardView'
import AppParams from '../../navigation/AppParams'
import { getFromAsyncStorage } from '../../helpers/deviceStorage'
import { handleError } from '../../helpers/AppAlertManager'
import AppActivityIndicator from '../../components/AppActivityIndicator'
import List from '../../models/List'

type AddListNameScreenNavigationProp = StackNavigationProp<
    AppParams,
    'AddListNameScreen'
>

interface AddListNameScreenProps {
    navigation: AddListNameScreenNavigationProp
}

const AddListNameScreen: React.FC<AddListNameScreenProps> = ({
    navigation,
}) => {
    const [name, setName] = useState<string>('')
    const [autoCorrectionEnabled, setAutoCorrection] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const textInputAnimatedValue = new Animated.Value(0)

    useEffect(() => {
        fetchSetting()
    }, [])

    useEffect(() => {
        addNextButton()
    })

    /* ------------------------- Fetching ------------------------- */

    const fetchSetting = () => {
        setLoading(true)

        getFromAsyncStorage('addingListAutoCorrectionEnabled')
            .then(setAutoCorrection)
            .catch(handleError)
            .finally(() => setLoading(false))
    }

    /* ------------------------- Handlers ------------------------- */

    const handleNextButtonPress = () => {
        const isNameEmpty = name.trim().length === 0

        if (isNameEmpty) {
            startTextInputAnimation()
            return
        }

        const id = Math.floor(100000 + Math.random() * 900000) // Creates 6 numbers length id

        const list: List = {
            id,
            name,
            items: [],
        }

        navigation.navigate('AddWordsScreen', { list })
    }

    /* ------------------------- Utils ------------------------- */

    const startTextInputAnimation = () => {
        textInputAnimatedValue.setValue(0)

        Animated.timing(textInputAnimatedValue, {
            toValue: 3,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start()
    }

    const addNextButton = () => {
        navigation.setOptions({
            headerRight: renderNextButton,
        })
    }

    /* ------------------------- Helpers ------------------------- */

    const textInputAnimationStyle = {
        transform: [
            {
                translateX: textInputAnimatedValue.interpolate({
                    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3],
                    outputRange: [0, -10, 0, 10, 0, -10, 0],
                }),
            },
        ],
    }

    /* ------------------------- Rendering functions ------------------------- */

    const renderActivityIndicator = (): JSX.Element => <AppActivityIndicator />

    const renderNextButton = (): JSX.Element => (
        <TouchableOpacity onPress={handleNextButtonPress}>
            <Text style={styles.nextButton}>{i18n.t('next')}</Text>
        </TouchableOpacity>
    )

    const renderTextInput = (): JSX.Element => (
        <>
            <Text style={styles.title}>{i18n.t('type_list_name')}</Text>

            <View style={styles.textInputContainer}>
                <Animated.View style={textInputAnimationStyle}>
                    <TextInput
                        value={name}
                        placeholder={i18n.t('describe_your_list')}
                        onChangeText={setName}
                        style={styles.textInput}
                        selectionColor={APP_COLORS.white}
                        autoFocus
                        autoCapitalize="none"
                        textAlign="center"
                        autoCorrect={autoCorrectionEnabled}
                    />
                </Animated.View>
            </View>
        </>
    )

    return (
        <ImageBackground
            style={styles.imageBackground}
            source={APP_IMAGE.redOrangeTyping}>
            <DismissKeyboardView>
                <KeyboardAvoidingView
                    style={styles.container}
                    behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
                    {renderTextInput()}
                    {loading && renderActivityIndicator()}
                </KeyboardAvoidingView>
            </DismissKeyboardView>
        </ImageBackground>
    )
}

const styles = ScaledSheet.create({
    imageBackground: {
        flex: 1,
    },
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        color: APP_COLORS.white,
        fontSize: '16@ms',
    },
    textInputContainer: {
        borderRadius: '8@ms',
        margin: '32@ms',
        marginTop: '16@ms',
        alignSelf: 'stretch',
        backgroundColor: APP_COLORS.red,
    },
    textInput: {
        padding: '16@ms',
        color: APP_COLORS.white,
    },
    nextButton: {
        color: APP_COLORS.white,
        marginRight: '8@ms',
    },
})

export default AddListNameScreen
