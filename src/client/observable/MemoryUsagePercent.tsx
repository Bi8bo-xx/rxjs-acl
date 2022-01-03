import { useEffect, useState } from "react";
import { lastValueFrom } from "rxjs";
import { getMemoryUsagePercent } from "./service";

function MemoryUsagePercent() {
  const [percent, setPercent] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const result = await lastValueFrom(getMemoryUsagePercent());
      setPercent(result);
    })();
  }, []);
  return <div>内存占用率: {percent} %</div>;
}

export default MemoryUsagePercent;
