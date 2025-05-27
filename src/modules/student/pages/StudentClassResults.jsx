import { useClass } from "@/modules/student/services/ClassContext";
import ClassResultsBase from "@/shared/components/ClassResultsBase";

const StudentClassResults = () => {
  return <ClassResultsBase useClassHook={useClass} />;
};

export default StudentClassResults;
