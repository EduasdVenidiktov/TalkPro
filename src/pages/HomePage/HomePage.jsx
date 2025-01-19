import css from './HomePage.module.css'
import { HomeInfo } from './HomeInfo/HomeInfo'
import { HomeAvatar } from './HomeAvatar/HomeAvatar'
import { HomeStat } from './HomeStat/HomeStat'
import { HomeHeader } from './HomeHeader/HomeHeader'
import Loader from '/src/components/Loader/Loader'
import { useEffect, useState } from 'react'

export default function HomePage() {
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    setIsLoading(false)
  }, [])

  if (isLoading) {
    return (
      <div className={css.loaderContainer}>
        <Loader />
      </div>
    )
  }
  return (
    <div className={css.container}>
      <HomeHeader />
      <div className={css.contentWrapper}>
        <HomeInfo />
        <HomeAvatar />
      </div>
      <HomeStat />
    </div>
  )
}
