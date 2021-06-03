export const FontURI = {
  AUTH: 'auth',
  LOGIN: 'login',
  STUDENT_MANAGEMENT: 'student-management',
  COURSE_MANAGEMENT: 'course-management',
  TEACHER_MANAGEMENT: 'teacher-management',
  DOCUMENT_MANAGEMENT: 'document-management',
  TEST_LESSON_MANAGEMENT: 'test-lesson-management',
  CALENDAR_LIST: 'calendar',
  HOME: 'home',
  DASHBOARD: 'dashboard',
  COURSE_TEACHER: 'course-teacher'
};
export const ApiURI = {
  LOGIN: 'auth/login',
  LOGOUT: 'auth/logout',
  GET_COURSE_BY_ID: 'student/course/getFindById',

  GET_CALENDAR_BY_COURSE: 'calendar/getListCalendarOfCourse',

  GET_LIST_COURSE: 'admin/course/getListCourse',
  CREATE_COURSE: 'admin/course/createCourse',
  UPDATE_STATUS_COURSE: 'admin/course/updateStatus',
  DELETE_COURSE: 'admin/course/deleteCourse',
  CANCEL_COURSE_STUDENT: 'admin/student/cancelStudent',
  DELETE_STUDENT: 'admin/student/deleteStudent',
  UPDATE_STUDENT: 'admin/student/updateStudent',
  UPDATE_TEACHER: 'admin/teacher/updateStudent',
  GET_COURSE_BY_STUDENT: 'admin/course/getCourseByStudent',

  CREATE_TEST_LESSON: 'admin/test/createTestLesson',
  GET_LIST_TEST_LESSON: 'admin/test/getListTestByCourse',
  GET_DETAIL_TEST_LESSON: 'admin/test/getDetailTestLesson',
  DELETE_TEST_LESSON: 'admin/test/deleteTestLesson',
  GET_LIST_STUDENT: 'admin/student/getListStudent',
  CREATE_STUDENT: 'admin/student/createStudent',
  GET_LIST_STUDENT_BY_COURSE: 'admin/student/getListStudentByCourse',
  CANCEL_COURSE: 'admin/student/cancelCourse',
  CREATE_LIST_CALENDER: 'zoom/create',


  GET_LIST_TEST_OF_TEACHER: 'teacher/test/getListTest',
  CHANGE_STATUS_TEST: 'teacher/test/changeStatus',
  GET_COURSE_OF_TEACHER: 'teacher/course/getListCourse',
  GET_LIST_TEACHER: 'admin/teacher/getListTeacher',
  CREATE_TEACHER: 'admin/teacher/createTeacher',
  GET_DETAIL_TEACHER: 'admin/teacher/getDetailTeacher',
  DELETE_TEACHER: 'admin/teacher/deleteTeacher',
  GET_TEACHER_BY_MAJOR: 'admin/teacher/getTeacherByMajor',
  CREATE_DOCUMENT: 'teacher/document/createDocument',
  GET_LIST_DOCUMENT: 'teacher/document/getListDocument',
  DELETE_DOCUMENT: 'teacher/document/deleteDocument',

  GET_LIST_CALENDAR_OF_TEACHER: 'calendar/getListCalendarOfTeacher'
};
export const LocalStorage = {
  LOGIN_INFO: 'login_info',
  USER_INFO: 'user_info'
};
