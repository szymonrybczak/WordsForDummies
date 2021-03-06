import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import {
    createStackNavigator,
    StackNavigationOptions,
} from '@react-navigation/stack'
import i18n from '../common/i18n/i18n'
import AppParams from './AppParams'
import WelcomeScreen from '../screens/WelcomeScreen/WelcomeScreen'
import MoreScreen from '../screens/MoreStackScreens/MoreScreen/MoreScreen'
import ListsScreen from '../screens/ListsStackScreens/ListsScreen/ListsScreen'
import ChooseLearnMethodScreen from '../screens/LearnStackScreens/ChooseLearnMethodScreen'
import {
    LearnStackHeaderOptions,
    ListsStackHeaderOptions,
    MoreStackHeaderOptions,
} from './AppHeaderOptions'
import APP_COLORS from '../common/colors'
import SettingsScreen from '../screens/MoreStackScreens/SettingsScreen'
import FeaturesScreen from '../screens/MoreStackScreens/FeaturesScreen'
import AboutScreen from '../screens/MoreStackScreens/AboutScreen'
import ForGeeksScreen from '../screens/MoreStackScreens/ForGeeksScreen'
import AddListNameScreen from '../screens/ListsStackScreens/AddListNameScreen'
import AddWordsScreen from '../screens/ListsStackScreens/AddWordsScreen/AddWordsScreen'
import ChooseQuizTypeScreen from '../screens/LearnStackScreens/ChooseQuizTypeScreen'
import ChooseListScreen from '../screens/LearnStackScreens/ChooseListScreen'
import QuizScreen from '../screens/LearnStackScreens/Quiz/QuizScreen'
import SuccessQuizScreen from '../screens/LearnStackScreens/Quiz/SuccessQuizScreen'
import ExamScreen from '../screens/LearnStackScreens/Exam/ExamScreen'
import SuccessExamScreen from '../screens/LearnStackScreens/Exam/SuccessExamScreen'

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
                name="ChooseQuizTypeScreen"
                component={ChooseQuizTypeScreen}
                options={ChooseQuizTypeScreenOptions}
            />
            <Stack.Screen
                name="ChooseListScreen"
                component={ChooseListScreen}
                options={ChooseListScreenOptions}
            />
            <Stack.Screen
                name="QuizScreen"
                component={QuizScreen}
                options={QuizScreenOptions}
            />
            <Stack.Screen
                name="SuccessQuizScreen"
                component={SuccessQuizScreen}
                options={SuccessQuizScreenOptions}
            />
            <Stack.Screen
                name="ExamScreen"
                component={ExamScreen}
                options={ExamScreenOptions}
            />
            <Stack.Screen
                name="SuccessExamScreen"
                component={SuccessExamScreen}
                options={SuccessExamScreenOptions}
            />
            <Stack.Screen
                name="ListsScreen"
                component={ListsScreen}
                options={ListsScreenOptions}
            />
            <Stack.Screen
                name="AddListNameScreen"
                component={AddListNameScreen}
                options={AddListNameScreenOptions}
            />
            <Stack.Screen
                name="AddWordsScreen"
                component={AddWordsScreen}
                options={AddWordsScreenOptions}
            />
            <Stack.Screen
                name="MoreScreen"
                component={MoreScreen}
                options={MoreScreenOptions}
            />
            <Stack.Screen
                name="SettingsScreen"
                component={SettingsScreen}
                options={SettingsScreenOptions}
            />
            <Stack.Screen
                name="FeaturesScreen"
                component={FeaturesScreen}
                options={FeaturesScreenOptions}
            />
            <Stack.Screen
                name="AboutScreen"
                component={AboutScreen}
                options={AboutScreenOptions}
            />
            <Stack.Screen
                name="ForGeeksScreen"
                component={ForGeeksScreen}
                options={ForGeeksScreenOptions}
            />
        </Stack.Navigator>
    </NavigationContainer>
)

const AppNavigationOptions: StackNavigationOptions = {
    headerTintColor: APP_COLORS.white,
    headerBackTitle: ' ',
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

const ChooseQuizTypeScreenOptions: StackNavigationOptions = {
    title: i18n.t('quiz'),
    ...LearnStackHeaderOptions,
}

const ChooseListScreenOptions: StackNavigationOptions = {
    title: i18n.t('choose_list'),
    ...LearnStackHeaderOptions,
}

const QuizScreenOptions: StackNavigationOptions = {
    title: i18n.t('quiz'),
    ...LearnStackHeaderOptions,
}

const SuccessQuizScreenOptions: StackNavigationOptions = {
    title: '',
    ...LearnStackHeaderOptions,
}

const ExamScreenOptions: StackNavigationOptions = {
    title: i18n.t('exam'),
    ...LearnStackHeaderOptions,
}

const SuccessExamScreenOptions: StackNavigationOptions = {
    title: '',
    ...LearnStackHeaderOptions,
}

const ListsScreenOptions: StackNavigationOptions = {
    title: i18n.t('your_lists'),
    ...ListsStackHeaderOptions,
}

const AddListNameScreenOptions: StackNavigationOptions = {
    title: i18n.t('first_step'),
    ...ListsStackHeaderOptions,
}

const AddWordsScreenOptions: StackNavigationOptions = {
    ...ListsStackHeaderOptions,
}

const MoreScreenOptions: StackNavigationOptions = {
    title: i18n.t('more'),
    ...MoreStackHeaderOptions,
}

const SettingsScreenOptions: StackNavigationOptions = {
    title: i18n.t('settings').toUpperCase(),
    ...MoreStackHeaderOptions,
}

const FeaturesScreenOptions: StackNavigationOptions = {
    title: i18n.t('features').toUpperCase(),
    ...MoreStackHeaderOptions,
}
const AboutScreenOptions: StackNavigationOptions = {
    title: i18n.t('about').toUpperCase(),
    ...MoreStackHeaderOptions,
}
const ForGeeksScreenOptions: StackNavigationOptions = {
    title: i18n.t('for_geeks').toUpperCase(),
    ...MoreStackHeaderOptions,
}

export default AppNavigation
