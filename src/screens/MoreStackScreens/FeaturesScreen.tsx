import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { APP_IMAGE } from '../../common/assets'
import i18n from '../../common/i18n/i18n'
import SectionHeader from './SectionHeader'
import { SectionStyles } from './SectionStyles'

const FeaturesScreen: React.FC = () => {
    const renderReleasedSection = (): JSX.Element => (
        <View style={[SectionStyles.container, { flex: 1 }]}>
            <SectionHeader title={i18n.t('released')} />
        </View>
    )

    const renderUpcomingSection = (): JSX.Element => (
        <View style={[SectionStyles.container, { flex: 1 }]}>
            <SectionHeader title={i18n.t('upcoming')} />

            <Text style={SectionStyles.description}>
                {i18n.t('sharing_lists_between_users')}
            </Text>
        </View>
    )

    return (
        <ImageBackground
            source={APP_IMAGE.blueLibrary}
            style={styles.container}>
            {renderReleasedSection()}
            {renderUpcomingSection()}
        </ImageBackground>
    )
}

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
})

export default FeaturesScreen
