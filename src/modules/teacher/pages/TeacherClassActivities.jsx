import { useClass } from "@/modules/teacher/services/ClassContext";
import ClassActivitiesBase from "@/shared/components/ClassActivitiesBase";

const TeacherClassActivities = () => {
    return <ClassActivitiesBase useClassHook={useClass} />;
};

export default TeacherClassActivities;
