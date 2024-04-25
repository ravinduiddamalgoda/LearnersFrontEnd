import React, { useEffect, useState } from 'react';
import Message from './Message';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';
import Button from '@mui/material/Button';
import { useDispatch, useSelector } from 'react-redux';
import { createGroup, sendMessage, deleteMessage, updateMessage, searchGroups, fetchMessages } from '../features/chat/chatSlice';
import { io } from "socket.io-client";

const user = '66283ef81df4567e1d703370';

export default function ChatSection() {

  const [showInput, setShowInput] = useState(false);
  const [showGroups, setShowGroups] = useState(false);
  const [groupName, setGroupName] = useState('');
  const [editMessage, setEditmessage] = useState(false);
  const [currentMessage, setCurrentMessage] = useState('');
  const [messageText, setMessageText] = useState('');
  const [filteredGroups, setFilteredGroups] = useState([]);
  const [showButtonsForMessage, setShowButtonsForMessage] = useState({});

  const dispatch = useDispatch();
  
  const { groups, messages, selectedGroupId } = useSelector(state => state.chat);

  const handleNewTopicClick = () => {
    setShowInput(true);
  };
  
  const handleSendClick = () => {
    const adminId = user;
    const groupData = {
      name: groupName, 
      admin: adminId
    }
    dispatch(createGroup(groupData));
    setShowInput(false);
  };  

  const chat = () => {
    if (!editMessage) {
        const messageData = {
            content: messageText,
            sender: user,
            group: selectedGroupId
        };
        dispatch(sendMessage(messageData));
        setMessageText('');
    } else {
        const updateMessageData = {
            messageId: currentMessage,
            content: messageText
        };
        dispatch(updateMessage(updateMessageData))
        setMessageText('');
    }
};


  const handleRightClick = (messageId) => {
    setShowButtonsForMessage(prevState => ({
      ...prevState,
      [messageId]: true
    }));
  };

  const handleClickOutside = () => {
    setShowButtonsForMessage({});
  };

  const handleDeleteClick = (messageId) => {
    console.log(messageId)
    dispatch(deleteMessage(messageId));
  };

  const handleInputChange = (e) => {
    const { value } = e.target;
    if (value) {
      setShowGroups(true);
      const filteredGroups = groups.filter(group => {
        return group.name.toLowerCase().includes(value.toLowerCase());
      });
      setFilteredGroups(filteredGroups);
      console.log('filtered grouos', filteredGroups)
    } else {
      setShowGroups(false);
    }
  };  

  const handleInputFocus = () => {
    setShowGroups(true); 
  };

  const handleInputBlur = () => {
    setShowGroups(false);
    setFilteredGroups([]);
  };

  useEffect(() => {
    console.log('Chat section', messages);
    console.log('selected group',selectedGroupId);
    console.log('Chat section 2');
    const socket = io("http://localhost:3001");
    console.log("soclet")
  }, [messages, selectedGroupId, fetchMessages, dispatch]);
  
  return (
    <div className='flex flex-col gap-[30px] m-[50px]'>

      <div className='flex justify-center items-center gap-[20px]'>

        <div className='w-full rounded-full '>
            <TextField
              id="outlined-textarea"
              label="Search Topics"
              placeholder="Search Topics"
              multiline
              onChange={handleInputChange}
              onFocus={handleInputFocus}
              onBlur={handleInputBlur}
              className='w-full'
              InputLabelProps={{
                sx: {
                  fontFamily: 'Poppins',
                  '&.Mui-focused': {
                    color: '#000000',
                    fontFamily: 'Poppins',
                  }
                }
              }}
              InputProps={{
                sx: {
                  overflow: 'hidden',
                  fontFamily: 'Poppins',
                  borderRadius: 100,
                  height: 57,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#000000', 
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#000000', 
                  }
                }
              }}
            />  
        </div>

        <div>
          <Button
              variant="contained"
              style={{ backgroundColor: '#002B93', color: 'white', height: '50px', borderRadius: '50px', fontSize: '18px', fontFamily: 'Poppins', width: '150px' }}
              onClick={handleNewTopicClick}
            >
              New Topic
          </Button>
        </div>

      </div>

      {showGroups && filteredGroups.map((group) => (
        <button>
          <div key={group._id}>
            <button onClick={() => {dispatch(fetchMessages(group._id)); setShowGroups(false)}} className='font-poppins'>{group.name}</button>
          </div>
        </button>
      ))}

      {showInput && (
          <div className='flex h-[57px] gap-[21px] justify-center items-center'>
            <div className='w-full rounded-full'>
              <TextField
                id="outlined-textarea"
                label="Enter Group Name"
                placeholder="Enter Group Name"
                multiline
                className='w-full'
                onChange={(e) => {setGroupName(e.target.value);}}
                InputLabelProps={{
                  sx: {
                    fontFamily: 'Poppins',
                    '&.Mui-focused': {
                      color: '#000000',
                      fontFamily: 'Poppins',
                    }
                  }
                }}
                InputProps={{
                  sx: {
                    overflow: 'hidden',
                    fontFamily: 'Poppins',
                    borderRadius: 100,
                    height: 57,
                    '& .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#000000', 
                    },
                    '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                      borderColor: '#000000', 
                    }
                  }
                }}
              />
            </div>
            <button className='bg-blue rounded-full w-[55px] h-[50px] flex justify-center items-center' onClick={handleSendClick}>
              <SendIcon style={{ color: '#ffffff' }} />
            </button>
          </div>
        )}

      <div className={`border-[1px] rounded-[10px] w-[696px] h-[656px] flex flex-col gap-[30px] p-[50px] overflow-auto no-scrollbar`}>
        {messages.map(message => (
          <div 
            key={message._id} 
            className={`flex ${message.sender === user ? 'justify-end' : 'justify-start'}`}
            onContextMenu={() => handleRightClick(message._id)}
          >
            <Message
              messageBody={message.content}
              messageId={message._id}
              date={message.createdAt}
              sender={message.sender}
            />
            {showButtonsForMessage[message._id] && (
              <div className='flex flex-col justify-start items-start gap-[5px] ml-[5px]'>
                <button 
                  className='p-[5px] px-[20px] rounded-[100px] hover:shadow-md' 
                  onClick={() => {handleDeleteClick(message._id); handleClickOutside()}}
                >
                  Delete
                </button>
                <button 
                  onClick={() => {setEditmessage(true); setCurrentMessage(message._id); setMessageText(message.content); handleClickOutside();}}
                  className='p-[5px] px-[20px] rounded-[100px] hover:shadow-md'
                >
                  Edit
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
      
      <div className='flex h-[57px] gap-[21px] justify-center items-center'>
        <div className='w-full rounded-full '>
            <TextField
              id="outlined-textarea"
              label="Type your message here..."
              placeholder="Type your message here..."
              value={messageText}
              onChange={(e) => {setMessageText(e.target.value)}}
              multiline
              className='w-full'
              InputLabelProps={{
                sx: {
                  fontFamily: 'Poppins',
                  '&.Mui-focused': {
                    color: '#000000',
                    fontFamily: 'Poppins',
                  }
                }
              }}
              InputProps={{
                sx: {
                  overflow: 'hidden',
                  fontFamily: 'Poppins',
                  borderRadius: 100,
                  height: 57,
                  '& .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#000000', 
                  },
                  '&.Mui-focused .MuiOutlinedInput-notchedOutline': {
                    borderColor: '#000000', 
                  }
                }
              }}
            />  
        </div>
        <button onClick={() => {chat();}} className='bg-blue rounded-full w-[55px] h-[50px] flex justify-center items-center'>
          <SendIcon style={{ color: '#ffffff' }} />
        </button>

      </div>

    </div>
  );
}
