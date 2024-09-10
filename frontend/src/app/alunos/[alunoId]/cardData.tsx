import React from 'react'

type Props = {
  icon: JSX.Element;
  dataKey?: string;
  dataValue?: string | number;
  width?: number
}
export default function CardData({icon, dataKey, dataValue, width}: Props) {
  return (
    <div style={{width: `${width}px`}} className='flex flex-col gap-5 rounded-lg bg-uninterTheme-500 justify-center items-center p-3 m-10'>
      <p className='text-white text-3xl'>{dataKey}</p>
      <p className='text-white text-5xl'>{icon}</p>
      <p className='text-white text-xl bg-uninterTheme-400 rounded-lg px-3 py-2'>{dataValue}</p>
    </div>
  )
}