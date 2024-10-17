import * as React from "react";
import { PieChart } from "@mui/x-charts/PieChart";

const BasicPie = React.memo(({ colors, sales }) => {
  return (
    <PieChart
      colors={colors}
      series={[
        {
          data: [...sales],
        },
      ]}
      width={400}
      height={200}
    />
  );
});

export default BasicPie;
