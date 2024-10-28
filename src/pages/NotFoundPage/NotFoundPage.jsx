import { Link } from 'react-router-dom'
import css from './NotFoundPage.module.css'

export function NotFoundPage() {
  return (
    <div className={css.containerNotFound}>
      <h1 className={css.titleNotFound}>Oooops, something went wrong!</h1>
      <Link to="/">Go to main page</Link>
    </div>
  )
}
