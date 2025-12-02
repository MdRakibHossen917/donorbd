import { useLanguage } from '../context/LanguageContext'
import { Target, Users, Shield, Heart } from 'lucide-react'

const About = () => {
  const { t } = useLanguage()

  const team = [
    { name: "Dr. Ahmed Hussain", role: "Founder & CEO", bio: "20+ years in social work" },
    { name: "Fatima Rahman", role: "Operations Director", bio: "Expert in NGO management" },
    { name: "Karim Chowdhury", role: "Finance Head", bio: "Chartered Accountant" },
    { name: "Sadia Islam", role: "Campaign Manager", bio: "Digital marketing specialist" },
  ]

  const values = [
    { icon: <Target />, title: t('transparency'), desc: t('transparencyDesc') },
    { icon: <Users />, title: t('impact'), desc: t('impactDesc') },
    { icon: <Shield />, title: t('trust'), desc: t('trustDesc') },
    { icon: <Heart />, title: t('compassion'), desc: t('compassionDesc') },
  ]

  return (
    <div className="space-y-12 sm:space-y-16 px-4">
      {/* Hero */}
      <div className="text-center">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6">{t('aboutUs')}</h1>
        <p className="text-base sm:text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto px-4">
          {t('aboutDescription')}
        </p>
      </div>

      {/* Mission & Vision */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">{t('ourMission')}</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {t('missionDescription')}
          </p>
        </div>
        <div className="card">
          <h2 className="text-2xl font-semibold mb-4">{t('ourVision')}</h2>
          <p className="text-gray-700 dark:text-gray-300">
            {t('visionDescription')}
          </p>
        </div>
      </div>

      {/* Values */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{t('ourValues')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {values.map((value, index) => (
            <div key={index} className="card text-center">
              <div className="w-16 h-16 mx-auto mb-4 bg-primary-100 dark:bg-primary-900/30 rounded flex items-center justify-center text-primary-600 dark:text-primary-400">
                {value.icon}
              </div>
              <h3 className="text-xl font-semibold mb-2">{value.title}</h3>
              <p className="text-gray-600 dark:text-gray-400">{value.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Team */}
      <div>
        <h2 className="text-2xl sm:text-3xl font-bold text-center mb-8 sm:mb-12">{t('ourTeam')}</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {team.map((member, index) => (
            <div key={index} className="card text-center">
              <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-r from-primary-500 to-secondary-500 rounded-full flex items-center justify-center text-white text-2xl font-bold">
                {member.name.charAt(0)}
              </div>
              <h3 className="text-xl font-semibold mb-1">{member.name}</h3>
              <div className="text-primary-600 dark:text-primary-400 font-medium mb-2">{member.role}</div>
              <p className="text-gray-600 dark:text-gray-400 text-sm">{member.bio}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Stats */}
      <div className="bg-gradient-to-r from-primary-500 to-secondary-500 rounded p-6 sm:p-8 md:p-12 text-white">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 md:gap-8 text-center">
          <div>
            <div className="text-4xl font-bold mb-2">50K+</div>
            <div>{t('peopleHelped')}</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">200+</div>
            <div>{t('campaignsCompleted')}</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">15+</div>
            <div>{t('yearsExperience')}</div>
          </div>
          <div>
            <div className="text-4xl font-bold mb-2">64</div>
            <div>{t('districtsCovered')}</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default About

