import React, { useRef } from 'react'
import { Text, TouchableOpacity, Animated, View } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { BlurView } from '@react-native-community/blur'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import List from '../../../models/List'
import APP_COLORS from '../../../common/colors'
import renderAction from '../../../helpers/SwipeableHelper'
import i18n from '../../../common/i18n/i18n'
import { ListsScreenNavigationProp } from './ListsScreen'

interface ListsScreenItemProps {
    list: List
    navigation: ListsScreenNavigationProp
    deleteList: () => void
}

const ListsScreenItem: React.FC<ListsScreenItemProps> = ({
    list,
    navigation,
    deleteList,
}) => {
    const swipeableRowRef = useRef<Swipeable>(null)

    /* ------------------------- Handlers ------------------------- */

    const handleNavigateToEditScreen = () =>
        navigation.navigate('AddWordsScreen', { list })

    const handleDeleteList = () => {
        deleteList()
        swipeableRowRef.current?.close()
    }

    /* ------------------------- Rendering functions ------------------------- */

    const renderRightAction = (progress: Animated.AnimatedInterpolation) => (
        <View style={styles.rightActionContainer}>
            {renderAction(
                i18n.t('delete'),
                APP_COLORS.darkRed,
                64,
                progress,
                handleDeleteList,
                swipeableRowRef
            )}
        </View>
    )

    const renderListName = (): JSX.Element => (
        <Text style={styles.name}>{list.name}</Text>
    )

    return (
        <Swipeable
            ref={swipeableRowRef}
            friction={2}
            renderRightActions={renderRightAction}>
            <BlurView
                blurType="light"
                blurAmount={100}
                style={styles.container}>
                <TouchableOpacity onPress={handleNavigateToEditScreen}>
                    {renderListName()}
                </TouchableOpacity>
            </BlurView>
        </Swipeable>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        marginTop: '8@ms',
    },
    name: {
        padding: '24@ms',
        color: APP_COLORS.white,
    },
    rightActionContainer: {
        width: '64@ms',
    },
})

export default ListsScreenItem
