import StaticPageLayout from "@/components/StaticPageLayout";

const rows = [
  { size: "S", chest: "36\"", waist: "30\"" },
  { size: "M", chest: "38\"", waist: "32\"" },
  { size: "L", chest: "40\"", waist: "34\"" },
  { size: "XL", chest: "42\"", waist: "36\"" },
];

const SizeGuide = () => (
  <StaticPageLayout title="Size Guide">
    <p>Use this general size chart as a guide for fashion items. Exact fit may vary by brand.</p>
    <table className="w-full text-left border border-border rounded-lg overflow-hidden">
      <thead className="bg-secondary">
        <tr>
          <th className="p-3">Size</th>
          <th className="p-3">Chest</th>
          <th className="p-3">Waist</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((row) => (
          <tr key={row.size} className="border-t border-border">
            <td className="p-3 font-medium text-foreground">{row.size}</td>
            <td className="p-3">{row.chest}</td>
            <td className="p-3">{row.waist}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </StaticPageLayout>
);

export default SizeGuide;
