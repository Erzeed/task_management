
export const notifElement = (data) => {
  // console.log(data)
    return `
    <div class="bodyNotif">
      <div class="cardNotif">
        <div class="iconNotif"></div>
        <div class="bodyNotif__desk">
          <div class="desk__title">
            <p>
            <a href="/#/review/${data.id_mhs}/${data.id}">${data.judul}<a/>
            <span class="textReview">perlu direview</span></p>
          </div>
          <div class="desk__name">
            <p>${data.nim}</p>
          </div>
        </div>
      </div> 
    </div>
    `
  }