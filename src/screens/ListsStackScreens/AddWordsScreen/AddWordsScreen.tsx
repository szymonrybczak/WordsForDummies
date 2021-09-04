import React, { useEffect, useRef, useState } from 'react'
import {
    View,
    Text,
    ImageBackground,
    TouchableOpacity,
    TextInput,
    FlatList,
    Animated,
    Easing,
    Keyboard,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { RouteProp } from '@react-navigation/native'
import { StackNavigationProp } from '@react-navigation/stack'
import useStateWithCallback from 'use-state-with-callback'
import { APP_IMAGE } from '../../../common/assets'
import APP_COLORS from '../../../common/colors'
import i18n from '../../../common/i18n/i18n'
import DismissKeyboardView from '../../../components/DismissKeyboardView'
import WarningView from '../../../components/WarningView'
import {
    createList,
    updateList,
    getFromAsyncStorage,
} from '../../../helpers/deviceStorage'
import List from '../../../models/List'
import Item from '../../../models/Item'
import AppParams from '../../../navigation/AppParams'
import AddWordsScreenItem from './AddWordsScreenItem'
import AppActivityIndicator from '../../../components/AppActivityIndicator'
import { handleError } from '../../../helpers/AppAlertManager'

type AddWordsScreenNavigationProp = StackNavigationProp<
    AppParams,
    'AddWordsScreen'
>

type AddWordsScreenRouteProp = RouteProp<AppParams, 'AddWordsScreen'>

interface AddWordsScreenProps {
    navigation: AddWordsScreenNavigationProp
    route: AddWordsScreenRouteProp
}

const AddWordsScreen: React.FC<AddWordsScreenProps> = ({
    navigation,
    route,
}) => {
    const { items: itemsFromList } = route.params.list

    const isEdit = itemsFromList.length !== 0

    const [wordToTranslate, setWordToTranslate] = useState<string>('')
    const [answer, setAnswer] = useState<string>('')
    const [items, setItems] = useState<Item[]>(itemsFromList)
    const [warningVisible, setWarningVisible] = useStateWithCallback<boolean>(
        false,
        () => startWarningAnimation()
    )
    const [autoCorrectionEnabled, setAutoCorrection] = useState<boolean>(false)
    const [loading, setLoading] = useState<boolean>(false)

    const wordToTranslateTextInputAnimatedValue = new Animated.Value(0)
    const answerTextInputAnimatedValue = new Animated.Value(0)
    const warningViewFadeValue = new Animated.Value(0)

    const wordToTranslateTextInputRef = useRef<TextInput>(null)

    useEffect(() => {
        fetchSettings()
    }, [])

    useEffect(() => {
        setNavigationBar()
    })

    /* ------------------------- Fetching ------------------------- */

    const fetchSettings = () => {
        setLoading(true)

        getFromAsyncStorage('addingListAutoCorrectionEnabled')
            .then(setAutoCorrection)
            .catch(handleError)
            .finally(() => setLoading(false))
    }

    /* ------------------------- Helpers ------------------------- */

    const getTextInputAnimationStyle = (animationValue: Animated.Value) => ({
        transform: [
            {
                translateX: animationValue.interpolate({
                    inputRange: [0, 0.5, 1, 1.5, 2, 2.5, 3, 3.5, 4],
                    outputRange: [0, -10, 0, 10, 0, -10, 0, -10, 0],
                }),
            },
        ],
    })

    /* ------------------------- Handlers ------------------------- */

    const handleAddWord = () => {
        const isWordToTranslateEmpty = wordToTranslate.trim().length === 0
        if (isWordToTranslateEmpty) {
            startTextInputAnimation(wordToTranslateTextInputAnimatedValue)
            return
        }

        const isAnswerEmpty = answer.trim().length === 0
        if (isAnswerEmpty) {
            startTextInputAnimation(answerTextInputAnimatedValue)
            return
        }

        const id = Math.floor(100000 + Math.random() * 900000) // Creates 6 numbers length id

        const item: Item = {
            id,
            wordToTranslate: wordToTranslate.trim(),
            answer: answer.trim(),
        }

        setItems((prevState) => [...prevState, item])

        setWordToTranslate('')
        setAnswer('')

        wordToTranslateTextInputRef.current?.focus()
    }

    const handleCreateList = () => {
        const minimumListItems = 4
        if (items.length < minimumListItems) {
            showWarning()
            return
        }

        const { name, id } = route.params.list

        const list: List = {
            id,
            name,
            items,
        }

        setLoading(true)
        createList(list)
            .then(() => navigation.navigate('WelcomeScreen'))
            .catch(handleError)
            .finally(() => setLoading(false))
    }

    const handleUpdateList = () => {
        const minimumListItems = 4
        if (items.length < minimumListItems) {
            showWarning()
            return
        }

        const { name, id } = route.params.list

        const newList: List = {
            id,
            name,
            items,
        }

        setLoading(true)
        updateList(newList)
            .then(() => navigation.navigate('WelcomeScreen'))
            .catch(handleError)
            .finally(() => setLoading(false))

        navigation.navigate('WelcomeScreen')
    }

    const handleDeleteItem = (item: Item) => {
        const newItems = [...items]
        const index = newItems.indexOf(item)
        newItems.splice(index, 1)

        setItems(newItems)
    }

    /* ------------------------- Update UI ------------------------- */

    const setNavigationBar = () => {
        const title = isEdit ? i18n.t('edit') : i18n.t('almost_done')
        const headerRight = isEdit ? renderUpdateButton : renderCreateButton

        navigation.setOptions({ title, headerRight })
    }

    /* ------------------------- Utils ------------------------- */

    const startTextInputAnimation = (animationValue: Animated.Value) => {
        animationValue.setValue(0)

        Animated.timing(animationValue, {
            toValue: 4,
            duration: 300,
            easing: Easing.linear,
            useNativeDriver: true,
        }).start()
    }

    const showWarning = () => {
        setWarningVisible(true)
        Keyboard.dismiss()
    }

    const startWarningAnimation = () => {
        Animated.timing(warningViewFadeValue, {
            toValue: 1,
            duration: 300,
            useNativeDriver: true,
        }).start()
    }

    const hideWaring = () => {
        Animated.timing(warningViewFadeValue, {
            toValue: 0,
            duration: 250,
            useNativeDriver: true,
        }).start()

        setTimeout(() => setWarningVisible(false), 250)
        wordToTranslateTextInputRef.current?.focus()
    }

    /* ------------------------- Rendering functions ------------------------- */

    const renderActivityIndicator = (): JSX.Element => <AppActivityIndicator />

    const renderAddItemView = (): JSX.Element => (
        <View style={styles.addItemComponentContainer}>
            <View style={{ flex: 1 }}>
                <Animated.View
                    style={[
                        styles.textInputContainer,
                        getTextInputAnimationStyle(
                            wordToTranslateTextInputAnimatedValue
                        ),
                    ]}>
                    <TextInput
                        ref={wordToTranslateTextInputRef}
                        placeholder={i18n.t('word_to_translate')}
                        value={wordToTranslate}
                        onChangeText={setWordToTranslate}
                        style={styles.textInput}
                        selectionColor={APP_COLORS.white}
                        autoCapitalize="none"
                        textAlign="center"
                        autoCorrect={autoCorrectionEnabled}
                    />
                </Animated.View>

                <Animated.View
                    style={[
                        styles.textInputContainer,
                        getTextInputAnimationStyle(
                            answerTextInputAnimatedValue
                        ),
                    ]}>
                    <TextInput
                        value={answer}
                        placeholder={i18n.t('word_translation')}
                        onChangeText={setAnswer}
                        style={styles.textInput}
                        selectionColor={APP_COLORS.white}
                        autoCapitalize="none"
                        textAlign="center"
                        autoCorrect={autoCorrectionEnabled}
                    />
                </Animated.View>
            </View>

            <TouchableOpacity onPress={handleAddWord}>
                <View style={styles.addButtonContainer}>
                    <Text style={styles.addButton}>{i18n.t('add')}</Text>
                </View>
            </TouchableOpacity>
        </View>
    )

    const renderList = (): JSX.Element => (
        <FlatList
            keyExtractor={(item) => item.id.toString()}
            data={items}
            renderItem={({ item }) => renderListItem(item)}
            ItemSeparatorComponent={renderListIndicator}
        />
    )

    const renderListItem = (item: Item): JSX.Element => (
        <AddWordsScreenItem
            item={item}
            deleteItem={() => handleDeleteItem(item)}
        />
    )

    const renderListIndicator = (): JSX.Element => (
        <View style={styles.listIndicator} />
    )

    const renderUpdateButton = (): JSX.Element => (
        <TouchableOpacity onPress={handleUpdateList}>
            <Text style={styles.headerRightButtonText}>{i18n.t('update')}</Text>
        </TouchableOpacity>
    )

    const renderCreateButton = (): JSX.Element => (
        <TouchableOpacity onPress={handleCreateList}>
            <Text style={styles.headerRightButtonText}>{i18n.t('create')}</Text>
        </TouchableOpacity>
    )

    const renderWarning = (): JSX.Element => (
        <Animated.View
            style={[
                styles.warningComponentContainer,
                { opacity: warningViewFadeValue },
            ]}>
            <WarningView
                gradientColors={[APP_COLORS.pink, APP_COLORS.red]}
                description={i18n.t('no_enough_items_in_list')}
                doneButtonTitle={i18n.t('okay')}
                onDoneButtonPress={hideWaring}
            />
        </Animated.View>
    )

    return (
        <DismissKeyboardView>
            <ImageBackground
                style={styles.container}
                source={APP_IMAGE.redOrangeWriting}>
                {renderAddItemView()}
                {renderList()}
                {warningVisible && renderWarning()}
                {loading && renderActivityIndicator()}
            </ImageBackground>
        </DismissKeyboardView>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    textInputContainer: {
        borderRadius: '8@ms',
        margin: '4@ms',
        backgroundColor: APP_COLORS.red,
    },
    textInput: {
        color: APP_COLORS.white,
        padding: '16@ms',
        alignSelf: 'stretch',
    },
    addItemComponentContainer: {
        flexDirection: 'row',
        padding: '12@ms',
    },
    addButtonContainer: {
        flex: 1,
        justifyContent: 'center',
        borderRadius: '8@ms',
        margin: '4@ms',
        backgroundColor: APP_COLORS.red,
    },
    addButton: {
        color: APP_COLORS.white,
        fontSize: '18@ms',
        paddingHorizontal: '16@ms',
    },
    listIndicator: {
        marginHorizontal: '16@ms',
        height: 1,
        backgroundColor: APP_COLORS.white,
    },
    headerRightButtonText: {
        color: APP_COLORS.white,
        marginRight: '8@ms',
    },
    warningComponentContainer: {
        position: 'absolute',
        width: '100%',
        height: '100%',
    },
})

export default AddWordsScreen
