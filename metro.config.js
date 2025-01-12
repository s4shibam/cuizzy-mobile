/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
const { getDefaultConfig } = require('expo/metro-config')
const { withNativeWind } = require('nativewind/metro')

const defaultConfig = getDefaultConfig(__dirname)
// defaultConfig.resolver.assetExts.push('cjs')
defaultConfig.resolver.sourceExts.push('cjs')

module.exports = withNativeWind(defaultConfig, { input: './global.css' })
