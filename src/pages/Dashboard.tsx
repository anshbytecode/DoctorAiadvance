import { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Badge } from '@/components/ui/badge';
import { useAuth } from '@/contexts/AuthContext';
import { useToast } from '@/hooks/use-toast';
import { 
  Calendar, 
  Heart, 
  Activity, 
  Pill, 
  MessageSquare, 
  FileText,
  Clock,
  TrendingUp,
  AlertCircle
} from 'lucide-react';
import { SymptomChecker } from '@/components/SymptomChecker';
import { EnhancedSymptomChecker } from '@/components/EnhancedSymptomChecker';
import { DoctorRecommendations } from '@/components/DoctorRecommendations';
import { HealthEducation } from '@/components/HealthEducation';
import { AIChat } from '@/components/AIChat';
import { HealthRecords } from '@/components/HealthRecords';
import { MedicationTracker } from '@/components/MedicationTracker';
import { VitalsTracker } from '@/components/VitalsTracker';
import { Web3Badges } from '@/components/Web3Badges';
import { Reminders } from '@/components/Reminders';
import { Notifications } from '@/components/Notifications';
import { MedicineSafetyChecker } from '@/components/MedicineSafetyChecker';
import { HospitalLocator } from '@/components/HospitalLocator';
import { DiseasePredictor } from '@/components/DiseasePredictor';
import { HealthReportParser } from '@/components/HealthReportParser';
import { TreatmentPlanGenerator } from '@/components/TreatmentPlanGenerator';
import { MentalHealthScanner } from '@/components/MentalHealthScanner';
import { PersonalHealthProfile } from '@/components/PersonalHealthProfile';

