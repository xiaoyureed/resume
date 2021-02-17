import React from 'react'
import { FaPaperclip } from 'react-icons/fa'
import { Link } from 'react-router-dom'
import ss from './index.module.scss'

interface IWork {
  title: string
  desc: string
  tags: string[]
}
const Works = ({ works }: { works: Array<IWork> }) => {
  return (
    <div className={ss.works}>
      {works.map((w, index) => (
        <div className={ss.work} key={index}>
          <div className={ss.projImgWrapper}>
            <FaPaperclip className={ss.projImg} />
          </div>
          <div className={ss.brief}>
            <h3>
              <Link to={`/works/${index}`}>{w.title}</Link>
            </h3>
            <p>{w.desc}</p>
            <div>{w.tags && w.tags.map((t) => <span>{t}</span>)}</div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default Works
