/*global Vue*/
/*global axios*/
var app = new Vue({
  el: '#app',
  data: {
    fighters: [],
    findFighter: "",
    attack: 0,
    speed: 0,
    armor: 0,
    health: 0,
    points: 0,
    path: "",
    creator: "",
    name: "",
    file: null,
    deleteCheck: false,
    creatorMaster: "",
    creatorCheck: "",
    addition: false
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
    fileChanged(event) {
      this.file = event.target.files[0];
    },
    async checkName() {
      if (this.creatorCheck === this.creatorMaster) {
        this.deleteCheck = true;
        this.creatorCheck = "";
        return;
      }
      else {
          this.creatorCheck = "";
        return;
      }
    },
    async addFighter() {
      try {
        const formData = new FormData();
        formData.append('photo', this.file, this.file.name);
        this.addition = true;
          let r1 = await axios.post('/api/images', formData);
          let r2 = await axios.post('/api/fighters', {
            name: this.name,
            armor: this.armor,
            health: 40,
            path: r1.data.path,
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
        this.deleteCheck = false;
        this.findFighter = null;
        this.creatorCheck = "";
        this.getFighters();
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
});
