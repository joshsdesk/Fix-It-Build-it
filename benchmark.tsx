import React from "react";
import { renderToString } from "react-dom/server";
import AdminDashboard from "./app/admin/page";

const start = performance.now();
for (let i = 0; i < 50000; i++) {
  renderToString(<AdminDashboard />);
}
const end = performance.now();
console.log(`Rendered 50000 times in ${end - start}ms`);
