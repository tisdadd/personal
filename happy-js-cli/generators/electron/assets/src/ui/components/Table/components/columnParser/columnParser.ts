import { startCase } from 'lodash';
import { DataType } from 'ka-table/enums';
import { Column } from 'ka-table/models';

function columnParser(data: unknown[]) : Column[] {
  const columnsObject: Record<string, Column> = {};
  data.forEach((row) => {
    Object.entries(row).forEach(([key, value]) => {
      // columnsObject[key] is not being utilized anywhere that could be executable
      // eslint-disable-next-line security/detect-object-injection
      if (!columnsObject[key]) {
        let dataType = DataType.String;

        switch (typeof value) {
          case 'boolean':
            dataType = DataType.Boolean;
            break;
          case 'number':
          case 'bigint':
            dataType = DataType.Number;
            break;
          case 'object':
            if (
              value instanceof Date
              || (typeof value === 'object'
                && Object.prototype.toString.call(value) === '[object Date]')
            ) {
              dataType = DataType.Date;
            } else {
              dataType = DataType.Object;
            }
            break;
          default:
            dataType = DataType.String;
        }

        // columnsObject[key] is not being utilized anywhere that could be executable
        // eslint-disable-next-line security/detect-object-injection
        columnsObject[key] = {
          key,
          title: startCase(key),
          dataType,
          width: 200,
        };
      }
    });
  });

  return Object.values(columnsObject);
}

export default columnParser;
