import React from 'react';
import { Users, BookOpen, ClipboardList, Calendar, TrendingUp, Award } from 'lucide-react';
import { useAuth } from '../contexts/AuthContext';
import { sampleAnalytics, sampleCourses, sampleAssignments } from '../data/sampleData';
import Card from '../components/UI/Card';
import BarChart from '../components/Charts/BarChart';
import LineChart from '../components/Charts/LineChart';

const Dashboard: React.FC = () => {
  const { user } = useAuth();

  const getStatsForRole = () => {
    switch (user?.role) {
      case 'admin':
        return [
          { title: 'Total Students', value: sampleAnalytics.totalStudents, icon: Users, color: 'blue' },
          { title: 'Total Courses', value: sampleAnalytics.totalCourses, icon: BookOpen, color: 'green' },
          { title: 'Active Assignments', value: sampleAnalytics.totalAssignments, icon: ClipboardList, color: 'purple' },
          { title: 'Attendance Rate', value: `${sampleAnalytics.attendanceRate}%`, icon: TrendingUp, color: 'amber' }
        ];
      case 'staff':
        return [
          { title: 'My Courses', value: 3, icon: BookOpen, color: 'blue' },
          { title: 'Total Students', value: 115, icon: Users, color: 'green' },
          { title: 'Pending Assignments', value: 12, icon: ClipboardList, color: 'orange' },
          { title: 'Avg. Attendance', value: '91%', icon: Calendar, color: 'purple' }
        ];
      case 'student':
        return [
          { title: 'Enrolled Courses', value: 5, icon: BookOpen, color: 'blue' },
          { title: 'Assignments Due', value: 3, icon: ClipboardList, color: 'red' },
          { title: 'Attendance Rate', value: '94%', icon: Calendar, color: 'green' },
          { title: 'Current GPA', value: '3.7', icon: Award, color: 'purple' }
        ];
      default:
        return [];
    }
  };

  const stats = getStatsForRole();

  const getColorClass = (color: string) => {
    const colors = {
      blue: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
      green: 'text-green-500 bg-green-50 dark:bg-green-900/20',
      purple: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
      amber: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20',
      orange: 'text-orange-500 bg-orange-50 dark:bg-orange-900/20',
      red: 'text-red-500 bg-red-50 dark:bg-red-900/20'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Welcome to your {user?.role} dashboard
          </p>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, index) => {
          const Icon = stat.icon;
          return (
            <Card key={index} className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-1">
                    {stat.title}
                  </p>
                  <p className="text-2xl font-bold text-gray-900 dark:text-white">
                    {stat.value}
                  </p>
                </div>
                <div className={`p-3 rounded-full ${getColorClass(stat.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Section */}
      {user?.role === 'admin' && (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <BarChart
            title="Department Enrollment"
            data={sampleAnalytics.departmentEnrollment.map(d => ({ name: d.department, value: d.students }))}
            color="#6366F1"
          />
          <LineChart
            title="Monthly Enrollments"
            data={sampleAnalytics.monthlyEnrollments}
            color="#10B981"
          />
        </div>
      )}

      {/* Recent Activity */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            {user?.role === 'staff' ? 'My Recent Courses' : 'Recent Courses'}
          </h3>
          <div className="space-y-4">
            {sampleCourses.slice(0, 3).map((course) => (
              <div key={course.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{course.name}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{course.code} • {course.instructor}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-300">{course.enrolledStudents} students</p>
                  <p className="text-xs text-gray-400">{course.credits} credits</p>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">
            Recent Assignments
          </h3>
          <div className="space-y-4">
            {sampleAssignments.slice(0, 3).map((assignment) => (
              <div key={assignment.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                <div>
                  <p className="font-medium text-gray-900 dark:text-white">{assignment.title}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400">{assignment.courseName}</p>
                </div>
                <div className="text-right">
                  <p className="text-sm text-gray-600 dark:text-gray-300">
                    {new Date(assignment.dueDate).toLocaleDateString()}
                  </p>
                  <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                    assignment.status === 'active' ? 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400' :
                    assignment.status === 'completed' ? 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400' :
                    'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400'
                  }`}>
                    {assignment.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Dashboard;