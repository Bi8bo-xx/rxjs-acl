import { useEffect, useState } from "react";

function MemoryUsagePercent() {
  const [percent, setPercent] = useState<number>(0);
  useEffect(() => {
    (async () => {
      // 请求 v1 接口，获取未使用内存和已使用内存，并计算得出内存占用率
      const free = await fetch("/api/v1/memory/free");
      const freeData = await free.json();
      const usage = await fetch("/api/v1/memory/usage");
      const usageData = await usage.json();
      setPercent(+((usageData / (usageData + freeData)) * 100).toFixed(2));
    })();
  }, []);
  return <div>内存占用率: {percent} %</div>;
}

export default MemoryUsagePercent;
