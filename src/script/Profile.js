class Profile {
  constructor(userInfoProfil, api, owner) {
    this.name = userInfoProfil.querySelector(".user-info__name");
    this.other = userInfoProfil.querySelector(".user-info__job");
    this.photo = userInfoProfil.querySelector(".user-info__photo");
    this.api = api;
    this.owner = owner;
    this.profileData = this.profileData.bind(this);
  }
  getProfile(path){
    this.api.getData(path)
            .then(this.profileData);
  }
  changeProfile(path, object){
    this.api.patch(path, object)
            .then(this.profileData);          
  }
  profileData(res){
    this.owner._id = res._id;
    this.name.textContent = res.name;
    this.other.textContent = res.about;
    this.photo.style.backgroundImage = `url('${res.avatar}')`;
  }
}