import React from 'react'
import { View, Text, ImageBackground } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { APP_IMAGE } from '../../common/assets'
import i18n from '../../common/i18n/i18n'
import SectionHeader from './SectionHeader'
import { SectionStyles } from './SectionStyles'

const ForGeeksScreen: React.FC = () => (
    <ImageBackground source={APP_IMAGE.blueLibrary} style={styles.container}>
        <View style={[SectionStyles.container, { flex: 1 }]}>
            <SectionHeader title={i18n.t('for_geeks')} />

            <Text style={SectionStyles.description}>
                {i18n.t('for_geeks_description')}
            </Text>
        </View>
    </ImageBackground>
)

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
})

export default ForGeeksScreen
