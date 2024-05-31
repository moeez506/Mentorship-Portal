import React, { useState } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Sector } from "recharts";

const data = [
  { id: "0", value: 38.6, name: "Stage_3" },
  { id: "1", value: 22.5, name: "Stage_2" },
  { id: "2", value: 30.8, name: "Stage_1" },
  { id: "3", value: 8.1, name: "Not Stated yet" },
];

const colorConfig = {
  0: "#333333",
  1: "#82ca9d",
  2: "#8dd1e1",
  3: "#cfcfcf",
};

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const {
    cx,
    cy,
    midAngle,
    innerRadius,
    outerRadius,
    startAngle,
    endAngle,
    fill,
    payload,
  } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;

  return (
    <g>
      <text x={cx} y={cy} dy={8} textAnchor="middle" fill={fill}>
        {payload.value}
      </text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius + 6}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <path
        d={`M${sx},${sy}L${sx + (cos >= 0 ? 1 : -1) * 22},${sy}`}
        stroke={fill}
        fill="none"
      />
    </g>
  );
};

const StudentStatisticsCard = () => {
  const [activeIndex, setActiveIndex] = useState(null);

  const onPieEnter = (_, index) => {
    setActiveIndex(index);
  };

  const onPieLeave = () => {
    setActiveIndex(null);
  };

  return (
    <div className="w-full flex flex-row bg-white p-5 pl-[20vw]">
      <div className="container w-[80%] mx-auto">
        <div className="h-[280px] bg-[#29affd13] shadow-md p-[24px] rounded-[16px]">
          <div className="flex flex-col items-start">
            <h1 className="font-medium text-[18px] mb-4">
              Student Learning Statistics
            </h1>
            <div className="flex flex-row items-center">
              <div className="mr-8">
                <ResponsiveContainer width={200} height={200}>
                  <PieChart>
                    <Pie
                      data={data}
                      nameKey="name"
                      dataKey="value"
                      innerRadius="25%"
                      outerRadius="50%"
                      onMouseEnter={onPieEnter}
                      onMouseLeave={onPieLeave}
                      activeIndex={activeIndex}
                      activeShape={renderActiveShape}
                    >
                      {data.map(({ id }) => (
                        <Cell key={id} fill={colorConfig[id]} />
                      ))}
                    </Pie>
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div>
                <ul>
                  {data.map(({ id, name, value }) => (
                    <li
                      key={id}
                      className="flex justify-between items-center mb-2"
                    >
                      <div className="flex items-center">
                        <div
                          style={{
                            backgroundColor: colorConfig[id],
                            width: "10px",
                            height: "10px",
                            borderRadius: "50%",
                            display: "inline-block",
                            marginRight: "8px",
                          }}
                        />
                        <span>{name}</span>
                      </div>
                      <span className="ml-[35vw]">{value}%</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentStatisticsCard;
