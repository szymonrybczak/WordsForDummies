import React from 'react'
import { View, Text, ImageBackground, ScrollView } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import { APP_IMAGE } from '../../common/assets'
import APP_COLORS from '../../common/colors'
import i18n from '../../common/i18n/i18n'
import SectionHeader from './SectionHeader'
import { SectionStyles } from './SectionStyles'

const AboutScreen: React.FC = () => (
    <ImageBackground source={APP_IMAGE.blueLibrary} style={styles.container}>
        <View style={[SectionStyles.container, { flex: 1 }]}>
            <SectionHeader title={i18n.t('about_app')} />

            <ScrollView style={styles.sectionDescriptionContainer}>
                <Text style={styles.sectionDescription}>
                    {i18n.t('about_app_description')}
                </Text>
            </ScrollView>
        </View>
    </ImageBackground>
)

const styles = ScaledSheet.create({
    container: {
        flex: 1,
    },
    sectionDescriptionContainer: {
        margin: '32@ms',
    },
    sectionDescription: {
        color: APP_COLORS.white,
        fontSize: '16@ms',
    },
})

export default AboutScreen
