import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import chatService from './chatService';

const initialState = {
  isError: false,
  isSuccess: false,
  isLoading: false,
  groups: [],
  filtergroups: [],
  messages: [],
  selectedGroupId: null,
  error: null,
};

export const createGroup = createAsyncThunk(
  'chat/createGroup',
  async (groupData, thunkAPI) => {
    try {
        console.log("Create group slice")
        console.log("Create group slice",groupData)
        const response = await chatService.createGroupChat(groupData);
        console.log("Create group slice response ",response);
        return response.data;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchGroups = createAsyncThunk(
  'chat/fetchGroups',
  async (_, thunkAPI) => {
    try {
        const response = await chatService.getAllGroups();
        console.log("fetchGroups ",response.groups);
        return response.groups;
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const sendMessage = createAsyncThunk(
  'chat/sendMessage',
  async (messageData, thunkAPI) => {
    try {
      const response = await chatService.sendMessage(messageData);
      console.log('sendmessage response',response)
      return response.data.message;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const searchGroups = createAsyncThunk(
  'chat/searchGroups',
  async (keywords, thunkAPI) => {
    try {
      const response = await chatService.searchGroups(keywords);
      return response.groups;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data.message);
    }
  }
);

export const fetchMessages = createAsyncThunk(
    'chat/fetchMessages',
    async (groupId) => {
      try {       
        const response = await chatService.getMessages(groupId);
        console.log('cure gr',response.groupId)
        console.log('get messages', response.messages)
        return response;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
    }
);

export const deleteMessage = createAsyncThunk(
    'chat/deleteMessage',
    async (messageId, thunkAPI) => {
      try {
        await chatService.deleteMessage(messageId);
        return messageId;
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
    }
);
  
export const updateMessage = createAsyncThunk(
    'chat/updateMessage',
    async (updateMessageData, thunkAPI) => {
      try {
        const updatedMessage = await chatService.updateMessage(updateMessageData);
        return updatedMessage; 
      } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data.message);
      }
    }
);
  
export const chatSlice = createSlice({
  name: 'chat',
  initialState,
  reducers: {
    reset: (state) => {
      state.isLoading = false;
      state.isSuccess = false;
      state.isError = false;
      state.error = null;
    },
    setSelectedGroup: (state, action) => {
        state.selectedGroupId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createGroup.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createGroup.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isSuccess = true;
        state.groups.push(action.payload.groupChat);
      })
      .addCase(createGroup.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(fetchGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.groups = Array.isArray(action.payload) ? action.payload : action.payload.groups;
      })      
      .addCase(fetchGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(fetchMessages.pending, (state) => {
        state.isLoadingMessages = true; 
      })
      .addCase(fetchMessages.fulfilled, (state, action) => {
        state.isLoadingMessages = false; 
        state.selectedGroupId = action.payload.groupId;
        state.messages = Array.isArray(action.payload) ? action.payload : action.payload.messages; 
      })
      .addCase(fetchMessages.rejected, (state, action) => {
        state.isLoadingMessages = false;
        state.errorMessages = action.payload; 
      })
      .addCase(searchGroups.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchGroups.fulfilled, (state, action) => {
        state.isLoading = false;
        state.filtergroups = Array.isArray(action.payload) ? action.payload : action.payload.groups;
      })
      .addCase(searchGroups.rejected, (state, action) => {
        state.isLoading = false;
        state.isError = true;
        state.error = action.payload;
      })
      .addCase(deleteMessage.fulfilled, (state, action) => {
        state.messages = state.messages.filter(message => message._id !== action.payload);
      })
      .addCase(updateMessage.fulfilled, (state, action) => {
        const updatedIndex = state.messages.findIndex(message => message._id === action.payload._id);
        if (updatedIndex !== -1) {
          state.messages[updatedIndex] = action.payload;
        }
      });
  },
});

export const { reset } = chatSlice.actions;

export default chatSlice.reducer;