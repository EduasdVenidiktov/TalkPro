import css from './Home.module.css'

export function Home() {
  return (
    <div className={css.container}>
      <div className={css.headerBox}>
        <div className={css.logoBox}>
          <img
            className={css.logoImg}
            src="/public/ukraine.png"
            alt="Icon logo"
          ></img>
          <a href="" className={css.logoName}>
            LearnLingo
          </a>
        </div>

        <ul className={css.headerMenu}>
          <li>
            <h2>Home</h2>
          </li>
          <li>
            <h2>Teachers</h2>
          </li>
        </ul>

        <ul className={css.regAuthMenu}>
          <li>
            <img
              className={css.logoOut}
              src="/public/log-in-01.png"
              alt="Icon Out"
            ></img>
            {/* <a href="" className={css.logoImg}></a> */}
          </li>
          <li>log in</li>
          <li>
            <button>Registration</button>
          </li>
        </ul>
      </div>

      <div className={css.mainBox}>
        <div className={css.leftBox}>
          <h1>Unlock your potential with the best language tutors</h1>
          <p>
            Embark on an Exciting Language Journey with Expert Language Tutors:
            Elevate your language proficiency to new heights by connecting with
            highly qualified and experienced tutors.
          </p>
          <button>Get started</button>
        </div>
        <div className={css.rightBox}>
          <img src="/public/avatar.png" alt="avatar"></img>
          <img src="/public/Mac.png" alt="apple logo"></img>
        </div>
      </div>
      <div className={css.tutorsReviews}>
        <div className={css.listTutRev}>
          <div className={css.tutRewElement}>
            <h2 className={css.tutRewNumber}>32,000+</h2>
            <p className={css.tutRewText}>Experienced tutors</p>
          </div>
          <div className={css.tutRewElement}>
            <h2 className={css.tutRewNumber}>300,000+</h2>
            <p className={css.tutRewText}>5-star tutor reviews</p>
          </div>
          <div className={css.tutRewElement}>
            <h2 className={css.tutRewNumber}>120+</h2>
            <p className={css.tutRewText}>Subjects taught</p>
          </div>
          <div className={css.tutRewElement}>
            <h2 className={css.tutRewNumber}>200+</h2>
            <p className={css.tutRewText}>Tutor nationalities</p>
          </div>
        </div>
      </div>
    </div>
  )
}
