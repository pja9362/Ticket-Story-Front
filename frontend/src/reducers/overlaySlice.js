import { createSlice } from '@reduxjs/toolkit';

const overlaySlice = createSlice({
  name: 'overlay',
  initialState: {},
  reducers: {
    setHideImageInfo(state, action) {
      const { ticketId, hideImageInfo } = action.payload;
      if (!state[ticketId]) {
        state[ticketId] = { hideImageInfo: false, hideImageTitle: false };
      }
      state[ticketId].hideImageInfo = hideImageInfo;
      console.log("!!!!!!!!TICKET NUMBER:", ticketId, 'state:', state);
    },
    setHideImageTitle(state, action) {
      const { ticketId, hideImageTitle } = action.payload;
      if (!state[ticketId]) {
        state[ticketId] = { hideImageInfo: false, hideImageTitle: false };
      }
      state[ticketId].hideImageTitle = hideImageTitle;
      console.log("!!!!!!!!TICKET NUMBER:", ticketId, 'state:', state);
    },
    setHideReviewInfo(state, action) {
      const { ticketId, hideReviewInfo } = action.payload;
      if (!state[ticketId]) {
        state[ticketId] = { hideReviewInfo: false, hideReviewTitle: false };
      }
      state[ticketId].hideReviewInfo = hideReviewInfo;
      console.log("!!!!!!!!TICKET NUMBER:", ticketId, 'state:', state);
    },
    setHideReviewTitle(state, action) {
      const { ticketId, hideReviewTitle } = action.payload;
      if (!state[ticketId]) {
        state[ticketId] = { hideReviewInfo: false, hideReviewTitle: false };
      }
      state[ticketId].hideReviewTitle = hideReviewTitle;
      console.log("!!!!!!!!TICKET NUMBER:", ticketId, 'state:', state);
    },
    setDarkText(state,action) {
      const { ticketId, darkText } = action.payload;
      if (!state[ticketId]) {
        state[ticketId] = { darkText: false };
      } 
      state[ticketId].darkText = darkText;
      console.log("!!!!!!!!TICKET NUMBER:", ticketId, 'state:', state);
    }
  },
});

export const { setHideImageInfo, setHideImageTitle, setHideReviewInfo, setHideReviewTitle, setDarkText} = overlaySlice.actions;

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
