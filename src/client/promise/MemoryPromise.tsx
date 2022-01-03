import MemoryFree from "./MemoryFree";
import MemoryUsage from "./MemoryUsage";
import MemoryUsagePercent from "./MemoryUsagePercent";

/**
 * 请求 v1 接口
 */
function MemoryPromise() {
  return (
    <div>
      <MemoryFree />
      <br />
      <MemoryUsage />
      <br />
      <MemoryUsagePercent />
    </div>
  );
}

export default MemoryPromise;
