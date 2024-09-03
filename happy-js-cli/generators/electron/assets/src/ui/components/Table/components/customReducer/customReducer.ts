import { kaReducer, ITableProps } from 'ka-table';
import columnParser from '../columnParser';
import CustomReducerActionParam from './CustomReducerActionParam.type';
import ExtraReducerActions from './ExtraReducerActions.enum';

const customReducer = (prevProps: ITableProps, action: CustomReducerActionParam) => {
  switch (action.type) {
    case ExtraReducerActions.UPDATE_COLUMNS:
      return { ...prevProps, columns: columnParser(prevProps.data) };
    default: return kaReducer(prevProps, action);
  }
};

export default customReducer;
