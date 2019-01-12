'use strict';

function extJS_getOrgRepos() {
	const api = extJS_getOrgReposAPI();
	let out;

	$.ajax({
		url: api,
		method: 'get',
		dataType: 'json',
		beforeSend: function () {
			extJS_pageIndicator();
		},
		success: function () {
			extJS_pageIndicator('success');
		},
		error: function () {
			extJS_pageIndicator('error');
		},
		complete: function () {
			$('#data-org-repos').append(out);
		}
	}).done(function (data) {
		const j = data.length;
		let i = 0, count = 0;

		out = '';

		for (; i < j; i++) {
			const name = data[i].name;
			const full_name = data[i].full_name;
			const avatar = data[i].owner.avatar_url;
			const url = data[i].html_url;
			const description = data[i].description ? data[i].description : '';
			const updated = data[i].updated_at;
			const updated_format = new Date(updated).toISOString().split('T')[0];
			const homepage = data[i].homepage ? data[i].homepage : url;
			const homepage_icon = data[i].homepage ? 'fas fa-home' : 'fab fa-github-alt';
			const license_id = data[i].license.spdx_id ? data[i].license.spdx_id : '';
			const license_key = data[i].license.key ? data[i].license.key : '';
			const forks = data[i].forks;
			const issues = data[i].open_issues;
			const watchers = data[i].watchers;

			if (count % 2 === 0) out += '<div class="columns">';

			out += '<div class="column">';
			out += '<article class="card" data-repo-login="' + full_name + '">';
			out += '<div class="card-content"><div class="media">';
			out += '<div class="media-left"><figure class="image is-64x64"><img title="' + full_name + '" src="' + avatar + '" alt="' + name + '" data-repo-info="avatar" /></figure></div>';
			out += '<div class="media-content"><h4 class="title is-4" data-repo-info="name">' + name + '</h4><p class="subtitle is-6"><a href="' + url + '" data-repo-info="url">' + full_name + '</a></p></div></div><div class="content"><p data-repo-info="description">' + description + '</p>';
			out += '</div></div>';
			out += '<footer class="card-footer">';
			out += '<div class="card-footer-item"><div class="tags has-addons"><span class="tag"><span class="icon"><i class="fas fa-code-branch"></i></span></span><span class="tag" data-repo-count="forks">' + forks + '</span></div></div>';
			out += '<div class="card-footer-item"><div class="tags has-addons"><span class="tag"><span class="icon"><i class="fas fa-info-circle"></i></span></span><span class="tag" data-repo-count="issues">' + issues + '</span></div></div>';
			out += '<div class="card-footer-item"><div class="tags has-addons"><span class="tag"><span class="icon"><i class="fas fa-eye"></i></span></span><span class="tag" data-repo-count="watchers">' + watchers + '</span></div></div>';
			out += '</footer>';
			out += '<footer class="card-footer">';
			out += '<div class="card-footer-item"><div class="tags has-addons"><span class="tag"><span class="icon"><i class="fas fa-sync-alt"></i></span></span><span class="tag"><time datetime="' + updated + '" data-repo-time="updated">' + updated_format + '</time></span></div></div>';
			out += '<div class="card-footer-item"><div class="tags has-addons"><span class="tag"><span class="icon"><i class="far fa-copyright"></i></span></span><span class="tag"><a href="https://choosealicense.com/licenses/' + license_key + '/" data-repo-info="license-key">' + license_id + '</a></span></div></div>';
			out += '<div class="card-footer-item"><div class="tags has-addons"><span class="tag"><span class="icon"><i class="fas fa-link"></i></span></span><span class="tag"><a href="' + homepage + '" data-repo-info="homepage"><span class="icon"><i class="' + homepage_icon + '"></i></span></a></span></div></div>';
			out += '</footer>';
			out += '</article>';
			out += '</div>';

			if (count % 2 !== 0) out += '</div>';

			count++;
		}

		if (count % 2 !== 0) out += '</div>';
	});
}

$(function () {
	extJS_getOrgRepos();
});
