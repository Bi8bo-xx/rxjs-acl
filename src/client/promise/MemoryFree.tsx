import { useEffect, useState } from "react";

function MemoryFree() {
  const [free, setFree] = useState<number>(0);
  useEffect(() => {
    (async () => {
      // 请求 v1 接口，获取未使用内存
      const result = await fetch("/api/v1/memory/free");
      const data = await result.json();
      setFree(data);
    })();
  }, []);
  return <div>未使用内存: {free} GB</div>;
}

export default MemoryFree;
