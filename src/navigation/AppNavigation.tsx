import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack'
import i18n from '../common/i18n/i18n'
import AppParams from './AppParams'
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen'
import MoreScreen from '../screens/MoreStackScreens/MoreScreen'
import ListsScreen from '../screens/ListsStackScreens/ListsScreen'
import ChooseLearnMethodScreen from '../screens/LearnStackScreens/ChooseLearnMethodScreen'
import {
    LearnStackHeaderOptions,
    ListsStackHeaderOptions,
    MoreStackHeaderOptions,
} from './AppHeaderOptions'
import APP_COLORS from '../common/colors'

const Stack = createStackNavigator<AppParams>()

const AppNavigation = () => (
    <NavigationContainer>
        <Stack.Navigator screenOptions={AppNavigationOptions}>
            <Stack.Screen
                name="WelcomeScreen"
                component={WelcomeScreen}
                options={WelcomeScreenOptions}
            />
            <Stack.Screen
                name="ChooseLearnMethodScreen"
                component={ChooseLearnMethodScreen}
                options={ChooseLearnMethodScreenOptions}
            />
            <Stack.Screen
                name="ListsScreen"
                component={ListsScreen}
                options={ListsScreenOptions}
            />
            <Stack.Screen
                name="MoreScreen"
                component={MoreScreen}
                options={MoreScreenOptions}
            />
        </Stack.Navigator>
    </NavigationContainer>
)

const AppNavigationOptions: StackNavigationOptions = {
    headerTintColor: APP_COLORS.white,
    title: ' ',
}

const WelcomeScreenOptions: StackNavigationOptions = {
    title: i18n.t('hello_dummy'),
    headerTintColor: APP_COLORS.white,
    headerStyle: { backgroundColor: APP_COLORS.arcticBlue },
}

const ChooseLearnMethodScreenOptions: StackNavigationOptions = {
    title: i18n.t('choose_method'),
    ...LearnStackHeaderOptions,
}

const ListsScreenOptions: StackNavigationOptions = {
    title: i18n.t('your_lists'),
    ...ListsStackHeaderOptions,
}

const MoreScreenOptions: StackNavigationOptions = {
    title: i18n.t('more'),
    ...MoreStackHeaderOptions,
}

export default AppNavigation
