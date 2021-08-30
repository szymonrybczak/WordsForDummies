import React, { useEffect, useState } from 'react'
import {
    View,
    Text,
    Switch,
    TouchableOpacity,
    ImageBackground,
} from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { APP_IMAGE } from '../../common/assets'
import APP_COLORS from '../../common/colors'
import i18n from '../../common/i18n/i18n'
import AppActivityIndicator from '../../components/AppActivityIndicator'
import { handleError } from '../../helpers/AppAlertManager'
import {
    deleteAllLists,
    getFromAsyncStorage,
    saveToAsyncStorage,
} from '../../helpers/deviceStorage'
import SectionHeader from './SectionHeader'
import { SectionStyles, SectionSwitchProps } from './SectionStyles'

const SettingsScreen: React.FC = () => {
    const [
        addingListAutoCorrectionEnabled,
        setAddingListAutoCorrectionEnabled,
    ] = useState(false)

    const [
        takingExamAutoCorrectionEnabled,
        setTakingExamAutoCorrectionEnabled,
    ] = useState(false)

    const [loading, setLoading] = useState<boolean>(true)

    useEffect(() => {
        fetchSettings()
    }, [])

    /* ------------------------- Fetching ------------------------- */

    const fetchSettings = () => {
        setLoading(true)

        try {
            getFromAsyncStorage('addingListAutoCorrectionEnabled').then((res) =>
                setAddingListAutoCorrectionEnabled(res)
            )
            getFromAsyncStorage('takingExamAutoCorrectionEnabled').then((res) =>
                setTakingExamAutoCorrectionEnabled(res)
            )
        } catch {
            handleError()
        } finally {
            setLoading(false)
        }
    }

    /* ------------------------- Handlers ------------------------- */

    const handleSaveSetting = async (
        key:
            | 'addingListAutoCorrectionEnabled'
            | 'takingExamAutoCorrectionEnabled',
        value: boolean
    ) => {
        setLoading(true)

        try {
            await saveToAsyncStorage(key, JSON.stringify(!value))
            await fetchSettings()
        } catch {
            handleError()
        } finally {
            setLoading(false)
        }
    }

    const handleDeleteAllLists = async () => {
        setLoading(true)

        try {
            await deleteAllLists()
        } catch {
            handleError()
        } finally {
            setLoading(false)
        }
    }

    /* ------------------------- Rendering functions ------------------------- */

    const renderActivityIndicator = (): JSX.Element => <AppActivityIndicator />

    const renderAutoCorrectionSection = (): JSX.Element => (
        <View style={SectionStyles.container}>
            <SectionHeader title={i18n.t('auto_correction')} />

            <View style={styles.sectionTitleSwitchContainer}>
                <Text style={SectionStyles.title}>{i18n.t('adding_list')}</Text>

                <Switch
                    value={addingListAutoCorrectionEnabled}
                    onValueChange={() =>
                        handleSaveSetting(
                            'addingListAutoCorrectionEnabled',
                            addingListAutoCorrectionEnabled
                        )
                    }
                    {...SectionSwitchProps}
                />
            </View>

            <View style={styles.sectionTitleSwitchContainer}>
                <Text style={SectionStyles.title}>{i18n.t('taking_exam')}</Text>

                <Switch
                    value={takingExamAutoCorrectionEnabled}
                    onValueChange={() =>
                        handleSaveSetting(
                            'takingExamAutoCorrectionEnabled',
                            takingExamAutoCorrectionEnabled
                        )
                    }
                    {...SectionSwitchProps}
                />
            </View>
        </View>
    )

    const renderEraseDataSection = (): JSX.Element => (
        <View style={SectionStyles.container}>
            <SectionHeader title={i18n.t('erase_data')} />

            <View style={styles.sectionTitleSwitchContainer}>
                <Text style={SectionStyles.title}>
                    {i18n.t('delete_all_lists')}
                </Text>

                <TouchableOpacity
                    style={styles.deleteButton}
                    onPress={handleDeleteAllLists}>
                    <Text style={styles.deleteTitle}>{i18n.t('boom')}</Text>
                </TouchableOpacity>
            </View>

            {renderEraseDataWarning()}
        </View>
    )

    const renderEraseDataWarning = (): JSX.Element => (
        <View style={styles.eraseDataWarning}>
            <Text style={styles.eraseDataWarningTitle}>
                {i18n.t('warning')}
            </Text>

            <Text style={styles.eraseDataWarningDescription}>
                {i18n.t('erase_all_list_warning')}
            </Text>
        </View>
    )

    return (
        <ImageBackground
            style={styles.container}
            source={APP_IMAGE.blueLibrary}>
            {renderAutoCorrectionSection()}
            {renderEraseDataSection()}
            {loading && renderActivityIndicator()}
        </ImageBackground>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    sectionTitleSwitchContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: '16@ms',
    },
    eraseDataWarning: {
        backgroundColor: APP_COLORS.lightBlue,
        alignItems: 'center',
        padding: '8@ms',
        margin: '16@ms',
        borderRadius: '15@ms',
    },
    eraseDataWarningTitle: {
        fontWeight: '600',
        color: APP_COLORS.white,
    },
    eraseDataWarningDescription: {
        color: APP_COLORS.white,
        textAlign: 'center',
    },
    deleteButton: {
        borderWidth: 2,
        borderColor: APP_COLORS.white,
    },
    deleteTitle: {
        color: APP_COLORS.white,
        margin: '8@ms',
    },
})

export default SettingsScreen
