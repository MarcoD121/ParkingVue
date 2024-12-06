const baseUrl = "http://localhost:5270/api/Parkings"

Vue.createApp({
    data() {
        return {
            nyliste:[],
            parkingslist: [],
            error: null,
            statuscode:null,
            getCarId: "",
            carId:8,
            carMake:"Ford",
            carModel:"Mustang",
            deletecarId:1,
            car: null
        }
    },
     created() {
        // created() is a life cycle method, not an ordinary method
        // created() is called automatically when the page is loaded
        console.log("created method called")
        this.getAllParkings()
    },
    methods: {
        cleanList() {
            this.parkingslist = [];
            this.error = null;
            console.log("count cars : " + this.parkingslist.length);
        },
        //Read this for an example: https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
         getAllParkings() {
            this.error = null;
             //axios call that returns all the elements from the webservice
            axios.get(baseUrl)
            .then(response => {

             console.log("in function getAllCars");
             console.log("status code: "+ response.status );

             //add the returning data from the webservice to the variable carlists
             this.parkingslist = response.data;
             this.status = response.status;
              
             console.log("length of the carlist array " + this.parkingslist.length)


            })
            .catch(error => {
              //resultElement.innerHTML = generateErrorHTMLOutput(error);
              this.parkingslist = []
                this.error = error.message
              console.log("Error:" + this.error);
            })      
            
        },
        getCarByLicensePlate(id){
            this.error = null;
            //axios call that returns the items from a specified user 
            url = baseUrl +"/"+id
            axios.get(url)
            .then(response => {
            
            console.log("Url: " + url)

            console.log("in function getByUserId");
            console.log("status code: " + response.status );
            console.log("items ", response.data)
            //add the returning data from the webservice to the variable posts
            //  this.carslist = response.data;
            //this.parkingslist = [];
            //this.parkingslist.push(response.data);
            this.car = response.data
            this.status = response.status;
            
            console.log("length of the parkingslists array " + this.parkingslist.length)
            
            })
            .catch(error => {
              this.parkingslist = []
              this.error = error.message
              console.log("Error:" + this.error);
            })      
        },
        PostCar(){
            this.error = null;
            axios.post(baseUrl,{"id":this.carId,"vendor":this.carVendor,"model":this.carModel,"price":this.carPrice})
            .then(response => {
            
            console.log("URL: ")

             console.log("in post cars");
             console.log("status code: "+ response.status );

             //add the returning data from the webservice to the variable posts
             //this.carlists = response.data;
             this.status = response.status;
              
             console.log("length of cars array " + this.carlists.length)
            })
            .catch(error => {
              this.carlists = []
              this.error = error.message
              console.log("Error:" + this.error);
            })    
        },
        deleteByCarId(id){
            this.error = null;
            uri = baseUrl +"/"+id
            //axios call that returns the items from a specified user 
            axios.delete(uri)
            .then(response => {
            
            console.log("Uri: " + uri)

             console.log("in function getByCarId");
             console.log("status code: "+ response.status );

             //add the returning data from the webservice to the variable posts
             this.parkingslist = response.data;
             this.status = response.status;
              
             console.log("length of the carlists array " + this.carslist.length)
            })
            .catch(error => {
              this.parkingslist = []
              this.error = error.message
              console.log("Error:" + this.error);
            })      
        }
        
       
       
    }
}).mount("#app")