import { College, Course, Assignment, Attendance, Notification, Analytics, Department } from '../types';

export const sampleColleges: College[] = [
  {
    id: '1',
    name: 'Tech University',
    address: '123 University Ave, Tech City, TC 12345',
    phone: '+1 (555) 123-4567',
    email: 'info@techuniversity.edu',
    departments: [],
    subscription: {
      plan: 'premium',
      status: 'active',
      expiresAt: '2024-12-31T23:59:59Z'
    },
    createdAt: '2024-01-01T10:00:00Z'
  },
  {
    id: '2',
    name: 'Business College',
    address: '456 Commerce St, Business City, BC 67890',
    phone: '+1 (555) 987-6543',
    email: 'contact@businesscollege.edu',
    departments: [],
    subscription: {
      plan: 'basic',
      status: 'active',
      expiresAt: '2024-06-30T23:59:59Z'
    },
    createdAt: '2024-01-15T10:00:00Z'
  }
];

export const sampleDepartments: Department[] = [
  {
    id: '1',
    name: 'Computer Science',
    head: 'Dr. Sarah Johnson',
    collegeId: '1',
    courses: [],
    createdAt: '2024-01-05T10:00:00Z'
  },
  {
    id: '2',
    name: 'Mathematics',
    head: 'Prof. Michael Brown',
    collegeId: '1',
    courses: [],
    createdAt: '2024-01-05T10:00:00Z'
  },
  {
    id: '3',
    name: 'Business Administration',
    head: 'Dr. Lisa Anderson',
    collegeId: '2',
    courses: [],
    createdAt: '2024-01-20T10:00:00Z'
  }
];

export const sampleCourses: Course[] = [
  {
    id: '1',
    name: 'Introduction to Programming',
    code: 'CS101',
    description: 'Learn the fundamentals of programming using Python',
    instructor: 'Dr. Sarah Johnson',
    departmentId: '1',
    semester: 1,
    credits: 3,
    enrolledStudents: 45,
    maxStudents: 50,
    schedule: [
      { day: 'Monday', time: '09:00 AM - 10:30 AM', room: 'Room 101' },
      { day: 'Wednesday', time: '09:00 AM - 10:30 AM', room: 'Room 101' }
    ],
    createdAt: '2024-02-01T10:00:00Z'
  },
  {
    id: '2',
    name: 'Data Structures and Algorithms',
    code: 'CS201',
    description: 'Advanced programming concepts and algorithm design',
    instructor: 'Prof. David Lee',
    departmentId: '1',
    semester: 3,
    credits: 4,
    enrolledStudents: 32,
    maxStudents: 40,
    schedule: [
      { day: 'Tuesday', time: '11:00 AM - 12:30 PM', room: 'Room 205' },
      { day: 'Thursday', time: '11:00 AM - 12:30 PM', room: 'Room 205' }
    ],
    createdAt: '2024-02-01T10:00:00Z'
  },
  {
    id: '3',
    name: 'Calculus I',
    code: 'MATH101',
    description: 'Differential and integral calculus',
    instructor: 'Prof. Michael Brown',
    departmentId: '2',
    semester: 1,
    credits: 4,
    enrolledStudents: 38,
    maxStudents: 45,
    schedule: [
      { day: 'Monday', time: '02:00 PM - 03:30 PM', room: 'Room 301' },
      { day: 'Wednesday', time: '02:00 PM - 03:30 PM', room: 'Room 301' },
      { day: 'Friday', time: '02:00 PM - 03:30 PM', room: 'Room 301' }
    ],
    createdAt: '2024-02-01T10:00:00Z'
  }
];

export const sampleAssignments: Assignment[] = [
  {
    id: '1',
    title: 'Python Basics Assignment',
    description: 'Create a simple calculator program using Python',
    courseId: '1',
    courseName: 'Introduction to Programming',
    instructor: 'Dr. Sarah Johnson',
    dueDate: '2024-03-15T23:59:59Z',
    maxMarks: 100,
    type: 'assignment',
    status: 'active',
    submissions: [],
    createdAt: '2024-03-01T10:00:00Z'
  },
  {
    id: '2',
    title: 'Algorithm Implementation',
    description: 'Implement sorting algorithms and analyze their time complexity',
    courseId: '2',
    courseName: 'Data Structures and Algorithms',
    instructor: 'Prof. David Lee',
    dueDate: '2024-03-20T23:59:59Z',
    maxMarks: 150,
    type: 'project',
    status: 'active',
    submissions: [],
    createdAt: '2024-03-05T10:00:00Z'
  },
  {
    id: '3',
    title: 'Calculus Quiz 1',
    description: 'Quiz covering derivatives and limits',
    courseId: '3',
    courseName: 'Calculus I',
    instructor: 'Prof. Michael Brown',
    dueDate: '2024-03-10T23:59:59Z',
    maxMarks: 50,
    type: 'quiz',
    status: 'completed',
    submissions: [],
    createdAt: '2024-02-25T10:00:00Z'
  }
];

export const sampleAttendance: Attendance[] = [
  {
    id: '1',
    courseId: '1',
    courseName: 'Introduction to Programming',
    date: '2024-03-01',
    students: [
      { studentId: '3', studentName: 'Emma Wilson', status: 'present' },
      { studentId: '4', studentName: 'James Davis', status: 'present' },
      { studentId: '5', studentName: 'Sophia Chen', status: 'absent' }
    ]
  },
  {
    id: '2',
    courseId: '2',
    courseName: 'Data Structures and Algorithms',
    date: '2024-03-02',
    students: [
      { studentId: '3', studentName: 'Emma Wilson', status: 'present' },
      { studentId: '6', studentName: 'Ryan Miller', status: 'late' },
      { studentId: '7', studentName: 'Olivia Taylor', status: 'present' }
    ]
  }
];

export const sampleNotifications: Notification[] = [
  {
    id: '1',
    title: 'New Assignment Posted',
    message: 'A new assignment has been posted for Introduction to Programming',
    type: 'info',
    recipient: 'students',
    isRead: false,
    createdAt: '2024-03-01T10:00:00Z'
  },
  {
    id: '2',
    title: 'Grade Published',
    message: 'Grades for Calculus Quiz 1 have been published',
    type: 'success',
    recipient: 'students',
    isRead: false,
    createdAt: '2024-03-02T14:30:00Z'
  },
  {
    id: '3',
    title: 'System Maintenance',
    message: 'Scheduled maintenance on March 15th from 2 AM to 4 AM',
    type: 'warning',
    recipient: 'all',
    isRead: true,
    createdAt: '2024-02-28T09:00:00Z'
  }
];

export const sampleAnalytics: Analytics = {
  totalStudents: 1245,
  totalCourses: 127,
  totalAssignments: 89,
  attendanceRate: 92.5,
  gradeDistribution: [
    { grade: 'A', count: 320 },
    { grade: 'B', count: 450 },
    { grade: 'C', count: 280 },
    { grade: 'D', count: 120 },
    { grade: 'F', count: 75 }
  ],
  departmentEnrollment: [
    { department: 'Computer Science', students: 485 },
    { department: 'Mathematics', students: 320 },
    { department: 'Business Administration', students: 440 }
  ],
  monthlyEnrollments: [
    { month: 'Jan', enrollments: 145 },
    { month: 'Feb', enrollments: 162 },
    { month: 'Mar', enrollments: 98 },
    { month: 'Apr', enrollments: 0 },
    { month: 'May', enrollments: 0 },
    { month: 'Jun', enrollments: 0 }
  ]
};