import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Layout } from "@/components/Layout/Layout";

const boxClass =
  "bg-indigo-500 text-white rounded-md h-16 flex items-center justify-center";

const LayoutPage = () => {
  const usageCode = `import { Layout } from "@/components/Layout/Layout";

<Layout columns={3}>
  <div className="bg-indigo-500 h-16 rounded-md" />
  <div className="bg-indigo-500 h-16 rounded-md" />
  <div className="bg-indigo-500 h-16 rounded-md" />
</Layout>
`;

  const propsData = [
    {
      prop: "columns",
      type: "number",
      default: "3",
      description: "Number of equal-width grid columns",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Layout</h1>
        <p className="text-xl text-gray-600">
          The Layout component arranges children in a responsive grid.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={usageCode}>
          <Layout columns={3} className="w-full">
            {Array.from({ length: 6 }).map((_, i) => (
              <div key={i} className={boxClass}>
                {i + 1}
              </div>
            ))}
          </Layout>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default LayoutPage;
