/*global Vue*/
/*global fetch*/
var app = new Vue({
  el: '#app',
  data: {
    fighters: [],
    prefix: '',
    searchTerm: '',
  },
  methods: {
    async getFighterss() {
      try {
        let response = await axios.get("/api/fighters");
        this.fighters = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async fetchWord() {
      // `this` points to the vm instance
      console.log(this.searchTerm);
      var myRequest = new Request('/dictionary/' + this.searchTerm);
      var myURL = myRequest.url;
      fetch(myURL)
        .then((data) => {
          return(data.json());
        })
        .then((bigEntry) => {
          this.entries = [];
          for (let j = 0; j < bigEntry.length; j++) {
            this.entries.push({ definition: bigEntry[j].defenition });
          }
        });
    },
  }
});
