import { useParams } from 'react-router'
import { useState } from 'react/cjs/react.development'
import cls from './News.module.css'
import {deleteRequest, getRequest} from '../../../api/index'
import {arrayFunc} from '../../../helpers'
import Loader from '../../../components/UI/Loader'
import { useMemo } from 'react'
import {RiSearch2Line} from 'react-icons/ri'
import Edit from '../../../components/Edit'

const News = () => {
    const [loading , setLoading] = useState(false)
    const [deletes , setDeletes] = useState(false)
    const [search , setSearch] = useState('')
    const [base , setBase] = useState([])
    const [edit , setEdit] = useState(false)
    const [newId , setNewId] = useState('')
    const { id } = useParams()

    const deleteNew = e => {
        deleteRequest('news/' , `${e}.json` , '')
        setDeletes(!deletes)
    }

    const editNew = e => {
        setEdit(!edit)
        setNewId(e)
    }

    useMemo(() => {
        getRequest('news.json' , '')
        .then(res => res.json() , setLoading(true))
        .then(r => {
            setLoading(false)
            const data = arrayFunc(r)
            const result = data.filter(({category}) => category === id)
            if(search === ''){
                setBase(result)
            }else{
                const filteredData = result.filter(({title}) => title.toLowerCase().includes(search.toLowerCase()))
                setBase(filteredData) 
            }
        })
    } , [id , search , deletes])


    return (
        edit ? <Edit edit={setEdit} id={newId}/> : (
            <section className={cls.news}>
            <div className={cls.news_header}>
                <RiSearch2Line/>
                <input value={search} onChange={e => setSearch(e.target.value)} type="search" placeholder='Search' />
            </div>
            <div className={cls.news_body}>
                <div className={cls.news_body_header}>
                    <h2 className={cls.news_body_inside}>iD</h2>
                    <h2 className={cls.news_body_inside_title}>New</h2>
                    <h2 className={cls.news_body_inside_block}>Category</h2>
                    <h2 className={cls.news_body_inside_block}>Subcategory</h2>
                    <span className={cls.news_body_inside_block}></span>
                </div>
                {
                    loading ? (
                        <Loader/>
                    ) : (
                       <>
                            {
                                 base?.length === 0 ? (
                                    <div className={cls.news_warner}>
                                        Something went wrong
                                    </div>
                                ) : (
                                    base?.map(({picture , id , title , category , subcategory} , index) => {
                                        return  <div key={id} className={cls.news_inner}>
                                        <div className={cls.news_inner_id}>
                                            <p>{index + 1}</p>
                                        </div>
                                        <div className={cls.news_inner_image}>
                                             <img alt='pics' src={picture}/>
                                             <h3>{title}</h3><h4>...</h4>
                                        </div>
                                        <div className={cls.news_inner_category}>
                                             <p>{category}</p>
                                        </div>
                                        <div className={cls.news_inner_category}>
                                             <p>{subcategory}</p>
                                        </div>
                                        <div className={cls.news_inner_options}>
                                             <button onClick={() => deleteNew(id)}>Delete</button>
                                             <button onClick={() => editNew(id)}>Edit</button>
                                        </div>
                                     </div>
                                    })
                                )
                            }
                       </>
                    )
                }
            </div>
        </section>
        )
    )
}

export default News