const Dashboard = () => {
  const { user } = useAuth();
  const { toast } = useToast();
  const [activeTab, setActiveTab] = useState('overview');
  const [analysisResult, setAnalysisResult] = useState(null);

  const upcomingAppointments = [
    {
      id: 1,
      doctor: 'Dr. Anand Shinde',
      specialty: 'Family Medicine',
      date: '2024-01-15',
      time: '10:00 AM',
      status: 'confirmed'
    },
    {
      id: 2,
      doctor: 'Dr. Dhruv Bhilare',
      specialty: 'Veterinary',
      date: '2024-01-20',
      time: '2:30 PM',
      status: 'pending'
    }
  ];

  const healthMetrics = [
    { label: 'Blood Pressure', value: '120/80', status: 'normal', icon: Activity },
    { label: 'Heart Rate', value: '72 bpm', status: 'normal', icon: Heart },
    { label: 'Weight', value: '70 kg', status: 'normal', icon: TrendingUp }
  ];

  const medications = [
    { name: 'Aspirin', dosage: '100mg', frequency: 'Once daily', nextDose: '8:00 AM' },
    { name: 'Vitamin D', dosage: '1000 IU', frequency: 'Once daily', nextDose: '9:00 AM' }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Welcome back, {user?.name}!
          </h1>
          <p className="text-gray-600">Here's your health overview</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-6">
          <TabsList className="flex w-full overflow-x-auto">
            <TabsTrigger value="overview">Overview</TabsTrigger>
            <TabsTrigger value="symptoms">Symptom Checker</TabsTrigger>
            <TabsTrigger value="doctors">Find Doctors</TabsTrigger>
            <TabsTrigger value="appointments">Appointments</TabsTrigger>
            <TabsTrigger value="health">Health Records</TabsTrigger>
            <TabsTrigger value="medications">Medications</TabsTrigger>
            <TabsTrigger value="medicine-safety">Medicine Safety</TabsTrigger>
            <TabsTrigger value="disease-predictor">Risk Predictor</TabsTrigger>
            <TabsTrigger value="report-parser">Report Parser</TabsTrigger>
            <TabsTrigger value="hospitals">Hospitals</TabsTrigger>
            <TabsTrigger value="treatment-plan">Treatment Plan</TabsTrigger>
            <TabsTrigger value="mental-health">Mental Health</TabsTrigger>
            <TabsTrigger value="health-profile">Health Profile</TabsTrigger>
            <TabsTrigger value="vitals">Vitals</TabsTrigger>
            <TabsTrigger value="reminders">Reminders</TabsTrigger>
            <TabsTrigger value="notifications">Notifications</TabsTrigger>
            <TabsTrigger value="chat">AI Chat</TabsTrigger>
            <TabsTrigger value="education">Education</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-6">
            <div className="grid md:grid-cols-3 gap-6">
              {healthMetrics.map((metric) => {
                const Icon = metric.icon;
                return (
                  <Card key={metric.label}>
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                      <CardTitle className="text-sm font-medium">{metric.label}</CardTitle>
                      <Icon className="h-4 w-4 text-muted-foreground" />
                    </CardHeader>
                    <CardContent>
                      <div className="text-2xl font-bold">{metric.value}</div>
                      <Badge className="mt-2 bg-green-100 text-green-800">
                        {metric.status}
                      </Badge>
                    </CardContent>
                  </Card>
                );
              })}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Calendar className="h-5 w-5" />
                    <span>Upcoming Appointments</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {upcomingAppointments.length > 0 ? (
                    upcomingAppointments.map((appointment) => (
                      <div key={appointment.id} className="flex items-start justify-between p-4 border rounded-lg">
                        <div>
                          <h4 className="font-semibold">{appointment.doctor}</h4>
                          <p className="text-sm text-gray-600">{appointment.specialty}</p>
                          <div className="flex items-center space-x-4 mt-2 text-sm text-gray-500">
                            <span className="flex items-center">
                              <Clock className="h-3 w-3 mr-1" />
                              {appointment.date} at {appointment.time}
                            </span>
                          </div>
                        </div>
                        <Badge 
                          className={appointment.status === 'confirmed' 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-yellow-100 text-yellow-800'
                          }
                        >
                          {appointment.status}
                        </Badge>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No upcoming appointments</p>
                  )}
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => setActiveTab('appointments')}
                  >
                    View All Appointments
                  </Button>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <Pill className="h-5 w-5" />
                    <span>Current Medications</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {medications.length > 0 ? (
                    medications.map((med, index) => (
                      <div key={index} className="p-4 border rounded-lg">
                        <div className="flex items-start justify-between">
                          <div>
                            <h4 className="font-semibold">{med.name}</h4>
                            <p className="text-sm text-gray-600">{med.dosage} • {med.frequency}</p>
                            <p className="text-xs text-gray-500 mt-1">Next dose: {med.nextDose}</p>
                          </div>
                          <AlertCircle className="h-4 w-4 text-blue-600" />
                        </div>
                      </div>
                    ))
                  ) : (
                    <p className="text-gray-500 text-center py-4">No medications recorded</p>
                  )}
                  <Button 
                    className="w-full" 
                    variant="outline"
                    onClick={() => setActiveTab('medications')}
                  >
                    Manage Medications
                  </Button>
                </CardContent>
              </Card>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <CardTitle className="flex items-center space-x-2">
                    <MessageSquare className="h-5 w-5" />
                    <span>Quick Actions</span>
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid md:grid-cols-3 gap-4">
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => setActiveTab('symptoms')}
                    >
                      <Activity className="h-6 w-6 mb-2" />
                      Check Symptoms
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => setActiveTab('doctors')}
                    >
                      <Calendar className="h-6 w-6 mb-2" />
                      Find Doctors
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => setActiveTab('appointments')}
                    >
                      <FileText className="h-6 w-6 mb-2" />
                      Book Appointment
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => setActiveTab('health')}
                    >
                      <Heart className="h-6 w-6 mb-2" />
                      Health Records
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => setActiveTab('vitals')}
                    >
                      <TrendingUp className="h-6 w-6 mb-2" />
                      Track Vitals
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => setActiveTab('chat')}
                    >
                      <MessageSquare className="h-6 w-6 mb-2" />
                      AI Chat
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => setActiveTab('medicine-safety')}
                    >
                      <Pill className="h-6 w-6 mb-2" />
                      Medicine Safety
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => setActiveTab('disease-predictor')}
                    >
                      <Activity className="h-6 w-6 mb-2" />
                      Risk Predictor
                    </Button>
                    <Button 
                      variant="outline" 
                      className="h-20 flex-col"
                      onClick={() => setActiveTab('hospitals')}
                    >
                      <FileText className="h-6 w-6 mb-2" />
                      Find Hospitals
                    </Button>
                  </div>
                </CardContent>
              </Card>

              <Web3Badges />
            </div>
          </TabsContent>

          <TabsContent value="symptoms">
            <EnhancedSymptomChecker 
              onAnalysisComplete={setAnalysisResult}
              onNavigateToDoctor={() => setActiveTab('doctors')}
            />
          </TabsContent>

          <TabsContent value="doctors">
            <DoctorRecommendations analysisResult={analysisResult} />
          </TabsContent>

          <TabsContent value="appointments">
            <Card>
              <CardHeader>
                <CardTitle>Appointment Management</CardTitle>
                <CardDescription>View and manage your appointments</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment) => (
                    <div key={appointment.id} className="p-4 border rounded-lg">
                      <div className="flex items-start justify-between">
                        <div>
                          <h4 className="font-semibold">{appointment.doctor}</h4>
                          <p className="text-sm text-gray-600">{appointment.specialty}</p>
                          <p className="text-sm text-gray-500 mt-1">
                            {appointment.date} at {appointment.time}
                          </p>
                        </div>
                        <div className="flex space-x-2">
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Reschedule appointment",
                                description: `Reschedule feature for ${appointment.doctor} coming soon`,
                              });
                            }}
                          >
                            Reschedule
                          </Button>
                          <Button 
                            variant="outline" 
                            size="sm"
                            onClick={() => {
                              toast({
                                title: "Appointment cancelled",
                                description: `Appointment with ${appointment.doctor} has been cancelled`,
                              });
                            }}
                          >
                            Cancel
                          </Button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="health">
            <HealthRecords />
          </TabsContent>

          <TabsContent value="medications">
            <MedicationTracker />
          </TabsContent>

          <TabsContent value="medicine-safety">
            <MedicineSafetyChecker />
          </TabsContent>

          <TabsContent value="disease-predictor">
            <DiseasePredictor />
          </TabsContent>

          <TabsContent value="report-parser">
            <HealthReportParser />
          </TabsContent>

          <TabsContent value="hospitals">
            <HospitalLocator />
          </TabsContent>

          <TabsContent value="treatment-plan">
            <TreatmentPlanGenerator />
          </TabsContent>

          <TabsContent value="mental-health">
            <MentalHealthScanner />
          </TabsContent>

          <TabsContent value="health-profile">
            <PersonalHealthProfile />
          </TabsContent>

          <TabsContent value="vitals">
            <VitalsTracker />
          </TabsContent>

          <TabsContent value="reminders">
            <Reminders />
          </TabsContent>

          <TabsContent value="notifications">
            <Notifications />
          </TabsContent>

          <TabsContent value="chat">
            <div className="max-w-4xl mx-auto">
              <AIChat />
            </div>
          </TabsContent>

          <TabsContent value="education">
            <HealthEducation />
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Dashboard;

