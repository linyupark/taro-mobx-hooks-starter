import Taro, { useEffect, useRef } from '@tarojs/taro'

function usePrevious(value) {
  const ref = useRef();
  useEffect(() => {
    ref.current = value;
  });
  return ref.current || value;
}

export default usePrevious