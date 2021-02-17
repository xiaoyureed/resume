import React, { createContext, useContext, useState } from 'react'
import {
  BrowserRouter as Router,
  Link,
  Route,
  withRouter,
} from 'react-router-dom'
import ss from './index.module.scss'
import Home from '../Home'
import WorkDetail from '../WorkDetail'
import { FaDocker } from 'react-icons/fa'
import Services from '../Services'

interface ResumeLocale {
  header: {
    home: string
    services: string
    language: string
  }
  main: {
    name: string
    tags: string[]
    desc: string[]
  }
  works: {
    title: string
    desc: string
    items: Array<{
      title: string
      desc: string
      tags: string[]
    }>
  }
}

const cn: ResumeLocale = {
  header: {
    home: '主页',
    services: '服务',
    language: 'En/中',
  },
  main: {
    name: '肖雨',
    tags: ['Java', 'Web', '微服务', '运维开发'],
    desc: [
      '野生码农, 喜欢折腾, 对事儿认真. 热爱和技术有关的一切',
      '我工作中主要使用 Java & JavaScript, 业余会使用 Python, Rust 写一些小工具',
      '邮件联系我 775000738@qq.com',
    ],
  },
  works: {
    title: '项目',
    desc: '这里列出我做过的东西',
    items: [
      {
        title: '"农田管家"农宝服务平台',
        desc:
          '主要为第三方农企接入农田管家的公司的飞防业务, 提供无人机喷洒农药服务. 并且还对这些企业用户提供农产品商城服务、互联网金融服务',
        tags: [
          'Spring boot',
          'MyBatis',
          'Spring cloud',
          'Gitlab-ci',
          'docker',
          'Redis',
          'RabbitMQ',
          'MySQL',
          'MongoDB',
        ],
      },
      {
        title: '"农田管家"数据统计系统',
        desc:
          '用于对公司业务数据进行统计,以报表或图表的形式在前端做展示。包括飞手活跃度数据、gmv、订单及订单亩次的统计等等',
        tags: [
          'Spring boot',
          'MyBatis',
          'Quartz',
          'MySQL',
          'Docker',
          'React',
          'Antd',
          'echarts',
        ],
      },
      {
        title: '企业 Bpm 开发平台',
        desc:
          '将原有.net 平台的 k2 bpm 移植到 java 平台, 微服务下解耦, 以提供更强的扩展能力, 为企业员工提供流程自定义创建,管理,查询平台',
        tags: [
          'SSM',
          'SpringCloud',
          'docker',
          'Extjs',
          'Postgres',
          'Redis',
          'RabbitMQ',
        ],
      },
      {
        title: '微服务开发运维平台',
        desc: '帮助企业实现微服务架构, 并提供一系列提高效率的工具',
        tags: [
          'SpringBoot',
          'SpringCloud',
          'Mybatis',
          'Redis',
          'Rabbitmq',
          'Docker',
          'React',
          'Antd',
        ],
      },
      {
        title: 'Restful Generator',
        desc: 'RESTful api generator for java',
        tags: ['Jinja2', 'Python'],
      },
      {
        title: 'Tail log',
        desc: '免登陆查看服务器日志',
        tags: ['Rust', 'websocket', 'shell'],
      },
    ],
  },
}

