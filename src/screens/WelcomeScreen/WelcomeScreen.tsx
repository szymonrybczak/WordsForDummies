import React from 'react'
import { View, StyleSheet } from 'react-native'
import { StackNavigationProp } from '@react-navigation/stack'
import { APP_IMAGE } from '../../common/assets'
import i18n from '../../common/i18n/i18n'
import AppParams from '../../navigation/AppParams'
import WelcomeScreenItem from './WelcomeScreenItem'

type WelcomeScreenNavigationProp = StackNavigationProp<
    AppParams,
    'WelcomeScreen'
>

interface WelcomeScreenProps {
    navigation: WelcomeScreenNavigationProp
}

const WelcomeScreen: React.FC<WelcomeScreenProps> = ({ navigation }) => {
    const handleNavigateToChooseLearnMethodScreen = () =>
        navigation.navigate('ChooseLearnMethodScreen')

    const handleNavigateToListsScreen = () => navigation.navigate('ListsScreen')

    const handleNavigateToMoreScreen = () => navigation.navigate('MoreScreen')

    return (
        <View style={styles.container}>
            <WelcomeScreenItem
                image={APP_IMAGE.greenBluePeopleStudying}
                title={i18n.t('learn')}
                onPress={handleNavigateToChooseLearnMethodScreen}
            />
            <WelcomeScreenItem
                image={APP_IMAGE.redOrangeNotebook}
                title={i18n.t('your_lists')}
                onPress={handleNavigateToListsScreen}
            />
            <WelcomeScreenItem
                image={APP_IMAGE.bluePurpleBlueberries}
                title={i18n.t('more')}
                onPress={handleNavigateToMoreScreen}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
})

export default WelcomeScreen
