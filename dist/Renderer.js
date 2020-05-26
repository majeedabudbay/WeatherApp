class Renderer{
    constructor(){
    }

    renderData(cities){
        $("#cities").empty()

    
        const source = $('#city-template').html()
        const template = Handlebars.compile(source)
        let newHTML = template({ city: cities })
        $("#cities").append(newHTML) 
    }

}