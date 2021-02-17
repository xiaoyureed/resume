import React from 'react'
import Works from '../Works'
import ss from './index.module.scss'
import { useLocaleContext } from '../App'

const Home = () => {
  const { lan } = useLocaleContext()
  return (
    <div className={ss.container}>
      <section className={ss.brief}>
        <img src={require('./avatar.jpg').default} alt="img" />
        <h2>{lan.main.name}</h2>
        <ul>
          {lan.main.tags.map((tag, i) => (
            <li key={i}>{tag}</li>
          ))}
        </ul>
        <div>
          <p>{lan.main.desc[0]}</p>
          <p>{lan.main.desc[1]}</p>
          <p>{lan.main.desc[2]}</p>
        </div>
      </section>
      <section className={ss.works}>
        <div className={ss.title}>
          <h3>{lan.works.title}</h3>
          <p>{lan.works.desc}</p>
        </div>
        <Works works={lan.works.items} />
      </section>
    </div>
  )
}

export default Home
