import {
  IconHome,
  IconCirclePlus,
  IconChartPie2,
} from '@tabler/icons-react';

const IconLearn = ({ width, height, color }) => (
  <svg
    xmlns='http://www.w3.org/2000/svg'
    className='ionicon'
    width={width}
    height={height}
    viewBox='0 0 512 512'
    style={{
      color,
    }}
  >
    <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='18' d='M32 192 256 64l224 128-224 128z'></path>
    <path fill='none' stroke='currentColor' strokeLinecap='round' strokeLinejoin='round' strokeWidth='18' d='M112 240v128l144 80 144-80V240m80 128V192M256 320v128'></path>
  </svg>
)

export const ICONS = {
  dashboard: IconHome,
  invest: IconCirclePlus,
  portfolio: IconChartPie2,
  learn: IconLearn
}
