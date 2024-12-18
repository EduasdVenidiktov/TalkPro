import { Vortex } from 'react-loader-spinner'
import css from './Loader.module.css'

export default function Loader() {
  return (
    <div className={css.loaderWrapper}>
      <Vortex
        visible={true}
        height="100"
        width="100"
        colors={['red', 'green', 'blue', 'yellow', 'orange', 'purple']}
      />
    </div>
  )
}
