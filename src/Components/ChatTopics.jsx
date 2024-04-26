import React from 'react';

export default function ChatTopics() {
  return (
    <div className='m-[50px] font-poppins flex flex-col gap-[20px]'>
      <div>
        <div className='font-[500] mb-[20px] text-[20px]'>Your topics</div>
            <div className="flex items-center flex-col justify-center gap-[15px]">
                <button className='flex items-center justify-center gap-[20px]'>
                    <div className="w-[20px] h-[20px] bg-blue-500 rounded-full bg-blue"></div>
                    <div className='w-[262px] h-[27px] overflow-x-auto no-scrollbar whitespace-nowrap'>Lorem Ipsum is simply Lorem Ipsum is simply Lorem Ipsum is simply</div>
                </button>
                <button className='flex items-center justify-center gap-[20px]'>
                    <div className="w-[20px] h-[20px] bg-blue-500 rounded-full bg-blue"></div>
                    <div className='w-[262px] h-[27px] overflow-x-auto no-scrollbar whitespace-nowrap'>Lorem Ipsum is simply Lorem Ipsum is simply Lorem Ipsum is simply</div>
                </button>
                <button className='flex items-center justify-center gap-[20px]'>
                    <div className="w-[20px] h-[20px] bg-blue-500 rounded-full bg-blue"></div>
                    <div className='w-[262px] h-[27px] overflow-x-auto no-scrollbar whitespace-nowrap'>Lorem Ipsum is simply Lorem Ipsum is simply Lorem Ipsum is simply</div>
                </button>
            </div>
        </div>
      <div>
        <div className='font-[500] mb-[20px] text-[20px]'>Other topics</div>
            <div className="flex items-center flex-col justify-center gap-[15px]">
                <button className='flex items-center justify-center gap-[20px]'>
                    <div className="w-[20px] h-[20px] bg-blue-500 rounded-full bg-blue"></div>
                    <div className='w-[262px] h-[27px] overflow-x-auto no-scrollbar whitespace-nowrap'>Lorem Ipsum is simply Lorem Ipsum is simply Lorem Ipsum is simply</div>
                </button>
            </div>
        </div>
    </div>
  );
}
