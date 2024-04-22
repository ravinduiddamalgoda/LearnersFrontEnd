import React from 'react';
import ChatSection from '../Components/ChatSection';
import ChatTopics from '../Components/ChatTopics';

export default function Chat() {
  return (
    <div>
        <div></div>
        <div className='flex justify-center'>
            <div>
              <ChatTopics />
            </div>
            <div>
              <ChatSection />
            </div>
        </div>
    </div>
  );
}
