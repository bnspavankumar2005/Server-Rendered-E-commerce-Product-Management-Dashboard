"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
} from "recharts";

export default function StockChart({ data }: { data: any[] }) {
  return (
    <div className="bg-white p-6 rounded-lg border shadow-sm h-[400px] text-gray-900">
      <h3 className="text-lg font-bold mb-4 text-gray-900">Stock Levels by Product</h3>
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
          <XAxis 
            dataKey="name" 
            tick={{ fontSize: 12, fill: "#374151" }} 
            interval={0} 
            angle={-45} 
            textAnchor="end" 
            height={70}
          />
          <YAxis tick={{ fill: "#374151" }} /> 
          <Tooltip 
            cursor={{ fill: 'transparent' }}
            contentStyle={{ backgroundColor: "#fff", color: "#000", borderRadius: "8px", border: "1px solid #e5e7eb" }}
            itemStyle={{ color: "#2563eb" }} // Tooltip text becomes blue
          />
          {/* FIX: Changed fill from #000000 (Black) to #3b82f6 (Bright Blue) */}
          <Bar dataKey="stock" fill="#3b82f6" radius={[4, 4, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}