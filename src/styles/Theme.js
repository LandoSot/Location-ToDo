import { configureFonts, MD3LightTheme, MD3DarkTheme, adaptNavigationTheme, MD3Colors } from 'react-native-paper'
import { DefaultTheme as NavDefaultTheme, DarkTheme } from '@react-navigation/native'

const {
  LightTheme: NavLightTheme,
  DarkTheme: NavDarkTheme
} = adaptNavigationTheme({
  reactNavigationLight: NavDefaultTheme,
  reactNavigationDark: DarkTheme
})

// const fontConfig = {
//   fontFamily: 'sans-serif',
// }

export const CustomDefaultTheme = {
  ...MD3LightTheme,
  ...NavLightTheme,
  colors: {
    ...MD3LightTheme.colors,
    ...NavLightTheme.colors,
    secondary: '#00B0FF',
    // background: '#FFFFFF',
    // background: '#F2D8D8',
    // backgroundInputColor: '#f9efef',
    // card: '#EEC9C9',
    // icon: '#5A4C42',
    // onFocusInputText: '#8a7c72',
    // onPrimaryContainer: '#f9efef',
    // onSurface: '#8a7c72',
    // onSurfaceVariant: '#dea987',
    // primary: '#dea987',
    // primaryButton: '#DEA987',
    // primaryContainer: '#DEA987',
    // primaryTextButton: '#ffffff',
    // secondaryButton: '#f6e8e8',
    // secondaryTextButton: '#dea987',
    // text: '#DEA987'
  }
}

export const CustomDarkTheme = {
  ...MD3DarkTheme,
  ...NavDarkTheme,
  colors: {
    ...MD3DarkTheme.colors,
    ...NavDarkTheme.colors,
    secondary: '#00B0FF',
    // background: '#000000',
    // primaryButton: '#BC4445',
    // primaryTextButton: '#FFFFFF',
    // onSurfaceVariant: '#000000',
    // surfaceVariant: 'lightgray',
    // secondaryButton: MD3DarkTheme.colors.surfaceVariant,
    // secondaryTextButton: '#FFFFFF',
    // color: MD3DarkTheme.colors.
    // background: '#3d3a3a',
    // backgroundInputColor: '#ccbaad',
    // card: '#2E2B2B',
    // icon: '#FFFFFF',
    // onFocusInputText: '#8b5742',
    // onPrimaryContainer: '#ccbaad',
    // onSurface: '#ccbaad', // - background color for snackbars
    // onSurfaceVariant: '#8b5742',
    // primaryButton: '#8b5742',
    // primaryContainer: '#8b5742',
    // primaryTextButton: '#FFFFFF',
    // secondaryButton: '#a4968d',
    // secondaryTextButton: '#8b5742',
    // text: '#FFFFFF'
  }
  // fonts: configureFonts({ config: fontConfig })
}


export const InputStyles = {
  dense: true,
  outlineStyle: { borderRadius: 8, borderWidth: 1, backgroundColor: '#FFFFFF' },
  contentStyle: { fontSize: 14 },
  placeholderTextColor: '#8D8D8D',
  textColor: '#000000',
  // activeOutlineColor: '#1F9AB8',
  outlineColor: '#d4d4d4',
  mode: 'outlined'
}