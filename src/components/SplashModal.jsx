import React, { useContext } from 'react'
import { ActivityIndicator, Modal, useTheme } from 'react-native-paper'
import { selectLocation } from '../redux/slices/LocationSlice'
import { Image, View } from 'react-native'
import { useSelector } from 'react-redux'

const SplashModal = () => {
  const { colors } = useTheme()
  const { isLoading } = useSelector(selectLocation)
  // backgroundColor: colors.drawerBackground,
  return (
    <Modal
      visible={isLoading}
      dismissable={false}
      style={{ flex: 1, marginTop: 0, height: '100%' }}
    >
      <View style={{ flex: 1, alignItems: 'center', justifyContent: 'center' }}>
        {/* <Image source={darkMode ? SERVIGO_ICON_DARK : SERVIGO_ICON} style={{ width: 250, height: 80 }} /> */}
        <ActivityIndicator color='#6366f1' sieze='large' style={{ marginTop: '10%' }} />
        {/* {(!!authFetchText || !!freightFetchText) && console.log('here') &&
          <Text variant='headlineLarge'>{authFetchText || freightFetchText}</Text>
        }
        <Text variant='headlineLarge'>Texto de prueba</Text> */}
      </View>
    </Modal>
  )
}

export default SplashModal
