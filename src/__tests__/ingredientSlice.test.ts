import {    getBurgerIngredients,
            ingredientsReducer,
            initialState
        } from "../services/slices/ingredientsSlice"; 

describe('Тестирование ingredientsSlice', () => {
    
    it('состояние становится isLoading=true при pending', () => {
        
        const state = {
            ingredients: [],
            isLoading: true,
            error: null
        }
        
        const newState = ingredientsReducer(
            { ...initialState },
            getBurgerIngredients.pending('')
        );

        expect(newState).toEqual(state);
    }); 


});
