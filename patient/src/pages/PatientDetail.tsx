import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Separator } from '@/components/ui/separator';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  ArrowLeft, 
  Video, 
  User, 
  Stethoscope, 
  AlertTriangle, 
  Clock,
  Activity,
  Heart,
  Brain,
  FileText,
  Calendar,
  Phone,
  Mail
} from 'lucide-react';

const PatientDetail = () => {
  const { patientId } = useParams();
  const navigate = useNavigate();

  // Mock data - replace with actual API calls
  const patient = {
    id: patientId,
    name: 'John Smith',
    age: 45,
    gender: 'Male',
    roomNumber: 101,
    condition: 'Post-surgery recovery',
    doctor: 'Dr. Smith',
    nurse: 'Nurse Johnson',
    status: 'stable' as const,
    admissionDate: '2024-01-15',
    emergencyContact: {
      name: 'Jane Smith',
      relationship: 'Spouse',
      phone: '+1 (555) 123-4567',
      email: 'jane.smith@email.com'
    },
    medicalHistory: [
      'Hypertension',
      'Type 2 Diabetes',
      'Previous cardiac surgery (2022)'
    ],
    medications: [
      { name: 'Lisinopril', dosage: '10mg', frequency: 'Once daily' },
      { name: 'Metformin', dosage: '500mg', frequency: 'Twice daily' },
      { name: 'Aspirin', dosage: '81mg', frequency: 'Once daily' }
    ],
    allergies: ['Penicillin', 'Latex']
  };

  const previousAlerts = [
    {
      id: '1',
      type: 'critical' as const,
      message: 'Patient showing signs of distress',
      timestamp: new Date(Date.now() - 30 * 60000),
      acknowledged: true,
      acknowledgedBy: 'Dr. Smith'
    },
    {
      id: '2',
      type: 'warning' as const,
      message: 'Patient movement detected outside bed area',
      timestamp: new Date(Date.now() - 2 * 60 * 60000),
      acknowledged: true,
      acknowledgedBy: 'Nurse Johnson'
    },
    {
      id: '3',
      type: 'info' as const,
      message: 'Medication administration reminder',
      timestamp: new Date(Date.now() - 4 * 60 * 60000),
      acknowledged: true,
      acknowledgedBy: 'Nurse Johnson'
    }
  ];

  const emotionData = [
    { time: '08:00', emotion: 'Calm', confidence: 95 },
    { time: '10:00', emotion: 'Anxious', confidence: 78 },
    { time: '12:00', emotion: 'Comfortable', confidence: 88 },
    { time: '14:00', emotion: 'Distressed', confidence: 92 },
    { time: '16:00', emotion: 'Calm', confidence: 85 }
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'stable':
        return 'bg-gradient-success text-success-foreground';
      case 'critical':
        return 'bg-gradient-alert text-destructive-foreground';
      case 'warning':
        return 'bg-gradient-warning text-warning-foreground';
      default:
        return 'bg-muted text-muted-foreground';
    }
  };

  const getAlertIcon = (type: string) => {
    switch (type) {
      case 'critical':
        return <AlertTriangle className="h-4 w-4 text-destructive" />;
      case 'warning':
        return <AlertTriangle className="h-4 w-4 text-yellow-500" />;
      default:
        return <Activity className="h-4 w-4 text-blue-500" />;
    }
  };

  const getEmotionColor = (emotion: string) => {
    switch (emotion.toLowerCase()) {
      case 'calm':
      case 'comfortable':
        return 'text-success';
      case 'anxious':
        return 'text-yellow-500';
      case 'distressed':
        return 'text-destructive';
      default:
        return 'text-muted-foreground';
    }
  };

  return (
    <div className="min-h-screen bg-background p-6">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <Button 
              variant="ghost" 
              size="sm" 
              onClick={() => navigate(-1)}
              className="hover:bg-accent"
            >
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
            <div>
              <h1 className="text-3xl font-bold">{patient.name}</h1>
              <p className="text-muted-foreground">Room {patient.roomNumber} • Patient ID: {patient.id}</p>
            </div>
          </div>
          <Badge className={getStatusColor(patient.status)}>
            {patient.status.charAt(0).toUpperCase() + patient.status.slice(1)}
          </Badge>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column - Patient Info & Live Video */}
          <div className="lg:col-span-2 space-y-6">
            {/* Live Video Stream */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Video className="h-5 w-5 mr-2" />
                  Live Video Feed
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="relative bg-muted rounded-lg h-64 flex items-center justify-center overflow-hidden">
                  <div className="absolute inset-0 bg-gradient-to-br from-primary/10 to-primary/5"></div>
                  <Video className="h-12 w-12 text-muted-foreground" />
                  <span className="ml-2 text-lg text-muted-foreground">Live Video Stream</span>
                  <div className="absolute top-4 right-4 w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
                  <div className="absolute bottom-4 left-4 bg-black/50 text-white px-2 py-1 rounded text-sm">
                    Room {patient.roomNumber}
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Tabbed Information */}
            <Tabs defaultValue="alerts" className="w-full">
              <TabsList className="grid w-full grid-cols-3">
                <TabsTrigger value="alerts">Alert History</TabsTrigger>
                <TabsTrigger value="emotions">Emotion Detection</TabsTrigger>
                <TabsTrigger value="medical">Medical Records</TabsTrigger>
              </TabsList>

              <TabsContent value="alerts" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle>Previous Alerts</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {previousAlerts.map((alert) => (
                      <div key={alert.id} className="flex items-start space-x-3 p-3 border border-border rounded-lg">
                        {getAlertIcon(alert.type)}
                        <div className="flex-1">
                          <p className="text-sm font-medium">{alert.message}</p>
                          <div className="flex items-center space-x-4 mt-1 text-xs text-muted-foreground">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {alert.timestamp.toLocaleString()}
                            </span>
                            {alert.acknowledged && (
                              <span>Acknowledged by {alert.acknowledgedBy}</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="emotions" className="space-y-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="flex items-center">
                      <Brain className="h-5 w-5 mr-2" />
                      Emotion Detection Timeline
                    </CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    {emotionData.map((entry, index) => (
                      <div key={index} className="flex items-center justify-between p-3 border border-border rounded-lg">
                        <div className="flex items-center space-x-3">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">{entry.time}</span>
                        </div>
                        <div className="flex items-center space-x-3">
                          <span className={`font-medium ${getEmotionColor(entry.emotion)}`}>
                            {entry.emotion}
                          </span>
                          <Badge variant="outline">{entry.confidence}% confidence</Badge>
                        </div>
                      </div>
                    ))}
                  </CardContent>
                </Card>
              </TabsContent>

              <TabsContent value="medical" className="space-y-4">
                <div className="grid gap-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Medical History</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <ul className="space-y-2">
                        {patient.medicalHistory.map((condition, index) => (
                          <li key={index} className="flex items-center">
                            <FileText className="h-4 w-4 mr-2 text-muted-foreground" />
                            {condition}
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Current Medications</CardTitle>
                    </CardHeader>
                    <CardContent className="space-y-3">
                      {patient.medications.map((med, index) => (
                        <div key={index} className="border border-border rounded-lg p-3">
                          <div className="font-medium">{med.name}</div>
                          <div className="text-sm text-muted-foreground">
                            {med.dosage} - {med.frequency}
                          </div>
                        </div>
                      ))}
                    </CardContent>
                  </Card>

                  <Card>
                    <CardHeader>
                      <CardTitle>Allergies</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="flex flex-wrap gap-2">
                        {patient.allergies.map((allergy, index) => (
                          <Badge key={index} variant="destructive">{allergy}</Badge>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                </div>
              </TabsContent>
            </Tabs>
          </div>

          {/* Right Column - Patient Details */}
          <div className="space-y-6">
            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <User className="h-5 w-5 mr-2" />
                  Patient Information
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Age</label>
                    <p className="font-medium">{patient.age} years old</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Gender</label>
                    <p className="font-medium">{patient.gender}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Condition</label>
                    <p className="font-medium">{patient.condition}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium text-muted-foreground">Admission Date</label>
                    <p className="font-medium flex items-center">
                      <Calendar className="h-4 w-4 mr-2" />
                      {new Date(patient.admissionDate).toLocaleDateString()}
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Medical Staff */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <Stethoscope className="h-5 w-5 mr-2" />
                  Medical Staff
                </CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Attending Doctor</label>
                  <p className="font-medium">{patient.doctor}</p>
                </div>
                <Separator />
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Primary Nurse</label>
                  <p className="font-medium">{patient.nurse}</p>
                </div>
              </CardContent>
            </Card>

            {/* Emergency Contact */}
            <Card>
              <CardHeader>
                <CardTitle>Emergency Contact</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Name</label>
                  <p className="font-medium">{patient.emergencyContact.name}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Relationship</label>
                  <p className="font-medium">{patient.emergencyContact.relationship}</p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Phone</label>
                  <p className="font-medium flex items-center">
                    <Phone className="h-4 w-4 mr-2" />
                    {patient.emergencyContact.phone}
                  </p>
                </div>
                <div>
                  <label className="text-sm font-medium text-muted-foreground">Email</label>
                  <p className="font-medium flex items-center">
                    <Mail className="h-4 w-4 mr-2" />
                    {patient.emergencyContact.email}
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PatientDetail;