import 'normalize.css/normalize.css'
import './main.scss'

class FormValidator {
  constructor(form, fields) {
    this.form = form
    this.fields = fields
    this.formSubmitted = false;
  }

  initialize() {
    this.validateOnEntry()
    this.validateOnSubmit()
  }

  validateOnSubmit() {
    let self = this

    this.form.addEventListener('submit', e => {
      e.preventDefault()

      self.formSubmitted = true;

      self.fields.forEach(field => {
        const input = document.querySelector(`#${field}`)
        self.validateFields(input)
      })
    })
  }

  validateOnEntry() {
    let self = this

    this.fields.forEach(field => {
      const input = document.querySelector(`#${field}`)

      input.addEventListener('input', event => {
        self.validateFields(input)
      })
    })
  }

  validateFields(field) {
    if( !this.formSubmitted ) return;

    const fieldType = field.getAttribute('data-validation');

    // Check presence of values
    if (field.value.trim() === '') {
      this.setStatus(field, `${field.nextElementSibling.innerText} cannot be blank`, 'error')
    } else {
      this.setStatus(field, null, 'success')
    }

    // check for a valid email address
    if (fieldType === 'email') {
      const re = /\S+@\S+\.\S+/
      if (re.test(field.value)) {
        this.setStatus(field, null, 'success')
      } else {
        this.setStatus(field, 'Please enter a valid email address', 'error')
      }
    }

    // check for a valid password
    if (fieldType === 'password') {
      if (field.value.length >= 8) {
        this.setStatus(field, null, 'success')
      } else {
        this.setStatus(field, 'Minimum 8 characters', 'error')
      }
    }
  }

  setStatus(field, message, status) {
    const errorMessage = field.parentElement.parentElement.querySelector('.login-form-error')

    if (status === 'success') {
      if (errorMessage) { errorMessage.innerText = '' }
      field.parentElement.classList.remove('input-error')
    }

    if (status === 'error') {
      if (errorMessage) { errorMessage.innerText = message }
      field.parentElement.classList.add('input-error')
    }
  }
}

const form = document.querySelector('#login-form')
const fields = ['username', 'email', 'user_type', 'password']

const validator = new FormValidator(form, fields)
validator.initialize()

document.querySelector('#password-show').addEventListener('click', e => {
  e.preventDefault()

  const buttonElem = document.querySelector('#password-show');
  const buttonStatus = buttonElem.getAttribute('data-show');
  const passwordElem = document.querySelector('#password');

  if( buttonStatus === 'no' ){
    passwordElem.setAttribute('type', 'text');
    buttonElem.setAttribute('data-show', 'yes');
  } else {
    passwordElem.setAttribute('type', 'password');
    buttonElem.setAttribute('data-show', 'no');
  }
})