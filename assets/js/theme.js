'use strict';

function extJS_getDomain() {
	let domain;

	domain = window.location.split('.')[0].split('//')[1];

	return domain;
}

function extJS_getRepoData(org_id) {
	let api;

	const client_id = '9e24a1926a87971c3cd7';
	const client_secret = 'b203305300eb04727e32514dc5bedb03e35629c8';

	api = 'https://api.github.com/orgs/' + org_id + '/repos?client_id=' + client_id + '&client_secret=' + client_secret;

	return api;
}

function extJS_setRepoData() {
	const org_id = extJS_getDomain();
	const api = extJS_getRepoData(org_id);
	let out;

	$.getJSON(api, function (data) {

		let i = 0;
		const j = data.length;
		let count = 0;

		out = '';

		for (; i < j; i++) {
			if (count % 2 === 0) out += '<div class="columns">';

			const name = data[i].name;
			const full_name = data[i].full_name;
			const url = data[i].html_url;
			const description = data[i].description ? data[i].description : '';
			const created_raw = data[i].created_at;
			const created_format = new Date(created_raw).toISOString().split('T')[0];
			const updated_raw = data[i].updated_at;
			const updated_format = new Date(updated_raw).toISOString().split('T')[0];
			const pushed_raw = data[i].pushed_at;
			const pushed_format = new Date(pushed_raw).toISOString().split('T')[0];
			const homepage = data[i].homepage ? data[i].homepage : '';
			const license_id = data[i].license.spdx_id ? data[i].license.spdx_id : '';
			const license_key = data[i].license.key ? data[i].license.key : '';
			const forks = data[i].forks;
			const issues = data[i].open_issues;
			const watchers = data[i].watchers;

			out += '<div class="column">';
			out += '<article class="card" data-repo-login="' + full_name + '">';

			out += '<div class="card-content"><div class="media">';
			out += '<div class="media-content"><h4 class="title is-4" data-repo-info="name">' + name + '</h4><p class="subtitle is-6"><a href="' + url + '" data-repo-info="url">' + full_name + '</a></p></div></div><div class="content"><p data-repo-info="description">' + description + '</p>';
			out += '</div></div>';

			out += '<footer class="card-footer">';
			out += '<div class="card-footer-item"><div class="tags has-addons"><span class="tag"><span class="icon"><i class="fas fa-plus-square"></i></span></span><span class="tag"><time datetime="' + created_raw + '" data-repo-time="created">' + created_format + '</time></span></div></div>';
			out += '<div class="card-footer-item"><div class="tags has-addons"><span class="tag"><span class="icon"><i class="fas fa-sync-alt"></i></span></span><span class="tag"><time datetime="' + updated_raw + '" data-repo-time="updated">' + updated_format + '</time></span></div></div>';
			out += '</footer>';

			out += '<footer class="card-footer">';
			out += '<div class="card-footer-item"><div class="tags has-addons"><span class="tag"><span class="icon"><i class="fas fa-code-branch"></i></span></span><span class="tag" data-repo-count="forks">' + forks + '</span></div></div>';
			out += '<div class="card-footer-item"><div class="tags has-addons"><span class="tag"><span class="icon"><i class="fas fa-info-circle"></i></span></span><span class="tag" data-repo-count="issues">' + issues + '</span></div></div>';
			out += '<div class="card-footer-item"><div class="tags has-addons"><span class="tag"><span class="icon"><i class="fas fa-eye"></i></span></span><span class="tag" data-repo-count="watchers">' + watchers + '</span></div></div>';

			out += '<div class="card-footer-item"><div class="tags has-addons"><span class="tag"><span class="icon"><i class="far fa-copyright"></i></span></span><span class="tag" data-repo-info="license-id"><a href="https://choosealicense.com/licenses/' + license_key + '/" data-repo-info="license-key">' + license_id + '</a></span></div></div>';
			out += '</footer>';

			out += '</article>';
			out += '</div>';

			if (count % 2 !== 0) out += '</div>';

			count++;
		}

		if (count % 2 !== 0) out += '</div>';

		$('#data').empty().append(out);
	});
}

/**
 * Loading functions.
 * ---------------------------------------------------------------------------------------------------------------------
 */

$(function () {
	extJS_setRepoData();
});
