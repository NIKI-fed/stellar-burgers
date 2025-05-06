// Объявления констант
const burger_ingredient = '[data-cy=burger_ingredient]';
const burger_constructor = '[data-cy=burger_constructor]';
const modal = '[data-cy=modal]';
const modal_overlay = '[data-cy=modalOverlay]';
const bun = 'Краторная булка N-200i';
const main = 'Биокотлета из марсианской Магнолии';

function commonBeforeEach() {
    // Используем данные из fixures для mock-запросов
    cy.intercept('GET', 'api/ingredients', { fixture: 'ingredients.json' });
    cy.intercept('GET', 'api/auth/user', { fixture: 'user.json' });
    
    // Подставляются фейковые токены авторизации
    localStorage.setItem('refreshToken', 'testRefreshToken');
    cy.setCookie('accessToken', 'testAccessToken');

    // Разрешение отображения в cypress
    cy.viewport(1400, 1200)

    // Адрес страницы
    cy.visit('/');
}

function commonAfterEach() {
    // После завершения тестов токены авторизации очищаются 
    localStorage.removeItem('refreshToken');
    cy.clearCookie('accessToken');
};

describe('Добавление ингредиента из списка ингредиентов в конструктор', () => {
    beforeEach(commonBeforeEach);
    afterEach(commonAfterEach);

    it('add ingredient', () => {
        // Клик на выбранный ингредиент и проверка наличия выбранного ингредиента в конструкторе
        cy.get(burger_ingredient).contains(bun).parent().find('button').click();
        cy.get(burger_constructor).should('contain.text', bun);
        
        cy.get(burger_ingredient).contains(main).parent().find('button').click();
        cy.get(burger_constructor).should('contain.text', main);
    });
});

describe('Открытие и закрытие модального окна с описанием ингредиента', () => {
    beforeEach(commonBeforeEach);
    afterEach(commonAfterEach);

    it('modal open/close', () => {
        // Клик на ингредиент и закрытие крестиком
        cy.contains(bun).click();
        cy.get(modal).should('exist');
        cy.get(modal).find('button').click();
        cy.get(modal).should('not.exist');

        // Клик на ингредиент и закрытие кликом на оверлэй
        cy.contains(bun).click();
        cy.get(modal).should('exist');
        cy.get(modal_overlay).click({ force: true });
        cy.get(modal).should('not.exist');
    });

    it('modal ingredient is correctly', () => {
        cy.contains(bun).click();
        cy.get(modal).should('exist');
        cy.get(modal).contains(bun);
    });
});

describe('Процесс создания заказа', () => {
    beforeEach(commonBeforeEach);
    afterEach(commonAfterEach);

    it('add ingredients and postOrder', () => {
        cy.get(burger_ingredient).contains(bun).parent().find('button').click();
        cy.get(burger_ingredient).contains(main).parent().find('button').click();
        cy.get(burger_constructor).should('contain.text', bun, main);
    
        cy.intercept('POST', 'api/orders', { fixture: 'postOrder.json' }).as('postOrder');

        // Клик по кнопке "оформить заказ"
        cy.contains('Оформить заказ').click();

        // Ожидание успешного ответа
        cy.wait('@postOrder').its('response.statusCode').should('eq', 200);

        // Проверка отображения модального окна с верным номером заказа при клике на кнопку оформления заказа
        cy.get(modal).should('exist');
        cy.get(modal).should('contain', '75000');
        
        // Закрытие окна и проверка очистки конструктора бургера от добавленных ингредиентов
        cy.get(modal).find('button').click();
        cy.get(modal).should('not.exist');

        cy.get(burger_constructor).children().first().should('contain.text', 'Выберите булки');
        cy.get(burger_constructor).children().first().next().should('contain.text', 'Выберите начинку');
    });
});
