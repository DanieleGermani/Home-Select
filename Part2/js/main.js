$(document).ready(function() {
  $("#searchUser").on('keyup', (event) => {
    let username = event.target.value;

    $.ajax({
      url: `https://api.github.com/users/${username}`,
      data: {
        client_id: '8ea9d5428e546ec4583b',
        client_secret: '5475e3a95edbd22f8c2b1171a9c81cf405cac590'
      }

    }).done((user) => {

      $('#profile').html(`
       <div class="row">
         <div class="col-md-offset-2 col-md-8 col-lg-offset-3 col-lg-6">
            <div class="well profile">
                 <div class="col-sm-12 margin-bottom">
                     <div class="col-xs-12 col-sm-8">
                         <h2>${user.name}</h2>
                         <p><strong>Id:</strong> ${user.id}</p>
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
                     <div class="col-xs-12 col-sm-4 emphasis">
                         <h2><strong> ${user.followers} </strong></h2>
                         <p><small>Followers</small></p>
                         <a href="https://github.com/${user.login}?tab=followers" target="_blank"><button class="btn btn-info btn-block"><span class="fa fa-plus-circle"></span> Followers </button></a>
                     </div>
                     <div class="col-xs-12 col-sm-4 emphasis">
                         <h2><strong>${user.following}</strong></h2>
                         <p><small>Following</small></p>
                         <a href="https://github.com/${user.login}?tab=following" target="_blank"><button class="btn btn-info btn-block"><span class="fa fa-user"></span> Following </button></a>
                     </div>
                     <div class="col-xs-12 col-sm-4 emphasis">
                         <h2><strong>${user.public_repos}</strong></h2>
                         <p><small>Public Repos</small></p>
                         <a href="https://github.com/${user.login}?tab=repositories" target="_blank"><button class="btn btn-info btn-block"><span class="fa fa-user"></span> Public Repos </button>
                     </div>

                 </div>
            </div>
         </div>
       </div>
       <div class="container">
       <div class=" col-md-4" id="followers"></div>
       <div class=" col-md-4" id="following"></div>
       <div class=" col-md-4" id="repos"></div>
       </div>
       `);
    });

    $.ajax({
      url: `https://api.github.com/users/${username}/followers`,
      data: {
        client_id: '8ea9d5428e546ec4583b',
        client_secret: '5475e3a95edbd22f8c2b1171a9c81cf405cac590',
      }

    }).then((followers) => {

      $.each(followers, (idex, follower) => {
        $('#followers').append(`
         <div class="well">
           <div class="row">
             <div class="col-md-3">
                 <a href="${follower.html_url}"><img src="${follower.avatar_url}" alt="" class="img-circle img-responsive"></a>
             </div>
             <div class="col-md-5">
               <a href="${follower.html_url}"><p>${follower.login}</p></a>
               <a href="${follower.html_url}"><p>Id: ${follower.id}</p></a>
             </div>
             <div class="col-md-4">
               <a href="https://github.com/${follower.login}?tab=repositories" target="_blank" class="btn btn-default">Repos Page</a>
             </div>
           </div>
         </div>`);
      });
    });

    $.ajax({
      url: `https://api.github.com/users/${username}/following`,
      data: {
        client_id: '8ea9d5428e546ec4583b',
        client_secret: '5475e3a95edbd22f8c2b1171a9c81cf405cac590',
      }

    }).then((following) => {

      $.each(following, (idex, follower) => {
        $('#following').append(`
         <div class="well">
           <div class="row">
             <div class="col-md-3">
                 <a href="${follower.html_url}"><img src="${follower.avatar_url}" alt="" class="img-circle img-responsive"></a>
             </div>
             <div class="col-md-5">
               <a href="${follower.html_url}"><p>${follower.login}</p></a>
               <a href="${follower.html_url}"><p>Id: ${follower.id}</p></a>
             </div>
             <div class="col-md-4">
               <a href="https://github.com/${follower.login}?tab=repositories" target="_blank" class="btn btn-default">Repos Page</a>
             </div>
           </div>
         </div>`);
      });
    });

    $.ajax({
      url: `https://api.github.com/users/${username}/repos`,
      data: {
        client_id: '8ea9d5428e546ec4583b',
        client_secret: '5475e3a95edbd22f8c2b1171a9c81cf405cac590',
        sort: 'created: asc',
        per_page: 10
      }

    }).then((repos) => {
      $.each(repos, (idex, repo) => {
        $('#repos').append(`
         <div class="well">
           <div class="row">
             <div class="col-md-8">
               <strong>${repo.name}</strong>
             </div>

             <div class="col-md-4">
               <a href="${repo.html_url}" target="_blank" class="btn btn-default">Repo Page</a>
             </div>
           </div>
         </div>`);
      });
    });

  });
});
