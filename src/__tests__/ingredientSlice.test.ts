import {    getBurgerIngredients,
            ingredientsReducer,
            initialState
        } from "../services/slices/ingredientsSlice"; 

describe('Тестирование ingredientsSlice', () => {
    
    test('getBurgerIngredients pending', () => {
        const newState = ingredientsReducer(
            { ...initialState },
            getBurgerIngredients.pending('')
        );
        
        expect(newState.isLoading).toEqual(true);
        expect(newState.error).toEqual(null);
    }); 

    test('getBurgerIngredients fulfilled', () => {
        const testIngredient = [
        {
            _id: "643d69a5c3f7b9001cfa0949",
            name: "Мини-салат Экзо-Плантаго",
            type: 'main',
            proteins: 1,
            fat: 2,
            carbohydrates: 3,
            calories: 6,
            price: 4400,
            image: "https://code.s3.yandex.net/react/code/salad.png",
            image_large: "https://code.s3.yandex.net/react/code/salad-large.png",
            image_mobile: "https://code.s3.yandex.net/react/code/salad-mobile.png"
        }
    ];
    const testState = {
        ingredients: testIngredient,
        isLoading: false,
        error: null
    }
    const newState = ingredientsReducer(
        { ...initialState },
        getBurgerIngredients.fulfilled(testIngredient, '')
    );
        expect(newState.isLoading).toEqual(false);
        expect(newState.ingredients).toEqual(testState.ingredients);
    });

    test('getBurgerIngredients rejected', () => {
        const testError = new Error('Error message');
        const newState = ingredientsReducer(
            { ...initialState },
            getBurgerIngredients.rejected(testError, '')
        );

        expect(newState.isLoading).toEqual(false);
        expect(newState.error).toEqual(testError.message);
    });
});