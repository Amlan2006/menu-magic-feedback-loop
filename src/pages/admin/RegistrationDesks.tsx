import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, FileText, Calendar, UserPlus, AlertCircle } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface Registration {
  id: string;
  type: 'student' | 'event' | 'document' | 'grievance';
  title: string;
  description: string;
  status: 'pending' | 'in-progress' | 'completed';
  date: string;
  priority: 'low' | 'medium' | 'high';
  assignedTo?: string;
}

const registrationTypes = [
  { value: 'student', label: 'Student Onboarding' },
  { value: 'event', label: 'Event Registration' },
  { value: 'document', label: 'Document Management' },
  { value: 'grievance', label: 'Grievance Redressal' }
];

const priorities = [
  { value: 'low', label: 'Low' },
  { value: 'medium', label: 'Medium' },
  { value: 'high', label: 'High' }
];

const statuses = [
  { value: 'pending', label: 'Pending' },
  { value: 'in-progress', label: 'In Progress' },
  { value: 'completed', label: 'Completed' }
];

const dummyRegistrations: Registration[] = [
  {
    id: '1',
    type: 'student',
    title: 'New Student Enrollment - Fall 2024',
    description: 'Complete enrollment process for new students',
    status: 'pending',
    date: '2024-05-15',
    priority: 'high'
  },
  {
    id: '2',
    type: 'event',
    title: 'Annual Sports Meet Registration',
    description: 'Register students for various sports events',
    status: 'in-progress',
    date: '2024-05-20',
    priority: 'medium'
  },
  {
    id: '3',
    type: 'document',
    title: 'Transcript Requests Processing',
    description: 'Process and verify student transcript requests',
    status: 'completed',
    date: '2024-05-10',
    priority: 'low'
  },
  {
    id: '4',
    type: 'grievance',
    title: 'Student Complaint Resolution',
    description: 'Address student complaints regarding facilities',
    status: 'in-progress',
    date: '2024-05-12',
    priority: 'high'
  }
];

export function RegistrationDesks() {
  const [registrations, setRegistrations] = useState<Registration[]>(dummyRegistrations);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingRegistration, setEditingRegistration] = useState<Registration | null>(null);
  const [formData, setFormData] = useState<Partial<Registration>>({
    type: 'student',
    title: '',
    description: '',
    status: 'pending',
    date: new Date().toISOString().split('T')[0],
    priority: 'medium'
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingRegistration) {
      setRegistrations(registrations.map(reg => 
        reg.id === editingRegistration.id ? { ...formData, id: reg.id } as Registration : reg
      ));
      toast.success('Registration updated successfully');
    } else {
      const newRegistration: Registration = {
        ...formData as Registration,
        id: Date.now().toString()
      };
      setRegistrations([...registrations, newRegistration]);
      toast.success('Registration added successfully');
    }
    
    setIsDialogOpen(false);
    setEditingRegistration(null);
    setFormData({
      type: 'student',
      title: '',
      description: '',
      status: 'pending',
      date: new Date().toISOString().split('T')[0],
      priority: 'medium'
    });
  };

  const handleEdit = (registration: Registration) => {
    setEditingRegistration(registration);
    setFormData(registration);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setRegistrations(registrations.filter(reg => reg.id !== id));
    toast.success('Registration deleted successfully');
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'student':
        return <UserPlus className="w-4 h-4" />;
      case 'event':
        return <Calendar className="w-4 h-4" />;
      case 'document':
        return <FileText className="w-4 h-4" />;
      case 'grievance':
        return <AlertCircle className="w-4 h-4" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Registration Desks</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Registration
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingRegistration ? 'Edit Registration' : 'Add Registration'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="type">Type</Label>
                  <Select
                    value={formData.type}
                    onValueChange={(value) => setFormData({ ...formData, type: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select type" />
                    </SelectTrigger>
                    <SelectContent>
                      {registrationTypes.map((type) => (
                        <SelectItem key={type.value} value={type.value}>
                          {type.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="priority">Priority</Label>
                  <Select
                    value={formData.priority}
                    onValueChange={(value) => setFormData({ ...formData, priority: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select priority" />
                    </SelectTrigger>
                    <SelectContent>
                      {priorities.map((priority) => (
                        <SelectItem key={priority.value} value={priority.value}>
                          {priority.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="title">Title</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="description">Description</Label>
                <Textarea
                  id="description"
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="date">Date</Label>
                  <Input
                    id="date"
                    type="date"
                    value={formData.date}
                    onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="status">Status</Label>
                  <Select
                    value={formData.status}
                    onValueChange={(value) => setFormData({ ...formData, status: value as any })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select status" />
                    </SelectTrigger>
                    <SelectContent>
                      {statuses.map((status) => (
                        <SelectItem key={status.value} value={status.value}>
                          {status.label}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingRegistration(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingRegistration ? 'Update' : 'Add'} Registration
                </Button>
              </div>
            </form>
          </DialogContent>
        </Dialog>
      </div>

      <Card>
        <CardContent className="p-0">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Type</TableHead>
                <TableHead>Title</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Priority</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {registrations.map((registration) => (
                <TableRow key={registration.id}>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      {getTypeIcon(registration.type)}
                      <span>{registrationTypes.find(t => t.value === registration.type)?.label}</span>
                    </div>
                  </TableCell>
                  <TableCell className="font-medium">{registration.title}</TableCell>
                  <TableCell>{registration.date}</TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      registration.priority === 'high' ? 'bg-red-100 text-red-800' :
                      registration.priority === 'medium' ? 'bg-yellow-100 text-yellow-800' :
                      'bg-green-100 text-green-800'
                    }`}>
                      {registration.priority}
                    </span>
                  </TableCell>
                  <TableCell>
                    <span className={`px-2 py-1 rounded-full text-xs ${
                      registration.status === 'completed' ? 'bg-green-100 text-green-800' :
                      registration.status === 'in-progress' ? 'bg-blue-100 text-blue-800' :
                      'bg-gray-100 text-gray-800'
                    }`}>
                      {registration.status}
                    </span>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(registration)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(registration.id)}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
} 