import _extends from "@babel/runtime/helpers/esm/extends";
import genFontSizes from './genFontSizes';
import genRadius from './genRadius';
export default function genCommonMapToken(token) {
  var motionUnit = token.motionUnit,
    motionBase = token.motionBase,
    fontSize = token.fontSize,
    borderRadius = token.borderRadius,
    lineWidth = token.lineWidth;
  var fontSizes = genFontSizes(fontSize);
  return _extends({
    // motion
    motionDurationFast: (motionBase + motionUnit).toFixed(1) + "s",
    motionDurationMid: (motionBase + motionUnit * 2).toFixed(1) + "s",
    motionDurationSlow: (motionBase + motionUnit * 3).toFixed(1) + "s",
    // font
    fontSizes: fontSizes.map(function (fs) {
      return fs.size;
    }),
    lineHeights: fontSizes.map(function (fs) {
      return fs.lineHeight;
    }),
    // line
    lineWidthBold: lineWidth + 1
  }, genRadius(borderRadius));
}