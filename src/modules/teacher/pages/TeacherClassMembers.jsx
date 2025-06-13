import ClassMembersBase from '../../../shared/components/ClassMembersBase.jsx';
import { useClass } from '../services/ClassContext.jsx';

const TeacherClassMembers = () => {
  return <ClassMembersBase useClassHook={useClass} userRole="teacher" />;
};

export default TeacherClassMembers;
