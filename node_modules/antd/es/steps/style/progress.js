import _defineProperty from "@babel/runtime/helpers/esm/defineProperty";
var genStepsProgressStyle = function genStepsProgressStyle(token) {
  var _ref5;
  var antCls = token.antCls,
    componentCls = token.componentCls;
  return _defineProperty({}, "&" + componentCls + "-with-progress", (_ref5 = {}, _defineProperty(_ref5, componentCls + "-item", _defineProperty({
    paddingTop: token.paddingXXS
  }, "&-process " + componentCls + "-item-container " + componentCls + "-item-icon " + componentCls + "-icon", {
    color: token.processIconColor
  })), _defineProperty(_ref5, "&" + componentCls + "-vertical > " + componentCls + "-item > " + componentCls + "-item-container > " + componentCls + "-item-tail", {
    top: token.marginXXS
  }), _defineProperty(_ref5, "&" + componentCls + "-horizontal", _defineProperty({}, componentCls + "-item:first-child", {
    paddingBottom: token.paddingXXS,
    paddingInlineStart: token.paddingXXS
  })), _defineProperty(_ref5, "&" + componentCls + "-label-vertical", _defineProperty({}, componentCls + "-item " + componentCls + "-item-tail", {
    top: token.margin - 2 * token.lineWidth
  })), _defineProperty(_ref5, componentCls + "-item-icon", _defineProperty({
    position: 'relative'
  }, antCls + "-progress", {
    position: 'absolute',
    insetBlockStart: (token.stepsIconSize - token.stepsProgressSize - token.lineWidth * 2) / 2,
    insetInlineStart: (token.stepsIconSize - token.stepsProgressSize - token.lineWidth * 2) / 2
  })), _ref5));
};
export default genStepsProgressStyle;