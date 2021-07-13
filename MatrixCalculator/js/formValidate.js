//form validate
var validateArray = []
class Validate{
    constructor($formID){
        this.$formID = $formID
        this.$validateRes = []
    }
    get formID(){
        return this.$formID
    }
    get validateRes(){
        return this.$validateRes
    }
    set validateRes(arrValue){
        let index = this.$validateRes.findIndex(validateRes => validateRes.id == arrValue.id)
        if(index == '-1'){
            this.$validateRes.push(arrValue)
        }else{
            this.$validateRes[index] = arrValue
        }
    }
}

function showFeedback(formID, inputID, inputElementValue, inValid, feedback){
    const inputElement = document.forms[formID][inputID]
    let inputFeedback = inputElement.parentElement.querySelector('.form-feedback')
    inputFeedback == null ? inputFeedback = inputElement.parentElement.parentElement.querySelector('.form-feedback') : {}
    inputFeedback == null ? inputFeedback = inputElement.parentElement.parentElement.parentElement.querySelector('.form-feedback') : {}
    let index = validateArray.findIndex(validate => validate.formID == formID)
    if (inValid){
        inputFeedback.innerHTML = feedback
        inputElement.classList.remove('is-valid')
        inputElement.classList.add('is-invalid')
        validateArray[index].validateRes = {id: inputID, isValid: false, value: inputElementValue}
    } else{
        inputFeedback.innerHTML = ''
        inputElement.classList.remove('is-invalid')
        inputElement.classList.add('is-valid')
        validateArray[index].validateRes = {id: inputID, isValid: true, value: inputElementValue}
    }
}

function inputRequire(formID, inputID, RequiredFeedback = '*Trường này không được bỏ trống!', minLenght = 0, minLengthFeedback = '*Bạn phải nhập nhiều ký tự hơn nữa!'){
    const inputElement = document.forms[formID][inputID]
    inputElement.addEventListener('blur', e => inputRequireCheck(e, formID, inputID, RequiredFeedback, minLenght, minLengthFeedback))
    inputElement.addEventListener('input', e => inputRequireCheck(e, formID, inputID, RequiredFeedback, minLenght, minLengthFeedback))
    document.forms[formID].addEventListener('submit', () => {
        const inputElementValue = inputElement.value.trim().valueOf()
        const inValid = (inputElementValue == '')
        showFeedback(formID, inputID, inputElementValue, inValid, RequiredFeedback)
    })
}
function inputRequireCheck(e, formID, inputID, RequiredFeedback, minLenght, minLengthFeedback){
    const inputElementValue = e.target.value.trim().valueOf()
    let inValid
    if (minLenght != 0) {
        inValid = (inputElementValue.length > 0 && inputElementValue.length < minLenght)
        showFeedback(formID, inputID, inputElementValue, inValid, minLengthFeedback)
    }
    inValid = (inputElementValue == '')
    inValid? showFeedback(formID, inputID, inputElementValue, inValid, RequiredFeedback):{}
}

function inputRegex(formID, inputID, regex, feedback){
    const inputElement = document.forms[formID][inputID]
    inputElement.addEventListener('input', e => {
        const inputElementValue = e.target.value.trim().valueOf()
        const inValid = !(regex.test(inputElementValue))
        showFeedback(formID, inputID, inputElementValue, inValid, feedback)
    })
    inputElement.addEventListener('blur', e => {
        const inputElementValue = e.target.value.trim().valueOf()
        const inValid = (inputElementValue != '' && !(regex.test(inputElementValue)))
        inValid ? showFeedback(formID, inputID, inputElementValue, inValid, feedback) : {}
    })
}

function inputConfirm(formID, inputID, targetID, feedback = 'Vui lòng kiểm tra và nhập lại đúng mật khẩu'){
    const inputElement = document.forms[formID][inputID]
    const inputTarget = document.forms[formID][targetID]
    inputElement.addEventListener('input', e => inputConfirmCheck(e, formID, inputID, inputTarget, feedback))
    inputElement.addEventListener('blur', e => inputConfirmCheck(e, formID, inputID, inputTarget, feedback))
    inputTarget.addEventListener('input', e => {
        const inputElementValue = inputElement.value.trim().valueOf()
        const inputTargetValue = e.target.value.trim().valueOf()
        const inValid = (inputElementValue == '' || inputElementValue !== inputTargetValue)
        showFeedback(formID, inputID, inputElementValue, inValid, feedback)
    })
}
function inputConfirmCheck(e, formID, inputID, inputTarget, feedback ){
    const inputElementValue = e.target.value.trim().valueOf()
    const inputTargetValue = inputTarget.value.trim().valueOf()
    const inValid = (inputElementValue == '' || inputElementValue !== inputTargetValue)
    showFeedback(formID, inputID, inputElementValue, inValid, feedback)
}

function submitForm(formID, field){
    const index = validateArray.findIndex((arr) => arr.formID == formID)
    const formLegnth = field
    const inValid = (validateArray[index].validateRes.length == formLegnth && !(validateArray[index].validateRes.some(validateRes => validateRes.isValid == false)))
    if(inValid){
        console.log(validateArray[index])
    } else{
        console.log(false)
    }
}



//validateRules
validateArray[validateArray.length] = new Validate('formSignUp')
inputConfirm('formSignUp', 'userConfirmPass', 'userPassword')
inputRequire('formSignUp', 'userName', '*Hãy nhập tên của bạn!', 3, '*Tên của bạn có vẻ hơi ngắn')
inputRequire('formSignUp', 'userEmail', '*Hãy nhập email của bạn!')
inputRequire('formSignUp', 'userPassword', '*Chưa nhập password nè bạn ơi!')
inputRequire('formSignUp', 'userConfirmPass', '*Hãy nhập lại mật khẩu!')
inputRegex('formSignUp', 'userEmail', /\S+@\S+\.\S+/, '*Email của bạn không đúng')
inputRegex('formSignUp', 'userPassword', /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, '*Password ít nhất 8 ký tự (bao gồm chữ, số và ký tự đặc biệt)')

validateArray[validateArray.length] = new Validate('formSignIn')
inputRequire('formSignIn', 'userName', '*Hãy nhập tên vào!', 3, '*Tên của bạn có vẻ hơi ngắn =))')
inputRequire('formSignIn', 'userPassword', '*Nhập password vào!')
inputRegex('formSignIn', 'userPassword', /^(?=.*[A-Za-z])(?=.*\d)(?=.*[@$!%*#?&])[A-Za-z\d@$!%*#?&]{8,}$/, '*Password ít nhất 8 ký tự (bao gồm chữ, số và ký tự đặc biệt)')