class CityWeather{

    constructor(){
        this.cityData = []
    }
    



    async getDataFromDB(){
         let cities = await $.get(`/cities`)
         this.cityData = cities
    }
    
    
    async getCityData(cityName){
        let newCity = await $.get(`/city/${cityName}`) 
        this.cityData.push(newCity)   
    }
    
    
    saveCity(cityName){
        const city = this.cityData.find(city => city.name.toLowerCase() == cityName.toLowerCase())
        $.post('/city', city)
    }
    
    
    removeCity(cityName){
        $.ajax({
            url: `/city/${cityName}`,
            type: 'DELETE'
            
        })
    }
        

}