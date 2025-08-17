"use client";
import { useEffect, useState } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { Product, Sale } from "../../generated/prisma";

export type ProductWithSales = Product & { sales: Sale[] };
export default function ProductSaleChart({
  product,
}: {
  product: ProductWithSales;
}) {
  const [sales, setSales] = useState(product.sales);
  useEffect(() => {
    setSales(product.sales);
  }, [product]);
  const array = sales?.map((sale) => {
    const date = new Date(parseInt(sale.createdAt.toString()));
    const format =
      date.getDate() + "-" + date.getMonth() + "-" + date.getFullYear();
    return {
      name: format,
      quantity: sale.quantity,
    };
  });
  return (
    <ResponsiveContainer width="100%" height="100%">
      <LineChart
        width={500}
        height={300}
        data={array}
        margin={{
          top: 5,
          right: 30,
          left: 20,
          bottom: 5,
        }}
      >
        <CartesianGrid strokeDasharray="3 3" />
        <XAxis dataKey="name" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line
          type="monotone"
          dataKey="quantity"
          stroke="#8884d8"
          activeDot={{ r: 8 }}
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
