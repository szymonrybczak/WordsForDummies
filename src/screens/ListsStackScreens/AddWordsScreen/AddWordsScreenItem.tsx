import React, { useRef } from 'react'
import { View, Text, Animated } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import Swipeable from 'react-native-gesture-handler/Swipeable'
import APP_COLORS from '../../../common/colors'
import Item from '../../../models/Item'
import i18n from '../../../common/i18n/i18n'
import renderAction from '../../../helpers/SwipeableHelper'

interface AddWordsScreenItemProps {
    item: Item
    deleteItem: () => void
}

const AddWordsScreenItem: React.FC<AddWordsScreenItemProps> = ({
    item,
    deleteItem,
}) => {
    const swipeableRowRef = useRef<Swipeable>(null)

    const { wordToTranslate, answer } = item

    /* ------------------------- Handlers ------------------------- */

    const handleDeletItem = () => {
        deleteItem()
        swipeableRowRef.current?.close()
    }

    /* ------------------------- Rendering ------------------------- */

    const renderRightAction = (progress: Animated.AnimatedInterpolation) => (
        <View style={styles.rightActionContainer}>
            {renderAction(
                i18n.t('delete'),
                APP_COLORS.darkRed,
                64,
                progress,
                handleDeletItem,
                swipeableRowRef
            )}
        </View>
    )

    return (
        <Swipeable
            ref={swipeableRowRef}
            friction={2}
            renderRightActions={renderRightAction}>
            <View style={styles.container}>
                <Text numberOfLines={1} style={styles.text}>
                    {wordToTranslate}
                </Text>
                <Text numberOfLines={1} style={styles.text}>
                    {answer}
                </Text>
            </View>
        </Swipeable>
    )
}

const styles = ScaledSheet.create({
    container: {
        marginHorizontal: '24@ms',
        marginVertical: '8@ms',
    },
    text: {
        color: APP_COLORS.white,
        fontSize: '16@ms',
    },
    rightActionContainer: {
        width: '64@ms',
    },
    rightAction: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: APP_COLORS.darkRed,
    },
    actionText: {
        color: APP_COLORS.white,
        fontSize: '16@ms',
        backgroundColor: 'transparent',
    },
})

export default AddWordsScreenItem
