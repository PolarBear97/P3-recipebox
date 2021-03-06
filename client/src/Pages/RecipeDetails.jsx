import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getRecipe } from '../Services/recipes'

import StepNav from '../Components/StepNav'
import ActionBar from '../Components/ActionBar'
import AmountAndTime from '../Components/AmountAndTime'
import Ingredient from '../Components/Ingredient'
import Step from '../Components/Step'
import Comments from '../Components/Comments'

export default function RecipeDetails() {


  const { id } = useParams()
  const [recipe, setRecipe] = useState({})

  useEffect(() => {

    (async () => setRecipe(await getRecipe(id)))()
  },[id])

  const {
    title,
    coverImage,
    servesPeople,
    cookTime,
    cookTimeUnit,
    ingredients,
    preparation,
    comments } = recipe
  
  return (
    <>
      <div className="flex container mx-auto  px-1 bg-white">

        <aside className="w-2/12 sm:w-1/12 sticky h-screen mr-1" style={{ top: '10px' }}> <StepNav /> </aside>

        
        <div className="w-10/12 sm:w-11/12">

          <img className="w-full h-auto" src={coverImage} alt="cover" />
          <h3 className="text-2xl text-bold py-3 mb-5 text-center border-b-2 border-gray-400 ">{title}</h3>
          
          <ActionBar id={id}/>

          <AmountAndTime servesPeople={servesPeople} cookTime={cookTime} cookTimeUnit={cookTimeUnit} />

          <h4 className="text-xl text-bold mt-5  ">Ingredients</h4>
          {ingredients && ingredients.map((ingredient, index) =>
            <Ingredient amountNum={ingredient.amountNum} amountDen={ingredient.amountDen} unit={ingredient.unit} consistency={ingredient.consistency} name={ingredient.name} meta={ingredient.meta} key={index} />
          )}

          {preparation && preparation.map((step, index) =>
            <Step step={step.step} description={step.description} stepImage={step.stepImage} key={index} />
          )}

          <h3 className="mb-5">You're Finished!</h3>
          <div>
            <Comments comments={comments && comments.reverse()} recipe={recipe} setRecipe={setRecipe} id={id} />
          </div>
        </div>
      </div>
    </>
  )
}
