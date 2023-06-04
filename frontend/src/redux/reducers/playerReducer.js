import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { toast } from "react-toastify";

const initialState = {
  players: [],
  page: 1,
  hasNextPage: true,
  loading: false,
  error: "",
};

export const searchPlayers = createAsyncThunk(
  "player/search",
  async (searchQuery, { getState }) => {
    const state = getState();

    const res = await fetch(
      `http://localhost:5000/api/players/search?searchTerm=${searchQuery}&page=${state.player.page}`
    );

    return await res.json();
  }
);

export const showNextPage = createAsyncThunk(
  "player/nextpage",
  async (searchQuery, { getState }) => {
    const state = getState();
    const res = await fetch(
      `http://localhost:5000/api/players/search?searchTerm=${searchQuery}&page=${
        state.player.page + 1
      }`
    );

    return await res.json();
  }
);

export const showPreviousPage = createAsyncThunk(
  "player/previouspage",
  async (searchQuery, { getState }) => {
    const state = getState();
    const res = await fetch(
      `http://localhost:5000/api/players/search?searchTerm=${searchQuery}&page=${
        state.player.page - 1
      }`
    );

    return await res.json();
  }
);

const setError = (state, message) => {
  state.error = message;
  state.loading = false;
  state.players = [];
  state.page = 1;
  state.hasNextPage = true;
};

const playerSlice = createSlice({
  name: "player",
  initialState,
  reducers: {
    setAuthUser(state, action) {
      const { user } = action.payload;
      state.user = user;
    },
    clearError(state) {
      state.error = false;
      state.loading = false;
    },
  },

  extraReducers(builder) {
    builder
      .addCase(searchPlayers.pending, (state) => {
        state.loading = true;
      })
      .addCase(searchPlayers.fulfilled, (state, action) => {
        const { payload } = action;

        if (payload.message) {
          toast.error(payload.message);
          setError(state, payload.message);
          return;
        }

        state.players = payload.players;
        state.hasNextPage = payload.hasNextPage;
        state.loading = false;
      })
      .addCase(searchPlayers.rejected, (state, action) => {
        setError(state, action.error.message);
      })
      .addCase(showNextPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(showNextPage.fulfilled, (state, action) => {
        const { payload } = action;

        if (payload.message) {
          toast.error(payload.message);
          setError(state, payload.message);
          return;
        }

        state.players = payload.players;
        state.hasNextPage = payload.hasNextPage;
        state.loading = false;
        state.page = payload.currentPage;
      })
      .addCase(showNextPage.rejected, (state, action) => {
        setError(state, action.error.message);
      })
      .addCase(showPreviousPage.pending, (state) => {
        state.loading = true;
      })
      .addCase(showPreviousPage.fulfilled, (state, action) => {
        const { payload } = action;

        if (payload.message) {
          toast.error(payload.message);
          setError(state, payload.message);
          return;
        }

        state.players = payload.players;
        state.hasNextPage = payload.hasNextPage;
        state.loading = false;
        state.page = payload.currentPage;
      })
      .addCase(showPreviousPage.rejected, (state, action) => {
        setError(state, action.error.message);
      });
  },
});

export const getPage = (state) => {
  return state.player.page;
};
export const getPlayersLoadingState = (state) => state.player.loading;
export const getError = (state) => state.player.error;
export const getHasNextPage = (state) => state.player.hasNextPage;
export const getPlayers = (state) => state.player.players;

export const { setAuthUser, clearError } = playerSlice.actions;

export default playerSlice.reducer;
