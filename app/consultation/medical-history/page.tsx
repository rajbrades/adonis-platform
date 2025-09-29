'use client'
import Link from 'next/link'
import { useState, useEffect } from 'react'
import { ArrowRight, ArrowLeft } from 'lucide-react'
import { useRouter } from 'next/navigation'

export default function MedicalHistoryPage() {
  const router = useRouter()
  const [formData, setFormData] = useState({
    currentMedications: '',
    allergies: '',
    medicalConditions: [] as string[],
    surgeries: '',
    familyHistory: '',
    lifestyle: {
      exerciseFrequency: '',
      sleepHours: '',
      stressLevel: '',
      alcohol: '',
      smoking: '',
      diet: ''
    },
    symptoms: [] as string[],
    previousHormoneTherapy: '',
    labsRecent: '',
    primaryConcerns: ''
  })

  // Load existing data from sessionStorage on mount
  useEffect(() => {
    const saved = sessionStorage.getItem('consultationData')
    if (saved) {
      const data = JSON.parse(saved)
      setFormData({
        currentMedications: data.currentMedications || '',
        allergies: data.allergies || '',
        medicalConditions: data.medicalConditions || [],
        surgeries: data.surgeries || '',
        familyHistory: data.familyHistory || '',
        lifestyle: data.lifestyle || {
          exerciseFrequency: '',
          sleepHours: '',
          stressLevel: '',
          alcohol: '',
          smoking: '',
          diet: ''
        },
        symptoms: data.symptoms || [],
        previousHormoneTherapy: data.previousHormoneTherapy || '',
        labsRecent: data.labsRecent || '',
        primaryConcerns: data.primaryConcerns || ''
      })
    }
  }, [])

  const commonConditions = [
    'High Blood Pressure',
    'Diabetes',
    'Heart Disease',
    'Thyroid Disorders',
    'Depression/Anxiety',
    'Sleep Disorders',
    'Autoimmune Conditions',
    'None of the above'
  ]

  const commonSymptoms = [
    'Low Energy/Fatigue',
    'Poor Sleep Quality',
    'Weight Gain',
    'Muscle Loss',
    'Low Libido',
    'Brain Fog',
    'Mood Changes',
    'Joint Pain',
    'Hair Loss',
    'None of the above'
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

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    
    if (name.startsWith('lifestyle.')) {
      const lifestyleField = name.split('.')[1]
      setFormData(prev => ({
        ...prev,
        lifestyle: {
          ...prev.lifestyle,
          [lifestyleField]: value
        }
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleContinue = (e: React.MouseEvent) => {
    e.preventDefault()
    
    // Get existing data and merge with medical history
    const existingData = sessionStorage.getItem('consultationData')
    const allData = existingData ? JSON.parse(existingData) : {}
    
    const updatedData = {
      ...allData,
      currentMedications: formData.currentMedications,
      allergies: formData.allergies,
      medicalConditions: formData.medicalConditions,
      surgeries: formData.surgeries,
      familyHistory: formData.familyHistory,
      lifestyle: formData.lifestyle,
      symptoms: formData.symptoms,
      previousHormoneTherapy: formData.previousHormoneTherapy,
      labsRecent: formData.labsRecent,
      primaryConcerns: formData.primaryConcerns,
      medicalHistory: {
        conditions: formData.medicalConditions,
        medications: formData.currentMedications ? [formData.currentMedications] : [],
        allergies: formData.allergies ? [formData.allergies] : [],
        symptoms: formData.symptoms.join(', '),
        exerciseFrequency: formData.lifestyle.exerciseFrequency,
        sleepHours: formData.lifestyle.sleepHours,
        stressLevel: formData.lifestyle.stressLevel,
        alcoholConsumption: formData.lifestyle.alcohol
      }
    }
    
    sessionStorage.setItem('consultationData', JSON.stringify(updatedData))
    router.push('/consultation/review')
  }

  const isFormValid = formData.lifestyle.exerciseFrequency && formData.lifestyle.sleepHours && 
                     formData.lifestyle.stressLevel && formData.primaryConcerns

  return (
    <div className="min-h-screen bg-black text-white">
      <header className="bg-black border-b border-yellow-500/20">
        <nav className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-3xl font-black text-yellow-400">
            ADONIS
          </Link>
          <div className="text-white/60">Step 3 of 4</div>
        </nav>
      </header>

      <div className="max-w-4xl mx-auto px-6 py-12">
        <div className="mb-8">
          <h1 className="text-4xl font-black mb-4 text-yellow-400">
            Medical History & Lifestyle
          </h1>
          <p className="text-white/70">
            Help our physicians understand your health background and current lifestyle
          </p>
        </div>

        <form className="space-y-8">
          {/* Current Health Status */}
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">Current Health Status</h2>
            
            <div className="space-y-6">
              <div>
                <label className="block text-white mb-2 font-medium">Current Medications & Supplements</label>
                <textarea
                  name="currentMedications"
                  value={formData.currentMedications}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none h-24"
                  placeholder="List all medications, vitamins, and supplements you currently take..."
                />
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Allergies or Adverse Reactions</label>
                <textarea
                  name="allergies"
                  value={formData.allergies}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none h-20"
                  placeholder="Food allergies, drug allergies, or adverse reactions to medications..."
                />
              </div>

              <div>
                <label className="block text-white mb-3 font-medium">Current Medical Conditions</label>
                <div className="grid md:grid-cols-2 gap-3">
                  {commonConditions.map((condition) => (
                    <button
                      key={condition}
                      type="button"
                      onClick={() => handleConditionToggle(condition)}
                      className={`text-left p-3 rounded-lg border transition-all ${
                        formData.medicalConditions.includes(condition)
                          ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400'
                          : 'bg-white/5 border-white/20 text-white/80 hover:border-yellow-400/50'
                      }`}
                    >
                      <div className="flex items-center">
                        <div className={`w-4 h-4 rounded border-2 mr-3 ${
                          formData.medicalConditions.includes(condition)
                            ? 'bg-yellow-400 border-yellow-400'
                            : 'border-white/40'
                        }`}></div>
                        {condition}
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Lifestyle Factors */}
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">Lifestyle Assessment</h2>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-white mb-2 font-medium">Exercise Frequency</label>
                <select
                  name="lifestyle.exerciseFrequency"
                  value={formData.lifestyle.exerciseFrequency}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                >
                  <option value="">Select frequency</option>
                  <option value="daily">Daily (7+ times/week)</option>
                  <option value="frequent">Frequent (4-6 times/week)</option>
                  <option value="moderate">Moderate (2-3 times/week)</option>
                  <option value="occasional">Occasional (1 time/week)</option>
                  <option value="sedentary">Sedentary (rarely exercise)</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Average Sleep Hours</label>
                <select
                  name="lifestyle.sleepHours"
                  value={formData.lifestyle.sleepHours}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                >
                  <option value="">Select hours</option>
                  <option value="less-than-5">Less than 5 hours</option>
                  <option value="5-6">5-6 hours</option>
                  <option value="6-7">6-7 hours</option>
                  <option value="7-8">7-8 hours</option>
                  <option value="8-9">8-9 hours</option>
                  <option value="more-than-9">More than 9 hours</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Stress Level</label>
                <select
                  name="lifestyle.stressLevel"
                  value={formData.lifestyle.stressLevel}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                >
                  <option value="">Select level</option>
                  <option value="low">Low stress</option>
                  <option value="moderate">Moderate stress</option>
                  <option value="high">High stress</option>
                  <option value="extreme">Extreme stress</option>
                </select>
              </div>

              <div>
                <label className="block text-white mb-2 font-medium">Alcohol Consumption</label>
                <select
                  name="lifestyle.alcohol"
                  value={formData.lifestyle.alcohol}
                  onChange={handleInputChange}
                  className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white focus:border-yellow-400 focus:outline-none"
                >
                  <option value="">Select frequency</option>
                  <option value="none">None</option>
                  <option value="occasional">Occasional (1-2 drinks/week)</option>
                  <option value="moderate">Moderate (3-7 drinks/week)</option>
                  <option value="frequent">Frequent (8-14 drinks/week)</option>
                  <option value="heavy">Heavy (15+ drinks/week)</option>
                </select>
              </div>
            </div>
          </div>

          {/* Current Symptoms */}
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">Current Symptoms</h2>
            <p className="text-white/70 mb-6">Select any symptoms you are currently experiencing:</p>
            
            <div className="grid md:grid-cols-2 gap-3">
              {commonSymptoms.map((symptom) => (
                <button
                  key={symptom}
                  type="button"
                  onClick={() => handleSymptomToggle(symptom)}
                  className={`text-left p-3 rounded-lg border transition-all ${
                    formData.symptoms.includes(symptom)
                      ? 'bg-yellow-400/20 border-yellow-400 text-yellow-400'
                      : 'bg-white/5 border-white/20 text-white/80 hover:border-yellow-400/50'
                  }`}
                >
                  <div className="flex items-center">
                    <div className={`w-4 h-4 rounded border-2 mr-3 ${
                      formData.symptoms.includes(symptom)
                        ? 'bg-yellow-400 border-yellow-400'
                        : 'border-white/40'
                    }`}></div>
                    {symptom}
                  </div>
                </button>
              ))}
            </div>
          </div>

          {/* Primary Concerns */}
          <div className="bg-white/5 border border-yellow-500/20 rounded-xl p-8">
            <h2 className="text-2xl font-bold mb-6 text-yellow-400">Primary Health Concerns</h2>
            
            <div>
              <label className="block text-white mb-2 font-medium">What are your main health and performance concerns?</label>
              <textarea
                name="primaryConcerns"
                value={formData.primaryConcerns}
                onChange={handleInputChange}
                className="w-full bg-white/10 border border-white/20 rounded-lg px-4 py-3 text-white placeholder-white/50 focus:border-yellow-400 focus:outline-none h-32"
                placeholder="Describe your primary concerns, goals, and what you hope to achieve with optimization..."
                required
              />
            </div>
          </div>

          {/* Navigation */}
          <div className="flex justify-between items-center pt-8">
            <Link
              href="/consultation/intake"
              className="flex items-center text-white/70 hover:text-yellow-400 transition-colors"
            >
              <ArrowLeft className="w-5 h-5 mr-2" />
              Back
            </Link>
            
            <button
              onClick={handleContinue}
              disabled={!isFormValid}
              className={`flex items-center px-8 py-3 rounded-lg font-bold transition-all ${
                isFormValid
                  ? 'bg-gradient-to-r from-yellow-400 to-yellow-600 text-black hover:shadow-lg'
                  : 'bg-white/10 text-white/50 cursor-not-allowed'
              }`}
            >
              Continue to Review
              <ArrowRight className="w-5 h-5 ml-2" />
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}
