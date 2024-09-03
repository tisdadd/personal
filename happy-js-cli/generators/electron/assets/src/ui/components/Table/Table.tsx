import React, { useEffect, useState, useCallback } from 'react';
import './Table.css';
import 'ka-table/style.css';

import { ITableProps, Table as KaTable } from 'ka-table';
import {
  ActionType, EditingMode, SortingMode, FilteringMode,
} from 'ka-table/enums';
import { DispatchFunc } from 'ka-table/types';
import { updateData } from 'ka-table/actionCreators';
import customReducer from './components/customReducer/customReducer';
import columnParser from './components/columnParser';
import CustomReducerActionParam from './components/customReducer/CustomReducerActionParam.type';
import ExtraReducerActions from './components/customReducer/ExtraReducerActions.enum';

type TableProps = {
  data: object[],
  onDataUpdate: (key: string | number, value: object)=>void
};

function Table({ data = [], onDataUpdate }: TableProps) {
  const [tableProps, changeTableProps] = useState({
    columns: columnParser(data),
    data,
    editingMode: EditingMode.Cell,
    sortingMode: SortingMode.Single,
    rowKeyField: '_id',
    columnResizing: true,
    columnReordering: true,
    filteringMode: FilteringMode.FilterRow,
  });

  const dispatch: DispatchFunc = useCallback((action: CustomReducerActionParam) => {
    changeTableProps((prevState: ITableProps) => customReducer(prevState, action));
    if (action.type === ActionType.UpdateCellValue) {
      onDataUpdate(action.rowKeyValue, { [action.columnKey]: action.value });
    }
  }, [onDataUpdate]);

  useEffect(() => {
    dispatch(updateData(data));
    dispatch({
      type: ExtraReducerActions.UPDATE_COLUMNS,
      data,
    });
  }, [data, dispatch]);

  return (
    <KaTable
       // disabled for following the dispatch pattern of ka-table
      // eslint-disable-next-line react/jsx-props-no-spreading
      {...tableProps}
      dispatch={dispatch}
    />
  );
}

export default Table;
