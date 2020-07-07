const btnSubmit = document.querySelector ("button#send");
const form = document.querySelector("form");

btnSubmit.addEventListener("click", event => {
    const fields = [ ... document.querySelectorAll("input")]

        function validateField(field) {
            function verifyErrors() {
                let foundError = false;
        
                for (error in field.validity){
                    if (field.validity[error] && !field.validity.valid[error]){
                        foundError = true
                    }
                }
                return foundError;
            }   
          
            function customMessage(typeError) {
                const messages = {
                    text: {
                        valueMissing: "Por favor, preencha este campo"
                    },
                    email: {
                        valueMissing: "E-mail é obrigatório",
                        typeMissmatch: "Por favor, preencha um e-mail válido"
                    }
                }
                return messages[field.type][typeError]
            }
        
            function setCustomMessage (message) {
                const spanError = field.parentNode.querySelector("span.error")
                if (message) {
                    spanError.classList.add("active")
                    spanError.innerHTML = customMessage()
                } else {
                    spanError.classList.remove("active")
                    spanError.innerHTML = ""
                }
            }
            return function () {
                const error = verifyErrors()
                if (verifyErrors()) {
                    const message = customMessage(error)
                    field.style.borderColor = "red"
                    setCustomMessage()
                } else {
                    field.style.borderColor = "green"
                    setCustomMessage()
                }
            }
        }
        
        function customValidation(event) {
            const field = event.target
            const validation = validateField(field)
            validation()
        }

        fields.forEach(field => {
            if (field.value == "") form.classList.add("validate-error")
                field.addEventListener("invalid", event => {
                event.preventDefault(),
                customValidation(event)
                });
                field.addEventListener("blur", customValidation)
            }) 
        const formError = document.querySelector(".validate-error");
        if (formError) {
            formError.addEventListener("animationend", event =>{
                if(event.animationName == "treme") {
                    formError.classList.remove("validate-error")
                }
            });
        } else  {
        form.classList.add("form-hide");
        }
});

form.addEventListener("animationend", event => {
    if(event.animationName == "move"){
        const fundoQuad = document.querySelector("ul.quadrados");
        for (let i = 0; i < 40; i++) {
            const random = (min, max) => Math.random() * (max - min) + min;
            const li = document.createElement("li");
            const size = Math.floor(random(100, 15)); //random de 0 a 1
            const position = random(99,1);
            const delay = random(5, 0.001);
            const duration = random(7, 12);
        
                li.style.width = `${size}px`;
                li.style.height = `${size}px`;
                li.style.bottom = `-${size}px`;
        
                li.style.left = `${position}%`;
        
                li.style.animationDelay = `${delay}s`;
                li.style.animationDuration = `${duration}s`;
        
            fundoQuad.appendChild(li);
        };
    } 
});

const btnDarkMode = document.querySelector("input#darkmode")
const body = document.querySelector("body")

const getStyle = (element, style) =>
    window
        .getComputedStyle(element)
        .getPropertyValue(style)

const initialColors = {
    formBg: getStyle(body,"--form-bg"),
}

const darkMode = {
    formBg: "black"
}

const transformKey= key => "--" + key.replace(/([A-Z])/, "-$1").toLowerCase()

const changeColors = (colors) => {
    Object.keys(colors).map(key =>
    body.style.setProperty(transformKey(key), colors[key])
    )
}

btnDarkMode.addEventListener("click", ({target}) => {
    target.checked ? changeColors (darkMode) : changeColors(initialColors)
});

const btnDarkModeT = document.querySelector("input#darkmode2");

const initialColorsT = {
    bgColor: getStyle(body,"--bg-color"),
    quad: getStyle(body,"--quad")
}

const darkModeT = {
    bgColor: "#2F4F4F",
    quad: "#696969"
}

btnDarkModeT.addEventListener("click", ({target}) => {
    target.checked ? changeColors (darkModeT) : changeColors(initialColorsT)
});
