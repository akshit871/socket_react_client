import { combineReducers } from "redux";
import * as types from "../actions/types";
// import { resultGenerator } from "../../utility/utility";

// // COUNTER REDUCER
// const counterReducer = (state = 0, { type }) => {
//   switch (type) {
//     case types.INCREMENT:
//       return state + 1;
//     case types.DECREMENT:
//       return state - 1;
//     case types.RESET:
//       return 0;
//     default:
//       return state;
//   }
// };

// // INITIAL TIMER STATE
// const initialTimerState = {
//   lastUpdate: 0,
//   light: false,
// };

// // TIMER REDUCER
// const timerReducer = (state = initialTimerState, { type, payload }) => {
//   switch (type) {
//     case types.TICK:
//       return {
//         lastUpdate: payload.ts,
//         light: !!payload.light,
//       };
//     default:
//       return state;
//   }
// };
//inital PLC state
const initialPLCState = {
  laser: "",
  scanner: "",
  set_grade: "D",
  set_mch_lvl: "60",
  grade: "",
  matching_lvl: "",
  result: "",
  op_name: "",
};
//PLC reducer(laser and scanner data)
const plcreducer = (state = initialPLCState, { type, payload }) => {
  switch (type) {
    case types.UPDATE_LSMG:
      return {
        ...state,
        laser: payload.laser,
        scanner: payload.scanner,
        grade: payload.grade,
        matching_lvl: payload.matching_lvl,
        result: true,
      };
    default:
      return state;
  }
};

//initial manual state
const initailManualState = {
  sno: 1,
  mch_date: "",
  mch_no: "",
  part_sno: "",
};

//manual reducer
const mnlreducer = (state = initailManualState, { type, payload }) => {
  switch (type) {
    case types.UPDATE_MNL:
      return {
        ...state,
        sno: state.sno + 1,
        mch_date: payload.dt,
        mch_no: payload.no,
        part_sno: payload.part_sno,
      };
    default:
      return state;
  }
};
//bush Reducer
const initialBushState = {
  bush: false,
};
const bushRd = (state = initialBushState, { type, payload }) => {
  switch (type) {
    case types.BUSH_D:
      return {
        ...state,
        bush: !state.bush,
      };
    default:
      return state;
  }
};

//entry Reducer
const initialETState = {};
const entryRd = (state = initialETState, { type, payload }) => {
  switch (type) {
    case types.UPDATE_STORE:
      return {
        ...payload,
      };
    default:
      return state;
  }
};

//row reducer
const initialRW = {
  rows: [],
};
const rowRd = (state = initialRW, { type, payload }) => {
  switch (type) {
    case types.UPDATE_ROW:
      if (state.rows.length == 50) {
        let rowsNew = [...state.rows];
        rowsNew.shift();
        rowsNew.push(payload);
        return {
          ...state,
          rows: rowsNew,
        };
      } else {
        console.log("here1");
        let newRows = [...state.rows];
        newRows.push(payload);
        console.log({ r2: newRows });
        return {
          ...state,
          rows: newRows,
        };
      }
    default:
      return state;
  }
};
//row reducer
const initialLd = {
  user: "",
  model: "",
};
const loginRd = (state = initialLd, { type, payload }) => {
  switch (type) {
    case types.LOGIN:
      return {
        ...state,
        user: payload.user,
        model: payload.model,
      };
    default:
      return state;
  }
};

//hardware reducer
const init = {
  id: "",
};
const hwRd = (state = init, { type, payload }) => {
  switch (type) {
    case types.HID:
      return {
        ...state,
        id: payload,
      };
    default:
      return state;
  }
};

// COMBINED REDUCERS
const reducers = {
  // counter: counterReducer,
  // timer: timerReducer,

  bushRd,
  entryRd,
  rowRd,
  loginRd,
  hwRd,
};

export default combineReducers(reducers);
