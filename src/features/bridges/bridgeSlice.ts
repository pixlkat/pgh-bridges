import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import {
  BridgeDetailsRawData,
  BridgeListResponse,
  getBridgeList,
} from '../../api/socrataApi';
import { AppThunk } from '../../app/store';

interface BridgesState {
  bridgesByRefNumber: Record<number, BridgeDetailsRawData>;
  bridgeIdList: number[];
  isLoading: boolean;
  error: string | null;
}

const bridgesInitialState: BridgesState = {
  bridgesByRefNumber: {},
  bridgeIdList: [],
  isLoading: false,
  error: null,
};

function startLoading(state: BridgesState) {
  state.isLoading = true;
}

function loadingFailed(state: BridgesState, action: PayloadAction<string>) {
  state.isLoading = false;
  state.error = action.payload;
}

const bridges = createSlice({
  name: 'bridges',
  initialState: bridgesInitialState,
  reducers: {
    getBridgesStart: startLoading,
    getBridgesSuccess(state, { payload }: PayloadAction<BridgeListResponse>) {
      const { bridges } = payload;
      state.isLoading = false;
      state.error = null;
      bridges.forEach((bridge) => {
        state.bridgesByRefNumber[bridge.bridge_reference_number] = bridge;
      });
      state.bridgeIdList = bridges.map(
        (bridge) => bridge.bridge_reference_number
      );
    },
    getBridgesFailure: loadingFailed,
  },
});

export const {
  getBridgesStart,
  getBridgesSuccess,
  getBridgesFailure,
} = bridges.actions;

export default bridges.reducer;

export const fetchBridges = (): AppThunk => async (dispatch) => {
  try {
    dispatch(getBridgesStart());
    const bridges = await getBridgeList();
    dispatch(getBridgesSuccess(bridges));
  } catch (err) {
    dispatch(getBridgesFailure(err.toString()));
  }
};

// export const fetchBridgeDetail = (bridgeRefNo: number): AppThunk => async (dispatch) => {
//   try {
//
//   } catch (err) {
//
//   }
// };
