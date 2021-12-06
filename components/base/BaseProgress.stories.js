import BaseProgress from './BaseProgress'

export default {
  title: 'Base/Progress',
  component: BaseProgress,
}

export const Default = () => '<BaseProgress :value="0.5" />'
export const Bar = () => '<BaseProgress type="bar" :value="0.5" />'
export const Ring = () => '<BaseProgress type="ring" :value="0.25" />'
