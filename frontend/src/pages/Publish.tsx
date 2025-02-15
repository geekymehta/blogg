import { Appbar } from "../components/Appbar";
import PublishContent from "../components/Publish/Publish";

export const Publish = () => {
  return (
    <div className="bg-[#222222] h-[100vh]">
      <Appbar />
      <PublishContent />
    </div>
  );
};
