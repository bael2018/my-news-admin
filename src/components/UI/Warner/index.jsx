import cls from './Warner.module.css'

const Warner = ({title , active}) => {
    
    return (
        <div style={{display: active ? 'block' : 'none'}} className={cls.warner}>{title}</div>
    )
}

export default Warner