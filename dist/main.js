
const renderer = new Renderer()
const cityWeather = new CityWeather()

const loadPage = function(){
    
    cityWeather.getDataFromDB().then(()=> renderer.renderData(cityWeather.cityData))
   
}

loadPage()


const handleSearch = async function(cityName){
    
    await cityWeather.getCityData(cityName)
    renderer.renderData(cityWeather.cityData)
}


$("#searchBtn").on("click", function(){
    const cityName = $("#input").val()
    handleSearch(cityName)
    
    $("#input").val("")
})


$("#cities").on("click", ".saveBtn", function(){

    cityWeather.saveCity($(this).closest(".cityDiv").find(".cityName").text())
})


$("#cities").on("click", ".deleteBtn",function(){

    const cityName = $(this).closest(".cityDiv").find(".cityName").text()
    cityWeather.removeCity(cityName)
    for(let city in cityWeather.cityData){
        if(cityWeather.cityData[city].name == cityName){
            cityWeather.cityData.splice(city, 1)
        }
    }
    
    renderer.renderData(cityWeather.cityData)
    
})