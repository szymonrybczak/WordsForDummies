import { StackNavigationOptions } from '@react-navigation/stack'
import APP_COLORS from '../common/colors'

export const LearnStackHeaderOptions: StackNavigationOptions = {
    headerStyle: { backgroundColor: APP_COLORS.arcticBlue },
}

export const ListsStackHeaderOptions: StackNavigationOptions = {
    headerStyle: { backgroundColor: APP_COLORS.red },
}

export const MoreStackHeaderOptions: StackNavigationOptions = {
    headerStyle: { backgroundColor: APP_COLORS.darkBlue },
}
