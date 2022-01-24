import { RiErrorWarningLine } from 'react-icons/ri'
import cls from './IsEmpty.module.css'

const IsEmpty = ({valid}) => {

    return (
    <div 
        className={cls.isEmpty}
        style={{
            top: valid ? '5%' : '-10%'
        }}
    >
        <RiErrorWarningLine/> Fill all the inputs !
    </div>
    )
}

export default IsEmpty