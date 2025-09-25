import React, { useState } from 'react';
import { Plus, Edit, Trash2, ClipboardList, Calendar, User, Award } from 'lucide-react';
import { sampleAssignments } from '../data/sampleData';
import { useAuth } from '../contexts/AuthContext';
import Card from '../components/UI/Card';
import Button from '../components/UI/Button';
import Modal from '../components/UI/Modal';

const Assignments: React.FC = () => {
  const { user } = useAuth();
  const [assignments, setAssignments] = useState(sampleAssignments);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingAssignment, setEditingAssignment] = useState(null);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    courseName: '',
    dueDate: '',
    maxMarks: 100,
    type: 'assignment' as const
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingAssignment) {
      setAssignments(prev => prev.map(assignment => 
        assignment.id === editingAssignment.id 
          ? { ...assignment, ...formData }
          : assignment
      ));
    } else {
      const newAssignment = {
        id: Date.now().toString(),
        ...formData,
        courseId: '1',
        instructor: user?.name || 'Staff',
        status: 'active' as const,
        submissions: [],
        createdAt: new Date().toISOString()
      };
      setAssignments(prev => [...prev, newAssignment]);
    }

    resetForm();
  };

  const resetForm = () => {
    setFormData({
      title: '',
      description: '',
      courseName: '',
      dueDate: '',
      maxMarks: 100,
      type: 'assignment'
    });
    setEditingAssignment(null);
    setIsModalOpen(false);
  };

  const handleEdit = (assignment) => {
    setFormData({
      title: assignment.title,
      description: assignment.description,
      courseName: assignment.courseName,
      dueDate: assignment.dueDate.split('T')[0],
      maxMarks: assignment.maxMarks,
      type: assignment.type
    });
    setEditingAssignment(assignment);
    setIsModalOpen(true);
  };

  const handleDelete = (assignmentId: string) => {
    if (confirm('Are you sure you want to delete this assignment?')) {
      setAssignments(prev => prev.filter(assignment => assignment.id !== assignmentId));
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800 dark:bg-green-900/20 dark:text-green-400';
      case 'completed': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'overdue': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const getTypeColor = (type: string) => {
    switch (type) {
      case 'assignment': return 'bg-blue-100 text-blue-800 dark:bg-blue-900/20 dark:text-blue-400';
      case 'quiz': return 'bg-purple-100 text-purple-800 dark:bg-purple-900/20 dark:text-purple-400';
      case 'project': return 'bg-orange-100 text-orange-800 dark:bg-orange-900/20 dark:text-orange-400';
      case 'exam': return 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400';
      default: return 'bg-gray-100 text-gray-800 dark:bg-gray-900/20 dark:text-gray-400';
    }
  };

  const isOverdue = (dueDate: string) => {
    return new Date(dueDate) < new Date();
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
            {user?.role === 'student' ? 'My Assignments' : 'Assignment Management'}
          </h1>
          <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
            {user?.role === 'student' 
              ? 'View and submit your assignments'
              : 'Create and manage course assignments'
            }
          </p>
        </div>
        {user?.role !== 'student' && (
          <Button onClick={() => setIsModalOpen(true)}>
            <Plus className="h-4 w-4 mr-2" />
            Add Assignment
          </Button>
        )}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        {assignments.map((assignment) => (
          <Card key={assignment.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center">
                <div className="p-2 bg-purple-100 dark:bg-purple-900/20 rounded-lg">
                  <ClipboardList className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                </div>
                <div className="ml-3 flex-1">
                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white leading-tight">
                    {assignment.title}
                  </h3>
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    {assignment.courseName}
                  </p>
                </div>
              </div>
              {user?.role !== 'student' && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => handleEdit(assignment)}
                    className="p-2 text-gray-400 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-900/20 rounded-lg transition-colors"
                  >
                    <Edit className="h-4 w-4" />
                  </button>
                  <button
                    onClick={() => handleDelete(assignment.id)}
                    className="p-2 text-gray-400 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              )}
            </div>

            <div className="space-y-3">
              <p className="text-sm text-gray-600 dark:text-gray-400 leading-relaxed">
                {assignment.description}
              </p>

              <div className="flex flex-wrap gap-2">
                <span className={`inline-flex px-2 py-1 text-xs rounded-full ${getTypeColor(assignment.type)}`}>
                  {assignment.type}
                </span>
                <span className={`inline-flex px-2 py-1 text-xs rounded-full ${
                  isOverdue(assignment.dueDate) 
                    ? 'bg-red-100 text-red-800 dark:bg-red-900/20 dark:text-red-400' 
                    : getStatusColor(assignment.status)
                }`}>
                  {isOverdue(assignment.dueDate) ? 'overdue' : assignment.status}
                </span>
              </div>

              <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                <User className="h-4 w-4 mr-2" />
                Instructor: {assignment.instructor}
              </div>

              <div className="flex items-center justify-between text-sm text-gray-600 dark:text-gray-400">
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 mr-2" />
                  Due: {new Date(assignment.dueDate).toLocaleDateString()}
                </div>
                <div className="flex items-center">
                  <Award className="h-4 w-4 mr-2" />
                  {assignment.maxMarks} marks
                </div>
              </div>

              {user?.role === 'student' && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <Button size="sm" className="w-full">
                    {isOverdue(assignment.dueDate) ? 'Submit Late' : 'Submit Assignment'}
                  </Button>
                </div>
              )}

              {user?.role !== 'student' && assignment.submissions.length > 0 && (
                <div className="pt-3 border-t border-gray-200 dark:border-gray-700">
                  <div className="text-sm text-gray-600 dark:text-gray-400">
                    {assignment.submissions.length} submission{assignment.submissions.length !== 1 ? 's' : ''}
                  </div>
                </div>
              )}
            </div>
          </Card>
        ))}
      </div>

      <Modal
        isOpen={isModalOpen}
        onClose={resetForm}
        title={editingAssignment ? 'Edit Assignment' : 'Create New Assignment'}
        size="lg"
      >
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Assignment Title
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Description
            </label>
            <textarea
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              rows={4}
              className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
              required
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Course Name
              </label>
              <input
                type="text"
                value={formData.courseName}
                onChange={(e) => setFormData({ ...formData, courseName: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Assignment Type
              </label>
              <select
                value={formData.type}
                onChange={(e) => setFormData({ ...formData, type: e.target.value as any })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              >
                <option value="assignment">Assignment</option>
                <option value="quiz">Quiz</option>
                <option value="project">Project</option>
                <option value="exam">Exam</option>
              </select>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Due Date
              </label>
              <input
                type="date"
                value={formData.dueDate}
                onChange={(e) => setFormData({ ...formData, dueDate: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Maximum Marks
              </label>
              <input
                type="number"
                min="1"
                max="1000"
                value={formData.maxMarks}
                onChange={(e) => setFormData({ ...formData, maxMarks: Number(e.target.value) })}
                className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white"
                required
              />
            </div>
          </div>

          <div className="flex space-x-3 pt-4">
            <Button type="submit" className="flex-1">
              {editingAssignment ? 'Update Assignment' : 'Create Assignment'}
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

export default Assignments;