import React, { useEffect, useState } from 'react'
import {
    Image,
    ImageBackground,
    TouchableOpacity,
    FlatList,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { StackNavigationProp } from '@react-navigation/stack'
import { APP_ICONS, APP_IMAGE } from '../../../common/assets'
import APP_COLORS from '../../../common/colors'
import { deleteList, getLists } from '../../../helpers/deviceStorage'
import List from '../../../models/List'
import AppParams from '../../../navigation/AppParams'
import ListsScreenItem from './ListsScreenItem'
import { handleError } from '../../../helpers/AppAlertManager'
import AppActivityIndicator from '../../../components/AppActivityIndicator'

export type ListsScreenNavigationProp = StackNavigationProp<
    AppParams,
    'ListsScreen'
>

interface ListsScreenProps {
    navigation: ListsScreenNavigationProp
}

const ListsScreen: React.FC<ListsScreenProps> = ({ navigation }) => {
    const [lists, setLists] = useState<List[]>([])
    const [loading, setLoading] = useState<boolean>(false)

    useEffect(() => {
        fetchLists()
        addCreateButton()
    }, [])

    /* ------------------------- Fetching ------------------------- */

    const fetchLists = () => {
        setLoading(true)

        getLists()
            .then(setLists)
            .catch(handleError)
            .finally(() => setLoading(false))
    }

    /* ------------------------- Update UI ------------------------- */

    const addCreateButton = () => {
        navigation.setOptions({
            headerRight: renderCreateButton,
        })
    }

    /* ------------------------- Handlers ------------------------- */

    const handleDeleteList = async (list: List) => {
        setLoading(true)

        try {
            await deleteList(list)
            fetchLists()
        } catch {
            handleError()
        } finally {
            setLoading(false)
        }
    }

    /* ------------------------- Rendering functions ------------------------- */

    const renderActivityIndicator = (): JSX.Element => <AppActivityIndicator />

    const renderCreateButton = (): JSX.Element => (
        <TouchableOpacity
            onPress={() => navigation.navigate('AddListNameScreen')}>
            <Image source={APP_ICONS.plus} style={styles.createButton} />
        </TouchableOpacity>
    )

    const renderList = (): JSX.Element => (
        <FlatList
            keyExtractor={(list) => list.id.toString()}
            data={lists}
            renderItem={({ item }) => renderItem(item)}
        />
    )

    const renderItem = (list: List): JSX.Element => (
        <ListsScreenItem
            list={list}
            navigation={navigation}
            deleteList={() => handleDeleteList(list)}
        />
    )

    return (
        <ImageBackground style={{ flex: 1 }} source={APP_IMAGE.redOrangeTyping}>
            {renderList()}
            {loading && renderActivityIndicator()}
        </ImageBackground>
    )
}

export default ListsScreen

const styles = ScaledSheet.create({
    createButton: {
        tintColor: APP_COLORS.white,
        width: '16@ms',
        height: '16@ms',
        marginRight: '8@ms',
    },
})
