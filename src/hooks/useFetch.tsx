import axios from "axios";
import { useEffect, useState } from "react";

const useFetch = (options, handlePostFetch, postData) => {
  const [data, setData] = useState<any>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<any>(null);
  const [shouldRefetch, reFetch] = useState(false);

  const source = axios.CancelToken.source();

  const api = axios.create({
    baseURL: "http://localhost:4000",
    withCredentials: true,
  });
  
  useEffect(() => {
    let unmounted = false;
    setIsLoading(true)
    switch(options.method) {
      case 'GET':
        api.get(options.pathname)
        .then(res => {
          if(!unmounted) {
            setIsLoading(false)
            if(handlePostFetch !== null) {
              handlePostFetch(res.data)
            }            
            setData(res.data)
          }
          
        })
        .catch(err => {
          setIsLoading(false);
          setError(err);
        })
        break;

      case 'POST':
        api.post(options.pathname, postData)
        .then(res => {
          if(!unmounted) {
            setIsLoading(false)
            if(handlePostFetch !== null) {
              handlePostFetch(res.data)
            }            
            setData(res.data)
          }
        })
        .catch(err => {
        })
        break;

      default:
        
    }
    

    return () => {
      unmounted = true
      source.cancel()
    }
  }, [])

  
  return [data, isLoading, error, reFetch];
}

export default useFetch