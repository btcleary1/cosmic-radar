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
  type: 'arrhythmia' | 'chest_pain' | 'palpitations' | 'shortness_breath' | 'fatigue' | 'dizziness' | 'cardiac_arrest' | 'other';
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
  cprRequired?: boolean;
  cprDuration?: string;
  medicalResponse?: {
    calledEMS: boolean;
    emsResponseTime: string;
    hospitalTransport: boolean;
    defibrillatorUsed: boolean;
  };
  parentNotes?: {
    beforeEvent: string;
    duringEvent: string;
    afterEvent: string;
    observations: string;
    emotionalState: string;
    activitiesPrior: string;
    medicationsGiven: string;
    followUpActions: string;
  };
}

interface DoctorVisit {
  id: string;
  date: string;
  doctor: string;
  visitType: 'routine' | 'emergency' | 'follow_up';
  personalNotes: string;
  doctorNotes: string;
  diagnosis?: string;
  treatment: string[];
  medicationsChanged: boolean;
  cardiacEventsDuringVisit: number;
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

export default function HealthDashboard() {
  const [mounted, setMounted] = useState(false);
  const [showNewEventForm, setShowNewEventForm] = useState(false);
  const [showVisitForm, setShowVisitForm] = useState(false);
  const [selectedTimeRange, setSelectedTimeRange] = useState<'1week' | '1month' | '3months' | '6months'>('1month');
  const [newEvent, setNewEvent] = useState<Partial<CardiacEvent>>({
    date: new Date().toISOString().split('T')[0],
    time: new Date().toTimeString().slice(0, 5),
    type: 'other',
    severity: 'mild',
    duration: '',
    symptoms: [],
    triggers: [],
    vitals: { heartRate: 0, bloodPressure: '', oxygen: 0 },
    notes: '',
    cprRequired: false,
    parentNotes: {
      beforeEvent: '',
      duringEvent: '',
      afterEvent: '',
      observations: '',
      emotionalState: '',
      activitiesPrior: '',
      medicationsGiven: '',
      followUpActions: ''
    }
  });

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleMessageClick = (memberName: string) => {
    alert(`Opening message composer for ${memberName}...`);
  };

  const handleViewDetails = (incidentType: string, incidentDate: string) => {
    alert(`Viewing details for ${incidentType} from ${incidentDate}`);
  };

  const handleAddCardiacEvent = () => {
    setShowNewEventForm(true);
  };

  const handleAddVisitNotes = () => {
    setShowVisitForm(true);
  };

  const handleSaveEvent = () => {
    alert('Event saved successfully! In production, this would be stored in database.');
    setShowNewEventForm(false);
    setNewEvent({
      date: new Date().toISOString().split('T')[0],
      time: new Date().toTimeString().slice(0, 5),
      type: 'other',
      severity: 'mild',
      duration: '',
      symptoms: [],
      triggers: [],
      vitals: { heartRate: 0, bloodPressure: '', oxygen: 0 },
      notes: '',
      cprRequired: false,
      parentNotes: {
        beforeEvent: '',
        duringEvent: '',
        afterEvent: '',
        observations: '',
        emotionalState: '',
        activitiesPrior: '',
        medicationsGiven: '',
        followUpActions: ''
      }
    });
  };

  const handleCancelEvent = () => {
    setShowNewEventForm(false);
  };

  const updateNewEvent = (field: string, value: any) => {
    setNewEvent(prev => ({ ...prev, [field]: value }));
  };

  const updateParentNotes = (field: string, value: string) => {
    setNewEvent(prev => ({
      ...prev,
      parentNotes: { ...(prev.parentNotes || {}), [field]: value } as any
    }));
  };

  const handleAnalyzeWithAI = () => {
    const eventCount = filteredCardiacEvents.length;
    const eventsPerWeek = trendAnalysis.eventFrequency;
    alert(`AI Analysis: Based on ${eventCount} cardiac events over ${selectedTimeRange.replace('1', '1 ')} showing ${eventsPerWeek} events per week, ${trendAnalysis.severityTrend === 'increasing' ? 'severity is worsening' : 'condition appears stable'}. Primary triggers: ${trendAnalysis.primaryTriggers.join(', ')}.`);
  };

  if (!mounted) {
    return <div>Loading dashboard...</div>;
  }

  const allCardiacEvents: CardiacEvent[] = [
    { id: '1', date: '2023-11-20', time: '14:30', type: 'cardiac_arrest', severity: 'critical', duration: '45 minutes', triggers: ['physical exertion'], symptoms: ['sudden collapse', 'no pulse', 'unresponsive'], vitals: { heartRate: 0, bloodPressure: '0/0', oxygen: 85 }, notes: 'Sudden cardiac arrest during PE class - CPR performed for 8 minutes', resolved: true, cprRequired: true, cprDuration: '8 minutes', medicalResponse: { calledEMS: true, emsResponseTime: '6 minutes', hospitalTransport: true, defibrillatorUsed: true }, parentNotes: {
      beforeEvent: 'Child was excited about PE class, had normal breakfast, seemed healthy',
      duringEvent: 'Suddenly collapsed during running exercise, turned blue, no breathing, immediately started CPR',
      afterEvent: 'Child was confused but responsive after EMS arrived, transported to hospital',
      observations: 'Other kids said he seemed normal before collapse, no warning signs',
      emotionalState: 'Happy and energetic before event, scared and confused after',
      activitiesPrior: 'PE class - running laps, normal school day',
      medicationsGiven: 'Emergency epinephrine by EMS',
      followUpActions: 'Hospitalized for 3 days, now has ICD implant scheduled'
    }},
    { id: '2', date: '2023-11-18', time: '22:15', type: 'palpitations', severity: 'mild', duration: '5 minutes', triggers: ['lying down'], symptoms: ['racing heart'], vitals: { heartRate: 88, bloodPressure: '125/82', oxygen: 99 }, notes: 'Occasional fluttering sensation', resolved: true, parentNotes: {
      beforeEvent: 'Watching bedtime story, calm and relaxed',
      duringEvent: 'Complained of heart racing, seemed anxious',
      afterEvent: 'Symptoms resolved on their own, child fell asleep normally',
      observations: 'No visible distress, just verbal complaint',
      emotionalState: 'Calm before, slightly anxious during, normal after',
      activitiesPrior: 'Quiet evening routine, no excitement',
      medicationsGiven: 'None needed',
      followUpActions: 'Documented in symptom diary'
    }},
    { id: '3', date: '2023-11-15', time: '10:30', type: 'arrhythmia', severity: 'moderate', duration: '15 minutes', triggers: ['stress'], symptoms: ['irregular heartbeat', 'dizziness'], vitals: { heartRate: 120, bloodPressure: '140/90', oxygen: 96 }, notes: 'Irregular heartbeat during math test', resolved: true, parentNotes: {
      beforeEvent: 'Stressed about upcoming math test, seemed anxious',
      duringEvent: 'Complained of heart fluttering, looked pale',
      afterEvent: 'Symptoms subsided after resting, returned to class',
      observations: 'Teacher noticed child was holding chest',
      emotionalState: 'Anxious before, scared during, relieved after',
      activitiesPrior: 'Taking math test at school',
      medicationsGiven: 'None needed',
      followUpActions: 'Teacher notified, parents called'
    }},
    { id: '4', date: '2023-11-12', time: '16:45', type: 'dizziness', severity: 'mild', duration: '10 minutes', triggers: ['standing up quickly'], symptoms: ['lightheadedness', 'nausea'], vitals: { heartRate: 95, bloodPressure: '110/70', oxygen: 98 }, notes: 'Felt dizzy when standing up from chair', resolved: true, parentNotes: {
      beforeEvent: 'Sitting watching TV, seemed fine',
      duringEvent: 'Stood up quickly, felt dizzy, had to sit back down',
      afterEvent: 'Recovered after a few minutes of rest',
      observations: 'No loss of consciousness, just brief dizziness',
      emotionalState: 'Normal before, briefly concerned during',
      activitiesPrior: 'Watching TV after school',
      medicationsGiven: 'None needed',
      followUpActions: 'Monitored for 30 minutes, no further issues'
    }},
    { id: '5', date: '2023-11-10', time: '19:20', type: 'chest_pain', severity: 'moderate', duration: '20 minutes', triggers: ['emotional upset'], symptoms: ['chest tightness', 'shortness of breath'], vitals: { heartRate: 110, bloodPressure: '135/85', oxygen: 97 }, notes: 'Chest pain after argument with sibling', resolved: true, parentNotes: {
      beforeEvent: 'Had argument with sibling, was upset and crying',
      duringEvent: 'Complained of chest feeling tight, breathing difficulty',
      afterEvent: 'Symptoms improved after calming down and deep breathing',
      observations: 'Child was visibly upset before symptoms started',
      emotionalState: 'Upset before, scared during, calm after',
      activitiesPrior: 'Family disagreement at home',
      medicationsGiven: 'None needed',
      followUpActions: 'Family discussion about conflict resolution'
    }}
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
    
    const cprEvents = filteredCardiacEvents.filter(event => event.cprRequired);
    const cprCount = cprEvents.length;
    const cprPerWeek = (cprCount / daysInPeriod) * 7;
    const avgCprDuration = cprEvents.length > 0 
      ? cprEvents.reduce((sum, event) => {
          const minutes = parseInt(event.cprDuration?.split(' ')[0] || '0');
          return sum + minutes;
        }, 0) / cprEvents.length
      : 0;
    
    const severityCounts = filteredCardiacEvents.reduce((acc, event) => {
      acc[event.severity] = (acc[event.severity] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    
    const severeEvents = (severityCounts.severe || 0) + (severityCounts.critical || 0);
    const totalEvents = eventCount;
    const severityRatio = totalEvents > 0 ? severeEvents / totalEvents : 0;
    
    const overallTrend = cprPerWeek > 1 ? 'declining' : eventsPerWeek > 3 ? 'declining' : eventsPerWeek > 1 ? 'stable' : 'improving';
    const severityTrend = severityRatio > 0.4 || cprPerWeek > 0.5 ? 'increasing' : severityRatio > 0.2 ? 'stable' : 'decreasing';
    
    const allTriggers = filteredCardiacEvents.flatMap(event => event.triggers || []);
    const triggerCounts = allTriggers.reduce((acc, trigger) => {
      acc[trigger] = (acc[trigger] || 0) + 1;
      return acc;
    }, {} as Record<string, number>);
    const primaryTriggers = Object.entries(triggerCounts)
      .sort(([,a], [,b]) => b - a)
      .slice(0, 3)
      .map(([trigger]) => trigger);
    
    const recommendations = [
      cprCount > 0 ? `URGENT: ${cprCount} CPR events in ${selectedTimeRange.replace('1', '1 ')} - immediate device therapy evaluation needed` : 'Continue current treatment plan',
      'Implantable Cardioverter-Defibrillator (ICD) consultation recommended',
      'Family and school CPR training completed',
      'Emergency action plan distributed to all caregivers',
      'Consider beta-blocker dosage adjustment',
      'Restrict high-intensity physical activities',
      '24/7 cardiac monitoring consideration'
    ];
    
    return {
      overallTrend,
      eventFrequency: Math.round(eventsPerWeek * 10) / 10,
      severityTrend,
      primaryTriggers,
      recommendations,
      aiAnalysis: `CRITICAL ASSESSMENT: ${cprCount} cardiac arrests requiring CPR in ${selectedTimeRange.replace('1', '1 ')} (${cprPerWeek.toFixed(1)} per week). Average CPR duration: ${avgCprDuration.toFixed(1)} minutes. ${cprCount > 0 ? 'This pattern indicates high-risk condition requiring immediate intervention. ICD implantation strongly recommended to prevent sudden cardiac death.' : 'No CPR events in selected period - continue current management.'} Overall event frequency: ${eventsPerWeek.toFixed(1)} per week with ${severityRatio > 0.4 ? 'critically high' : severityRatio > 0.2 ? 'elevated' : 'manageable'} severity ratio. Primary triggers: ${primaryTriggers.join(', ')}.`,
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
    age: 7,
    primaryConcern: 'Life-threatening cardiac arrhythmias requiring frequent CPR - suspected Long QT Syndrome',
    lastVisit: '2 days ago',
    nextAppointment: 'Tomorrow',
    careTeam: [
      { 
        name: 'Dr. S. Patel', 
        role: 'Pediatric Cardiologist',
        specialty: 'Electrophysiology & Sudden Cardiac Death Prevention'
      },
      { 
        name: 'Dr. A. Nguyen', 
        role: 'Pediatric Critical Care',
        specialty: 'Emergency Medicine & Resuscitation'
      },
      {
        name: 'Dr. M. Johnson',
        role: 'Genetic Counselor',
        specialty: 'Inherited Cardiac Conditions'
      }
    ],
    medications: [
      {
        name: 'Propranolol',
        dosage: '10mg',
        frequency: 'Three times daily'
      },
      {
        name: 'Mexiletine',
        dosage: '50mg',
        frequency: 'Every 8 hours'
      },
      {
        name: 'Emergency Epinephrine Auto-Injector',
        dosage: '0.15mg',
        frequency: 'As needed for cardiac arrest'
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

  const cprEvents = filteredCardiacEvents.filter(event => event.cprRequired);
  const cprCount = cprEvents.length;

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-6">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Pediatric Cardiac Emergency Dashboard</h1>
            <p className="text-sm text-gray-500 mt-1">Ethan Alvarez (Age 7) - LIFE-THREATENING CONDITION</p>
          </div>
          <div className="flex items-center space-x-4">
            {cprCount > 0 && (
              <div className="bg-red-600 border border-red-800 text-white px-4 py-2 rounded-lg">
                <span className="font-bold">CPR EVENTS: {cprCount}</span>
                <span className="block text-xs">In {selectedTimeRange.replace('1', '1 ')}</span>
              </div>
            )}
            <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-2 rounded-lg">
              <span className="font-semibold">CRITICAL ALERT</span>
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

        {showNewEventForm && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-xl shadow-xl p-6 w-full max-w-4xl max-h-screen overflow-y-auto">
              <h2 className="text-2xl font-bold mb-6 text-gray-900">Record Cardiac Event</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Event Details</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Date & Time</label>
                    <div className="flex space-x-2">
                      <input
                        type="date"
                        value={newEvent.date}
                        onChange={(e) => updateNewEvent('date', e.target.value)}
                        className="flex-1 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="time"
                        value={newEvent.time}
                        onChange={(e) => updateNewEvent('time', e.target.value)}
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Event Type</label>
                    <select
                      value={newEvent.type}
                      onChange={(e) => updateNewEvent('type', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="arrhythmia">Arrhythmia</option>
                      <option value="chest_pain">Chest Pain</option>
                      <option value="palpitations">Palpitations</option>
                      <option value="shortness_breath">Shortness of Breath</option>
                      <option value="fatigue">Fatigue</option>
                      <option value="dizziness">Dizziness</option>
                      <option value="cardiac_arrest">Cardiac Arrest</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Severity</label>
                    <select
                      value={newEvent.severity}
                      onChange={(e) => updateNewEvent('severity', e.target.value)}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    >
                      <option value="mild">Mild</option>
                      <option value="moderate">Moderate</option>
                      <option value="severe">Severe</option>
                      <option value="critical">Critical</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Duration</label>
                    <input
                      type="text"
                      value={newEvent.duration}
                      onChange={(e) => updateNewEvent('duration', e.target.value)}
                      placeholder="e.g., 15 minutes"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Vital Signs</label>
                    <div className="grid grid-cols-3 gap-2">
                      <input
                        type="number"
                        value={newEvent.vitals?.heartRate || ''}
                        onChange={(e) => updateNewEvent('vitals', { ...newEvent.vitals, heartRate: parseInt(e.target.value) || 0 })}
                        placeholder="HR"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="text"
                        value={newEvent.vitals?.bloodPressure || ''}
                        onChange={(e) => updateNewEvent('vitals', { ...newEvent.vitals, bloodPressure: e.target.value })}
                        placeholder="BP"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                      <input
                        type="number"
                        value={newEvent.vitals?.oxygen || ''}
                        onChange={(e) => updateNewEvent('vitals', { ...newEvent.vitals, oxygen: parseInt(e.target.value) || 0 })}
                        placeholder="O2"
                        className="px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="flex items-center space-x-2">
                      <input
                        type="checkbox"
                        checked={newEvent.cprRequired || false}
                        onChange={(e) => updateNewEvent('cprRequired', e.target.checked)}
                        className="rounded text-blue-600 focus:ring-blue-500"
                      />
                      <span className="text-sm font-medium text-gray-700">CPR Required</span>
                    </label>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-semibold text-gray-800 border-b pb-2">Parent Notes</h3>
                  
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Before Event</label>
                    <textarea
                      value={newEvent.parentNotes?.beforeEvent || ''}
                      onChange={(e) => updateParentNotes('beforeEvent', e.target.value)}
                      rows={3}
                      placeholder="What was happening before the event? Child's condition, activities, emotional state..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">During Event</label>
                    <textarea
                      value={newEvent.parentNotes?.duringEvent || ''}
                      onChange={(e) => updateParentNotes('duringEvent', e.target.value)}
                      rows={3}
                      placeholder="What happened during the event? Symptoms observed, actions taken..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">After Event</label>
                    <textarea
                      value={newEvent.parentNotes?.afterEvent || ''}
                      onChange={(e) => updateParentNotes('afterEvent', e.target.value)}
                      rows={3}
                      placeholder="How was the child after the event? Recovery, medical response..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Activities Prior to Event</label>
                    <textarea
                      value={newEvent.parentNotes?.activitiesPrior || ''}
                      onChange={(e) => updateParentNotes('activitiesPrior', e.target.value)}
                      rows={2}
                      placeholder="What was the child doing immediately before?"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Emotional State</label>
                    <textarea
                      value={newEvent.parentNotes?.emotionalState || ''}
                      onChange={(e) => updateParentNotes('emotionalState', e.target.value)}
                      rows={2}
                      placeholder="Child's emotional state before and during..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Medications Given</label>
                    <textarea
                      value={newEvent.parentNotes?.medicationsGiven || ''}
                      onChange={(e) => updateParentNotes('medicationsGiven', e.target.value)}
                      rows={2}
                      placeholder="Any medications administered during/after event..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Observations</label>
                    <textarea
                      value={newEvent.parentNotes?.observations || ''}
                      onChange={(e) => updateParentNotes('observations', e.target.value)}
                      rows={2}
                      placeholder="Any other observations or concerns..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Follow-up Actions</label>
                    <textarea
                      value={newEvent.parentNotes?.followUpActions || ''}
                      onChange={(e) => updateParentNotes('followUpActions', e.target.value)}
                      rows={2}
                      placeholder="What follow-up actions were taken or planned..."
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                    />
                  </div>
                </div>
              </div>

              <div className="flex justify-end space-x-3 mt-6 pt-4 border-t">
                <button
                  onClick={handleCancelEvent}
                  className="px-6 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50"
                >
                  Cancel
                </button>
                <button
                  onClick={handleSaveEvent}
                  className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                >
                  Save Event
                </button>
              </div>
            </div>
          </div>
        )}

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
                <button 
                  onClick={handleAddCardiacEvent}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700"
                >
                  + Add Event
                </button>
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
                    <div key={event.id} className={`border rounded-lg p-4 ${severityColors[event.severity]} ${event.cprRequired ? 'border-4 border-red-500' : ''}`}>
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <div className="flex items-center space-x-2">
                            <span className="font-semibold capitalize">{event.type.replace('_', ' ')}</span>
                            <span className="text-sm opacity-75">{event.severity.toUpperCase()}</span>
                            {event.cprRequired && (
                              <span className="bg-red-600 text-white text-xs px-2 py-1 rounded animate-pulse">CPR REQUIRED</span>
                            )}
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
                      
                      {event.cprRequired && (
                        <div className="bg-red-50 border border-red-200 rounded p-2 mb-2">
                          <div className="text-sm font-bold text-red-800">CPR Details:</div>
                          <div className="text-xs text-red-700">
                            Duration: {event.cprDuration} • 
                            EMS Response: {event.medicalResponse?.emsResponseTime} • 
                            Defibrillator: {event.medicalResponse?.defibrillatorUsed ? 'YES' : 'NO'} • 
                            Hospital Transport: {event.medicalResponse?.hospitalTransport ? 'YES' : 'NO'}
                          </div>
                        </div>
                      )}

                      {event.parentNotes && (
                        <div className="bg-blue-50 border border-blue-200 rounded p-2 mb-2">
                          <div className="text-sm font-bold text-blue-800">Parent Notes:</div>
                          <div className="text-xs text-blue-700 space-y-1">
                            {event.parentNotes.beforeEvent && (
                              <div><strong>Before:</strong> {event.parentNotes.beforeEvent}</div>
                            )}
                            {event.parentNotes.duringEvent && (
                              <div><strong>During:</strong> {event.parentNotes.duringEvent}</div>
                            )}
                            {event.parentNotes.afterEvent && (
                              <div><strong>After:</strong> {event.parentNotes.afterEvent}</div>
                            )}
                          </div>
                        </div>
                      )}
                      
                      <div className="text-sm italic">"{event.notes}"</div>
                    </div>
                  );
                })}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Recent Activity</h2>
                <Link href="/health/activity" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {patient.recentActivity.map((activity, index) => (
                  <div key={index} className="border-b border-gray-100 pb-4 last:border-0 last:pb-0">
                    <div className="flex items-start">
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium text-gray-900">{activity.type}</p>
                        <p className="text-sm text-gray-500">{activity.details}</p>
                      </div>
                      <div className="ml-4 flex-shrink-0">
                        <p className="text-sm text-gray-500">
                          {new Date(activity.date).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
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
                    <button 
                      onClick={() => handleMessageClick(member.name)}
                      className="text-blue-600 hover:text-blue-800 text-sm font-medium cursor-pointer"
                    >
                      Message
                    </button>
                  </div>
                ))}
              </div>
            </div>

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold mb-4 text-gray-800">Medications</h2>
                <Link href="/health/medications" className="text-sm font-medium text-blue-600 hover:text-blue-800">
                  View all
                </Link>
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

            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-gray-800">Incident Reports</h2>
                <Link 
                  href="/health/incidents" 
                  className="text-sm font-medium text-blue-600 hover:text-blue-800"
                >
                  View all
                </Link>
              </div>
              <div className="space-y-4">
                {patient.incidentReports.map((incident, index) => {
                  const severityColors = {
                    low: 'bg-green-100 text-green-800',
                    medium: 'bg-yellow-100 text-yellow-800',
                    high: 'bg-red-100 text-red-800'
                  };
                  const statusColors = {
                    resolved: 'bg-green-100 text-green-800',
                    investigating: 'bg-blue-100 text-blue-800',
                    monitoring: 'bg-yellow-100 text-yellow-800'
                  };
                  
                  return (
                    <div key={index} className="border border-gray-200 rounded-lg p-4 hover:bg-gray-50">
                      <div className="flex justify-between items-start">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${severityColors[incident.severity]}`}>
                              {incident.severity.charAt(0).toUpperCase() + incident.severity.slice(1)}
                            </span>
                            <span className={`text-xs font-medium px-2.5 py-0.5 rounded-full ${statusColors[incident.status]}`}>
                              {incident.status.charAt(0).toUpperCase() + incident.status.slice(1)}
                            </span>
                          </div>
                          <h3 className="font-medium text-gray-900">{incident.type}</h3>
                          <p className="text-sm text-gray-600 mt-1">{incident.description}</p>
                        </div>
                        <span className="text-xs text-gray-500 whitespace-nowrap ml-2">
                          {new Date(incident.date).toLocaleDateString()}
                        </span>
                      </div>
                      <div className="mt-3 pt-3 border-t border-gray-100 flex justify-end">
                        <button 
                          onClick={() => handleViewDetails(incident.type, incident.date)}
                          className="text-sm font-medium text-blue-600 hover:text-blue-800 cursor-pointer"
                        >
                          View Details
                        </button>
                      </div>
                    </div>
                  );
                })}
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
