import { useState } from 'react'
import { useDonation } from '../context/DonationContext'
import { useLanguage } from '../context/LanguageContext'
import { Upload, AlertCircle, CheckCircle } from 'lucide-react'
import toast from 'react-hot-toast'

const Apply = () => {
  const { categories } = useDonation()
  const { t } = useLanguage()
  
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    category: '',
    title: '',
    description: '',
    amountNeeded: '',
    deadline: '',
    fullName: '',
    nid: '',
    phone: '',
    email: '',
    address: '',
    city: '',
    organization: '',
    documents: [],
    terms: false
  })

  const handleInputChange = (e) => {
    const { name, value, type, checked, files } = e.target
    if (type === 'file') {
      setFormData(prev => ({
        ...prev,
        documents: Array.from(files)
      }))
    } else if (type === 'checkbox') {
      setFormData(prev => ({
        ...prev,
        [name]: checked
      }))
    } else {
      setFormData(prev => ({
        ...prev,
        [name]: value
      }))
    }
  }

  const handleNext = () => {
    if (step === 1) {
      if (!formData.category || !formData.title || !formData.amountNeeded || !formData.description) {
        toast.error(t('fillRequiredFields'))
        return
      }
    }
    if (step === 2) {
      if (!formData.fullName || !formData.nid || !formData.phone || !formData.address) {
        toast.error(t('fillRequiredFields'))
        return
      }
    }
    setStep(step + 1)
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    
    if (!formData.terms) {
      toast.error(t('acceptTermsError'))
      return
    }

    // Simulate API call
    toast.loading(t('submittingApplication'))
    
    setTimeout(() => {
      toast.dismiss()
      toast.success(t('applicationSubmitted'))
      
      // Reset form
      setFormData({
        category: '',
        title: '',
        description: '',
        amountNeeded: '',
        deadline: '',
        fullName: '',
        nid: '',
        phone: '',
        email: '',
        address: '',
        city: '',
        organization: '',
        documents: [],
        terms: false
      })
      setStep(1)
    }, 2000)
  }

  const steps = [
    { number: 1, title: t('campaignDetails') },
    { number: 2, title: t('personalInfo') },
    { number: 3, title: t('documents') },
    { number: 4, title: t('review') }
  ]

  const selectedCategory = categories.find(c => c.id === formData.category)

  return (
    <div className="max-w-4xl mx-auto px-4">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t('applyForHelp')}</h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg">
          {t('applyDescription')}
        </p>
      </div>

      {/* Progress Steps */}
      <div className="flex justify-between mb-8 sm:mb-12 relative overflow-x-auto pb-4">
        {steps.map((s, index) => (
          <div key={s.number} className="flex flex-col items-center z-10">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
              step === s.number 
                ? 'bg-primary-500 text-white' 
                : step > s.number 
                  ? 'bg-green-500 text-white' 
                  : 'bg-gray-200 dark:bg-gray-700 text-gray-500'
            }`}>
              {step > s.number ? <CheckCircle size={24} /> : s.number}
            </div>
            <div className="text-sm font-medium">{s.title}</div>
          </div>
        ))}
        <div className="absolute top-6 left-0 right-0 h-1 bg-gray-200 dark:bg-gray-700 -z-10">
          <div 
            className="h-1 bg-primary-500 transition-all duration-300"
            style={{ width: `${((step - 1) / (steps.length - 1)) * 100}%` }}
          />
        </div>
      </div>

      <div className="card">
        <form onSubmit={handleSubmit}>
          {/* Step 1: Campaign Details */}
          {step === 1 && (
            <div className="space-y-6">
              <div>
                <label className="block mb-2 font-medium">
                  {t('helpCategory')} <span className="text-red-500">*</span>
                </label>
                <select
                  name="category"
                  value={formData.category}
                  onChange={handleInputChange}
                  className="input-field"
                  required
                >
                  <option value="">{t('selectCategory')}</option>
                  {categories.map(category => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  {t('campaignTitle')} <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="title"
                  value={formData.title}
                  onChange={handleInputChange}
                  placeholder={t('titlePlaceholder')}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  {t('description')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleInputChange}
                  placeholder={t('descriptionPlaceholder')}
                  className="input-field h-40"
                  required
                  rows="6"
                />
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                  {t('descriptionHelper')}
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium">
                    {t('amountNeeded')} (৳) <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="number"
                    name="amountNeeded"
                    value={formData.amountNeeded}
                    onChange={handleInputChange}
                    placeholder="50000"
                    className="input-field"
                    min="1000"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    {t('deadline')}
                  </label>
                  <input
                    type="date"
                    name="deadline"
                    value={formData.deadline}
                    onChange={handleInputChange}
                    className="input-field"
                    min={new Date().toISOString().split('T')[0]}
                  />
                </div>
              </div>

              <button
                type="button"
                onClick={handleNext}
                className="btn-primary w-full"
              >
                {t('nextStep')}
              </button>
            </div>
          )}

          {/* Step 2: Personal Information */}
          {step === 2 && (
            <div className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium">
                    {t('fullName')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder={t('namePlaceholder')}
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    NID Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="text"
                    name="nid"
                    value={formData.nid}
                    onChange={handleInputChange}
                    placeholder="1234567890123"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    {t('phoneNumber')} <span className="text-red-500">*</span>
                  </label>
                  <input
                    type="tel"
                    name="phone"
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+8801XXXXXXXXX"
                    className="input-field"
                    required
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">
                    {t('email')}
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder={t('emailPlaceholder')}
                    className="input-field"
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  {t('address')} <span className="text-red-500">*</span>
                </label>
                <textarea
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  placeholder={t('addressPlaceholder')}
                  className="input-field"
                  rows="3"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium">{t('city')}</label>
                  <input
                    type="text"
                    name="city"
                    value={formData.city}
                    onChange={handleInputChange}
                    placeholder={t('cityPlaceholder')}
                    className="input-field"
                  />
                </div>

                <div>
                  <label className="block mb-2 font-medium">{t('organization')}</label>
                  <input
                    type="text"
                    name="organization"
                    value={formData.organization}
                    onChange={handleInputChange}
                    placeholder={t('orgPlaceholder')}
                    className="input-field"
                  />
                </div>
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(1)}
                  className="btn-outline flex-1"
                >
                  {t('back')}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary flex-1"
                >
                  {t('nextStep')}
                </button>
              </div>
            </div>
          )}

          {/* Step 3: Documents */}
          {step === 3 && (
            <div className="space-y-6">
              <div className="bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
                <div className="flex">
                  <AlertCircle className="text-blue-600 dark:text-blue-400 mr-3 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-blue-800 dark:text-blue-300 mb-1">
                      {t('documentsRequired')}
                    </p>
                    <ul className="list-disc pl-5 text-blue-700 dark:text-blue-400 space-y-1">
                      <li>{t('nidCopy')}</li>
                      <li>{t('bankStatement')}</li>
                      <li>{t('medicalReports')} ({t('ifApplicable')})</li>
                      <li>{t('otherRelevant')}</li>
                    </ul>
                  </div>
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">
                  {t('uploadDocuments')}
                </label>
                <div className="border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg p-8 text-center">
                  <Upload className="mx-auto mb-4 text-gray-400" size={48} />
                  <p className="mb-2 font-medium">{t('dragDrop')}</p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">
                    {t('maxFileSize')} (PDF, JPG, PNG)
                  </p>
                  <input
                    type="file"
                    id="documents"
                    name="documents"
                    onChange={handleInputChange}
                    className="hidden"
                    multiple
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                  <label
                    htmlFor="documents"
                    className="btn-outline cursor-pointer"
                  >
                    {t('chooseFiles')}
                  </label>
                </div>
                {formData.documents.length > 0 && (
                  <div className="mt-4">
                    <p className="font-medium mb-2">{t('selectedFiles')}:</p>
                    <ul className="space-y-2">
                      {Array.from(formData.documents).map((file, index) => (
                        <li key={index} className="flex items-center justify-between bg-gray-50 dark:bg-gray-800 p-3 rounded-lg">
                          <span>{file.name}</span>
                          <span className="text-sm text-gray-500">
                            {(file.size / 1024).toFixed(1)} KB
                          </span>
                        </li>
                      ))}
                    </ul>
                  </div>
                )}
              </div>

              <div className="flex gap-4">
                <button
                  type="button"
                  onClick={() => setStep(2)}
                  className="btn-outline flex-1"
                >
                  {t('back')}
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  className="btn-primary flex-1"
                >
                  {t('nextStep')}
                </button>
              </div>
            </div>
          )}

          {/* Step 4: Review & Submit */}
          {step === 4 && (
            <div className="space-y-6">
              <div className="bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
                <div className="flex">
                  <CheckCircle className="text-green-600 dark:text-green-400 mr-3 flex-shrink-0" />
                  <div className="text-sm">
                    <p className="font-medium text-green-800 dark:text-green-300">
                      {t('reviewApplication')}
                    </p>
                  </div>
                </div>
              </div>

              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-semibold mb-4">{t('campaignSummary')}</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{t('category')}:</span>
                      <span className="font-medium">{selectedCategory?.name}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{t('title')}:</span>
                      <span className="font-medium">{formData.title}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 dark:text-gray-400">{t('amountNeeded')}:</span>
                      <span className="font-medium">৳{formData.amountNeeded}</span>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">{t('personalInfo')}</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{t('fullName')}</div>
                      <div className="font-medium">{formData.fullName}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">NID</div>
                      <div className="font-medium">{formData.nid}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{t('phone')}</div>
                      <div className="font-medium">{formData.phone}</div>
                    </div>
                    <div>
                      <div className="text-sm text-gray-600 dark:text-gray-400">{t('email')}</div>
                      <div className="font-medium">{formData.email || t('notProvided')}</div>
                    </div>
                  </div>
                </div>

                <div>
                  <h3 className="text-lg font-semibold mb-4">{t('documents')}</h3>
                  <div className="bg-gray-50 dark:bg-gray-800 p-4 rounded-lg">
                    {formData.documents.length > 0 ? (
                      <p>{formData.documents.length} {t('filesUploaded')}</p>
                    ) : (
                      <p className="text-gray-500 dark:text-gray-400">{t('noFilesUploaded')}</p>
                    )}
                  </div>
                </div>

                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    name="terms"
                    checked={formData.terms}
                    onChange={handleInputChange}
                    className="w-4 h-4 text-primary-600 rounded focus:ring-primary-500"
                    required
                  />
                  <label htmlFor="terms" className="ml-2 text-gray-600 dark:text-gray-400">
                    {t('agreeTerms')}{' '}
                    <a href="/terms" className="text-primary-600 dark:text-primary-400 hover:underline">
                      {t('termsConditions')}
                    </a>
                  </label>
                </div>

                <div className="flex gap-4">
                  <button
                    type="button"
                    onClick={() => setStep(3)}
                    className="btn-outline flex-1"
                  >
                    {t('back')}
                  </button>
                  <button
                    type="submit"
                    className="btn-primary flex-1"
                    disabled={!formData.terms}
                  >
                    {t('submitApplication')}
                  </button>
                </div>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  )
}

export default Apply

