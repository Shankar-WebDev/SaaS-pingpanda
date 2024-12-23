import MaxWidthWrapper from "./components/max-width-wrapper";
import { Heading } from "./components/headings";

const Page = () => {
  return (
    <>
      {/* First Section */}
      <section className="relative py-24 sm:py-32 bg-brand-25">
        <MaxWidthWrapper className="text-center">
          <div className="relative mx-auto text-center flex flex-col items-center gap-10">
            <div>
              <Heading>Real-Time SaaS Insights</Heading>
            </div>
          </div>
        </MaxWidthWrapper>
      </section>
      <section></section>
      <section></section>
      <section></section>
    </>
  );
};

export default Page;
