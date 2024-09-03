import React, { useState, useMemo, useEffect } from 'react';

import LogContext from '../LogContext';

import defaultState from './LogProvider.defaultState';
import propTypes from './LogProvider.propTypes';
import log from './util/log';
import info from './util/info';
import error from './util/error';
import warn from './util/warn';

function LogProvider(props: propTypes) {
  const { children, on: propsOn } = props;

  // use default state if propsOn is null or undefined
  const [on, setOn] = useState(propsOn ?? defaultState.on);

  const value = useMemo(() => ({
    on,
    setOn,
    log: (message: any) => {
      log({ message, on });
    },
    info: (message: any) => {
      info({ message, on });
    },
    warn: (message: any) => {
      warn({ message, on });
    },
    error: (message: any) => {
      error({ message, on });
    },
  }), [on]);

  useEffect(() => {
    setOn(propsOn ?? defaultState.on);
  }, [propsOn]);

  return (
    <LogContext.Provider
      value={value}
    >
      {children}
    </LogContext.Provider>
  );
}

export default LogProvider;
