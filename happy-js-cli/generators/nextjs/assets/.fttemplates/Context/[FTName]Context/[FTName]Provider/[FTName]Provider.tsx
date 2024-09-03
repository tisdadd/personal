import React, { useState, useMemo, useEffect } from 'react';

import [FTName]Context from '../[FTName]Context';

import defaultState from './[FTName]Provider.defaultState';
import propTypes from './[FTName]Provider.propTypes';
import log from './util/log';
import info from './util/info';
import error from './util/error';
import warn from './util/warn';

function [FTName]Provider(props: propTypes) {
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
    <[FTName]Context.Provider
      value={value}
    >
      {children}
    </[FTName]Context.Provider>
  );
}

export default [FTName]Provider;
