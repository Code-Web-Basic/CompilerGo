import _extends from "@babel/runtime/helpers/esm/extends";
import _slicedToArray from "@babel/runtime/helpers/esm/slicedToArray";
import { createTheme, useCacheToken, useStyleRegister } from '@ant-design/cssinjs';
import React from 'react';
import version from '../version';
import { PresetColors } from './interface';
import defaultDerivative from './themes/default';
import defaultSeedToken from './themes/seed';
import formatToken from './util/alias';
import genComponentStyleHook from './util/genComponentStyleHook';
import statisticToken, { merge as mergeToken, statistic } from './util/statistic';
var defaultTheme = createTheme(defaultDerivative);
export {
// colors
PresetColors,
// Statistic
statistic, statisticToken, mergeToken,
// hooks
useStyleRegister, genComponentStyleHook };
// ================================ Context =================================
// To ensure snapshot stable. We disable hashed in test env.
export var defaultConfig = {
  token: defaultSeedToken,
  hashed: true
};
export var DesignTokenContext = /*#__PURE__*/React.createContext(defaultConfig);
// ================================== Hook ==================================
// In dev env, we refresh salt per hour to avoid user use this
// Note: Do not modify this to real time update which will make debug harder
var saltPrefix = process.env.NODE_ENV === 'production' ? version : version + "-" + new Date().getHours();
export function useToken() {
  var _React$useContext = React.useContext(DesignTokenContext),
    rootDesignToken = _React$useContext.token,
    hashed = _React$useContext.hashed,
    theme = _React$useContext.theme,
    components = _React$useContext.components;
  var salt = saltPrefix + "-" + (hashed || '');
  var mergedTheme = theme || defaultTheme;
  var _useCacheToken = useCacheToken(mergedTheme, [defaultSeedToken, rootDesignToken], {
      salt: salt,
      override: _extends({
        override: rootDesignToken
      }, components),
      formatToken: formatToken
    }),
    _useCacheToken2 = _slicedToArray(_useCacheToken, 2),
    token = _useCacheToken2[0],
    hashId = _useCacheToken2[1];
  return [mergedTheme, token, hashed ? hashId : ''];
}