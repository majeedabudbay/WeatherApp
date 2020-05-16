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
        if(newCity.name !== undefined){ 
            this.cityData.push(newCity)  
        }else{
            alert("City not found!")
        } 
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