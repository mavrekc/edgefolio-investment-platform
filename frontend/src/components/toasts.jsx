import toast from "react-hot-toast";

export const customToast = (message, type, t) => (
  <div className='row w-100 mx-auto align-items-center flex-nowrap gap-2' style={{}}>
    <div className='col-auto p-0'>
      {type === "success" ? (
        <svg xmlns='http://www.w3.org/2000/svg' width={24} height={24} viewBox='0 0 24 24' fill='#00a200' className='icon icon-tabler icons-tabler-filled icon-tabler-circle-check'>
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M17 3.34a10 10 0 1 1 -14.995 8.984l-.005 -.324l.005 -.324a10 10 0 0 1 14.995 -8.336zm-1.293 5.953a1 1 0 0 0 -1.32 -.083l-.094 .083l-3.293 3.292l-1.293 -1.292l-.094 -.083a1 1 0 0 0 -1.403 1.403l.083 .094l2 2l.094 .083a1 1 0 0 0 1.226 0l.094 -.083l4 -4l.083 -.094a1 1 0 0 0 -.083 -1.32z' />
        </svg>
      ) : (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={24}
          height={24}
          viewBox='0 0 24 24'
          fill='#c92634'
          className='icon icon-tabler icons-tabler-filled icon-tabler-xbox-x overflow-visible'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M12 2c5.523 0 10 4.477 10 10s-4.477 10 -10 10s-10 -4.477 -10 -10s4.477 -10 10 -10m3.6 5.2a1 1 0 0 0 -1.4 .2l-2.2 2.933l-2.2 -2.933a1 1 0 1 0 -1.6 1.2l2.55 3.4l-2.55 3.4a1 1 0 1 0 1.6 1.2l2.2 -2.933l2.2 2.933a1 1 0 0 0 1.6 -1.2l-2.55 -3.4l2.55 -3.4a1 1 0 0 0 -.2 -1.4' />
        </svg>
      )}
    </div>
    <div className='col p-0 ms-1'>{message}</div>
    <div className='col-auto p-0'>
      <button className='btn p-0 m-0 border-0' type='button' onClick={() => toast.dismiss(t.id)}>
        <svg
          xmlns='http://www.w3.org/2000/svg'
          width={24}
          height={24}
          viewBox='0 0 24 24'
          fill='none'
          stroke='currentColor'
          strokeWidth={1.25}
          strokeLinecap='round'
          strokeLinejoin='round'
          className='icon icon-tabler icons-tabler-outline icon-tabler-x'
        >
          <path stroke='none' d='M0 0h24v24H0z' fill='none' />
          <path d='M18 6l-12 12' />
          <path d='M6 6l12 12' />
        </svg>
      </button>
    </div>
  </div>
);
