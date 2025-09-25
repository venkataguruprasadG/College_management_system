export interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'staff' | 'student';
  avatar?: string;
  college?: string;
  department?: string;
  createdAt: string;
}

export interface College {
  id: string;
  name: string;
  address: string;
  phone: string;
  email: string;
  departments: Department[];
  subscription: {
    plan: 'basic' | 'premium' | 'enterprise';
    status: 'active' | 'inactive' | 'trial';
    expiresAt: string;
  };
  createdAt: string;
}

export interface Department {
  id: string;
  name: string;
  head: string;
  collegeId: string;
  courses: Course[];
  createdAt: string;
}

export interface Course {
  id: string;
  name: string;
  code: string;
  description: string;
  instructor: string;
  departmentId: string;
  semester: number;
  credits: number;
  enrolledStudents: number;
  maxStudents: number;
  schedule: {
    day: string;
    time: string;
    room: string;
  }[];
  createdAt: string;
}

export interface Assignment {
  id: string;
  title: string;
  description: string;
  courseId: string;
  courseName: string;
  instructor: string;
  dueDate: string;
  maxMarks: number;
  type: 'assignment' | 'quiz' | 'project' | 'exam';
  status: 'active' | 'completed' | 'overdue';
  submissions: Submission[];
  createdAt: string;
}

export interface Submission {
  id: string;
  assignmentId: string;
  studentId: string;
  studentName: string;
  submittedAt: string;
  marks?: number;
  feedback?: string;
  status: 'submitted' | 'graded' | 'late' | 'missing';
  fileUrl?: string;
}

export interface Attendance {
  id: string;
  courseId: string;
  courseName: string;
  date: string;
  students: {
    studentId: string;
    studentName: string;
    status: 'present' | 'absent' | 'late';
  }[];
}

export interface Notification {
  id: string;
  title: string;
  message: string;
  type: 'info' | 'success' | 'warning' | 'error';
  recipient: 'all' | 'students' | 'staff' | string[];
  isRead: boolean;
  createdAt: string;
}

export interface Analytics {
  totalStudents: number;
  totalCourses: number;
  totalAssignments: number;
  attendanceRate: number;
  gradeDistribution: {
    grade: string;
    count: number;
  }[];
  departmentEnrollment: {
    department: string;
    students: number;
  }[];
  monthlyEnrollments: {
    month: string;
    enrollments: number;
  }[];
}