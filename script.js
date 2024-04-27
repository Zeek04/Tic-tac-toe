let gridItems = document.querySelectorAll("[data-cell]");

gridItems.forEach(cell => {
    cell.addEventListener('click', handleClick, {
        once:true
    })
});

function handleClick(){
    console.log('clicked');
}