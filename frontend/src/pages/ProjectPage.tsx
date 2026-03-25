import { useState } from "react";
import CategoryFilter from "../components/CategoryFilter";
import WelcomeBand from "../components/WelcomeBand";
import ProjectList from "../components/ProjectList";
import CartSummary from "../components/CartSummary";

function ProjectPage(){
    const [selectedCategories, setSelectedCategories] = useState<string[]>([]);
    return (
    <>
    <div className="container mt-4">
        <CartSummary />
        <WelcomeBand />
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
export default ProjectPage;