let validator = {
    handleSubmit: (event) => {
        event.preventDefault(); // previne o comportamento padrão (que é enviar o formulário)
        let send = true;

        let inputs = form.querySelectorAll('input');

        validator.clearErrors();
        for(let i=0;i<inputs.length;i++) {
            let input = inputs[i];
            let check = validator.checkInput(input);
            if(check !== true) {
                send = false;
                validator.showError(input, check);
            };
        };

        if(send) {
            form.submit();
        };
    },
    checkInput: (input) => {
        let rules = input.getAttribute('data-rules'); //vai guardar o valor do atributo data-rules (se existir)
        if(rules !== null) {
            rules = rules.split('|'); //vai guardar o array [{required}, {min=2}]
            for(let k in rules) {
                let rulesDetails = rules[k].split('='); /* quando entrar na posição[o] do array (required) vai procurar o = e não
                vai achar, dai rulesDetails vai ser [{required}]. Quando entrar na posição [1] (min=2), o rulesDetails vai ser
                [{min}, {2}] */
                switch(rulesDetails[0]) {   //rulesDetails[0] vai ser required ou min
                    case 'required':
                        if(input.value == '') { //se a pessoa não tiver digitado nada
                            return 'Campo obrigatório';
                        };
                    break;
                    case 'min':
                        if(input.value.length < rulesDetails[1]) { // se a pessoa digitar só um digito
                            return 'Este campo tem que ter pelo menos '+rulesDetails[1]+' caracteres';
                        }
                    break;
                };
            };
        };
        return true;
    },
    showError: (input, error) => {
        input.style.borderColor = '#F00';

        let errorElement = document.createElement('div');
        errorElement.classList.add('error');
        errorElement.innerHTML = error;

        input.parentElement.insertBefore(errorElement, input.ElementSibling); /* parentElement pega o elemento pai, o inserteBefore
        insere o errorElement ANTES do input.ElementSibling.
        O input.ElementSibling pega o próximo elemento de mesmo nível do input, ou seja, mesmo não tendo nada depois do input, o 
        errorElement será inserido antes do input.ElementSibling, que é depois do input*/
    },
    clearErrors: () => {
        let inputs = form.querySelectorAll('input');
        for(let i=0; i<inputs.length;i++) {
            inputs[i].style = '';
        };

        let errorElements = document.querySelectorAll('.error');
        for(let i=0; i<errorElements.length;i++) {
            errorElements[i].remove();
        };
    }
};


let form = document.querySelector('.validator');
form.addEventListener('submit', validator.handleSubmit);