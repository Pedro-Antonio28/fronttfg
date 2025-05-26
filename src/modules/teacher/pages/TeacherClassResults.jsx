import { useClass } from "@/modules/teacher/services/ClassContext";
import ClassResultsBase from "@/shared/components/ClassResultsBase";

const TeacherClassResults = () => {
  return <ClassResultsBase useClassHook={useClass} />;
};

export default TeacherClassResults;
