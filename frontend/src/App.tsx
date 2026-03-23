import { useState } from 'react'

import ProjectList from './ProjectList'
import CategoryFilter from './CategoryFilter'
import WelcomeBand from './WelcomeBand'

function App() {
  const [count, setCount] = useState(0)
  const [selectedCategories, setSelectedCategories] = useState<string[]>([]);

  return (
    <>
    <div className="container mt-4">
      <div className="row bg-primary text-white text-center py-3 mb-4">
        <WelcomeBand />
      </div>
      <div className='row'>
        <div className='col-md-3'>
          <CategoryFilter selectedCategories={selectedCategories} onCheckboxChange={setSelectedCategories} />
        </div>
        <div className='col-md-9'>
          <ProjectList selectedCategories={selectedCategories} />
        </div>
      </div>
    </div>
    </>
  )
}

export default App
