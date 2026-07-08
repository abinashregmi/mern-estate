import React from 'react'

export default function Header() {
  return (
    <header className='bg-slate-200 shadow-md'>
        <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <h1 className='font-bold text-sm sm:text-xl flex-wrap'>
            <span className='text-slate-400'>Abi</span>
            <span className='text-slate-700'>Estate</span>
        </h1>
        <form >
            <input   className="bg-white border border-gray-300 rounded-md px-4 py-2" type='text' placeholder='Search...' />
        </form>

        </div>
    </header>
  )
}
