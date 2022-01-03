import { useEffect, useState } from "react";
import { getMemoryFree } from "./service";
import { lastValueFrom } from "rxjs";

function MemoryFree() {
  const [free, setFree] = useState<number>(0);
  useEffect(() => {
    (async () => {
      const result = await lastValueFrom(getMemoryFree());
      setFree(result);
    })();
  }, []);
  return <div>未使用内存: {free} GB</div>;
}

export default MemoryFree;
