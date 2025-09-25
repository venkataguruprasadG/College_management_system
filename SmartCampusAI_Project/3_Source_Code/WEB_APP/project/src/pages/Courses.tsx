import React, { useState } from 'react';
import { Plus, Edit, Trash2, BookOpen, Users, Clock, MapPin } from 'lucide-react';
import { sampleCourses } from '../data/sampleData';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';

const Courses: React.FC = () => {
  const { user } = useAuth();
  const [courses, setCourses] = useState(sampleCourses);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCourse, setEditingCourse] = useState(null);

  const [formData, setFormData] = useState({
    name: '',
    code: '',
    description: '',
    instructor: '',
    semester: 1,
    credits: 3,
    maxStudents: 50
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingCourse) {
      setCourses(prev => prev.map(course => 
        course.id === editingCourse.id 
          ? { ...course, ...formData }
          : course
      ));
    } else {
      const newCourse = {
        id: Date.now().toString(),
        ...formData,
        departmentId: '1',
        enrolledStudents: 0,
        schedule: [
          { day: 'Monday', time: '09:00 AM - 10:30 AM', room: 'TBD' },
          { day: 'Wednesday', time: '09:00 AM - 10:30 AM', room: 'TBD' }
        ],
        createdAt: new Date().toISOString()
      };
      setCourses(prev => [...prev, newCourse]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      name: '',
      code: '',
      description: '',
      instructor: '',
      semester: 1,
      credits: 3,
      maxStudents: 50
    });
    setEditingCourse(null);
    setIsModalOpen(false);
  };

  const handleEdit = (course) => {
    setFormData({
      name: course.name,
      code: course.code,
      description: course.description,
      instructor: course.instructor,
      semester: course.semester,
      credits: course.credits,
      maxStudents: course.maxStudents
    });
    setEditingCourse(course);
    setIsModalOpen(true);
  };

  const handleDelete = (courseId: string) => {
    if (confirm('Are you sure you want to delete this course?')) {
      setCourses(prev => prev.filter(course => course.id !== courseId));
    }
  };

  // Filter courses based on user role
  const filteredCourses = user?.role === 'staff' 
    ? courses.filter(course => course.instructor === user.name)
    : courses;

  const getEnrollmentColor = (enrolled: number, max: number) => {
    const percentage = (enrolled / max) * 100;
    if (percentage >= 90) return 'text-red-600 dark:text-red-400';
    if (percentage >= 70) return 'text-amber-600 dark:text-amber-400';
    return 'text-green-600 dark:text-green-400';
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user?.role === 'staff' ? 'My Courses' : user?.role === 'student' ? 'My Courses' : 'Course Management'}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {user?.role === 'staff' 
              ? 'Manage your assigned courses and track student progress'
              : user?.role === 'student'
              ? 'View your enrolled courses and track your progress'
              : 'Manage all courses across departments'
            }
          </p>
        </div>
        {(user?.role === 'admin' || user?.role === 'staff') && (
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Course
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {filteredCourses.map((course) => (
          <Card key={course.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-indigo-100 dark:bg-indigo-900/20 rounded-lg">
                  <BookOpen className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
                    {course.name}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {course.code} • Semester {course.semester}
                  </p>
                </div>
              </div>
              {(user?.role === 'admin' || (user?.role === 'staff' && course.instructor === user.name)) && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(course)}
                    className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(course.id)}
                    className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {course.description}
              </p>

              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <span>Instructor: {course.instructor}</span>
                <span>{course.credits} Credits</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Users className="h-4 w-4 mr-1" />
                  <span className={getEnrollmentColor(course.enrolledStudents, course.maxStudents)}>
                    {course.enrolledStudents}/{course.maxStudents} enrolled
                  </span>
                </div>
                <div className="w-20 bg-gray-200 dark:bg-gray-700 rounded-full h-2">
                  <div
                    className="bg-blue-500 h-2 rounded-full transition-all duration-300"
                    style={{ width: `${(course.enrolledStudents / course.maxStudents) * 100}%` }}
                  />
                </div>
              </div>

              <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-2">Schedule</h4>
                <div className="space-y-1">
                  {course.schedule.map((schedule, index) => (
                    <div key={index} className="flex items-center text-xs text-gray-600 dark:text-gray-400">
                      <Clock className="h-3 w-3 mr-2" />
                      <span className="mr-2">{schedule.day}</span>
                      <span className="mr-2">•</span>
                      <span className="mr-2">{schedule.time}</span>
                      <MapPin className="h-3 w-3 mr-1" />
                      <span>{schedule.room}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={resetForm}
        title={editingCourse ? 'Edit Course' : 'Add New Course'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course Name
              </label>
              <input
                type="text"
                value={formData.name}
                onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course Code
              </label>
              <input
                type="text"
                value={formData.code}
                onChange={(e) => setFormData({ ...formData, code: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Instructor
              </label>
              <input
                type="text"
                value={formData.instructor}
                onChange={(e) => setFormData({ ...formData, instructor: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Semester
              </label>
              <select
                value={formData.semester}
                onChange={(e) => setFormData({ ...formData, semester: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              >
                {[1, 2, 3, 4, 5, 6, 7, 8].map(sem => (
                  <option key={sem} value={sem}>Semester {sem}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Credits
              </label>
              <input
                type="number"
                min="1"
                max="6"
                value={formData.credits}
                onChange={(e) => setFormData({ ...formData, credits: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Maximum Students
            </label>
            <input
              type="number"
              min="1"
              max="200"
              value={formData.maxStudents}
              onChange={(e) => setFormData({ ...formData, maxStudents: Number(e.target.value) })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingCourse ? 'Update Course' : 'Add Course'}
            </Button>
            <Button variant="outline" onClick={resetForm} className="flex-1">
              Cancel
            </Button>
          </div>
        </form>
      </Modal>
    </div>
  );
};

export default Courses;