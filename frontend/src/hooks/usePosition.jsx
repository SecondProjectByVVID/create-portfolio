import { useEffect, useState } from 'react';
import axios from 'axios';
const usePosition = () => {
  const [position, setPosition] = useState(null);
  const getPosition = async () => {
    try {
      const { data } = await axios.get('http://ip-api.com/json');
      setPosition(data.city);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getPosition();
  }, []);
  return { position };
};

export default usePosition;
