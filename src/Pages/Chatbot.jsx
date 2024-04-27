import React from 'react';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Message from './Message';

export default function Chatbot() {
  return (
    <>
        <div className='flex flex-col justify-center items-center font-poppins p-[30px]'>
            <div className='text-[25px] p-[10px]'>Chat with AI</div>
            <div className='border-[1px] rounded-[10px] w-[696px] h-[500px] flex flex-col gap-[30px] p-[50px] overflow-auto no-scrollbar'>
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
            <div className='flex justify-center items-center mt-[30px] gap-[40px] w-[696px]'>
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
              <Button
                variant="contained"
                style={{ backgroundColor: '#002B93', color: 'white', height: '50px', borderRadius: '50px', fontSize: '18px', fontFamily: 'Poppins', width: '200px' }}

              >
                Submit
              </Button>
            </div>
        </div>
    </>
  );
}
