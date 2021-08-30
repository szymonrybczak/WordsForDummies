import AsyncStorage from '@react-native-async-storage/async-storage'
import { handleError } from './AppAlertManager'

/* ------------------------- List ------------------------- */

export async function deleteAllLists() {
    try {
        await saveToAsyncStorage('lists', JSON.stringify([]))
    } catch {
        handleError()
    }
}

/* ------------------------- Generic functions ------------------------- */

export async function getFromAsyncStorage(key: Keys) {
    try {
        const value = await AsyncStorage.getItem(key)
        if (value === null) return DefaultValues[key]

        return JSON.parse(value)
    } catch {
        handleError()
        return DefaultValues[key]
    }
}

export async function saveToAsyncStorage(key: Keys, value: string) {
    try {
        await AsyncStorage.setItem(key, value)
    } catch {
        handleError()
    }
}

type Keys =
    | 'addingListAutoCorrectionEnabled'
    | 'takingExamAutoCorrectionEnabled'
    | 'lists'

const DefaultValues: any = {
    addingListAutoCorrectionEnabled: false,
    takingExamAutoCorrectionEnabled: false,
    lists: [],
}
