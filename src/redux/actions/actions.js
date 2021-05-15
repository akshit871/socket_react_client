import * as types from "./types";

// INITIALIZES CLOCK ON SERVER
// export const serverRenderClock = () => (dispatch) =>
//   dispatch({
//     type: types.TICK,
//     payload: { light: false, ts: Date.now() },
//   });

// // INITIALIZES CLOCK ON CLIENT
// export const startClock = () => (dispatch) =>
//   setInterval(() => {
//     dispatch({ type: types.TICK, payload: { light: true, ts: Date.now() } });
//   }, 1000);

//laser scanner,grade,matching levl,updator
export const updateLaserScannerData = (data) => ({
  type: types.UPDATE_LSMG,
  payload: data,
});

export const updateMnlInfo = (data) => ({
  type: types.UPDATE_MNL,
  payload: data,
});

