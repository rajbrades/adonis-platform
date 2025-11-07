'use client'

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import { getBrand } from '@/lib/brand'
import { 
  ArrowRight, ArrowLeft, Heart, Pill, AlertCircle, Activity,
  Droplet, Utensils, Moon, Dumbbell, Wine, Cigarette
} from 'lucide-react'

export default function MedicalHistoryPage() {
  const brand = getBrand()
  const router = useRouter()
  const [formData, setFormData] = useState({
    currentMedications: '',
    allergies: '',
    medicalConditions: [] as string[],
    surgeries: '',
    familyHistory: '',
    previousHormoneTherapy: '',
    labsRecent: '',
    lifestyle: {
      exerciseFrequency: '',
      sleepHours: '',
      stressLevel: '',
      alcohol: '',
      smoking: '',
      diet: ''
    },
    symptoms: [] as string[]
  })

  useEffect(() => {
    const intakeData = sessionStorage.getItem('consultationData')
    if (!intakeData) {
      router.push('/consultation/intake')
    }
  }, [router])

  const medicalConditionOptions = [
    'High Blood Pressure',
    'High Cholesterol',
    'Diabetes',
    'Thyroid Issues',
    'Heart Disease',
    'Liver Disease',
    'Kidney Disease',
    'Sleep Apnea',
    'Depression/Anxiety',
    'None of the above'
  ]

  const symptomOptions = [
    'Low Energy/Fatigue',
    'Poor Sleep',
    'Weight Gain',
    'Difficulty Building Muscle',
    'Low Libido',
    'Mood Changes',
    'Brain Fog',
    'Joint Pain',
    'Hair Loss',
    'Decreased Performance'
  ]

  const handleConditionToggle = (condition: string) => {
    setFormData(prev => ({
      ...prev,
      medicalConditions: prev.medicalConditions.includes(condition)
        ? prev.medicalConditions.filter(c => c !== condition)
        : [...prev.medicalConditions, condition]
    }))
  }

  const handleSymptomToggle = (symptom: string) => {
    setFormData(prev => ({
      ...prev,
      symptoms: prev.symptoms.includes(symptom)
        ? prev.symptoms.filter(s => s !== symptom)
        : [...prev.symptoms, symptom]
    }))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    
    const intakeData = JSON.parse(sessionStorage.getItem('consultationData') || '{}')
    const fullData = { ...intakeData, ...formData }
    
    sessionStorage.setItem('consultationData', JSON.stringify(fullData))
    router.push('/consultation/review')
  }

  const handleBack = () => {
    const intakeData = JSON.parse(sessionStorage.getItem('consultationData') || '{}')
    const fullData = { ...intakeData, ...formData }
    sessionStorage.setItem('consultationData', JSON.stringify(fullData))
    router.push('/consultation/intake')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-black via-gray-900 to-black text-white">
      <div className="max-w-4xl mx-auto px-6 py-12">
        
        <div className="mb-12">
          <button onClick={handleBack} className="inline-flex items-center gap-2 mb-8 text-white/60 hover:text-white transition">
            <ArrowLeft className="w-4 h-4" />
            Back to Personal Info
          </button>
          <h1 className="text-4xl md:text-5xl font-black mb-4">
            Medical <span style={{ color: brand.colors.primary }}>History</span>
          </h1>
          <p className="text-xl text-white/60">Help us understand your health background</p>
        </div>

        <div className="mb-12">
          <div className="flex items-center justify-between mb-4">
            <span className="text-sm font-semibold" style={{ color: brand.colors.primary }}>Step 2 of 3</span>
            <span className="text-sm text-white/50">Medical Information</span>
          </div>
          <div className="w-full bg-white/10 rounded-full h-2">
            <div className="h-2 rounded-full transition-all duration-300" style={{width: '66%', backgroundColor: brand.colors.primary}}></div>
          </div>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          
          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <Heart className="w-6 h-6" style={{ color: brand.colors.primary }} />
              Medical Conditions
            </h2>
            <p className="text-white/60 mb-6">Select any that apply to you</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {medicalConditionOptions.map((condition) => (
                <button
                  key={condition}
                  type="button"
                  onClick={() => handleConditionToggle(condition)}
                  className={`text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    formData.medicalConditions.includes(condition)
                      ? ''
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                  }`}
                  style={formData.medicalConditions.includes(condition) ? {
                    backgroundColor: `${brand.colors.primary}10`,
                    borderColor: brand.colors.primary,
                    color: brand.colors.primary
                  } : {}}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      formData.medicalConditions.includes(condition) ? '' : 'border-white/30'
                    }`}
                    style={formData.medicalConditions.includes(condition) ? {
                      backgroundColor: brand.colors.primary,
                      borderColor: brand.colors.primary
                    } : {}}>
                      {formData.medicalConditions.includes(condition) && (
                        <svg className="w-3 h-3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor"
                        style={{ color: brand.id === 'adonis' ? '#000000' : '#FFFFFF' }}>
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                    <span className="font-medium">{condition}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-3">
              <Activity className="w-6 h-6" style={{ color: brand.colors.primary }} />
              Current Symptoms
            </h2>
            <p className="text-white/60 mb-6">What are you experiencing?</p>
            
            <div className="grid md:grid-cols-2 gap-4">
              {symptomOptions.map((symptom) => (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => handleSymptomToggle(symptom)}
                  className={`text-left p-4 rounded-lg border-2 transition-all duration-200 ${
                    formData.symptoms.includes(symptom)
                      ? ''
                      : 'bg-white/5 border-white/10 text-white/80 hover:bg-white/10'
                  }`}
                  style={formData.symptoms.includes(symptom) ? {
                    backgroundColor: `${brand.colors.primary}10`,
                    borderColor: brand.colors.primary,
                    color: brand.colors.primary
                  } : {}}
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-all ${
                      formData.symptoms.includes(symptom) ? '' : 'border-white/30'
                    }`}
                    style={formData.symptoms.includes(symptom) ? {
                      backgroundColor: brand.colors.primary,
                      borderColor: brand.colors.primary
                    } : {}}>
                      {formData.symptoms.includes(symptom) && (
                        <svg className="w-3 h-3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeWidth="3" viewBox="0 0 24 24" stroke="currentColor"
                        style={{ color: brand.id === 'adonis' ? '#000000' : '#FFFFFF' }}>
                          <path d="M5 13l4 4L19 7"></path>
                        </svg>
                      )}
                    </div>
                    <span className="font-medium">{symptom}</span>
                  </div>
                </button>
              ))}
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Pill className="w-6 h-6" style={{ color: brand.colors.primary }} />
              Medications & Allergies
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">
                  Current Medications
                </label>
                <textarea
                  value={formData.currentMedications}
                  onChange={(e) => setFormData({...formData, currentMedications: e.target.value})}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 transition"
                  placeholder="List any medications you're currently taking..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">
                  Allergies
                </label>
                <textarea
                  value={formData.allergies}
                  onChange={(e) => setFormData({...formData, allergies: e.target.value})}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 transition"
                  placeholder="List any allergies (medications, foods, etc.)..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <AlertCircle className="w-6 h-6" style={{ color: brand.colors.primary }} />
              Additional Medical History
            </h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">
                  Previous Surgeries
                </label>
                <textarea
                  value={formData.surgeries}
                  onChange={(e) => setFormData({...formData, surgeries: e.target.value})}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 transition"
                  placeholder="List any previous surgeries..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">
                  Family Medical History
                </label>
                <textarea
                  value={formData.familyHistory}
                  onChange={(e) => setFormData({...formData, familyHistory: e.target.value})}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 transition"
                  placeholder="Notable family medical history (heart disease, diabetes, etc.)..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">
                  Previous Hormone Therapy
                </label>
                <textarea
                  value={formData.previousHormoneTherapy}
                  onChange={(e) => setFormData({...formData, previousHormoneTherapy: e.target.value})}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 transition"
                  placeholder="Any previous hormone therapy or TRT experience..."
                />
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">
                  Recent Lab Work
                </label>
                <textarea
                  value={formData.labsRecent}
                  onChange={(e) => setFormData({...formData, labsRecent: e.target.value})}
                  rows={3}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder:text-white/30 focus:outline-none focus:bg-white/10 transition"
                  placeholder="Recent lab results or tests (if available)..."
                />
              </div>
            </div>
          </div>

          <div className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-2xl p-8">
            <h2 className="text-2xl font-bold mb-6 flex items-center gap-3">
              <Dumbbell className="w-6 h-6" style={{ color: brand.colors.primary }} />
              Lifestyle
            </h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">
                  Exercise Frequency
                </label>
                <select
                  value={formData.lifestyle.exerciseFrequency}
                  onChange={(e) => setFormData({...formData, lifestyle: {...formData.lifestyle, exerciseFrequency: e.target.value}})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:bg-white/10 transition"
                >
                  <option value="">Select frequency</option>
                  <option value="none">None</option>
                  <option value="1-2">1-2 times per week</option>
                  <option value="3-4">3-4 times per week</option>
                  <option value="5+">5+ times per week</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                  <Moon className="w-4 h-4" />
                  Sleep Hours per Night
                </label>
                <select
                  value={formData.lifestyle.sleepHours}
                  onChange={(e) => setFormData({...formData, lifestyle: {...formData.lifestyle, sleepHours: e.target.value}})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:bg-white/10 transition"
                >
                  <option value="">Select hours</option>
                  <option value="<5">Less than 5 hours</option>
                  <option value="5-6">5-6 hours</option>
                  <option value="7-8">7-8 hours</option>
                  <option value="9+">9+ hours</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80">
                  Stress Level
                </label>
                <select
                  value={formData.lifestyle.stressLevel}
                  onChange={(e) => setFormData({...formData, lifestyle: {...formData.lifestyle, stressLevel: e.target.value}})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:bg-white/10 transition"
                >
                  <option value="">Select level</option>
                  <option value="low">Low</option>
                  <option value="moderate">Moderate</option>
                  <option value="high">High</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                  <Wine className="w-4 h-4" />
                  Alcohol Consumption
                </label>
                <select
                  value={formData.lifestyle.alcohol}
                  onChange={(e) => setFormData({...formData, lifestyle: {...formData.lifestyle, alcohol: e.target.value}})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:bg-white/10 transition"
                >
                  <option value="">Select consumption</option>
                  <option value="none">None</option>
                  <option value="occasional">Occasional (1-2 drinks/week)</option>
                  <option value="moderate">Moderate (3-7 drinks/week)</option>
                  <option value="heavy">Heavy (8+ drinks/week)</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                  <Cigarette className="w-4 h-4" />
                  Smoking Status
                </label>
                <select
                  value={formData.lifestyle.smoking}
                  onChange={(e) => setFormData({...formData, lifestyle: {...formData.lifestyle, smoking: e.target.value}})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:bg-white/10 transition"
                >
                  <option value="">Select status</option>
                  <option value="never">Never</option>
                  <option value="former">Former smoker</option>
                  <option value="current">Current smoker</option>
                </select>
              </div>

              <div>
                <label className="block text-sm font-semibold mb-2 text-white/80 flex items-center gap-2">
                  <Utensils className="w-4 h-4" />
                  Diet Type
                </label>
                <select
                  value={formData.lifestyle.diet}
                  onChange={(e) => setFormData({...formData, lifestyle: {...formData.lifestyle, diet: e.target.value}})}
                  className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white focus:outline-none focus:bg-white/10 transition"
                >
                  <option value="">Select diet</option>
                  <option value="standard">Standard</option>
                  <option value="high-protein">High Protein</option>
                  <option value="low-carb">Low Carb</option>
                  <option value="keto">Keto</option>
                  <option value="vegetarian">Vegetarian</option>
                  <option value="vegan">Vegan</option>
                </select>
              </div>
            </div>
          </div>

          <div className="flex justify-between items-center pt-8">
            <button
              type="button"
              onClick={handleBack}
              className="flex items-center gap-2 text-white/60 hover:text-white transition"
            >
              <ArrowLeft className="w-5 h-5" />
              Back
            </button>
            
            <button
              type="submit"
              className="px-8 py-4 rounded-lg font-bold transition-all duration-300 flex items-center gap-2"
              style={{
                background: `linear-gradient(to right, ${brand.colors.primary}, ${brand.colors.primaryDark})`,
                color: brand.id === 'adonis' ? '#000000' : '#FFFFFF'
              }}
            >
              Continue to Review
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        </form>

      </div>
    </div>
  )
}
