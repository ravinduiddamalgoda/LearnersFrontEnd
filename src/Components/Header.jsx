import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';

export default function Header() {
  const { currentUser } = useSelector(state => state.user);

  return (
    <header className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to='/'>
          <h1 className='font-bold text-sm sm:text-xl flex flex-wrap'>
            <span className='text-slate-500'>Sarasavi</span>
            <span className='text-slate-700'>Learners</span>
          </h1>
        </Link>


        <ul className='flex gap-4'>
          <Link to='/'>
            <li className='text-slate-700 hover:underline'>
              Home
            </li>
          </Link>
          
          <Link to='/admin-dashboard'>
            {currentUser ? (
                <span className="text-slate-700 hover:underline"> Dashboard </span>
            ) : (
              <li className='text-slate-700 hover:underline'> Sign in </li>
            )}
          </Link>



        </ul>
      </div>
    </header>
  );
}
