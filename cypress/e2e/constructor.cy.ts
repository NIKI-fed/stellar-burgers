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
    cy.visit('http://localhost:4000/');
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
        cy.get('[data-cy=burger_ingredient]').contains('Краторная булка N-200i').parent().find('button').click();
        cy.get('[data-cy=burger_constructor]').should('contain.text', 'Краторная булка N-200i');
        
        cy.get('[data-cy=burger_ingredient]').contains('Биокотлета из марсианской Магнолии').parent().find('button').click();
        cy.get('[data-cy=burger_constructor]').should('contain.text', 'Биокотлета из марсианской Магнолии');
    });
});

describe('Открытие и закрытие модального окна с описанием ингредиента', () => {
    beforeEach(commonBeforeEach);
    afterEach(commonAfterEach);

    it('modal open/close', () => {
        // Клик на ингредиент и закрытие крестиком
        cy.contains('Краторная булка N-200i').click();
        cy.get('[data-cy=modal]').should('exist');
        cy.get('[data-cy=modal]').find('button').click();
        cy.get('[data-cy=modal]').should('not.exist');

        // Клик на ингредиент и закрытие кликом на оверлэй
        cy.contains('Краторная булка N-200i').click();
        cy.get('[data-cy=modal]').should('exist');
        cy.get('[data-cy=modalOverlay]').click({ force: true });
        cy.get('[data-cy=modal]').should('not.exist');
    });

    it('modal ingredient is correctly', () => {
        cy.contains('Краторная булка N-200i').click();
        cy.get('[data-cy=modal]').should('exist');
        cy.get('[data-cy=modal]').contains('Краторная булка N-200i');
    });
});

describe('Процесс создания заказа', () => {
    beforeEach(commonBeforeEach);
    afterEach(commonAfterEach);

    it('add ingredients and postOrder', () => {
        cy.get('[data-cy=burger_ingredient]').contains('Краторная булка N-200i').parent().find('button').click();
        cy.get('[data-cy=burger_ingredient]').contains('Биокотлета из марсианской Магнолии').parent().find('button').click();
        cy.get('[data-cy=burger_constructor]').should('contain.text', 'Краторная булка N-200i', 'Биокотлета из марсианской Магнолии');
    
        cy.intercept('POST', 'api/orders', { fixture: 'postOrder.json' }).as('postOrder');

        // Клик по кнопке "оформить заказ"
        cy.contains('Оформить заказ').click();

        // Ожидание успешного ответа
        cy.wait('@postOrder').its('response.statusCode').should('eq', 200);

        // Проверка отображения модального окна с верным номером заказа при клике на кнопку оформления заказа
        cy.get('[data-cy=modal]').should('exist');
        cy.get('[data-cy=modal]').should('contain', '75000');
        
        // Закрытие окна и проверка очистки конструктора бургера от добавленных ингредиентов
        cy.get('[data-cy=modal]').find('button').click();
        cy.get('[data-cy=modal]').should('not.exist');

        cy.get('[data-cy=burger_constructor]').children().first().should('contain.text', 'Выберите булки');
        cy.get('[data-cy=burger_constructor]').children().first().next().should('contain.text', 'Выберите начинку');
    });
});
