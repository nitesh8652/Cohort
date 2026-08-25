import ComponentDemo from "../ComponentsDemo";
import PropsTable from "@/components/Personal/PropsTable";
import { Carousel } from "@/components/Carousel/Carousel";

const slideClass =
  "h-56 flex items-center justify-center text-white text-2xl font-semibold";

const CarouselPage = () => {
  const usageCode = `import { Carousel } from "@/components/Carousel/Carousel";

<Carousel interval={3000}>
  <div className="bg-indigo-500 h-56 flex items-center justify-center text-white">
    Slide 1
  </div>
  <div className="bg-emerald-500 h-56 flex items-center justify-center text-white">
    Slide 2
  </div>
  <div className="bg-rose-500 h-56 flex items-center justify-center text-white">
    Slide 3
  </div>
</Carousel>
`;

  const propsData = [
    {
      prop: "interval",
      type: "number",
      default: "0",
      description: "Autoplay interval in ms; 0 disables autoplay",
    },
  ];

  return (
    <div className="max-w-4xl mx-auto p-4 space-y-12">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold tracking-tight">Carousel</h1>
        <p className="text-xl text-gray-600">
          The Carousel component cycles through a set of slides.
        </p>
      </div>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">Usage</h2>
        <ComponentDemo code={usageCode}>
          <Carousel interval={3000}>
            <div className={`bg-indigo-500 ${slideClass}`}>Slide 1</div>
            <div className={`bg-emerald-500 ${slideClass}`}>Slide 2</div>
            <div className={`bg-rose-500 ${slideClass}`}>Slide 3</div>
          </Carousel>
        </ComponentDemo>
      </section>

      <section className="space-y-4">
        <h2 className="text-2xl font-semibold">API Reference</h2>
        <PropsTable data={propsData} />
      </section>
    </div>
  );
};

export default CarouselPage;
