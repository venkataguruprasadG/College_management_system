import React from 'react';
import { TrendingUp, Users, BookOpen, Award, Calendar } from 'lucide-react';
import { sampleAnalytics } from '../data/sampleData';
import Card from '../components/UI/Card';
import BarChart from '../components/Charts/BarChart';
import LineChart from '../components/Charts/LineChart';

const Analytics: React.FC = () => {
  const stats = [
    {
      title: 'Total Students',
      value: sampleAnalytics.totalStudents,
      icon: Users,
      color: 'blue',
      change: '+12%',
      changeType: 'positive'
    },
    {
      title: 'Active Courses',
      value: sampleAnalytics.totalCourses,
      icon: BookOpen,
      color: 'green',
      change: '+5%',
      changeType: 'positive'
    },
    {
      title: 'Assignment Completion',
      value: '87.3%',
      icon: Award,
      color: 'purple',
      change: '+2.1%',
      changeType: 'positive'
    },
    {
      title: 'Average Attendance',
      value: `${sampleAnalytics.attendanceRate}%`,
      icon: Calendar,
      color: 'amber',
      change: '-1.2%',
      changeType: 'negative'
    }
  ];

  const getColorClass = (color: string) => {
    const colors = {
      blue: 'text-blue-500 bg-blue-50 dark:bg-blue-900/20',
      green: 'text-green-500 bg-green-50 dark:bg-green-900/20',
      purple: 'text-purple-500 bg-purple-50 dark:bg-purple-900/20',
      amber: 'text-amber-500 bg-amber-50 dark:bg-amber-900/20'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            Analytics Dashboard
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            Comprehensive insights into institutional performance
          </p>
        </div>
      </div>

      {/* Key Metrics */}
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
                  <div className="flex items-center mt-2">
                    <TrendingUp className={`h-4 w-4 mr-1 ${
                      stat.changeType === 'positive' ? 'text-green-500' : 'text-red-500'
                    }`} />
                    <span className={`text-sm font-medium ${
                      stat.changeType === 'positive' ? 'text-green-600 dark:text-green-400' : 'text-red-600 dark:text-red-400'
                    }`}>
                      {stat.change}
                    </span>
                    <span className="text-sm text-gray-500 dark:text-gray-400 ml-1">
                      from last month
                    </span>
                  </div>
                </div>
                <div className={`p-3 rounded-full ${getColorClass(stat.color)}`}>
                  <Icon className="h-6 w-6" />
                </div>
              </div>
            </Card>
          );
        })}
      </div>

      {/* Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <BarChart
          title="Grade Distribution"
          data={sampleAnalytics.gradeDistribution.map(g => ({ name: `Grade ${g.grade}`, value: g.count }))}
          color="#8B5CF6"
        />

        <BarChart
          title="Department Enrollment"
          data={sampleAnalytics.departmentEnrollment.map(d => ({ 
            name: d.department.split(' ')[0], 
            value: d.students 
          }))}
          color="#06B6D4"
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <LineChart
          title="Monthly Enrollment Trends"
          data={sampleAnalytics.monthlyEnrollments}
          color="#10B981"
        />

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Performance Metrics
          </h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Course Completion Rate</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{ width: '92%' }} />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">92%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Assignment Submission Rate</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{ width: '87%' }} />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">87%</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Student Satisfaction</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{ width: '89%' }} />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">4.5/5</span>
              </div>
            </div>

            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Faculty Rating</span>
              <div className="flex items-center">
                <div className="w-24 bg-gray-200 dark:bg-gray-700 rounded-full h-2 mr-2">
                  <div className="bg-amber-500 h-2 rounded-full" style={{ width: '94%' }} />
                </div>
                <span className="text-sm font-medium text-gray-900 dark:text-white">4.7/5</span>
              </div>
            </div>
          </div>
        </Card>
      </div>

      {/* Recent Activity Summary */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Top Performing Courses
          </h3>
          <div className="space-y-3">
            {[
              { name: 'Data Structures', score: 94 },
              { name: 'Calculus I', score: 91 },
              { name: 'Programming 101', score: 88 }
            ].map((course, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">{course.name}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{course.score}%</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            Department Performance
          </h3>
          <div className="space-y-3">
            {sampleAnalytics.departmentEnrollment.map((dept, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm text-gray-600 dark:text-gray-400">{dept.department.split(' ')[0]}</span>
                <span className="text-sm font-medium text-gray-900 dark:text-white">{dept.students} students</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-6">
          <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-4">
            System Health
          </h3>
          <div className="space-y-3">
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Server Uptime</span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">99.9%</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Response Time</span>
              <span className="text-sm font-medium text-green-600 dark:text-green-400">142ms</span>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-sm text-gray-600 dark:text-gray-400">Active Users</span>
              <span className="text-sm font-medium text-blue-600 dark:text-blue-400">1,247</span>
            </div>
          </div>
        </Card>
      </div>
    </div>
  );
};

export default Analytics;