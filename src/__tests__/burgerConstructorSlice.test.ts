import {
    initialState,
    TBurgerConstructorState,
    burgerConstructorReducer,
    addIngredientInConstructor,
    removeIngredientFromConstructor,
    moveUpIngredientInConstructor,
    moveDownIngredientInConstructor,
    resetConstructor
} from '../services/slices/burgerConstructorSlice';
import { TConstructorIngredient } from '../utils/types';

const bunTest: TConstructorIngredient = {
    id: '1',
    _id: '1',
    name: 'булкаТест',
    type: 'bun',
    proteins: 80,
    fat: 24,
    carbohydrates: 53,
    calories: 420,
    price: 1255,
    image: "https://code.s3.yandex.net/react/code/bun-02.png",
    image_large: "https://code.s3.yandex.net/react/code/bun-02-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/bun-02-mobile.png"
};

const ingredientTest: TConstructorIngredient = {
    id: '2',
    _id: '2',
    name: 'котлетаТест',
    type: 'main',
    proteins: 420,
    fat: 142,
    carbohydrates: 242,
    calories: 4242,
    price: 424,
    image: "https://code.s3.yandex.net/react/code/meat-01.png",
    image_large: "https://code.s3.yandex.net/react/code/meat-01-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/meat-01-mobile.png"
};

const ingredientSauceTest: TConstructorIngredient = {
    id: '3',
    _id: '3',
    name: 'соусТест',
    type: 'sauce',
    proteins: 50,
    fat: 22,
    carbohydrates: 11,
    calories: 14,
    price: 80,
    image: "https://code.s3.yandex.net/react/code/sauce-04.png",
    image_large: "https://code.s3.yandex.net/react/code/sauce-04-large.png",
    image_mobile: "https://code.s3.yandex.net/react/code/sauce-04-mobile.png"
};

describe('Тестирование burgerConstructorSlice', function () {

    test('add Ingredient', function () {
        const newState = burgerConstructorReducer(
            initialState,
            addIngredientInConstructor(ingredientTest)
        );

        expect(newState.constructorBurger.ingredients[0]).toEqual({
            ...ingredientTest,
            id: expect.any(String)
        });
        expect(newState.constructorBurger.ingredients).toHaveLength(1);
    });


    test('add bun', function () {
        const newState = burgerConstructorReducer(
            initialState,
            addIngredientInConstructor(bunTest)
        );

        expect(newState.constructorBurger.bun).toEqual({
            ...bunTest,
            id: expect.any(String)
        });
        expect(newState.constructorBurger.ingredients).toHaveLength(0);
    });

    test('remove Ingredient', () => {
        const testState: TBurgerConstructorState = {
            constructorBurger: {
                bun: null,
                ingredients: [ingredientTest]
            },
            isLoading: false,
            error: null
        };

        const newState = burgerConstructorReducer(
        testState,
        removeIngredientFromConstructor(0)
        );

        expect(newState.constructorBurger.ingredients).toHaveLength(0);
    });

    test('move Up Ingredient', () => {
        const testState: TBurgerConstructorState = {
            constructorBurger: {
                bun: null,
                ingredients: [ingredientTest, ingredientSauceTest]
            },
            isLoading: false,
            error: null
        };

        const newState = burgerConstructorReducer(
            testState,
            moveUpIngredientInConstructor(ingredientSauceTest)
        );
        expect(newState.constructorBurger.ingredients).toEqual([ingredientSauceTest, ingredientTest]);
    });

    test('move Down Ingredient', () => {
        const testState: TBurgerConstructorState = {
            constructorBurger: {
                bun: null,
                ingredients: [ingredientTest, ingredientSauceTest]
            },
            isLoading: false,
            error: null
        };

        const newState = burgerConstructorReducer(
            testState,
            moveDownIngredientInConstructor(ingredientTest)
        );
        expect(newState.constructorBurger.ingredients).toEqual([ingredientSauceTest, ingredientTest]);
    });

    test('reset Constructor', () => {
        const testState: TBurgerConstructorState = {
            constructorBurger: {
                bun: null,
                ingredients: [ingredientTest]
            },
            isLoading: false,
            error: null
        };

        const newState = burgerConstructorReducer(
            testState,
            resetConstructor()
        );

        const expectState = {
            constructorBurger: {
                bun: null,
                ingredients: []
            },
            isLoading: false,
            error: null
        };
        
        expect(newState).toEqual(expectState);
    });
});