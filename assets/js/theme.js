'use strict';

function extJS_getOrgData(org_id) {
	let api;

	const client_id = '9e24a1926a87971c3cd7';
	const client_secret = 'b203305300eb04727e32514dc5bedb03e35629c8';

	api = 'https://api.github.com/orgs/' + org_id + '/repos?client_id=' + client_id + '&client_secret=' + client_secret;

	return api;
}

function extJS_setOrgData() {
	const org_id = 'metainfo';
	const api = extJS_getOrgData(org_id);
	let out;

	$.getJSON(api, function (data) {

		let i = 0;
		const len_i = data.length;

		out = '';

		for (; i < len_i; i++) {
			const name = data[i].name;
			const full_name = data[i].full_name;
			const url = data[i].html_url;
			const description = data[i].description;
			const created = data[i].created_at;
			const updated = data[i].updated_at;
			const pushed = data[i].pushed_at;
			const homepage = data[i].homepage;
			const license_id = data[i].license.spdx_id;
			const license_url = data[i].license.url;
			const forks = data[i].forks;
			const issues = data[i].open_issues;
			const watchers = data[i].watchers;

			out += name + ' | ' + full_name + '<br/>';
		}

		$('.column').empty().append(out);
	});
}

/**
 * Loading functions.
 * ---------------------------------------------------------------------------------------------------------------------
 */

$(function () {
	extJS_particlesJS('particles-js', 'assets/js/particles.dark.json');
	extJS_setOrgData();
});
