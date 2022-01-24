import { useState } from 'react/cjs/react.development'
import { changeRequest } from '../../api'
import Alert from '../Alert'
import cls from './Edit.module.css'
import { RiErrorWarningLine } from 'react-icons/ri'
import IsEmpty from '../IsEmpty'

const Edit = ({id , edit}) => {
    const [title , setTitle] = useState('')
    const [subtitle , setSubtitle] = useState('')
    const [picture , setPicture] = useState('')
    const [video , setVideo] = useState('nothing')
    const [content , setContent] = useState('')
    const [alert , setAlert] = useState(false)
    const [valid , setValid] = useState(false)

    const handleEdit = e => {
        e.preventDefault()

        const data = new Date()
        const year = data.getFullYear()
        const month = data.getMonth()
        const hours = data.getHours()
        const minutes = data.getMinutes()
        const days = data.getDate()

        if(title !== '' && subtitle !== '' && picture !== '' && video !== '' && content !== ''){
            changeRequest({
                title,
                subtitle,
                picture,
                video,
                content,
                year,
                month,
                hours,
                minutes,
                days
            },
                'news/' , `${id}.json` , ''
            ).then(() => {
                setTitle('')
                setSubtitle('')
                setPicture('')
                setVideo('')
                setContent('')
                setAlert(true)
                setTimeout(() => {
                    setAlert(false)
                }, 2500);
            })
        }else{
            setValid(true)
            setTimeout(() => {
                setValid(false)
            }, 2500);
        }
    }

    return (
        <section className={cls.edit}>
            <IsEmpty valid={valid}/>
            <Alert show={alert}/>
            <div className={cls.edit_header}>
                <button onClick={() => edit(!edit)}>Back to News</button>
            </div>
            <div className={cls.edit_body}>
                <form action="address">
                    <div className={cls.edit_body_wrapper}>
                        <div>
                            <input 
                                value={title}
                                onChange={e => setTitle(e.target.value)}
                                placeholder='title' 
                                type="text" 
                            />
                        </div>
                        <div>
                            <input 
                                value={subtitle}
                                onChange={e => setSubtitle(e.target.value)}
                                placeholder='subtitle' 
                                type="text" 
                            />
                        </div>
                        <div>
                            <input 
                                value={picture}
                                onChange={e => setPicture(e.target.value)}
                                placeholder='picture' 
                                type="text" 
                            />
                        </div>
                        <div>
                            <input 
                                value={video}
                                onChange={e => setVideo(e.target.value)}
                                placeholder='video' 
                                type="text" 
                            />
                        </div>
                    </div>
                    <div className={cls.edit_body_footer}>
                        <textarea 
                            value={content}
                            onChange={e => setContent(e.target.value)}
                            placeholder='content'
                        />
                        <button onClick={handleEdit} type='submit'>Edit</button>
                    </div>
                </form>
            </div>
        </section>
    )
}

export default Edit