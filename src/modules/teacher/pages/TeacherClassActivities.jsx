import ClassActivitiesBase from "@/shared/components/ClassActivitiesBase";
import { useClass } from "@/modules/teacher/services/ClassContext";

const TeacherClassActivities = () => {
  return (
    <ClassActivitiesBase
      useClassHook={useClass}
      showAddButton={true} // Activa el botón "+"
    />
  );
};

export default TeacherClassActivities;
