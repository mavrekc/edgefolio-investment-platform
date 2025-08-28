import { useEffect, useRef } from "react";
import * as echarts from "echarts";

const DonutChart = ({ options, style = {}, theme = "dark" }) => {
  const chartRef = useRef(null);
  const chartInstanceRef = useRef(null);

  useEffect(() => {
    if (chartRef.current) {
      chartInstanceRef.current = echarts.init(chartRef.current, theme);
    }

    const handleResize = () => {
      if (chartInstanceRef.current) {
        chartInstanceRef.current.resize();
      }
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);

      if (chartInstanceRef.current) {
        chartInstanceRef.current.dispose();
      }
    };
  }, [theme]);

  useEffect(() => {
    if (chartInstanceRef.current && options) {
      chartInstanceRef.current.setOption(options);
    }
  }, [options]);

  return (
    <div
      ref={chartRef}
      style={{
        // width: '100%',
        // height: '300px',
        // minHeight: '350px',
        ...style,
      }}
    />
  );
};

export default DonutChart;
