import React from 'react'
import emailTransparant from '../assets/email-transparan.png'
import emailGray from '../assets/email-gray.png'
import emailBlue from '../assets/email-blue.png'
import personGray from '../assets/person-gray.png'
import personBlue from '../assets/person-blue.png'
import effect from '../assets/effect.png'

const Contact = () => {
  return (
    <div className='flex mt-14 min-w-screen min-h-screen'>
      {/* info   */}
        <div className='flex flex-col items-start justify-start max-w-1/2 mx-3 absolute left-8'>
            <div className='flex'>
                <img src={emailTransparant} alt="emailTransparant" className='lg:w-14 lg:h-14'/>
                <img src={effect} alt="effect" className='lg:w-16 lg:h-16 ml-60 mt-4'/>
            </div>
            <h1 className='text-[40px] font-bold font-manrope text-[#2E2E2E] mb-4'>Sampaikan Ceritamu</h1>
            <p className='text-left text-[#8A9497] font-manrope font-semibold'>Ada pertanyaan atau masukan? Tim Selaras siap</p>
            <p className='text-left text-[#8A9497] font-manrope font-semibold'>mendengarkan.</p>
            <button className='mt-7 lg:w-[450px] lg:h-20 rounded-2xl border-t-2 border-[#003366] shadow-md shadow-slate-300 bg-[#FAFAFA] flex'>
              <img src={emailBlue} alt="email" className='w-10 h-10 ml-4 mt-1 '/>
              <div className='flex flex-col font-manrope text-left ml-3 mt-1'>
                <h1 className='text-[#2E2E2E] text-lg font-semibold'>Email Kami</h1>
                <p className='text-md text-[#8A9497] font-semibold '>haloselaras@gmail.com</p>
              </div>
            </button>
            <button className='mt-7 lg:w-[450px] lg:h-20 rounded-2xl shadow-md shadow-slate-300 bg-[#FAFAFA] flex'>
              <img src={personBlue} alt="email" className='w-10 h-10 ml-4 mt-1 '/>
              <div className='flex flex-col font-manrope text-left ml-3 mt-1'>
                <h1 className='text-[#2E2E2E] text-lg font-semibold'>Kontak Kami</h1>
                <p className='text-md text-[#8A9497] font-semibold '>+627725132488</p>
              </div>
            </button>
        </div>

        {/* form 1*/}
        <div className='flex flex-col items-start justify-start rounded-3xl bg-[#FAFAFA] shadow-md shadow-gray-400 p-2 w-[400px] h-[550px] right-20 absolute'>
          <h1 className='text-start mt-14 font-semibold font-manrope text-md text-[#2E2E2E] absolute left-6'>Nama Lengkap</h1>
          <form className='flex w-[350px] h-12 p-2 bg-[#F4F4F4] absolute left-6 top-24 rounded-xl items-center justify-center'>
            <img src={personGray} alt="personGray" className='w-6 h-6 mr-2' />
            <input placeholder='Masukan namamu' className='w-[300px] focus:outline-none text-[#B3B3B3] font-semibold font-manrope'></input>
          </form>

          {/* form 2 */}
          <h1 className='text-start mt-[170px] font-semibold font-manrope text-md text-[#2E2E2E] absolute left-6'>Email</h1>
          <form className='flex w-[350px] h-12 p-2 bg-[#F4F4F4] absolute left-6 top-52 rounded-xl items-center justify-center'>
            <img src={emailGray} alt="personGray" className='w-6 h-6 mr-2' />
            <input placeholder='Masukan emailmu' className='w-[300px] focus:outline-none text-[#B3B3B3] font-semibold font-manrope'></input>
          </form>
          <form className='flex w-[350px] h-40 p-2 bg-[#F4F4F4] absolute left-6 top-[280px] rounded-xl items-start justify-start'>
            <input placeholder='Isi pesanmu.....' className='w-[300px] focus:outline-none text-[#B3B3B3] text-sm font-semibold font-manrope flex flex-col'></input>
          </form>
          
          {/* button submit */}
          <button className='justify-end items-end bg-[#003366] p-2 w-16 h-10 rounded-xl text-white bottom-10 right-7 absolute hover:scale-75 duration-300'>Kirim</button>
        </div>
    </div>
  )
}

export default Contact