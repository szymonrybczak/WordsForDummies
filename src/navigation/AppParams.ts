import List from '../models/List'

type AppParams = {
    WelcomeScreen: undefined
    ChooseLearnMethodScreen: undefined
    ListsScreen: undefined
    AddListNameScreen: undefined
    AddWordsScreen: { list: List }
    MoreScreen: undefined
    SettingsScreen: undefined
    FeaturesScreen: undefined
    AboutScreen: undefined
    ForGeeksScreen: undefined
}

export default AppParams
