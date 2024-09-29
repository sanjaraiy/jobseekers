import CategoryCarousel from '@/components/CategoryCarousel'
import HeroSection from '@/components/HeroSection'
import LatestJobs from '@/components/LatestJobs'
import React from 'react'

function Home() {
  return (
    <div>
      <HeroSection></HeroSection>
      <CategoryCarousel></CategoryCarousel>
      <LatestJobs></LatestJobs>
    </div>
  )
}

export default Home