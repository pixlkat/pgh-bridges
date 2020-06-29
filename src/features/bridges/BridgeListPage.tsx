import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { RootState } from '../../app/rootReducer';
import { fetchBridges } from './bridgeSlice';
import { BridgesTable } from './BridgesTable';

export const BridgesListPage = () => {
  const dispatch = useDispatch();
  const {
    bridgesByRefNumber,
    bridgeIdList,
    isLoading,
    error: bridgesError,
  } = useSelector((state: RootState) => state.bridges);

  const bridges = bridgeIdList.map(
    (bridgeRefNumber) => bridgesByRefNumber[bridgeRefNumber]
  );

  useEffect(() => {
    dispatch(fetchBridges());
  }, [dispatch]);

  if (bridgesError) {
    return (
      <div>
        <h1>Something went wrong...</h1>
        <div>{bridgesError.toString()}</div>
      </div>
    );
  }

  const bridgeTable = isLoading ? (
    <h3>Loading...</h3>
  ) : (
    <div className={'flex-shrink-0'}>
      <BridgesTable bridges={bridges} />
    </div>
  );

  return <div id="bridge-table">{bridgeTable}</div>;
};
