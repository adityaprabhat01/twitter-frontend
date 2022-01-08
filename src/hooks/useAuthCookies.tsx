import Cookies from 'js-cookie'
import { useSelector, RootStateOrAny, useDispatch } from 'react-redux';
import { setAuthFromCookies } from '../store/auth/authAction';

const useAuthCookies = () => {
  const dispatch = useDispatch()
  const x = useSelector((state: RootStateOrAny) => state)
  if(x.auth.user_id === '' || x.auth.user_name === '' || x.auth.name === '') {
    const user_name = Cookies.get('user_name')
    const user_id = Cookies.get('user_id')
    const name = Cookies.get('name')
    const data = {
      user_name,
      user_id,
      name
    }
    console.log(data)
    dispatch(setAuthFromCookies(data))
  }
}

export default useAuthCookies;