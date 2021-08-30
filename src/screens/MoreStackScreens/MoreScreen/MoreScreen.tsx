import React from 'react'
import { View, ImageBackground } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { ScaledSheet } from 'react-native-size-matters'
import { APP_ICONS, APP_IMAGE } from '../../../common/assets'
import i18n from '../../../common/i18n/i18n'
import AppParams from '../../../navigation/AppParams'
import MoreScreenItem from './MoreScreenItem'

type MoreScreenNavigationProp = StackNavigationProp<AppParams, 'MoreScreen'>

interface MoreScreenProps {
    navigation: MoreScreenNavigationProp
}

const MoreScreen: React.FC<MoreScreenProps> = ({ navigation }) => {
    const handleNavigateToSettingsScreen = () =>
        navigation.navigate('SettingsScreen')

    const handleNavigateToFeaturesScreen = () =>
        navigation.navigate('FeaturesScreen')

    const handleNavigateToAboutScreen = () => navigation.navigate('AboutScreen')

    const handleNavigateToForGeeksScreen = () =>
        navigation.navigate('ForGeeksScreen')

    return (
        <ImageBackground
            style={styles.container}
            source={APP_IMAGE.bluePurpleBlueberries}>
            <View style={styles.buttonsContainer}>
                <View style={styles.buttonsRowContainer}>
                    <MoreScreenItem
                        icon={APP_ICONS.settings}
                        title={i18n.t('settings')}
                        onPress={handleNavigateToSettingsScreen}
                    />
                    <MoreScreenItem
                        icon={APP_ICONS.diamond}
                        title={i18n.t('features')}
                        onPress={handleNavigateToFeaturesScreen}
                    />
                </View>
                <View style={styles.buttonsRowContainer}>
                    <MoreScreenItem
                        icon={APP_ICONS.book}
                        title={i18n.t('about')}
                        onPress={handleNavigateToAboutScreen}
                    />
                    <MoreScreenItem
                        icon={APP_ICONS.flask}
                        title={i18n.t('for_geeks')}
                        onPress={handleNavigateToForGeeksScreen}
                    />
                </View>
            </View>
        </ImageBackground>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    buttonsContainer: {
        width: '80%',
        aspectRatio: 1,
        // Using RGBA here because, when using opacity prop children also receive this opacity
        backgroundColor: 'rgba(72, 139, 239, 0.8)',
        borderRadius: '30@ms',
        padding: '16@ms',
    },
    buttonsRowContainer: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-between',
    },
})

export default MoreScreen
