import { Appbar } from "../components/Appbar";
import PublishContent from "../components/Publish/Publish";

export const Publish = () => {
  return (
    <div className="bg-background h-[100vh]">
      <Appbar />
      <PublishContent />
    </div>
  );
};
