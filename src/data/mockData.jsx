import { BookOpen, Heart, Home, Apple, Users, Shield, Briefcase, Globe } from 'lucide-react'

// Icon mapping
export const iconMap = {
  education: BookOpen,
  healthcare: Heart,
  shelter: Home,
  food: Apple,
  orphan: Users,
  emergency: Shield,
  livelihood: Briefcase,
  environment: Globe,
}

export const donationCategories = [
  { id: 'education', name: 'Education', iconName: 'education', count: 12 },
  { id: 'healthcare', name: 'Healthcare', iconName: 'healthcare', count: 8 },
  { id: 'shelter', name: 'Shelter', iconName: 'shelter', count: 5 },
  { id: 'food', name: 'Food & Nutrition', iconName: 'food', count: 7 },
  { id: 'orphan', name: 'Orphan Support', iconName: 'orphan', count: 4 },
  { id: 'emergency', name: 'Emergency Relief', iconName: 'emergency', count: 6 },
  { id: 'livelihood', name: 'Livelihood', iconName: 'livelihood', count: 3 },
  { id: 'environment', name: 'Environment', iconName: 'environment', count: 2 },
]

export const campaignsData = [
  {
    id: 1,
    title: "Flood Relief in Sylhet",
    category: "Emergency Relief",
    description: "Provide emergency assistance to flood-affected families in Sylhet region with food, clean water, and shelter materials.",
    target: 500000,
    raised: 320000,
    deadline: "2024-12-31",
    donors: 124,
    urgent: true,
    location: "Sylhet, Bangladesh",
    image: "/flood-relief.jpg",
    createdAt: "2024-01-01"
  },
  {
    id: 2,
    title: "Education for Underprivileged Children",
    category: "Education",
    description: "Support education expenses for 100 underprivileged children in rural areas including books, uniforms, and school fees.",
    target: 300000,
    raised: 180000,
    deadline: "2024-06-30",
    donors: 89,
    urgent: false,
    location: "Rangpur, Bangladesh",
    image: "/education.jpg",
    createdAt: "2024-01-05"
  },
  {
    id: 3,
    title: "Healthcare Support for Cancer Patients",
    category: "Healthcare",
    description: "Help cancer patients with their treatment expenses who cannot afford the high costs of chemotherapy and medication.",
    target: 1000000,
    raised: 650000,
    deadline: "2024-08-15",
    donors: 256,
    urgent: true,
    location: "Dhaka, Bangladesh",
    image: "/healthcare.jpg",
    createdAt: "2024-01-10"
  },
  {
    id: 4,
    title: "Orphanage Support Program",
    category: "Orphan Support",
    description: "Monthly support for orphanages including food, education, and healthcare for children without parents.",
    target: 200000,
    raised: 125000,
    deadline: "2024-05-20",
    donors: 67,
    urgent: false,
    location: "Chittagong, Bangladesh",
    image: "/orphanage.jpg",
    createdAt: "2024-01-15"
  },
  {
    id: 5,
    title: "Food Distribution During Ramadan",
    category: "Food & Nutrition",
    description: "Distribute iftar meals to 1000 poor families during the holy month of Ramadan.",
    target: 250000,
    raised: 150000,
    deadline: "2024-03-20",
    donors: 145,
    urgent: false,
    location: "Across Bangladesh",
    image: "/ramadan.jpg",
    createdAt: "2024-01-20"
  },
  {
    id: 6,
    title: "Disaster Preparedness Training",
    category: "Emergency Relief",
    description: "Train communities in disaster-prone areas on emergency preparedness and response techniques.",
    target: 150000,
    raised: 75000,
    deadline: "2024-09-30",
    donors: 45,
    urgent: false,
    location: "Coastal Areas",
    image: "/training.jpg",
    createdAt: "2024-01-25"
  }
]

export const successStories = [
  {
    id: 1,
    name: "Ayesha Begum",
    story: "With your donations, I was able to complete my college education and now work as a teacher.",
    amount: 50000,
    category: "Education",
    date: "2023-12-15"
  },
  {
    id: 2,
    name: "Rahim Ahmed",
    story: "Emergency medical support saved my daughter's life. Thank you for your generosity.",
    amount: 150000,
    category: "Healthcare",
    date: "2023-11-20"
  }
]
