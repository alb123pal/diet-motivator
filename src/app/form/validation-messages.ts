export const ValidationErrorMessages = {
    login: {
        required: 'Login jest wymmagany',
        minlength: 'Minimalna długość loginu to 3 znaki'
    },
    name: {
        required: 'Imię jest wymagane',
    },
    surname: {
        required: 'Nazwisko jest wymagane',
    },
    email: {
        required: 'Email jest wymagany',
        minlength: 'Email musi składać się conajmniej  5 znaków',
        email: 'Wprowadzony email jest nieprawidłowy'
    },
    passwordGroup: {
        matchingConfirmedPassword: 'Hasła różnią się między sobą'
    }
};
