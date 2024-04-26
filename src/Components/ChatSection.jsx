import React from 'react';
import Message from './Message';
import TextField from '@mui/material/TextField';
import SendIcon from '@mui/icons-material/Send';

export default function ChatSection() {
  return (
    <div className='flex flex-col gap-[30px] m-[50px]'>

      <div className={`border-[1px] rounded-[10px] w-[696px] h-[656px] flex flex-col gap-[30px] p-[50px] overflow-auto no-scrollbar`}>
        <div className={`flex ${true ? 'justify-start' : 'justify-end'}`}>
          <Message />
        </div>
        <div className={`flex ${true ? 'justify-end' : 'justify-start'}`}>
          <Message />
        </div>            
        <div className={`flex ${true ? 'justify-start' : 'justify-end'}`}>
          <Message />
        </div>
        <div className={`flex ${true ? 'justify-end' : 'justify-start'}`}>
          <Message />
        </div>            
        <div className={`flex ${true ? 'justify-start' : 'justify-end'}`}>
          <Message />
        </div>
        <div className={`flex ${true ? 'justify-end' : 'justify-start'}`}>
          <Message />
        </div>            
      </div>
      
      <div className='flex h-[57px] gap-[21px] justify-center items-center'>
        <div className='w-full rounded-full '>
            <TextField
              id="outlined-textarea"
              label="Type your message here..."
              placeholder="Type your message here..."
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
        <button className='bg-blue rounded-full w-[55px] h-[50px] flex justify-center items-center'>
          <SendIcon style={{ color: '#ffffff' }} />
        </button>

      </div>

    </div>
  );
}
