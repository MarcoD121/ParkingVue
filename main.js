const baseUrl = "http://localhost:5270/api/Parkings"

Vue.createApp({
    data() {
        return {
            currentParkings:[],
            previousParkings: [],
            showParkings: [],
            isCurrentView: true,
            error: null,
            statuscode:null,
            getCarId: "",
            carId:8,
            carMake:"Ford",
            carModel:"Mustang",
            deletecarId:1,
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
            this.currentParkings = [];
            this.error = null;
            console.log("count cars : " + this.currentParkings.length);
        },
        toggleView(){
          this.isCurrentView = !this.isCurrentView;
          this.showParkings = this.isCurrentView ? currentParkings : previousParkings
        },
        //Read this for an example: https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
         getAllParkings() {
            this.error = null;
             //axios call that returns all the elements from the webservice
            axios.get(baseUrl)
            .then(response => {

             console.log("in function getAllParkings");
             console.log("status code: "+ response.status );
             console.log("items ", response.data)
             //add the returning data from the webservice to the variable carlists
            this.currentParkings = response.data;
            this.showParkings = response.data
            this.status = response.status;
              
            console.log("length of the currentParkings array " + this.currentParkings.length)


            })
            .catch(error => {
              //resultElement.innerHTML = generateErrorHTMLOutput(error);
              this.showParkings = []
              this.error = error.message
              console.log("Error:" + this.error);
            })      
            
        },
        getCarByLicensePlate(licensePlate){
          if (licensePlate == ""){
            this.getAllParkings()
          }
          else {
            this.error = null;
            //axios call that returns the items from a specified user 
            url = baseUrl +"/"+licensePlate
            axios.get(url)
            .then(response => {
            
            console.log("Url: " + url)

            console.log("in function getCarByLicensePlate");
            console.log("status code: " + response.status );
            console.log("items ", response.data)
            //add the returning data from the webservice to the variable posts
            //  this.carslist = response.data;
            this.showParkings = []
            this.showParkings.push(response.data)
            this.status = response.status;
            
            console.log("length of the currentParkings array " + this.currentParkings.length)
            
            })
            .catch(error => {
              this.showParkings = []
              this.error = error.message
              console.log("Error:" + this.error);
            })  
          }
                
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