const en: ResumeLocale = {
  header: {
    home: 'Home',
    services: 'Services',
    language: 'En/zh',
  },
  main: {
    name: 'Xiao Yu',
    tags: ['Java', 'Web', 'MicroService', 'DevOps'],
    desc: [
      'I design applications, interactive systems and websites. I love using technology in creative contexts.',
      'I use Javascript, Java and Rust in my work',
      'Contact me at 775000738#qq.com',
    ],
  },
  works: {
    title: 'Works',
    desc: 'A collections of different things that I have worked on',
    items: [
      {
        title: '"农田管家"农宝服务平台',
        desc:
          '主要为第三方农企接入农田管家的公司的飞防业务, 提供无人机喷洒农药服务. 并且还对这些企业用户提供农产品商城服务、互联网金融服务',
        tags: [
          'Spring boot',
          'MyBatis',
          'Spring cloud',
          'Gitlab-ci',
          'docker',
          'Redis',
          'RabbitMQ',
          'MySQL',
          'MongoDB',
        ],
      },
      {
        title: '"农田管家"数据统计系统',
        desc:
          '用于对公司业务数据进行统计,以报表或图表的形式在前端做展示。包括飞手活跃度数据、gmv、订单及订单亩次的统计等等',
        tags: [
          'Spring boot',
          'MyBatis',
          'Quartz',
          'MySQL',
          'Docker',
          'React',
          'Antd',
          'echarts',
        ],
      },
      {
        title: '企业 Bpm 开发平台',
        desc:
          '将原有.net 平台的 k2 bpm 移植到 java 平台, 微服务下解耦, 以提供更强的扩展能力, 为企业员工提供流程自定义创建,管理,查询平台',
        tags: [
          'SSM',
          'SpringCloud',
          'docker',
          'Extjs',
          'Postgres',
          'Redis',
          'RabbitMQ',
        ],
      },
      {
        title: '微服务开发运维平台',
        desc: '帮助企业实现微服务架构, 并提供一系列提高效率的工具',
        tags: [
          'SpringBoot',
          'SpringCloud',
          'Mybatis',
          'Redis',
          'Rabbitmq',
          'Docker',
          'React',
          'Antd',
        ],
      },
      {
        title: 'Restful Generator',
        desc: 'RESTful api generator for java',
        tags: ['Jinja2', 'Python'],
      },
      {
        title: 'Tail log',
        desc: '免登陆查看服务器日志',
        tags: ['Rust', 'websocket', 'shell'],
      },
    ],
  },
}

interface IResumeLocaleContext {
  lan: ResumeLocale
  toggle: () => void
}

const LocaleContext = createContext<IResumeLocaleContext | undefined>(undefined)
export const useLocaleContext = () => {
  const con = useContext(LocaleContext)
  if (!con) {
    throw new Error(
      'useLocaleContext must be used within LocaleContext.provider'
    )
  }
  return con
}
// 考虑 any 替换为 Location
const ProfileSass = ({ location }: { location: any }) => {
  const { lan, toggle } = useLocaleContext()

  return (
    <div className={ss.container}>
      <header className={ss.header}>
        <h1 className={ss.headerLeft}>
          <Link to="/" className={ss.headerLeftLink}>
            Resume
            <FaDocker className={ss.icon} />
          </Link>
        </h1>
        <ul className={ss.headerRight}>
          <li className={ss.menuItem}>
            <Link
              className={`${ss.menuItemLink} ${
                location.pathname === '/' && ss.menuItemLinkActive
              }`}
              to="/"
            >
              {lan.header.home}
            </Link>
          </li>
          <li className={ss.menuItem}>
            <Link
              className={`${ss.menuItemLink} ${
                location.pathname === '/services' && ss.menuItemLinkActive
              }`}
              to="/services"
            >
              {lan.header.services}
            </Link>
          </li>
          <li className={ss.menuItem}>
            {/* <Link to="" className={ss.menuItemLink}>
              En/中
            </Link> */}
            <span className={ss.menuItemLink} onClick={() => toggle()}>
              En/中
            </span>
          </li>
        </ul>
      </header>
      <section className={ss.content}>
        <Route path="/" exact component={Home} />
        <Route path="/services" exact component={Services} />
        <Route path="/works/:id" exact component={WorkDetail} />
      </section>
      <footer className={ss.footer}>
        <p>
          Coded with ❤️ by <b>{lan.main.name}</b>
        </p>
        <p>©️2020</p>
      </footer>
    </div>
  )
}

const ProfileSassWrapper = () => {
  const With = withRouter(ProfileSass)
  const [lan, setLan] = useState(en)

  return (
    <LocaleContext.Provider
      value={{
        lan,
        toggle: () => setLan((prev) => (prev === en ? cn : en)),
      }}
    >
      <Router>
        <With />
      </Router>
    </LocaleContext.Provider>
  )
}

export default ProfileSassWrapper
