import _extends from "@babel/runtime/helpers/esm/extends";
import genControlHeight from '../shared/genControlHeight';
import defaultAlgorithm from '../default';
import genCompactSizeMapToken from './genCompactSizeMapToken';
import getFontSizes from '../shared/genFontSizes';
var derivative = function derivative(token, mapToken) {
  var mergedMapToken = mapToken !== null && mapToken !== void 0 ? mapToken : defaultAlgorithm(token);
  var fontSize = mergedMapToken.fontSizes[0]; // Smaller size font-size as base
  var fontSizes = getFontSizes(fontSize);
  var controlHeight = mergedMapToken.controlHeight - 4;
  return _extends(_extends(_extends(_extends({}, mergedMapToken), genCompactSizeMapToken(mapToken !== null && mapToken !== void 0 ? mapToken : token)), {
    // font
    fontSizes: fontSizes.map(function (fs) {
      return fs.size;
    }),
    lineHeights: fontSizes.map(function (fs) {
      return fs.lineHeight;
    }),
    // controlHeight
    controlHeight: controlHeight
  }), genControlHeight(_extends(_extends({}, mergedMapToken), {
    controlHeight: controlHeight
  })));
};
export default derivative;