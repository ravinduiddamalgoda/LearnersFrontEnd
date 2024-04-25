import axios from 'axios';
import Cookies from 'js-cookie';

const API_URL = 'http://localhost:3000/chat/';

const createGroupChat = async (groupData) => {
  try {
    const response = await axios.post(`http://localhost:3000/chat/creategroup`, groupData);
    console.log("create group service", groupData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const getAllGroups = async () => {
  try {
    console.log("getAllGroups service");
    const response = await axios.get(`http://localhost:3000/chat/getallgroups`);
    console.log("getAllGroups service", response);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const sendMessage = async (messageData) => {
  try {
    console.log(messageData)
    const response = await axios.post(`http://localhost:3000/chat/sendmessage`, messageData);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const searchGroups = async (keywords) => {
  try {
    console.log(keywords)
    const response = await axios.post(`http://localhost:3000/chat/searchgroup`, keywords);
    return response.data;
  } catch (error) {
    throw new Error(error.response.data.message);
  }
};

const getMessages = async (groupId) => {
    try {
        console.log(groupId)
        const response = await axios.post(`http://localhost:3000/chat/getmessages`, { group: groupId });
        console.log("getMessages service", response);
        return response.data;
    } catch (error) {
      throw new Error(error.response.data.message);
    }
  };
  

const deleteMessage = async (messageId) => {
    try {
        console.log('delete msg id', messageId)
        const response = await axios.delete(`http://localhost:3000/chat/deletemessage/${messageId}`);
        console.log('delete response',response)
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
  
const updateMessage = async (updateMessageData) => {
    try {
        const response = await axios.post(`http://localhost:3000/chat/updatemessage`, updateMessageData);
        return response.data;
    } catch (error) {
        throw new Error(error.response.data.message);
    }
};
  
const chatService = {
    createGroupChat,
    getAllGroups,
    sendMessage,
    searchGroups,
    getMessages,
    deleteMessage,
    updateMessage,
};
  
export default chatService;