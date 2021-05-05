export const FontURI = {
  AUTH: 'auth',
  LOGIN: 'login',
  STUDENT_MANAGEMENT: 'student-management',
  COURSE_MANAGEMENT: 'course-management',
  TEACHER_MANAGEMENT: 'teacher-management',
  DOCUMENT_MANAGEMENT: 'document-management',
  HOME: 'home',
  DASHBOARD: 'dashboard'
};
export const ApiURI = {
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',


  GET_LIST_COURSE: 'admin/course/getListCourse',
  CREATE_COURSE: 'admin/course/createCourse',
  UPDATE_STATUS_COURSE: 'admin/course/updateStatus',

  GET_LIST_TEACHER: 'admin/teacher/getListTeacher',
  CREATE_TEACHER: 'admin/teacher/createTeacher',
  GET_DETAIL_TEACHER: 'admin/teacher/getDetailTeacher',
  DELETE_TEACHER: 'admin/teacher/deleteTeacher',
  GET_TEACHER_BY_MAJOR: 'admin/teacher/getTeacherByMajor',

  GET_LIST_STUDENT: 'admin/student/getListStudent',
  CREATE_STUDENT: 'admin/student/createStudent',

  GET_LIST_CALENDAR_OF_TEACHER: 'calendar/getListCalendarOfTeacher'
};
export const LocalStorage = {
  LOGIN_INFO: 'login_info',
  USER_INFO: 'user_info'
};
