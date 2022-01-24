import cls from './Alert.module.css'
import { AiOutlineCheck } from 'react-icons/ai'

const Alert = ({show}) => {
    return (
        <section style={{top: show ? '20px' : '-150px'}} className={cls.alert}>
            Successfully sent <AiOutlineCheck/>
        </section>
    )
}

export default Alert