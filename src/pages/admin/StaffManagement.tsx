import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Plus, Edit, Trash2, Clock, Star, CheckCircle2 } from 'lucide-react';
import { toast } from '@/components/ui/sonner';

interface StaffMember {
  id: string;
  name: string;
  role: string;
  email: string;
  phone: string;
  schedule: {
    monday: string;
    tuesday: string;
    wednesday: string;
    thursday: string;
    friday: string;
    saturday: string;
    sunday: string;
  };
  performance: {
    rating: number;
    tasksCompleted: number;
    attendance: number;
  };
}

const roles = [
  'Chef',
  'Sous Chef',
  'Line Cook',
  'Server',
  'Host/Hostess',
  'Bartender',
  'Manager',
  'Dishwasher'
];

const timeSlots = [
  '9:00 AM - 5:00 PM',
  '5:00 PM - 10:00 PM',
  '10:00 AM - 6:00 PM',
  '6:00 PM - 11:00 PM',
  'Off'
];

export function StaffManagement() {
  const [staff, setStaff] = useState<StaffMember[]>([]);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [editingStaff, setEditingStaff] = useState<StaffMember | null>(null);
  const [formData, setFormData] = useState<Partial<StaffMember>>({
    name: '',
    role: '',
    email: '',
    phone: '',
    schedule: {
      monday: 'Off',
      tuesday: 'Off',
      wednesday: 'Off',
      thursday: 'Off',
      friday: 'Off',
      saturday: 'Off',
      sunday: 'Off'
    },
    performance: {
      rating: 0,
      tasksCompleted: 0,
      attendance: 100
    }
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (editingStaff) {
      // Update existing staff
      setStaff(staff.map(member => 
        member.id === editingStaff.id ? { ...formData, id: member.id } as StaffMember : member
      ));
      toast.success('Staff member updated successfully');
    } else {
      // Add new staff
      const newStaff: StaffMember = {
        ...formData as StaffMember,
        id: Date.now().toString()
      };
      setStaff([...staff, newStaff]);
      toast.success('Staff member added successfully');
    }
    
    setIsDialogOpen(false);
    setEditingStaff(null);
    setFormData({
      name: '',
      role: '',
      email: '',
      phone: '',
      schedule: {
        monday: 'Off',
        tuesday: 'Off',
        wednesday: 'Off',
        thursday: 'Off',
        friday: 'Off',
        saturday: 'Off',
        sunday: 'Off'
      },
      performance: {
        rating: 0,
        tasksCompleted: 0,
        attendance: 100
      }
    });
  };

  const handleEdit = (member: StaffMember) => {
    setEditingStaff(member);
    setFormData(member);
    setIsDialogOpen(true);
  };

  const handleDelete = (id: string) => {
    setStaff(staff.filter(member => member.id !== id));
    toast.success('Staff member deleted successfully');
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Staff Management</h2>
        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="w-4 h-4 mr-2" />
              Add Staff Member
            </Button>
          </DialogTrigger>
          <DialogContent className="max-w-2xl">
            <DialogHeader>
              <DialogTitle>{editingStaff ? 'Edit Staff Member' : 'Add Staff Member'}</DialogTitle>
            </DialogHeader>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Name</Label>
                  <Input
                    id="name"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="role">Role</Label>
                  <Select
                    value={formData.role}
                    onValueChange={(value) => setFormData({ ...formData, role: value })}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder="Select role" />
                    </SelectTrigger>
                    <SelectContent>
                      {roles.map((role) => (
                        <SelectItem key={role} value={role}>
                          {role}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Schedule</h3>
                <div className="grid grid-cols-2 gap-4">
                  {Object.entries(formData.schedule || {}).map(([day, time]) => (
                    <div key={day} className="space-y-2">
                      <Label htmlFor={day}>{day.charAt(0).toUpperCase() + day.slice(1)}</Label>
                      <Select
                        value={time}
                        onValueChange={(value) => setFormData({
                          ...formData,
                          schedule: {
                            ...formData.schedule!,
                            [day]: value
                          }
                        })}
                      >
                        <SelectTrigger>
                          <SelectValue placeholder="Select time" />
                        </SelectTrigger>
                        <SelectContent>
                          {timeSlots.map((slot) => (
                            <SelectItem key={slot} value={slot}>
                              {slot}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  ))}
                </div>
              </div>
              
              <div className="space-y-4">
                <h3 className="font-medium">Performance</h3>
                <div className="grid grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="rating">Rating (1-5)</Label>
                    <Input
                      id="rating"
                      type="number"
                      min="1"
                      max="5"
                      value={formData.performance?.rating}
                      onChange={(e) => setFormData({
                        ...formData,
                        performance: {
                          ...formData.performance!,
                          rating: parseInt(e.target.value)
                        }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="tasks">Tasks Completed</Label>
                    <Input
                      id="tasks"
                      type="number"
                      value={formData.performance?.tasksCompleted}
                      onChange={(e) => setFormData({
                        ...formData,
                        performance: {
                          ...formData.performance!,
                          tasksCompleted: parseInt(e.target.value)
                        }
                      })}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="attendance">Attendance (%)</Label>
                    <Input
                      id="attendance"
                      type="number"
                      min="0"
                      max="100"
                      value={formData.performance?.attendance}
                      onChange={(e) => setFormData({
                        ...formData,
                        performance: {
                          ...formData.performance!,
                          attendance: parseInt(e.target.value)
                        }
                      })}
                    />
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-2">
                <Button
                  type="button"
                  variant="outline"
                  onClick={() => {
                    setIsDialogOpen(false);
                    setEditingStaff(null);
                  }}
                >
                  Cancel
                </Button>
                <Button type="submit">
                  {editingStaff ? 'Update' : 'Add'} Staff Member
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
                <TableHead>Name</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Performance</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {staff.map((member) => (
                <TableRow key={member.id}>
                  <TableCell className="font-medium">{member.name}</TableCell>
                  <TableCell>{member.role}</TableCell>
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4 text-muted-foreground" />
                      <span className="text-sm">View Schedule</span>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex items-center gap-2">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 text-yellow-500 mr-1" />
                        <span>{member.performance.rating}/5</span>
                      </div>
                      <div className="flex items-center">
                        <CheckCircle2 className="w-4 h-4 text-green-500 mr-1" />
                        <span>{member.performance.attendance}%</span>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="flex space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleEdit(member)}
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => handleDelete(member.id)}
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