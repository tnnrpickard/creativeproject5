/*global Vue*/
/*global fetch*/
/*global axios*/
var app = new Vue({
  el: '#app',
  data: {
    fighters: [],
    findHero: null,
    findVillian: null,
    heroAttack: 0,
    heroSpeed: 0,
    heroArmor: 0,
    heroHealth: 40,
    heroPath: "",
    heroCreator: "",
    heroName: "",
    villianAttack: 0,
    villianSpeed: 0,
    villianArmor: 0,
    villianHealth: 40,
    villianCreator: "",
    villianPath: "",
    villianName: "",
    leaderboard: []
  },
  created() {
    this.getFighters();
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
    async selectHero(fighter) {
      this.findHero = fighter;
    },
    async selectVillian(fighter) {
      this.findVillian = fighter;
    }
  }
});
