'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, PieChart, Pie, Cell } from 'recharts';

interface CareTeamMember {
  name: string;
  role: string;
  specialty?: string;
}

interface IncidentReport {
  date: string;
  type: string;
  severity: 'low' | 'medium' | 'high';
  description: string;
  status: 'resolved' | 'investigating' | 'monitoring';
}

interface Patient {
  name: string;
  age: number;
  primaryConcern: string;
  lastVisit: string;
  nextAppointment: string;
  careTeam: CareTeamMember[];
  medications: {
    name: string;
    dosage: string;
    frequency: string;
  }[];
  recentActivity: {
    date: string;
    type: string;
    details: string;
  }[];
  incidentReports: IncidentReport[];
}

interface CardiacEvent {
  id: string;
  date: string;
  time: string;
  type: 'arrhythmia' | 'chest_pain' | 'palpitations' | 'shortness_breath' | 'fatigue' | 'dizziness' | 'other';
  severity: 'mild' | 'moderate' | 'severe' | 'critical';
  duration: string;
  triggers?: string[];
  symptoms: string[];
  vitals: {
    heartRate?: number;
    bloodPressure?: string;
    oxygen?: number;
  };
  notes: string;
  resolved: boolean;
}

interface TrendAnalysis {
  overallTrend: 'improving' | 'stable' | 'declining';
  eventFrequency: number;
  severityTrend: 'decreasing' | 'stable' | 'increasing';
  primaryTriggers: string[];
  recommendations: string[];
  aiAnalysis: string;
  lastUpdated: string;
}

