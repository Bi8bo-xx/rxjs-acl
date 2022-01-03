import { useEffect, useState } from "react";
import { lastValueFrom } from "rxjs";
import { getMemoryUsage } from "./service";

function MemoryUsage() {
  const [usage, setUsage] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const result = await lastValueFrom(getMemoryUsage());
      setUsage(result);
    })();
  }, []);
  return <div>已使用内存: {usage} GB</div>;
}

export default MemoryUsage;
