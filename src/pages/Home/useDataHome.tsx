import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { DispatchType, RootState } from '../../redux/store';
import { getAllProductActionApi } from '../../redux/reducers/productReducer';

const useDataHome = () => {
    const {arrProduct}  = useSelector((state:RootState) => state.productReducer)
    const dispatch:DispatchType = useDispatch();
    
    const getAllProduct = async () => {
        //dispatch action thunk
        const actionAsync = getAllProductActionApi();
        dispatch(actionAsync);
    }
    useEffect(() => {
        getAllProduct()
    },[])
  return {
    data:arrProduct
  }
}

export default useDataHome