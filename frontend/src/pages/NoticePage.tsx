const NoticePage = ({text}: {text?:string}) => {
  return (
    <div className='md:text-lg z-10 w-full text-base text-center text-gray-700 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2'>
        {text ?? 'This Service is Currently Unavailable'}
    </div>
  )
}

export default NoticePage