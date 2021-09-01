import AsyncStorage from '@react-native-async-storage/async-storage'
import { handleError } from './AppAlertManager'
import List from '../models/List'

/* ------------------------- List ------------------------- */

export async function getLists(): Promise<List[]> {
    try {
        const lists = await getFromAsyncStorage('lists')
        if (lists.length === 0) return []

        return lists
    } catch (err) {
        handleError()
        return []
    }
}

export async function deleteAllLists() {
    try {
        await saveToAsyncStorage('lists', JSON.stringify([]))
    } catch {
        handleError()
    }
}

export async function updateList(list: List) {
    try {
        const lists = await getLists()

        const listIndex = await getListIndex(list)
        if (listIndex === -1) return

        lists[listIndex] = list

        await saveToAsyncStorage('lists', JSON.stringify(lists))
    } catch {
        handleError()
    }
}

export async function createList(list: List) {
    try {
        const lists = await getLists()
        lists.push(list)

        await saveToAsyncStorage('lists', JSON.stringify(lists))
    } catch {
        handleError()
    }
}

export async function deleteList(list: List) {
    try {
        const lists = await getLists()

        const listIndex = await getListIndex(list)
        if (listIndex === -1) return

        lists.splice(listIndex, 1)

        await saveToAsyncStorage('lists', JSON.stringify(lists))
    } catch {
        handleError()
    }
}

export async function getListIndex(list: List): Promise<number> {
    const defaultReturnValue = -1

    try {
        const lists = await getLists()
        const listsIds = lists.map((list) => list.id)

        const listIndex = listsIds.indexOf(list.id)

        if (listIndex === -1) return defaultReturnValue
        if (lists[listIndex] === undefined) return defaultReturnValue

        return listIndex
    } catch {
        handleError()
        return defaultReturnValue
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
