$(document).ready(function() {
	// 	console.log('Ready...');
	$('#searchUser').on('keyup', function(e) {
		// 		console.log(e.target.value);
		let username = e.target.value;

		// Make request to GitHub
		$.ajax({
			url: 'https://api.github.com/users/'+username,
			data: {
				client_id: '9da2fbb7f82a4400950f',
				client_secret: '511296d745c29e2043068e14b87698b07c8a6673'
			}
		}).done(function(user) {
			$.ajax({
				url: 'https://api.github.com/users/'+username+'/repos',
				data: {
					client_id: '9da2fbb7f82a4400950f',
					clent_secret: '511296d745c29e2043068e14b87698b07c8a6673',
					sort: 'created: asc',
					per_page: 5
				}
			}).done(function(repos){
// 				console.log(repos);
				$.each(repos, function(index, repo){
					$('#repos').append(`
						<div class="well">
							<div class="row>
								<div class="col-md-7"
									<strong>${repo.name}</strong>: ${repo.description}
								</div>
								<div class="col-md-3"
									<ul class="list-group">
									<li class="list-group-item">Forks:  ${repo.forks_count}</li>
									<li class="list-group-item">Watchers:  ${repo.watchers_count}</li>
									<li class="list-group-item">Stars:  ${repo.stargazers_count}</li>
								</div>
								<div class="col-md-2"
									<a href="{repo.html_url}" target="_blank" class="btn btn_default">Repo Page</a>
								</div>
							</div>
						</div>
					`)
				});
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
								<a class="btn btn-primary btn-block" target="_blank" href="${user.html_url}">View Profile</a>
							</div>
							<div class="col-md-9">
								<span class="label label-default">Public Repos: ${user.public_repos}</span>
								<span class="label label-primary">Public Gists: ${user.public_gists}</span>
								<span class="label label-success">Followers: ${user.followers}</span>
								<span class="label label-info">Following: ${user.following}</span>
								<br><br>
								<ul class="list-group">
									<li class="list-group-item">Company:  ${user.company}</li>
									<li class="list-group-item">Website/Blog:  ${user.blog}</li>
									<li class="list-group-item">Location:  ${user.location}</li>
									<li class="list-group-item">Member Since:  ${user.created_at}</li>
								</ul>
							</div>
						</div>
					</div>
				</div>
				<h3 class="page-header">Latest Repos</h3>
				<div id="repos"></div>
			`);
			console.log(user);
		});
	});
});	