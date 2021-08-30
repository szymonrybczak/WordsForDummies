import React from 'react'
import { View, Text } from 'react-native'
import { ScaledSheet } from 'react-native-size-matters'
import APP_COLORS from '../../common/colors'

interface SectionHeaderProps {
    title: string
}

const SectionHeader: React.FC<SectionHeaderProps> = ({ title }) => (
    <View style={styles.header}>
        <Text style={styles.headerTitle}>{title}</Text>
    </View>
)

const styles = ScaledSheet.create({
    header: {
        backgroundColor: APP_COLORS.lightBlue,
        alignItems: 'center',
        padding: '16@ms',
        borderTopLeftRadius: '30@ms',
        borderTopRightRadius: '30@ms',
    },
    headerTitle: {
        fontSize: '24@ms',
        color: APP_COLORS.white,
    },
})

export default SectionHeader
