import MemoryFree from "./MemoryFree";
import MemoryUsage from "./MemoryUsage";
import MemoryUsagePercent from "./MemoryUsagePercent";

/**
 * 请求 v3 接口，并兼容 v2 接口
 */
function MemoryObservable() {
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

export default MemoryObservable;
