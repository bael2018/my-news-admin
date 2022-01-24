import cls from './App.module.css'
import Routes from './components/Routes'

const App = () => {
    const user = JSON.parse(localStorage.getItem('user'))

    return (
        <section className={cls.root}>
            <Routes user={user}/>
        </section>
    )
}

export default App