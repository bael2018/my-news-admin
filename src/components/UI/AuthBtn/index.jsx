import cls from './AuthBtn.module.css'

const AuthBtn = ({title , click}) => {
    
    return (
        <button onClick={click} type='submit' className={cls.authBtn}>{title}</button>
    )
}

export default AuthBtn