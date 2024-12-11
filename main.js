const baseUrl = "http://localhost:5270/api/Parkings";

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
            // sortDirection: "asc",
            currentSortColumn: null,
            sortDirections: {
              licensePlate: "asc",
              make: "asc",
          },
        }
    },
    created() {
        // created() is a life cycle method, not an ordinary method
        // created() is called automatically when the page is loaded
        console.log("created method called")
        this.getAllCurrentParkings()
    },
    mounted(){
      setInterval(() => {
        this.showParkings = [...this.showParkings]; // Tving Vue til at opdatere DOM
      }, 1000); // Opdater hver sekund
    },
    methods: {
        cleanList() {
            this.currentParkings = [];
            this.error = null;
            console.log("count cars : " + this.currentParkings.length);
        },
        toggleView(){
          this.isCurrentView = !this.isCurrentView;
          this.isCurrentView ? this.getAllCurrentParkings() : this.getAllEndedParkings()
        },
        calculateElapsedTime(startTime) {
          const now = new Date(); // Nu
          const start = new Date(startTime); // Starttidspunkt
          const elapsedMs = now - start; // Forskellen i millisekunder
          
          // Beregn timer, minutter og sekunder
          const seconds = Math.floor((elapsedMs / 1000) % 60);
          const minutes = Math.floor((elapsedMs / 1000 / 60) % 60);
          const hours = Math.floor(elapsedMs / 1000 / 60 / 60);
    
          // Returner resultatet som en string
          return `${hours}h ${minutes}m ${seconds}s`;
        },
        calculateTotalTime(startTime, endTime){
          const start = new Date(startTime) // Starttidspunkt
          const end  = new Date(endTime) // Sluttidspunkt
          const totalTime = end-start // Forskellen i millisekunder

          // Beregn timer, minutter og sekunder
          const seconds = Math.floor((totalTime / 1000) % 60);
          const minutes = Math.floor((totalTime / 1000 / 60) % 60);
          const hours = Math.floor(totalTime / 1000 / 60 / 60);

          return `${hours}h ${minutes}m ${seconds}s`;
        },
        formatDateTime(datetime){
          const date = new Date(datetime)
          const hours = date.getHours()
          const minutes = date.getMinutes()
          const year = date.getFullYear()
          const month = date.getMonth()+1
          const day = date.getDate()
          return `${day}-${month}-${year} ${hours}:${minutes} `;
        },
        //Read this for an example: https://vuejs.org/v2/cookbook/using-axios-to-consume-apis.html
        getAllCurrentParkings() {
            this.error = null;
             //axios call that returns all the elements from the webservice
            axios.get(baseUrl+"/ActiveParkings")
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
        getAllEndedParkings() {
          this.error = null;
           //axios call that returns all the elements from the webservice
          axios.get(baseUrl+"/EndedParkings")
          .then(response => {

           console.log("in function getAllEndedParkings");
           console.log("status code: "+ response.status );
           console.log("items ", response.data)
           //add the returning data from the webservice to the variable carlists
          this.previousParkings = response.data;
          this.showParkings = response.data;
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
      getCurrentCarByLicensePlate(licensePlate){
        if (licensePlate == ""){
          this.getAllCurrentParkings()
        }
        else {
          this.error = null;
          this.showParkings = this.currentParkings.filter(p => p.licensePlate === licensePlate.toUpperCase())
        }
      },
      getEndedCarByLicensePlate(licensePlate){
        if (licensePlate == ""){
          this.getAllEndedParkings()
        }
        else {
          this.error = null;
          this.showParkings = this.endedParkings.filter(p => p.licensePlate === licensePlate.toUpperCase())
        }
      },
        getCarByLicensePlate(licensePlate){
          if (licensePlate == ""){
            this.getAllCurrentParkings()
          }
          else {
            this.error = null;
            //axios call that returns the items from a specified user 
            url = baseUrl +"/"+licensePlate
            axios.get(url)
            .then(response => {
            
            console.log("Url: " + url)

            console.log("in function getCarByLicensePlate");
            console.log("status code: " + response.status);
            console.log("items ", response.data);
            //add the returning data from the webservice to the variable posts
            //  this.carslist = response.data;
            this.showParkings = [];
            this.showParkings.push(response.data);
            this.status = response.status;

            console.log(
              "length of the currentParkings array " +
                this.currentParkings.length
            );
          })
          .catch((error) => {
            this.showParkings = [];
            this.error = error.message;
            console.log("Error:" + this.error);
          });
      }
    },
    PostCar() {
      this.error = null;
      axios
        .post(baseUrl, {
          id: this.carId,
          vendor: this.carVendor,
          model: this.carModel,
          price: this.carPrice,
        })
        .then((response) => {
          console.log("URL: ");

          console.log("in post cars");
          console.log("status code: " + response.status);

          //add the returning data from the webservice to the variable posts
          //this.carlists = response.data;
          this.status = response.status;

          console.log("length of cars array " + this.carlists.length);
        })
        .catch((error) => {
          this.carlists = [];
          this.error = error.message;
          console.log("Error:" + this.error);
        });
    },
    deleteByCarId(id) {
      this.error = null;
      uri = baseUrl + "/" + id;
      axios
        .delete(uri)
        .then((response) => {
          console.log("Uri: " + uri);

          console.log("in function getByCarId");
          console.log("status code: " + response.status);

          this.parkingslist = response.data;
          this.status = response.status;

          console.log("length of the carlists array " + this.carslist.length);
        })
        .catch((error) => {
          this.parkingslist = [];
          this.error = error.message;
          console.log("Error:" + this.error);
        });
    },
    sortByLicensePlate() {
      const direction = this.sortDirections.licensePlate;
      this.showParkings.sort((a, b) => {
        if (direction === "asc") {
          return a.licensePlate.localeCompare(b.licensePlate);
        } else {
          return b.licensePlate.localeCompare(a.licensePlate);
        }
      });
      this.sortDirections.licensePlate = direction === "asc" ? "desc" : "asc";
    },
    sortByMake() {
      const direction = this.sortDirections.make;
      this.showParkings.sort((a, b) => {
        if (direction === "asc") {
          return a.make.localeCompare(b.make);
        } else {
          return b.make.localeCompare(a.make);
        }
      });
      this.sortDirections.make = direction === "asc" ? "desc" : "asc";
    },
    sortByModel() {
      const direction = this.sortDirections.model;
      this.showParkings.sort((a, b) => {
        if (direction === "asc") {
          return a.model.localeCompare(b.model);
        } else {
          return b.model.localeCompare(a.model);
        }
      });
      this.sortDirections.model = direction === "asc" ? "desc" : "asc";
    },
    sortByColor() {
      const direction = this.sortDirections.color;
      this.showParkings.sort((a, b) => {
        if (direction === "asc") {
          return a.color.localeCompare(b.color);
        } else {
          return b.color.localeCompare(a.color);
        }
      });
      this.sortDirections.color = direction === "asc" ? "desc" : "asc";
    },
    resetSearch() {
      this.LicensePlate = ''; 
      this.showParkings = this.currentParkings
  },
  },
  
}).mount("#app");