export default function HealthHome() {
  const [mounted, setMounted] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'1week' | '1month' | '3months' | '6months'>('1month');

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div>Loading dashboard...</div>;
  }

  const allCardiacEvents: CardiacEvent[] = [
    { id: '1', date: '2023-11-20', time: '14:30', type: 'arrhythmia', severity: 'moderate', duration: '15 minutes', triggers: ['stress', 'caffeine'], symptoms: ['irregular heartbeat', 'chest discomfort'], vitals: { heartRate: 95, bloodPressure: '130/85', oxygen: 98 }, notes: 'Felt skipped beats during work meeting', resolved: true },
    { id: '2', date: '2023-11-18', time: '22:15', type: 'palpitations', severity: 'mild', duration: '5 minutes', triggers: ['lying down'], symptoms: ['racing heart'], vitals: { heartRate: 88, bloodPressure: '125/82', oxygen: 99 }, notes: 'Occasional fluttering sensation', resolved: true },
    { id: '3', date: '2023-11-15', time: '09:45', type: 'chest_pain', severity: 'severe', duration: '30 minutes', triggers: ['physical exertion'], symptoms: ['sharp chest pain', 'shortness of breath'], vitals: { heartRate: 110, bloodPressure: '140/90', oxygen: 96 }, notes: 'Emergency room visit required', resolved: true },
    { id: '4', date: '2023-11-10', time: '16:20', type: 'arrhythmia', severity: 'mild', duration: '10 minutes', triggers: ['stress'], symptoms: ['irregular heartbeat'], vitals: { heartRate: 82, bloodPressure: '128/80', oxygen: 98 }, notes: 'Stress from school', resolved: true },
    { id: '5', date: '2023-11-05', time: '11:30', type: 'dizziness', severity: 'moderate', duration: '20 minutes', triggers: ['standing up quickly'], symptoms: ['lightheadedness', 'nausea'], vitals: { heartRate: 78, bloodPressure: '115/75', oxygen: 97 }, notes: 'Felt dizzy after standing', resolved: true },
    { id: '6', date: '2023-10-28', time: '19:45', type: 'fatigue', severity: 'mild', duration: '2 hours', triggers: ['overexertion'], symptoms: ['extreme tiredness', 'weakness'], vitals: { heartRate: 75, bloodPressure: '120/78', oxygen: 98 }, notes: 'Could barely get out of bed', resolved: true },
    { id: '7', date: '2023-10-15', time: '13:15', type: 'chest_pain', severity: 'moderate', duration: '15 minutes', triggers: ['anxiety'], symptoms: ['tightness in chest'], vitals: { heartRate: 92, bloodPressure: '135/85', oxygen: 97 }, notes: 'Anxiety attack', resolved: true },
    { id: '8', date: '2023-10-10', time: '08:30', type: 'shortness_breath', severity: 'severe', duration: '25 minutes', triggers: ['exercise'], symptoms: ['difficulty breathing', 'wheezing'], vitals: { heartRate: 105, bloodPressure: '138/88', oxygen: 94 }, notes: 'Could not catch breath during walk', resolved: true },
    { id: '9', date: '2023-09-25', time: '15:45', type: 'palpitations', severity: 'mild', duration: '8 minutes', triggers: ['caffeine'], symptoms: ['heart racing'], vitals: { heartRate: 85, bloodPressure: '122/80', oxygen: 99 }, notes: 'After drinking coffee', resolved: true },
    { id: '10', date: '2023-09-20', time: '10:20', type: 'arrhythmia', severity: 'moderate', duration: '12 minutes', triggers: ['stress'], symptoms: ['skipped beats'], vitals: { heartRate: 90, bloodPressure: '130/82', oxygen: 98 }, notes: 'During exam at school', resolved: true },
    { id: '11', date: '2023-09-15', time: '18:30', type: 'dizziness', severity: 'mild', duration: '15 minutes', triggers: ['dehydration'], symptoms: ['lightheaded'], vitals: { heartRate: 80, bloodPressure: '118/75', oxygen: 98 }, notes: 'Did not drink enough water', resolved: true },
    { id: '12', date: '2023-09-10', time: '14:00', type: 'fatigue', severity: 'moderate', duration: '3 hours', triggers: ['lack of sleep'], symptoms: ['exhaustion'], vitals: { heartRate: 72, bloodPressure: '116/76', oxygen: 98 }, notes: 'Could not stay awake', resolved: true },
    { id: '13', date: '2023-08-25', time: '12:15', type: 'chest_pain', severity: 'mild', duration: '10 minutes', triggers: ['emotional stress'], symptoms: ['chest tightness'], vitals: { heartRate: 88, bloodPressure: '125/80', oxygen: 98 }, notes: 'After argument with friend', resolved: true },
    { id: '14', date: '2023-08-20', time: '09:00', type: 'shortness_breath', severity: 'moderate', duration: '20 minutes', triggers: ['allergies'], symptoms: ['difficulty breathing'], vitals: { heartRate: 95, bloodPressure: '132/84', oxygen: 95 }, notes: 'Seasonal allergies acting up', resolved: true },
    { id: '15', date: '2023-08-15', time: '16:45', type: 'palpitations', severity: 'mild', duration: '6 minutes', triggers: ['sugar'], symptoms: ['heart fluttering'], vitals: { heartRate: 83, bloodPressure: '120/78', oxygen: 99 }, notes: 'After eating candy', resolved: true },
    { id: '16', date: '2023-07-28', time: '11:30', type: 'arrhythmia', severity: 'severe', duration: '35 minutes', triggers: ['heat'], symptoms: ['irregular rhythm', 'weakness'], vitals: { heartRate: 115, bloodPressure: '142/90', oxygen: 96 }, notes: 'Playing outside in hot weather', resolved: true },
    { id: '17', date: '2023-07-20', time: '13:45', type: 'dizziness', severity: 'moderate', duration: '18 minutes', triggers: ['standing quickly'], symptoms: ['vertigo'], vitals: { heartRate: 78, bloodPressure: '115/75', oxygen: 97 }, notes: 'Felt like room was spinning', resolved: true },
    { id: '18', date: '2023-07-15', time: '10:15', type: 'fatigue', severity: 'mild', duration: '4 hours', triggers: ['overexertion'], symptoms: ['extreme tiredness'], vitals: { heartRate: 70, bloodPressure: '114/74', oxygen: 98 }, notes: 'After sports practice', resolved: true },
    { id: '19', date: '2023-06-25', time: '15:20', type: 'chest_pain', severity: 'moderate', duration: '22 minutes', triggers: ['anxiety'], symptoms: ['chest pressure'], vitals: { heartRate: 98, bloodPressure: '136/86', oxygen: 97 }, notes: 'Before presentation', resolved: true },
    { id: '20', date: '2023-06-20', time: '08:45', type: 'shortness_breath', severity: 'mild', duration: '12 minutes', triggers: ['exercise'], symptoms: ['mild breathlessness'], vitals: { heartRate: 88, bloodPressure: '124/80', oxygen: 98 }, notes: 'During morning jog', resolved: true }
  ];

  const getFilteredData = () => {
    const now = new Date('2023-11-20');
    const startDate = new Date(now);
    
    switch (selectedTimeRange) {
      case '1week':
        startDate.setDate(now.getDate() - 7);
        break;
      case '1month':
        startDate.setMonth(now.getMonth() - 1);
        break;
      case '3months':
        startDate.setMonth(now.getMonth() - 3);
        break;
      case '6months':
        startDate.setMonth(now.getMonth() - 6);
        break;
    }
    
    return allCardiacEvents.filter(event => new Date(event.date) >= startDate);
  };

  const filteredCardiacEvents = getFilteredData();

  const calculateTrendAnalysis = (): TrendAnalysis => {
    const eventCount = filteredCardiacEvents.length;
    const daysInPeriod = selectedTimeRange === '1week' ? 7 : selectedTimeRange === '1month' ? 30 : selectedTimeRange === '3months' ? 90 : 180;
    const eventsPerWeek = (eventCount / daysInPeriod) * 7;
    
    const severityCounts = filteredCardiacEvents.reduce((acc, event) => {
      acc[event.severity] = (acc[event.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const severeEvents = (severityCounts.severe || 0) + (severityCounts.critical || 0);
    const totalEvents = eventCount;
    const severityRatio = totalEvents > 0 ? severeEvents / totalEvents : 0;
    
    const overallTrend = eventsPerWeek > 5 ? 'declining' : eventsPerWeek > 2 ? 'stable' : 'improving';
    const severityTrend = severityRatio > 0.3 ? 'increasing' : severityRatio > 0.15 ? 'stable' : 'decreasing';
    
    const allTriggers = filteredCardiacEvents.flatMap(event => event.triggers || []);
    const triggerCounts = allTriggers.reduce((acc, trigger) => {
      acc[trigger] = (acc[trigger] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const primaryTriggers = Object.entries(triggerCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([trigger]) => trigger);
    
    return {
      overallTrend,
      eventFrequency: Math.round(eventsPerWeek * 10) / 10,
      severityTrend,
      primaryTriggers,
      recommendations: [
        'Consider cardiac rehabilitation program',
        'Implement stress management techniques',
        'Review medication timing with cardiologist',
        'Monitor for arrhythmia triggers'
      ],
      aiAnalysis: `Analysis of ${eventCount} cardiac events over ${selectedTimeRange.replace('1', '1 ')} shows ${eventsPerWeek.toFixed(1)} events per week with ${severityRatio > 0.3 ? 'high' : severityRatio > 0.15 ? 'moderate' : 'low'} severity ratio. Primary triggers identified: ${primaryTriggers.join(', ')}. ${severityTrend === 'increasing' ? 'Severity is worsening - immediate medical review recommended.' : 'Condition appears stable with current treatment.'}`,
      lastUpdated: new Date().toLocaleDateString()
    };
  };

  const trendAnalysis = calculateTrendAnalysis();

  const generateVitalSignsData = () => {
    const vitalData = filteredCardiacEvents.map(event => ({
      date: new Date(event.date).toLocaleDateString('en-US', { month: 'short', day: 'numeric' }),
      heartRate: event.vitals.heartRate || 0,
      bloodPressure: parseInt(event.vitals.bloodPressure?.split('/')[0] || '0'),
      temperature: 98.6
    }));
    
    return vitalData
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(-10);
  };

  const vitalSignsData = generateVitalSignsData();

  const medicationAdherenceData = [
    { name: 'Ibuprofen', taken: 85, missed: 15 },
    { name: 'Acetaminophen', taken: 92, missed: 8 },
  ];

  const incidentSeverityData = (() => {
    const severityCounts = filteredCardiacEvents.reduce((acc, event) => {
      const severity = event.severity === 'critical' ? 'High' : event.severity === 'severe' ? 'High' : event.severity === 'moderate' ? 'Medium' : 'Low';
      acc[severity] = (acc[severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    return [
      { name: 'Low', value: severityCounts.Low || 0, color: '#22C55E' },
      { name: 'Medium', value: severityCounts.Medium || 0, color: '#F97316' },
      { name: 'High', value: severityCounts.High || 0, color: '#EF4444' },
    ];
  })();

  const patient: Patient = {
    name: 'Ethan Alvarez',
    age: 12,
    primaryConcern: 'Neuroinflammatory condition with cardiac involvement',
    lastVisit: '2 weeks ago',
    nextAppointment: 'In 2 weeks',
    careTeam: [
      { 
        name: 'Dr. S. Patel', 
        role: 'Neurologist',
        specialty: 'Pediatric Neurology'
      },
      { 
        name: 'Dr. A. Nguyen', 
        role: 'Pediatrician',
        specialty: 'General Pediatrics'
      }
    ],
    medications: [
      {
        name: 'Ibuprofen',
        dosage: '200mg',
        frequency: 'Every 6 hours as needed'
      },
      {
        name: 'Acetaminophen',
        dosage: '325mg',
        frequency: 'Every 4-6 hours as needed'
      }
    ],
    recentActivity: [
      {
        date: '2023-11-15',
        type: 'Appointment',
        details: 'Follow-up with Dr. Patel'
      },
      {
        date: '2023-11-10',
        type: 'Medication',
        details: 'Prescription refill: Ibuprofen'
      }
    ],
    incidentReports: [
      {
        date: '2023-11-12',
        type: 'Medication Reaction',
        severity: 'medium',
        description: 'Mild rash appeared after starting new medication',
        status: 'monitoring'
      },
      {
        date: '2023-10-28',
        type: 'Symptom Flare-up',
        severity: 'high',
        description: 'Increased neuroinflammatory symptoms reported',
        status: 'investigating'
      }
    ]
  };

  const handleAnalyzeWithAI = () => {
    const eventCount = filteredCardiacEvents.length;
    const eventsPerWeek = trendAnalysis.eventFrequency;
    alert(`AI Analysis: Based on ${eventCount} cardiac events over ${selectedTimeRange.replace('1', '1 ')} showing ${eventsPerWeek} events per week, ${trendAnalysis.severityTrend === 'increasing' ? 'severity is worsening' : 'condition appears stable'}. Primary triggers: ${trendAnalysis.primaryTriggers.join(', ')}.`);
  };

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Cardiac Monitoring Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Ethan Alvarez - Critical Watch Status</p>
          </div>
          <div className="flex items-center space-x-4">
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg">
              <span className="font-semibold">HIGH ALERT</span>
              <span className="block text-xs">{trendAnalysis.eventFrequency}/week</span>
            </div>
            <button 
              onClick={handleAnalyzeWithAI}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              AI Analysis
            </button>
          </div>
        </div>

        <div className="flex space-x-2 mb-6">
          {(['1week', '1month', '3months', '6months'] as const).map((range) => (
            <button
              key={range}
              onClick={() => setSelectedTimeRange(range)}
              className={`px-4 py-2 rounded-lg capitalize ${
                selectedTimeRange === range
                  ? 'bg-blue-600 text-white'
                  : 'bg-white text-gray-700 border border-gray-300'
              }`}
            >
              {range.replace('1', '1 ')}
            </button>
          ))}
        </div>

        <div className="bg-red-50 border border-red-200 rounded-xl p-6 mb-6">
          <div className="flex justify-between items-center mb-3">
            <h2 className="text-xl font-bold text-red-800">AI Trend Analysis Summary</h2>
            <button 
              onClick={handleAnalyzeWithAI}
              className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700"
            >
              AI Analysis
            </button>
          </div>
          <p className="text-red-700 mb-4">{trendAnalysis.aiAnalysis}</p>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-500">Overall Trend</div>
              <div className="text-lg font-bold text-red-600">{trendAnalysis.overallTrend.toUpperCase()}</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-500">Event Frequency</div>
              <div className="text-lg font-bold text-red-600">{trendAnalysis.eventFrequency}/week</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-500">Severity Trend</div>
              <div className="text-lg font-bold text-red-600">{trendAnalysis.severityTrend.toUpperCase()}</div>
            </div>
            <div className="bg-white rounded-lg p-3">
              <div className="text-sm text-gray-500">Primary Triggers</div>
              <div className="text-sm font-bold text-red-600">{trendAnalysis.primaryTriggers.join(', ')}</div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-3 space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Vital Signs Trend</h2>
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={vitalSignsData}>
                  <CartesianGrid strokeDasharray="3 3" />
                  <XAxis dataKey="date" />
                  <YAxis />
                  <Tooltip />
                  <Line type="monotone" dataKey="heartRate" stroke="#3B82F6" name="Heart Rate" strokeWidth={2} />
                  <Line type="monotone" dataKey="bloodPressure" stroke="#10B981" name="Blood Pressure" strokeWidth={2} />
                </LineChart>
              </ResponsiveContainer>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Medication Adherence</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <BarChart data={medicationAdherenceData}>
                    <CartesianGrid strokeDasharray="3 3" />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar dataKey="taken" fill="#22C55E" name="Taken (%)" />
                    <Bar dataKey="missed" fill="#EF4444" name="Missed (%)" />
                  </BarChart>
                </ResponsiveContainer>
              </div>

              <div className="bg-white rounded-xl shadow-sm p-6">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Incident Severity Distribution</h2>
                <ResponsiveContainer width="100%" height={250}>
                  <PieChart>
                    <Pie
                      data={incidentSeverityData}
                      cx="50%"
                      cy="50%"
                      outerRadius={80}
                      dataKey="value"
                      label
                    >
                      {incidentSeverityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
            </div>
          </div>

          <div className="space-y-6 lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Patient Overview</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Full Name</h3>
                    <p className="mt-1 text-gray-900">{patient.name}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Age</h3>
                    <p className="mt-1 text-gray-900">{patient.age} years</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Primary Concern</h3>
                    <p className="mt-1 text-gray-900">{patient.primaryConcern}</p>
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Last Visit</h3>
                    <p className="mt-1 text-gray-900">{patient.lastVisit}</p>
                  </div>
                  <div>
                    <h3 className="text-sm font-medium text-gray-500">Next Appointment</h3>
                    <p className="mt-1 text-gray-900 font-medium text-blue-600">
                      {patient.nextAppointment}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Cardiac Events Timeline ({filteredCardiacEvents.length} events)</h2>
              </div>
              
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {filteredCardiacEvents.map((event) => {
                  const severityColors = {
                    mild: 'bg-green-100 text-green-800 border-green-200',
                    moderate: 'bg-yellow-100 text-yellow-800 border-yellow-200',
                    severe: 'bg-orange-100 text-orange-800 border-orange-200',
                    critical: 'bg-red-100 text-red-800 border-red-200'
                  };
                  
                  return (
                    <div key={event.id} className={`border rounded-lg p-4 ${severityColors[event.severity]}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold capitalize">{event.type.replace('_', ' ')}</span>
                            <span className="text-sm opacity-75">{event.severity.toUpperCase()}</span>
                          </div>
                          <div className="text-sm opacity-75">
                            {event.date} at {event.time} • {event.duration}
                          </div>
                        </div>
                      </div>
                      
                      <div className="mb-2">
                        <div className="text-sm font-medium mb-1">Symptoms:</div>
                        <div className="text-sm">{event.symptoms.join(', ')}</div>
                      </div>
                      
                      {event.triggers && event.triggers.length > 0 && (
                        <div className="mb-2">
                          <div className="text-sm font-medium mb-1">Triggers:</div>
                          <div className="text-sm">{event.triggers.join(', ')}</div>
                        </div>
                      )}
                      
                      <div className="text-xs mb-2">
                        HR: {event.vitals.heartRate} • BP: {event.vitals.bloodPressure} • O2: {event.vitals.oxygen}%
                      </div>
                      
                      <div className="text-sm italic">"{event.notes}"</div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold mb-4 text-gray-800">Care Team</h2>
              <div className="space-y-4">
                {patient.careTeam.map((member, index) => (
                  <div key={index} className="flex items-start space-x-3">
                    <div className="flex-shrink-0 h-10 w-10 rounded-full bg-blue-100 flex items-center justify-center">
                      <span className="text-blue-600 font-medium">
                        {member.name.split(' ').map(n => n[0]).join('')}
                      </span>
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-sm font-medium text-gray-900">{member.name}</p>
                      <p className="text-sm text-gray-500">{member.role}</p>
                      {member.specialty && (
                        <p className="text-xs text-gray-400">{member.specialty}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Medications</h2>
              </div>
              <div className="space-y-4">
                {patient.medications.map((med, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex justify-between">
                      <div>
                        <p className="text-sm font-medium text-gray-900">{med.name}</p>
                        <p className="text-sm text-gray-500">{med.dosage}</p>
                      </div>
                      <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
                        {med.frequency}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-xl p-6">
              <h2 className="text-xl font-semibold text-blue-800 mb-4">AI Recommendations</h2>
              <ul className="space-y-2">
                {trendAnalysis.recommendations.map((rec, index) => (
                  <li key={index} className="flex items-start">
                    <span className="text-blue-600 mr-2">•</span>
                    <span className="text-sm text-blue-700">{rec}</span>
                  </li>
                ))}
              </ul>
              <div className="mt-4 text-xs text-blue-600">
                Last analyzed: {trendAnalysis.lastUpdated}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
