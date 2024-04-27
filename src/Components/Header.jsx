import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);

  return (

    <div className='flex flex-col justify-center items-center font-poppins gap-[30px] mb-[50px]'>
      <div className='flex justify-center items-center gap-[600px]'>
        <div className='text-[50px] font-[800] font-poppins'><Link to='/'>SARASAVI</Link></div>
        <div>
          {
            currentUser ? (
              <div></div>
            ):(
              <div className='flex items-center gap-[84px]'>
                <div className='font-[4000] text-[22px]'><Link>Register</Link></div>
                <div className='text-white bg-[#002B93] rounded-full font-[400] py-[15px] px-[60px] text-[22px]'><Link>Login</Link></div>
              </div>
            )
          }
        </div>
      </div>
      <div className='flex justify-center items-center gap-[80px] text-[22px]'>
        <div className={`hover:font-[500]`}><Link to='/'>Home</Link></div>
        <div className={`hover:font-[500]`}><Link to='/chat'>Home</Link></div>
        <div className={`hover:font-[500]`}><Link to='/'>Home</Link></div>
        <div className={`hover:font-[500]`}><Link to='/'>Home</Link></div>
        <div className={`hover:font-[500]`}><Link to='/'>Home</Link></div>
      </div>
    </div>

    // <header className='bg-slate-200 shadow-md'>
    //   <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
    //     <Link to='/'>
    //       <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
    //         <span className='text-slate-500'>Sarasavi</span>
    //         <span className='text-slate-700'>Learners</span>
    //       </h1>
    //     </Link>


    //     <ul className='flex gap-4'>
    //       <Link to='/'>
    //         <li className='text-slate-700 hover:underline'>
    //           Home
    //         </li>
    //       </Link>
          
    //       <Link to='/admin-dashboard'>
    //         {currentUser ? (
    //             <span className="text-slate-700 hover:underline"> Dashboard </span>
    //         ) : (
    //           <li className='text-slate-700 hover:underline'> Sign in </li>
    //         )}
    //       </Link>



    //     </ul>
    //   </div>
    // </header>
  );
}
