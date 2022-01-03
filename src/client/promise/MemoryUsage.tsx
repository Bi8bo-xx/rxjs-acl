import { useEffect, useState } from "react";

function MemoryUsage() {
  const [usage, setUsage] = useState<number>(0);
  useEffect(() => {
    (async () => {
      // 请求 v1 接口，获取已使用内存
      const result = await fetch("/api/v1/memory/usage");
      const data = await result.json();
      setUsage(data);
    })();
  }, []);
  return <div>已使用内存: {usage} GB</div>;
}

export default MemoryUsage;
