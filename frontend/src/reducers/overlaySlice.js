import { createSlice } from '@reduxjs/toolkit';

const overlaySlice = createSlice({
  name: 'overlay',
  initialState: {},
  reducers: {
    setHideTicketInfo(state, action) {
      const { ticketId, hideTicketInfo } = action.payload;
      if (!state[ticketId]) {
        state[ticketId] = { hideTicketInfo: false, hideTitle: false };
      }
      state[ticketId].hideTicketInfo = hideTicketInfo;
      console.log("!!!!!!!!TICKET NUMBER:", ticketId, 'state:', state);
    },
    setHideTitle(state, action) {
      const { ticketId, hideTitle } = action.payload;
      if (!state[ticketId]) {
        state[ticketId] = { hideTicketInfo: false, hideTitle: false };
      }
      state[ticketId].hideTitle = hideTitle;
      console.log("!!!!!!!!TICKET NUMBER:", ticketId, 'state:', state);
    },
  },
});

export const { setHideTicketInfo, setHideTitle } = overlaySlice.actions;

export default overlaySlice.reducer;


// import { createSlice } from '@reduxjs/toolkit';

// const overlaySlice = createSlice({
//   name: 'overlay',
//   initialState: {},
//   reducers: {
//     setHideTicketInfo(state, action) {
//       const { ticketId, hideTicketInfo } = action.payload;
//       if (!state[ticketId]) {
//         state[ticketId] = { hideTicketInfo: false, hideTitle: false };
//       }
//       state[ticketId].hideTicketInfo = hideTicketInfo;
//       console.log("!!!!!!!!TICKET NUMBER:", ticketId, 'state:', state);
//     },
//     setHideTitle(state, action) {
//       const { ticketId, hideTitle } = action.payload;
//       if (!state[ticketId]) {
//         state[ticketId] = { hideTicketInfo: false, hideTitle: false };
//       }
//       state[ticketId].hideTitle = hideTitle;
//       console.log("!!!!!!!!TICKET NUMBER:", ticketId, 'state:', state);
//     },
//   },
// });

// export const { setHideTicketInfo, setHideTitle } = overlaySlice.actions;

// export default overlaySlice.reducer;
