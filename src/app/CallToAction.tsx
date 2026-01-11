import Button from "@/components/ui/Button";
import { TextAnimation } from "@/components/ui/TextAnimation";

const CallToAction = () => {
  return (
    <TextAnimation element="section" delay={0.25} className="flex flex-col items-center py-20">
      <h1 className="text-5xl font-semibold">Want to Get in Touch?</h1>
      <h6 className="text-sm font-light mt-4 mb-10">
        I&apos;m always open to discussing new projects, creative ideas, or opportunities to be part of a vision!
      </h6>
      <div className="space-x-4">
        <Button>Get in Touch</Button>
        <Button variant="secondary">View Resume</Button>
      </div>
    </TextAnimation>
  );
};

export default CallToAction;
