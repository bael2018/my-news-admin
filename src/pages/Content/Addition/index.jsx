import cls from './Addition.module.css'
import {MdSubtitles} from 'react-icons/md'
import { useState } from 'react/cjs/react.development'
import { getRequest, postRequest } from '../../../api'
import { useEffect } from 'react'
import {alertWarner, arrayFunc} from '../../../helpers'
import Alert from '../../../components/Alert'
import IsEmpty from '../../../components/IsEmpty'

const Addition = () => {
    const [select , setSelect] = useState('Choose category')
    const [choose , setChoose] = useState(false)
    const [catList , setcatList] = useState([])
    const [subCat , setSubCat] = useState('')
    const [valid , setValid] = useState(false)
    const [show , setShow] = useState(false)
    const [cat , setCat] = useState('')

    const handleCategory = () => {
        if(cat !== ''){
            postRequest({title: cat } ,'categories.json' , '' , '')
            .then(() => {
                setCat('')
                alertWarner(setShow)
            })
        }else{
            alert('Fill the inputs')
        }
    }

    const handleSubcategory = () => {
        if(subCat !== '' && select !== ''){
            if(select !== 'Choose category'){
                postRequest({title: subCat , category: select } , 'subcategories.json' , '' , '')
                .then(() => {
                    setSubCat('')
                    setSelect('Choose category')
                    alertWarner(setShow)
                })
            }else{
                alert("Choose category")
            }
        }else{
            setValid(true)
            setTimeout(() => {
                setValid(false)
            }, 2500);
        }
    }

    useEffect(() => {
        getRequest('categories.json' , '')
        .then(res => res.json())
        .then(r => {
            const data = arrayFunc(r)
            setcatList(data)
        })
    } , [cat])

    return (
        <section className={cls.addition}>
            <IsEmpty valid={valid}/>
            <Alert show={show}/>
            <div className={cls.addition_wrapper}>
                <div>
                    <label>
                        <h3><MdSubtitles/>Category</h3>
                        <input
                            style={{
                                background: cat ? '#01cbe6' : null , 
                                border: cat ? '1px solid #01cbe6' : null
                            }}  
                            value={cat}
                            onChange={e => setCat(e.target.value)} 
                            placeholder='New category' type="text" 
                        />
                    </label>
                    <button onClick={handleCategory}>create</button>
                </div>

                <div className={cls.choose}>
                    <div onClick={() => setChoose(prev => !prev)}>
                        <h3>{select}</h3>
                        <span className={choose ? cls.choose_inside : null}>
                            {
                                catList.length === 0 ? (
                                    <div>Empty</div>
                                ) : (
                                    catList.map(({title , id}) => {
                                        return <p onClick={() => setSelect(title)} key={id}>{title}</p>
                                    })
                                )
                            }
                        </span>
                    </div>
                </div>

                <div>
                    <label>
                        <h3><MdSubtitles/>Subcategory</h3>
                        <input
                            style={{
                                background: subCat ? '#01cbe6' : null , 
                                border: subCat ? '1px solid #01cbe6' : null
                            }}  
                            value={subCat}
                            onChange={e => setSubCat(e.target.value)} 
                            placeholder='New subcategory' type="text" 
                        />
                    </label>
                    <button onClick={handleSubcategory}>create</button>
                </div>
            </div>
        </section>
    )
}

export default Addition