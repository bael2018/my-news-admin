import cls from './Auth.module.css'
import Signin from '../../components/Signin'
import Logo from '../../components/UI/Logo'

const Auth = () => {
    return (
        <section className={cls.auth}>
            <div className={cls.auth_container}>
                <div className={cls.auth_header}>
                    <Logo/>
                </div>
                <Signin/>
            </div>
        </section>
    )
}

export default Auth