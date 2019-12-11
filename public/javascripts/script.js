/*global Vue*/
/*global fetch*/
/*global axios*/
var app = new Vue({
  el: '#app',
  data: {
    fighters: [],
    findFighter: "",
    attack: 0,
    speed: 0,
    armor: 0,
    health: 40,
    creator: "",
    name: "",
    leaderboard: [],
    hero: "",
    villian: "",
  },
  created() {
    this.getFighters()
  },
  methods: {
    async getFighters() {
      try {
        let response = await axios.get("/api/fighters");
        this.fighters = response.data;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
});
