import { createContext, useContext, useState, useEffect } from 'react'
import { campaignsData, donationCategories } from '../data/mockData'

const DonationContext = createContext()

export const useDonation = () => useContext(DonationContext)

export const DonationProvider = ({ children }) => {
  const [cart, setCart] = useState(() => {
    const saved = localStorage.getItem('donorbd-cart')
    return saved ? JSON.parse(saved) : []
  })

  const [donations, setDonations] = useState(() => {
    const saved = localStorage.getItem('donorbd-donations')
    return saved ? JSON.parse(saved) : []
  })

  const [campaigns, setCampaigns] = useState(campaignsData)
  const [categories] = useState(donationCategories)

  useEffect(() => {
    localStorage.setItem('donorbd-cart', JSON.stringify(cart))
  }, [cart])

  useEffect(() => {
    localStorage.setItem('donorbd-donations', JSON.stringify(donations))
  }, [donations])

  const addToCart = (item) => {
    setCart(prev => [...prev, item])
  }

  const removeFromCart = (id) => {
    setCart(prev => prev.filter(item => item.id !== id))
  }

  const clearCart = () => setCart([])

  const makeDonation = (donationData) => {
    const newDonation = {
      ...donationData,
      id: Date.now(),
      date: new Date().toISOString(),
      status: 'completed'
    }
    
    setDonations(prev => [...prev, newDonation])
    
    // Update campaign raised amount
    if (donationData.campaignId) {
      setCampaigns(prev => prev.map(campaign => 
        campaign.id === donationData.campaignId 
          ? { ...campaign, raised: campaign.raised + donationData.amount }
          : campaign
      ))
    }
    
    clearCart()
    return newDonation
  }

  const processMultipleDonations = (donationsArray) => {
    const newDonations = donationsArray.map((donationData, index) => ({
      ...donationData,
      id: Date.now() + index,
      date: new Date().toISOString(),
      status: 'completed'
    }))
    
    setDonations(prev => [...prev, ...newDonations])
    
    // Update campaign raised amounts
    newDonations.forEach(donation => {
      if (donation.campaignId) {
        setCampaigns(prev => prev.map(campaign => 
          campaign.id === donation.campaignId 
            ? { ...campaign, raised: campaign.raised + donation.amount }
            : campaign
        ))
      }
    })
    
    clearCart()
    return newDonations
  }

  const totalRaised = campaigns.reduce((sum, campaign) => sum + campaign.raised, 0)
  const totalDonors = donations.length

  return (
    <DonationContext.Provider value={{
      cart,
      addToCart,
      removeFromCart,
      clearCart,
      makeDonation,
      processMultipleDonations,
      donations,
      campaigns,
      categories,
      totalRaised,
      totalDonors
    }}>
      {children}
    </DonationContext.Provider>
  )
}

