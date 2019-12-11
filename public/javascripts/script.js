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
    deleteCheck: false,
    creatorMaster: "",
    creatorCheck: "",
    hero: "",
    villian: "",
    addition: false
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
    async checkName(creatorCheck) {
      if (creatorCheck === this.creatorMaster) {
        this.deleteCheck = true;
        return;
      }
      else {
        return;
      }
    },
    async addFighter() {
      try {
        this.addition = true;
          let r2 = await axios.post('/api/fighters', {
            name: this.name,
            armor: this.armor,
            health: this.health,
            attack: this.attack,
            speed: this.speed,
            creator: this.creator
          });
          this.addFighter = r2.data;
          this.findFighter = this.addFighter;
      } catch (error) {
        console.log(error);
      }
    },
    selectFighter(fighter) {
      this.findFighter = fighter;
      this.creatorMaster = fighter.creator;
    },
    async deleteFighter(findFighter) {
      try {
        let response = axios.delete("/api/fighters/" + findFighter._id);
        this.findFighter = null;
        this.getFighters();
        this.deleteCheck = false;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
  }
});
