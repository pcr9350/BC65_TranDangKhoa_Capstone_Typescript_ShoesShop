import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { DispatchType, RootState } from '../../redux/store'
import { getProfileActionAsync } from '../../redux/reducers/userReducer'

type Props = {}

const Profile = (props: Props) => {

  const {userProfile} = useSelector((state:RootState) => state.userReducer);
  const dispatch:DispatchType = useDispatch();

  const getProfileApi = () => {
    const actionAsync = getProfileActionAsync();
    dispatch(actionAsync);
  };

  useEffect(()=>{
    getProfileApi();
  }, [])
  return (
    <div className='container'>
      <img src={userProfile?.avatar} className='rounded rounded-circle' width={100} height={100} alt="avatar" />
      <h3>Hello ! {userProfile?.name}</h3>
    </div>
  )
}

export default Profile