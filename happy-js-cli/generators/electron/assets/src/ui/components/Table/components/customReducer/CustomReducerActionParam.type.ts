import ExtendedReducerTypes from './ExtendedReducer.type';

type CustomReducerActionParam = {
  type: ExtendedReducerTypes,
  rowKeyValue: string | number,
  columnKey: string,
  [key: string]: unknown
};
export default CustomReducerActionParam;
