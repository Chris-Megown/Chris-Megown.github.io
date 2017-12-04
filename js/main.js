$(document).ready(function(){
	$('#searchUser').on('keyup', function(e){
		let username = e.target.value;


		//Make request to Github

		$.ajax({
			url:'https://api.github.com/users/'+ username,
			data:{
				client_id:'3159c936961005960f06',
				client_secret:'2edf110bd0996b515fd6b09d63c42f078faf1d0f'
			}
		}).done(function(user){
			$.ajax({
				url:'https://api.github.com/users/'+ username+'/repos',
				data:{
				client_id:'3159c936961005960f06',
				client_secret:'2edf110bd0996b515fd6b09d63c42f078faf1d0f'
			}
			}).done(function(repos){
				console.log(repos);
			});
			$('#profile').html(`
				<div class="panel panel-default">
					<div class="panel-heading">
						<h3 class="panel-title">${user.name}</h3>
					</div>
					<div class="panel-body">
						<div class="row">
							<div class="col-md-3">
								<img class="thumbnail avatar" src="${user.avatar_url}">
								<a target="_blank" class="btn btn-primary btn-block" href="${user.html_url}">-Profile-</a>
							</div>
							<div class="col-md-9">
							<span>Public Repos: ${user.public_repos}</span>
							<span>Followers: ${user.followers}</span>
							<span>Following: ${user.following}</span>
							<br><br>
							<ul class="list-group">
								<li class="list-group-item">Website/blog: ${user.blog}</li>
								<li class="list-group-item">Location: ${user.location}</li>
								<li class="list-group-item">Member Since: ${user.created_at}</li>
							</ul>
							</div>
						</div>

					</div>
				</div>
				<h3 class="page-header"> 
				`);
		});
	});
});