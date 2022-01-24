import cls from './Create.module.css'
import {MdSubtitles} from 'react-icons/md'
import {BiImageAdd} from 'react-icons/bi'
import {MdVideoLibrary} from 'react-icons/md'
import { useState } from 'react/cjs/react.development'
import { useEffect } from 'react'
import { alertWarner, arrayFunc} from '../../../helpers'
import { getRequest, postRequest } from '../../../api'
import Alert from '../../../components/Alert'
import IsEmpty from '../../../components/IsEmpty'

const Create = () => {
    const [chooseSubcat , setChooseSubcat] = useState('Choose subcategory')
    const [chooseCat , setChooseCat] = useState('Choose category')
    const [innerBase , setInnerBase] = useState([])
    const [subtitle , setSubtitle] = useState('')
    const [picture , setPicture] = useState('')
    const [content , setContent] = useState('')
    const [show , setShow] = useState(false)
    const [title , setTitle] = useState('')
    const [video , setVideo] = useState('nothing')
    const [cat , setCat] = useState(false)
    const [sub , setSub] = useState(false)
    const [base , setBase] = useState([])
    const [valid , setValid] = useState(false)

    useEffect(() => {
        getRequest('categories.json' , '')
        .then(res => res.json())
        .then(r => {
            const data = arrayFunc(r)
            setBase(data)
        })
    }, [])

    useEffect(() => {
        getRequest('subcategories.json' , '')
        .then(res => res.json())
        .then(r => {
            const data = arrayFunc(r)
            const result = data.filter(item => item.category === chooseCat)
            if(result.length === 0){
                setChooseSubcat('Choose subcategory')
            }
            setInnerBase(result)
        })
    } , [chooseCat])

    const handleCreate = () => {
        const data = new Date()
        const year = data.getFullYear()
        const month = data.getMonth()
        const hours = data.getHours()
        const minutes = data.getMinutes()
        const days = data.getDate()

        if(title !== '' && subtitle !== '' && picture !== '' && video !== '' && content !== '' 
            && chooseSubcat !== 'Choose subcategory' && chooseCat !== 'Choose category'
        ){
            postRequest(
                {
                    title: title, 
                    subtitle: subtitle,
                    picture: picture,
                    video: video,
                    content: content,
                    isLiked: false,
                    likes: 0,
                    isChoosed: false,
                    days: days,
                    year,
                    month,
                    hours,
                    minutes,
                    category: chooseCat,
                    subcategory: chooseSubcat
                }
                , 'news.json' , '' , ''
            ).then(() => {
                setTitle('')
                setSubtitle('')
                setPicture('')
                setVideo('nothing')
                setContent('')
                setChooseSubcat('Choose subcategory')
                setChooseCat('Choose category')
                alertWarner(setShow)
            })
        }else{
            setValid(true)
            setTimeout(() => {
                setValid(false)
            }, 2500);
        }
    }
    
    return (
        <section className={cls.create}>
            <IsEmpty valid={valid}/>
            <Alert show={show}/>
            <div className={cls.create_body}>
                <div className={cls.create_inner}>
                    <label>
                        <h3><MdSubtitles/>title</h3>
                        <input 
                        style={{
                            background: title ? '#01cbe6' : null , 
                            border: title ? '1px solid #01cbe6' : null
                        }}  
                        value={title} 
                        onChange={e => setTitle(e.target.value)} 
                        placeholder='title' type="text" 
                        />
                    </label>
                    <label>
                        <h3><MdSubtitles/>subtitle</h3>
                        <input
                        style={{
                            background: subtitle ? '#01cbe6' : null , 
                            border: subtitle ? '1px solid #01cbe6' : null
                        }}  
                        value={subtitle} 
                        onChange={e => setSubtitle(e.target.value)} 
                        placeholder='subtitle' type="text" 
                        />
                    </label>
                    <label>
                        <h3><BiImageAdd/>picture</h3>
                        <input 
                        style={{
                            background: picture ? '#01cbe6' : null , 
                            border: picture ? '1px solid #01cbe6' : null
                        }}  
                        value={picture} 
                        onChange={e => setPicture(e.target.value)} 
                        placeholder='picture' type="text" 
                        />
                    </label>
                    <label>
                        <h3><MdVideoLibrary/>video</h3>
                        <input 
                        style={{
                            background: video ? '#01cbe6' : null , 
                            border: video ? '1px solid #01cbe6' : null
                        }}  
                        value={video} 
                        onChange={e => setVideo(e.target.value)} 
                        placeholder='video' type="text" 
                        />
                    </label>
                    <button onClick={handleCreate} className={cls.createBtn}>CREATE</button>
                </div>
                <div className={cls.create_inner}>
                    <div className={cls.create_header}>
                        <div onClick={() => setCat(prev => !prev)} className={cls.create_wrapper}>
                            <h1>{chooseCat}</h1>
                            <span className={cat ? cls.activeSpan : null}>
                                {
                                    base.length === 0 ? (
                                        <div>
                                            <h1>Empty</h1>
                                        </div>
                                    ) : (
                                        base.map(({title , id}) => {
                                            return <p onClick={() => setChooseCat(title)} key={id}>{title}</p>
                                        })
                                    )
                                }
                            </span>
                        </div>

                        <div onClick={() => setSub(prev => !prev)} className={cls.create_wrapper}>
                            <h1>{chooseSubcat}</h1>
                            <span className={sub ? cls.activeSpan : null}>
                                {
                                    innerBase.length === 0 ? (
                                        <div>
                                            <h1>Empty</h1>
                                        </div>
                                    ) : (
                                        innerBase.map(({title , id}) => {
                                            return <p onClick={() => setChooseSubcat(title)} key={id}>{title}</p>
                                        })
                                    )
                                }
                            </span>
                        </div>
                    </div>
                    <div className={cls.create_area}>
                        <textarea value={content} onChange={e => setContent(e.target.value)} placeholder='Content'></textarea>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Create