/*global Vue*/
/*global fetch*/
var app = new Vue({
  el: '#app',
  data: {
    fighters: [],
    leaderboard: [],
    hero: "",
    villian: "",
    searchTerm: '',
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
    async upload() {
      try {
        const formData = new FormData();
        if (this.attack + this.speed + this.armor > 22) {
          let r2 = await axios.post('/api/fighters', {
            name: this.name,
            armor: this.armor,
            health: 40 - (this.attack + this.speed + this.armor - 22),
            attack: this.attack,
            speed: this.speed,
            creator: this.creator
          });
          this.addFighter = r2.data;
        }
        else {
          let r2 = await axios.post('/api/fighters', {
            name: this.name,
            armor: this.armor,
            health: 40,
            attack: this.attack,
            speed: this.speed,
            creator: this.creator
          });
          this.addFighter = r2.data;
        }
      } catch (error) {
        console.log(error);
      }
    },
  }
});
