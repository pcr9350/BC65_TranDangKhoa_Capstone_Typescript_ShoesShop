import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/store'
import { ProductModelType, getAllProductActionApi } from '../../redux/reducers/productReducer'
import ProductCard from '../../components/ProductCard'
import useDataHome from './useDataHome'

type Props = {}

const Home = (props: Props) => {

    const { data } = useDataHome();

  return (
    <div className='container'>
        <h3>Product list</h3>
        <div className='row'>
        {data.map((item:ProductModelType,index:number)=>{
            return <div className='col-3 mt-2' key={index}>
                    <ProductCard product={item} />
            </div> 
        })}
        </div>
    </div>
  )
}

export default Home