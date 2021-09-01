import React from 'react'
import { View, Text, TouchableOpacity } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import LinearGradient from 'react-native-linear-gradient'
import APP_COLORS from '../common/colors'

interface WarningViewProps {
    title?: string
    description: string
    doneButtonTitle: string
    onDoneButtonPress: () => void
    gradientColors: string[]
}

const WarningView: React.FC<WarningViewProps> = ({
    title,
    description,
    doneButtonTitle,
    onDoneButtonPress,
    gradientColors,
}) => {
    const isTitle = title !== undefined

    const renderTitle = (): JSX.Element => (
        <View style={styles.titleContainer}>
            <Text style={styles.title}>{title}</Text>
        </View>
    )

    const renderDescriptionText = (): JSX.Element => (
        <View
            style={[
                styles.descriptionTextContainer,
                {
                    justifyContent: isTitle ? 'flex-start' : 'center',
                },
            ]}>
            <Text style={styles.descriptionText}>{description}</Text>
        </View>
    )

    const renderDoneButton = (): JSX.Element => (
        <View style={styles.doneButtonContainer}>
            <View style={styles.doneButton}>
                <TouchableOpacity onPress={onDoneButtonPress}>
                    <Text style={styles.doneButtonTitle}>
                        {doneButtonTitle}
                    </Text>
                </TouchableOpacity>
            </View>
        </View>
    )

    return (
        <LinearGradient colors={gradientColors} style={styles.container}>
            {isTitle && renderTitle()}
            {renderDescriptionText()}
            {renderDoneButton()}
        </LinearGradient>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
    },
    titleContainer: {
        flex: 2,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: '32@ms',
        color: APP_COLORS.white,
    },
    descriptionTextContainer: {
        flex: 2,
        alignItems: 'center',
    },
    descriptionText: {
        color: APP_COLORS.white,
        textAlign: 'center',
        lineHeight: '30@ms',
    },
    doneButtonContainer: {
        flex: 1,
    },
    doneButton: {
        borderWidth: '2@ms',
        borderColor: APP_COLORS.white,
    },
    doneButtonTitle: {
        color: APP_COLORS.white,
        fontSize: '32@ms',
        padding: '16@ms',
    },
})

export default WarningView
