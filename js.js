class Validator {
    constructor(form) {
        this.patterns = {
            name: /^[a-zа-яё]+$/i,
            phone: /^\+7\(\d{3}\)\d{3}-\d{4}$/,
            email: /^[\w.-]+@\w+\.[a-z]{2,4}$/i
        };
        this.errors = {
            name: 'Имя содержит только буквы',
            phone: 'Телефон подчиняется шаблону +7(000)000-0000',
            email: 'E-mail выглядит как mymail@mail.ru, или my.mail@mail.ru, или my-mail@mail.ru'
        };
        this.errorClass = 'error';
        this.form = form;
        this.valid = false;
        this._validateForm();
    }

    /**
     * Проверяет валидность формы
     * @private
     */
    _validateForm() {
        // выясняем была ли проверка ранее
        let errors = [...document.querySelector(this.form).querySelectorAll(`.${this.errorClass}`)];
        // если была то итерируем массив с отловленными ошибками
        for (let error of errors) {
            // и удаляем ошибки
            error.remove();
        }
        // находим все поля формы, которые необходимо проверить
        let formFields = [...document.querySelector(this.form).getElementsByTagName('input')];
        // проверяем каждое поле
        for (let field of formFields) {
            this._validate(field);
        }
        if (![...document.querySelector(this.form).querySelectorAll(`.invalid`)].length) {
            this.valid = true;
        }
    }

    /**
     * Проверяет валидность одного поля формы
     * @param field поле, которое заполнил пользователь
     * @private
     */
    _validate(field) {
        // если мы получили какую-то строку, то проверяем ее
        if (this.patterns[field.name]) {
            // если тест вернул значение false, т.е. поле заполнено неверно
            if (!this.patterns[field.name].test(field.value)) {
                // к данному полю добавляем класс ошибки(добавляем красное подчеркивание)
                field.classList.add('invalid');
                // генерируем сообщение об ошибке
                this._errorMsg(field);
                this._watchField(field);
            }
        }
    }

    /**
     * Создает сообщение об ошибке
     * @param field
     * @private
     */
    _errorMsg(field) {
      let error = `<div class="${this.errorClass}">${this.errors[field.name]}</div>`;
      field.parentNode.insertAdjacentHTML('beforeend', error);
    }

    _watchField(field) {
        // вешаем обработчик собитий на действие input
        field.addEventListener('input', () => {
            // ловим ошибку
            let error = field.parentNode.querySelector(`.${this.errorClass}`);
            // проверяем что вводит пользователь и если все верно
            if (this.patterns[field.name].test(field.value)) {
                // удаляем класс ошибки
                field.classList.remove('invalid');
                // добавляем класс правильного ввода
                field.classList.add('valid');
                // если была ошибка
                if (error) {
                    // удаляем сообщение об ошибке
                    error.remove();
                }
            } else {
                field.classList.remove('valid');
                field.classList.add('invalid');
                if (!error) {
                    this._errorMsg(field);
                }
            }
        })
    }
}

