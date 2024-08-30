import React from 'react'

const Loader = () => {
  return (
    <>
         <div className="flex items-center justify-center mx-auto h-screen py-28 bg-[#f2f2f2]">
            <div className=" size-[70px] rounded-full place-self-center border-[4px] border-[#000000] border-t-[#a9a9a9] duration-[1] animate-spin"></div>
          </div>
    </>
  )
}

export default Loader