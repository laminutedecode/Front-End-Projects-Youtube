const btn = document.querySelector('button')
const container = document.querySelector('.generator')

const colorsMax = 32;


const generatorPalette = () => {
    container.innerHTML = ``
    for(let i = 0; i < colorsMax; i++){
        let randomColors = Math.floor(Math.random() * 0xffffff).toString(16);
        randomColors = `#${randomColors.padStart(6, "0")}`
        // console.log(randomColors);
        const color = document.createElement("li");
        color.classList.add('box-choice')


        color.innerHTML = `  
         <div class="color" style="background: ${randomColors}"></div>
        <span class="value">${randomColors}</span>
        `
        color.addEventListener('click', ()=> copyColor(color, randomColors))
        container.appendChild(color)
    } 
}

generatorPalette()

const copyColor = (el, val) => {
    console.log(el, val);
    const colorElement = el.querySelector('.value')
    navigator.clipboard.writeText(val).then(()=> {
        colorElement.innerText = "copied"
        setTimeout(()=>colorElement.innerText = val, 1000 )
    }).catch(()=> alert('Il y a eu une erreur'))
}

btn.addEventListener('click', generatorPalette) 