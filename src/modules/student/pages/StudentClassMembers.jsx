import ClassMembersBase from '../../../shared/components/ClassMembersBase.jsx';
import { useClass } from '../services/ClassContext.jsx';

const StudentClassMembers = () => {
  return <ClassMembersBase useClassHook={useClass} userRole="student" />;

};

export default StudentClassMembers;