import { useContext } from 'react';

import LogContext from '../LogContext';

const useLog = () => {
  const log = useContext(LogContext);
  return log;
};

export default useLog;
