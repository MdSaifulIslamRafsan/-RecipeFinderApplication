const searchForm = document.getElementById("searchForm"); 
searchForm.addEventListener('submit', (e) => {
        e.preventDefault();  
    });

    async function getDishData(){
        const res = await fetch('./dish.json')
        const data = await res.json();
        console.log(data)


    }
    getDishData()

