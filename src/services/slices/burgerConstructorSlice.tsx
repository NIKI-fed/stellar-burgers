import { nanoid, PayloadAction, createSlice } from '@reduxjs/toolkit';
import { TIngredient, TConstructorIngredient } from '@utils-types';

type TConstructor = {
    bun: TConstructorIngredient | null;
    ingredients: TConstructorIngredient[];
}

// Определяем тип состояния конструктора бургера
type TBurgerConstructorState = {
    constructorBurger: TConstructor;
    isLoading: boolean;
    error: string | null | undefined;
}

// Записываем начальное состояние конструктора бургера
const initialState: TBurgerConstructorState = {
    constructorBurger: {
        bun: null,
        ingredients: []
    },
    isLoading: false,
    error: null
};

export const burgerConstructorSlice = createSlice({
    name: 'burgerConstructor',
    initialState,
    reducers: {

        addIngredientInConstructor: {
            reducer: (state, action: PayloadAction<TConstructorIngredient>) => {
                if (action.payload.type === 'bun') {
                    state.constructorBurger.bun = action.payload;
                } else {
                    state.constructorBurger.ingredients.push(action.payload);
                }
            },
            prepare: (item: TIngredient) => {
                const id = nanoid();
                return {payload: { ...item, id }}
            },
        },

        removeIngredientFromConstructor: (state, action: PayloadAction<number>) => {
            state.constructorBurger.ingredients.splice(action.payload, 1);
        },

        moveUpIngredientInConstructor: (state, action: PayloadAction<TConstructorIngredient>) => {
            const ingredient = action.payload;
            const index = state.constructorBurger.ingredients.findIndex((item) => item.id === ingredient.id);
            state.constructorBurger.ingredients.splice(index, 1);
            state.constructorBurger.ingredients.splice(index - 1, 0, ingredient);
        },

        moveDownIngredientInConstructor: (state, action: PayloadAction<TConstructorIngredient>) => {
            const ingredient = action.payload;
            const index = state.constructorBurger.ingredients.findIndex((item) => item.id === ingredient.id);
            state.constructorBurger.ingredients.splice(index, 1);
            state.constructorBurger.ingredients.splice(index + 1, 0, ingredient);
        },

        resetConstructor: (state) => {
            state.constructorBurger.ingredients = [];
            state.constructorBurger.bun = null;
        }
    },
    
    selectors: {
        selectorBurgerConstructor: (state) => state.constructorBurger,
        selectorBurgerConstructorIsLoading: (state) => state.isLoading
    }
});

export const {
    addIngredientInConstructor,
    removeIngredientFromConstructor,
    moveUpIngredientInConstructor,
    moveDownIngredientInConstructor,
    resetConstructor
} = burgerConstructorSlice.actions;

console.log(burgerConstructorSlice.actions)

export const burgerConstructorReducer = burgerConstructorSlice.reducer;

export const {  selectorBurgerConstructor,
                selectorBurgerConstructorIsLoading 
            } = burgerConstructorSlice.selectors;