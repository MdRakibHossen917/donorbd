import { useState } from 'react'
import { useLanguage } from '../context/LanguageContext'
import { Mail, Phone, MapPin, Send, Clock } from 'lucide-react'
import toast from 'react-hot-toast'

const Contact = () => {
  const { t } = useLanguage()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: ''
  })

  const handleSubmit = (e) => {
    e.preventDefault()
    toast.success(t('messageSent'))
    setFormData({ name: '', email: '', subject: '', message: '' })
  }

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    { icon: <Mail />, title: t('email'), value: 'mdrakibhossencse@gmail.com', desc: t('emailResponseTime') },
    { icon: <Phone />, title: t('phone'), value: '01300981501', desc: t('phoneHours') },
    { icon: <MapPin />, title: t('address'), value: '123/A, Dhanmondi, Dhaka 1209', desc: t('visitUs') },
    { icon: <Clock />, title: t('officeHours'), value: '9:00 AM - 6:00 PM', desc: t('saturdayThursday') },
  ]

  return (
    <div className="max-w-6xl mx-auto px-4">
      <div className="text-center mb-8 sm:mb-12">
        <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-3 sm:mb-4">{t('contactUs')}</h1>
        <p className="text-gray-600 dark:text-gray-300 text-sm sm:text-base md:text-lg max-w-3xl mx-auto">
          {t('contactDescription')}
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
        {/* Contact Info */}
        <div className="lg:col-span-1">
          <div className="space-y-4 sm:space-y-6">
            {contactInfo.map((info, index) => (
              <div key={index} className="card">
                <div className="flex items-start">
                  <div className="p-2 bg-primary-100 dark:bg-primary-900/30 rounded-lg text-primary-600 dark:text-primary-400 mr-4">
                    {info.icon}
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">{info.title}</h3>
                    <p className="text-gray-700 dark:text-gray-300 font-medium">{info.value}</p>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mt-1">{info.desc}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Social Media */}
          <div className="card mt-4 sm:mt-6">
            <h3 className="font-semibold mb-3 sm:mb-4">{t('followUs')}</h3>
            <div className="flex space-x-3 sm:space-x-4">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <a
                  key={social}
                  href="#"
                  className="w-10 h-10 bg-gray-100 dark:bg-gray-800 rounded-lg flex items-center justify-center hover:bg-primary-100 dark:hover:bg-primary-900/30 transition-colors"
                >
                  {social.charAt(0)}
                </a>
              ))}
            </div>
          </div>
        </div>

        {/* Contact Form */}
        <div className="lg:col-span-2">
          <div className="card">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">{t('sendMessage')}</h2>
            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block mb-2 font-medium">{t('fullName')} *</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
                <div>
                  <label className="block mb-2 font-medium">{t('email')} *</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    className="input-field"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block mb-2 font-medium">{t('subject')} *</label>
                <input
                  type="text"
                  name="subject"
                  value={formData.subject}
                  onChange={handleChange}
                  className="input-field"
                  required
                />
              </div>

              <div>
                <label className="block mb-2 font-medium">{t('message')} *</label>
                <textarea
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  className="input-field"
                  required
                />
              </div>

              <button type="submit" className="btn-primary">
                <Send size={20} className="mr-2 inline" />
                {t('sendMessage')}
              </button>
            </form>
          </div>

          {/* FAQ */}
          <div className="card mt-6 sm:mt-8">
            <h2 className="text-xl sm:text-2xl font-semibold mb-4 sm:mb-6">{t('frequentlyAskedQuestions')}</h2>
            <div className="space-y-4">
              {[
                { q: t('faq1'), a: t('faq1a') },
                { q: t('faq2'), a: t('faq2a') },
                { q: t('faq3'), a: t('faq3a') },
              ].map((faq, index) => (
                <div key={index} className="border-b border-gray-200 dark:border-gray-700 pb-4">
                  <h3 className="font-semibold mb-2">{faq.q}</h3>
                  <p className="text-gray-600 dark:text-gray-400">{faq.a}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Contact

