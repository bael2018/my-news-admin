import cls from './Content.module.css'
import Logo from '../../components/UI/Logo'
import { TiEdit} from 'react-icons/ti'
import { RiNewspaperLine } from 'react-icons/ri'
import { AiFillCaretUp } from 'react-icons/ai'
import { useEffect, useState } from 'react/cjs/react.development'
import { NavLink } from 'react-router-dom'
import { Route, Switch } from 'react-router'
import Create from './Create'
import {MdCreateNewFolder} from 'react-icons/md'
import Addition from './Addition'
import News from './News'
import { getRequest } from '../../api'
import { arrayFunc } from '../../helpers'

const Content = () => {
    const [viewOne , setViewOne] = useState(false)
    const [viewTwo , setViewTwo] = useState(false)
    const [viewThree , setViewThree] = useState(false)
    const [category , setCategory] = useState([])

    useEffect(() => {
        getRequest('categories.json' , '')
        .then(res => res.json())
        .then(r => {
            const data = arrayFunc(r)
            setCategory(data)
        })
    } , [viewThree])

    const handleLog = () => {
        localStorage.removeItem('user')
        window.location.reload()
    }
    
    return (
        <section className={cls.root}>
            <div className={cls.sidebar}>
                <div className={cls.sidebar_header}>
                    <Logo/>

                    <div className={cls.signOut}>
                        <span onClick={handleLog}>Log out</span>
                    </div>
                </div>
                <div className={cls.sidebar_body}>
                    <div onClick={() => setViewOne(prev => !prev)} className={cls.sidebar_body_title}>
                        <MdCreateNewFolder style={{color: viewOne ? '#01cbe6' : null}}/> 
                        <span style={{color: viewOne ? '#01cbe6' : null}}>Edit</span> 
                        <AiFillCaretUp 
                            style={{
                                transform: viewOne ? 'rotate(180deg)' : null,
                                color: viewOne ? '#01cbe6' : null
                            }}
                        />
                    </div>
                    <div style={{display: viewOne ? 'block' : 'none'}} className={cls.sidebar_body_inside}>
                        <NavLink 
                            exact
                            id={cls.sidebar_body_inside_link}
                            activeClassName={cls.sidebar_body_inside_link_active} 
                            to='/'
                        >
                            Addition
                        </NavLink>
                    </div>

                    <div onClick={() => setViewTwo(prev => !prev)} className={cls.sidebar_body_title}>
                        <TiEdit style={{color: viewTwo ? '#01cbe6' : null}}/> 
                        <span style={{color: viewTwo ? '#01cbe6' : null}}>Create</span> 
                        <AiFillCaretUp 
                            style={{
                                transform: viewTwo ? 'rotate(180deg)' : null,
                                color: viewTwo ? '#01cbe6' : null
                            }}
                        />
                    </div>

                    <div style={{display: viewTwo ? 'block' : 'none'}} className={cls.sidebar_body_inside}>
                        <NavLink 
                            exact
                            id={cls.sidebar_body_inside_link}
                            activeClassName={cls.sidebar_body_inside_link_active} 
                            to='/admin/create'
                        >
                            Add
                        </NavLink>
                    </div>

                    <div onClick={() => setViewThree(prev => !prev)} className={cls.sidebar_body_title}>
                        <RiNewspaperLine style={{color: viewThree ? '#01cbe6' : null}}/> 
                        <span style={{color: viewThree ? '#01cbe6' : null}}>News</span> 
                        <AiFillCaretUp 
                            style={{
                                transform: viewThree ? 'rotate(180deg)' : null,
                                color: viewThree ? '#01cbe6' : null
                            }}
                        />
                    </div>

                    <div style={{
                        display: viewThree ? 'block' : 'none',
                        paddingBottom: '20px'
                    }} className={cls.sidebar_body_inside}>
                        {
                            category.length === 0 ? (
                                <div>
                                    <h1>Empty</h1>
                                </div>
                            ) : (
                                category.map(({title , id}) => {
                                    return  (
                                    <NavLink 
                                        exact
                                        key={id}
                                        id={cls.sidebar_body_inside_link}
                                        activeClassName={cls.sidebar_body_inside_link_active} 
                                        to={`/admin/news/${title}`}
                                    >
                                        {title}
                                    </NavLink>
                                    )
                                })
                            )
                        }
                    </div>
                </div>
            </div>

            <div className={cls.content}>
                <div className={cls.content_wrapper}>
                    <Switch>
                        <Route exact path='/admin/create' component={Create}/>
                        <Route exact path='/' component={Addition}/>
                        <Route exact path='/admin/news/:id' component={News}/>
                    </Switch>
                </div>
            </div>
        </section>
    )
}

export default Content