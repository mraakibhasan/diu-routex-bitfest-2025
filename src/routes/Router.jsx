import { BrowserRouter ,  Routes , Route } from "react-router-dom";
import React  from "react";
import  Welcome from "@/pages/Welcome";
import Ingredients from "@/pages/Ingrediant";
import RecipeManagement from "@/pages/Recipe";



const  MainRouter = ()=>{
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Welcome />} />
                <Route path="/ingredients" element={<Ingredients/>} />
                <Route path="/recipes" element={<RecipeManagement />} />
            </Routes>
        </BrowserRouter>
    )
}

export default MainRouter;