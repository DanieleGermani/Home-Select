// Client ID
// 8ea9d5428e546ec4583b
// Client Secret
// 5475e3a95edbd22f8c2b1171a9c81cf405cac590
$(document).ready(function() {
  $("#searchUser").on('keyup', (event) => {
    let username = event.target.value;

    $.ajax({
      url: `https://api.github.com/users/${username}`,
      data: {
        client_id: '8ea9d5428e546ec4583b',
        client_secret: '5475e3a95edbd22f8c2b1171a9c81cf405cac590'

      }

    }).then((user)=>{
      console.log(user);
      $.ajax({
        url: `https://api.github.com/users/${username}/repos`,
        data: {
          client_id: '8ea9d5428e546ec4583b',
          client_secret: '5475e3a95edbd22f8c2b1171a9c81cf405cac590'

        }

      }).then((repos)=>{
        console.log(repos);

      });

      $('#profile').html(
        `
        <div class="row">
          <div class="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
             <div class="well profile">
                  <div class="col-sm-12">
                      <div class="col-xs-12 col-sm-8">
                          <h2>${user.name}</h2>
                          <p><strong>About: </strong>${user.bio}</p>
                          <p><strong>Location: </strong> ${user.location} </p>
                          <p><strong>Blog:</strong> ${user.blog}</p>

                      </div>
                      <div class="col-xs-12 col-sm-4 text-center">
                          <figure>
                              <a href="${user.html_url}"><img src="${user.avatar_url}" alt="" class="img-circle img-responsive"></a>
                          </figure>
                      </div>
                  </div>
                  <div class="col-xs-12 divider text-center">
                      <div class="col-xs-12 col-sm-3 emphasis">
                          <h2><strong> ${user.followers} </strong></h2>
                          <p><small>Followers</small></p>
                          <a href="${user.followers_url}"><button class="btn btn-success btn-block"><span class="fa fa-plus-circle"></span> Followers </button></a>
                      </div>
                      <div class="col-xs-12 col-sm-3 emphasis">
                          <h2><strong>${user.following}</strong></h2>
                          <p><small>Following</small></p>
                          <a href="${user.following_url}"><button class="btn btn-info btn-block"><span class="fa fa-user"></span> Following </button>
                      </div>
                      <div class="col-xs-12 col-sm-3 emphasis">
                          <h2><strong>${user.public_repos}</strong></h2>
                          <p><small>Public Repos</small></p>
                      </div>
                      <div class="col-xs-12 col-sm-3 emphasis">
                          <h2><strong>${user.public_gists}</strong></h2>
                          <p><small>Public Gists</small></p>

                      </div>
                  </div>
             </div>
          </div>
        </div>
        `
      );

    });

  });
});
