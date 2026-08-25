import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Button } from "@/components/Button/Button";
import { Tooltip } from "@/components/Tooltip/Tooltip";

const TooltipPage = () => {
  const usageCode = `import { Button } from "@/components/Button/Button";
import { Tooltip } from "@/components/Tooltip/Tooltip";

<Tooltip content="Top tooltip" position="top" variant="dark">
  <Button variant="primary">Hover me</Button>
</Tooltip>

<Tooltip content="Bottom tooltip" position="bottom" variant="light">
  <Button variant="outline">Hover me</Button>
</Tooltip>

<Tooltip content="Right tooltip" position="right" variant="outline">
  <Button variant="ghost">Hover me</Button>
</Tooltip>
`;

  const propsData = [
    {
      prop: "content",
      type: "ReactNode",
      default: "-",
      description: "The content shown inside the tooltip",
    },
    {
      prop: "children",
      type: "ReactElement",
      default: "-",
      description: "The trigger element that shows the tooltip on hover/focus",
    },
    {
      prop: "variant",
      type: '"light" | "dark" | "outline"',
      default: '"dark"',
      description: "The visual style variant of the Tooltip",
    },
    {
      prop: "position",
      type: '"top" | "bottom" | "left" | "right"',
      default: '"top"',
      description: "Where the tooltip appears relative to the trigger",
    },
    {
      prop: "delay",
      type: "number",
      default: "100",
      description: "Delay in ms before the tooltip appears",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Tooltip</h1>
        <p className="text-xl text-gray-600">
          The Tooltip component displays a short hint on hover or focus.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={usageCode}>
          <div className="flex flex-wrap gap-8 items-center">
            <Tooltip content="Top tooltip" position="top" variant="dark">
              <Button variant="primary">Top</Button>
            </Tooltip>

            <Tooltip content="Bottom tooltip" position="bottom" variant="light">
              <Button variant="outline">Bottom</Button>
            </Tooltip>

            <Tooltip content="Left tooltip" position="left" variant="dark">
              <Button variant="secondary">Left</Button>
            </Tooltip>

            <Tooltip content="Right tooltip" position="right" variant="outline">
              <Button variant="ghost">Right</Button>
            </Tooltip>
          </div>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default TooltipPage;
