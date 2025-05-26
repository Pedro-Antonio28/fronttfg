import { useClass } from "@/modules/student/services/ClassContext";
import ClassActivitiesBase from "@/shared/components/ClassActivitiesBase";

const StudentClassActivities = () => {
    return <ClassActivitiesBase useClassHook={useClass} />;
};

export default StudentClassActivities;
